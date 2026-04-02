import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { conductInterview, analyzeCV } from './groqService.js';

/**
 * 🛠️ Vercel-Native ESM Co-Founder Matching API
 * This handler runs as a modern ESM serverless function.
 */

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Configure Multer for in-memory file processing
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Supabase Setup
const supabase = createClient(
    process.env.VITE_SUPABASE_URL || '', 
    process.env.VITE_SUPABASE_ANON_KEY || ''
);

/**
 * 🏥 HEALTH & DIAGNOSTIC ROUTES
 */
app.get('/api/founders/test', (req, res) => {
    res.json({ 
        status: 'Vercel API Operational',
        timestamp: new Date().toISOString(),
        env: {
            hasSupabase: !!process.env.VITE_SUPABASE_URL,
            hasGroq: !!process.env.GROQ_API_KEY
        }
    });
});

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
        if (!messages) return res.status(400).json({ error: 'Missing messages history.' });
        
        const result = await conductInterview(messages);
        
        if (result.is_complete && result.extracted_data?.user_category) {
            console.log(`🎯 User identified as: ${result.extracted_data.user_category}`);
        }
        
        res.json(result);
    } catch (err) {
        console.error('❌ Chat API Error:', err);
        res.status(500).json({ error: err.message || 'The AI engine crashed during processing.' });
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

/**
 * 📄 CV SCANNING (STUB FOR NOW DUE TO PDF-PARSE-FORK ESM COMPLEXITY)
 */
app.post('/api/founders/cv-scan', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
        // Minimal logic to prevent crash while testing core chat
        const result = { name: "Applicant From PDF", tech_stack: ["In Progress"] };
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default app;
