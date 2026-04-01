const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');

// 🛠️ Vercel-Safe Module Imports
let PDF_SCANNER_ENGINE;
try {
    PDF_SCANNER_ENGINE = require('pdf-parse-fork');
} catch (e) {
    console.warn('⚠️ pdf-parse-fork not found in standard path, attempting fallback...');
    try {
        PDF_SCANNER_ENGINE = require('./node_modules/pdf-parse-fork');
    } catch (e2) {
        console.error('❌ Critical: Failed to load PDF engine.');
    }
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Configure Multer for in-memory file processing
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Use Supabase Client with Vercel Environment Variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Diagnostic internal route (Not public)
app.get('/api/founders/status', (req, res) => {
    res.json({ status: 'operational', supabaseUrl: !!supabaseUrl });
});

// Import services from local api/ folder
const { validateApplication, matchProfiles, conductInterview, analyzeCV, generateMatchReasoning } = require('./groqService');

/**
 * 🔍 PENDING CO-FOUNDERS DIRECTORY
 */
app.get('/api/founders/pending', async (req, res) => {
    try {
        const { category } = req.query;
        let query = supabase.from('founders_applications')
            .select('id, name, user_type, ai_summary, startup_name, tech_stack, portfolio_link')
            .eq('status', 'waiting')
            .neq('visibility', 'private');

        if (category && category !== 'all') {
            query = query.eq('user_type', category);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        console.error('❌ Directory Fetch Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

/**
 * 💬 AI INTERVIEW & ONBOARDING
 */
app.post('/api/founders/chat', async (req, res) => {
    const { messages } = req.body;
    try {
        if (!messages) return res.status(400).json({ error: 'Missing messages' });
        
        const result = await conductInterview(messages);
        
        if (result.is_complete && result.extracted_data.user_category) {
            console.log(`🎯 Onboarding complete: ${result.extracted_data.user_category}`);
        }
        
        res.json(result);
    } catch (err) {
        console.error('❌ Chat API Error:', err.message);
        res.status(500).json({ error: 'AI server encountered an issue. Please try again.' });
    }
});

/**
 * 🔒 DEFINITIVE FINALIZATION & ACTIVATION
 */
app.post('/api/founders/finalize', async (req, res) => {
    const { profile } = req.body;
    try {
        if (!profile || !profile.email) {
            return res.status(400).json({ error: 'Missing profile data (email required).' });
        }

        const { data, error } = await supabase.from('founders_applications')
            .upsert({
                email: profile.email,
                name: profile.name,
                whatsapp_number: profile.whatsapp,
                user_type: profile.user_category,
                startup_name: profile.startup_name,
                ai_summary: profile.summary,
                visibility: profile.visibility || 'public',
                portfolio_link: profile.portfolio_link,
                status: 'waiting'
            }, { onConflict: 'email' })
            .select()
            .single();

        if (error) throw error;
        res.json({ success: true, profile: data });
    } catch (err) {
        console.error('❌ Finalization Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

/**
 * 🔗 MANUAL CONNECTION REQUEST
 */
app.post('/api/founders/connect', async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const { error: updateErr } = await supabase.from('founders_applications')
            .update({ status: 'matched', match_id: receiverId })
            .in('id', [senderId, receiverId]);

        if (updateErr) throw updateErr;

        const { data: receiver, error: fetchErr } = await supabase.from('founders_applications')
            .select('name, email, whatsapp_number')
            .eq('id', receiverId)
            .single();

        if (fetchErr) throw fetchErr;
        res.json({ success: true, contact: receiver });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PDF Extraction Utility
async function extractTextFromPDF(buffer) {
    if (!PDF_SCANNER_ENGINE) throw new Error('PDF Scanner Engine not available on this server instance.');
    const parseFunc = (typeof PDF_SCANNER_ENGINE === 'function') ? PDF_SCANNER_ENGINE : 
                      (PDF_SCANNER_ENGINE.PDFParse || PDF_SCANNER_ENGINE.default || PDF_SCANNER_ENGINE.pdf || PDF_SCANNER_ENGINE);
    const data = await parseFunc(buffer);
    return data.text || '';
}

/**
 * 📄 CV SCANNING
 */
app.post('/api/founders/cv-scan', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
        const text = await extractTextFromPDF(req.file.buffer);
        const structuredData = await analyzeCV(text);
        res.json(structuredData);
    } catch (err) {
        console.error('❌ CV Scan Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// 🚀 Vercel Native Support: Conditional Listening and Export
if (process.env.NODE_ENV !== 'production' && require.main === module) {
    const PORT = 3001;
    app.listen(PORT, () => console.log(`🚀 Local dev server running on http://localhost:${PORT}`));
}

module.exports = app;
