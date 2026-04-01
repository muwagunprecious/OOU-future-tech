const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
// ABSOLUTE root-level require for maximum stability
const PDF_SCANNER_ENGINE = require(path.join(__dirname, '../node_modules', 'pdf-parse-fork'));

dotenv.config({ path: path.join(__dirname, '../.env') });

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

// Use Supabase Client with confirmed working ANON key (service role in .env appears invalid)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Diagnostic endpoint
app.get('/api/debug-env', (req, res) => {
    res.json({
        supabaseUrl,
        hasAnonKey: !!process.env.VITE_SUPABASE_ANON_KEY,
        anonKeyPrefix: process.env.VITE_SUPABASE_ANON_KEY?.substring(0, 10),
        envPath: path.join(__dirname, '../.env')
    });
});

app.post(['/send-ticket', '/api/send-ticket'], async (req, res) => {
    const { email, name, ticketId, type } = req.body;
    console.log(`📧 Attempting to send ticket to: ${email}`);

    const mailOptions = {
        from: `"OOU Future Tech" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Your OOU Future Tech 2026 Ticket - ${ticketId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 24px;">OOU FUTURE TECH</div>
                </div>
                <h2 style="color: #000; text-align: center;">Registration Confirmed!</h2>
                <p>Hello <strong>${name}</strong>,</p>
                <p>Your spot at the <strong>OOU Future Tech Conference 2026</strong> has been reserved. We are excited to see you there!</p>
                
                <div style="background: #f4f4f5; padding: 25px; border: 2px solid #000; border-radius: 15px; margin: 25px 0;">
                    <table style="width: 100%;">
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Attendee:</strong></td>
                            <td style="padding-bottom: 10px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Ticket ID:</strong></td>
                            <td style="padding-bottom: 10px; font-family: monospace; color: #cc0000; font-weight: 900;">${ticketId}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Pass Class:</strong></td>
                            <td style="padding-bottom: 10px; text-transform: uppercase;">${type}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Event Date:</strong></td>
                            <td style="padding-bottom: 10px;">March 27, 2026</td>
                        </tr>
                        <tr>
                            <td><strong>Venue:</strong></td>
                            <td>OOU Main Campus, Ago-Iwoye</td>
                        </tr>
                    </table>
                </div>

                <p style="font-size: 0.9rem; color: #555;">
                    <strong>Instructions:</strong> Please keep this Ticket ID handy. You'll need to present it at the check-in desk on the day of the event. 
                    If you haven't already, you can download your visual digital ticket card directly from our website after registration.
                </p>

                <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                    <p style="font-size: 12px; color: #71717a;">
                        Sent by OOU Future Tech Organizing Committee<br/>
                        ooufuturetech@gmail.com
                    </p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Ticket sent to ${email}`);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('❌ Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Update pitch status
app.post('/api/update-pitch-status-direct', async (req, res) => {
    const { id, status } = req.body;
    console.log(`🚀 Updating Pitch: ${id} to ${status}`);
    const { error } = await supabase.from('pitches').update({ status }).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
});

// --- VERIFICATION PORTAL ENDPOINTS ---

// Get all attendees with check-in status from site_settings
app.get('/api/attendees', async (req, res) => {
  try {
    console.log('📡 Fetching attendees and check-in status...');
    
    // 1. Fetch registrations
    const regRes = await fetch(`${supabaseUrl}/rest/v1/registrations?select=*&order=name.asc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    if (!regRes.ok) throw new Error(`Registrations fetch failed: ${regRes.statusText}`);
    const attendees = await regRes.json();

    // 2. Fetch check-in list from site_settings
    const settingsRes = await fetch(`${supabaseUrl}/rest/v1/site_settings?key=eq.checked_in_attendees&select=value`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    let checkedInList = [];
    if (settingsRes.ok) {
      const settings = await settingsRes.json();
      if (settings && settings.length > 0) {
        try {
          checkedInList = JSON.parse(settings[0].value);
        } catch (e) {
          console.error('❌ Failed to parse check-in list:', e.message);
        }
      }
    }

    // 3. Merge data
    const mergedAttendees = attendees.map(a => ({
      ...a,
      checked_in: checkedInList.includes(a.ticket_id)
    }));

    res.json(mergedAttendees);
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ error: 'Failed to fetch attendees' });
  }
});

// Toggle check-in status using site_settings
const { validateApplication, matchProfiles, conductInterview } = require('./groqService');

app.post('/api/founders/chat', async (req, res) => {
    const { messages } = req.body;
    try {
        const result = await conductInterview(messages);
        
        // --- INSTANT MVP MATCHING LOGIC ---
        if (result.is_complete && result.extracted_data.user_category) {
            console.log(`🎯 User onboarding complete. Identifying as: ${result.extracted_data.user_category}`);
            
            // 1. Persist user application
            const { data: newUser, error: saveErr } = await supabase.from('founders_applications')
                .upsert({
                    email: result.extracted_data.email,
                    name: result.extracted_data.name,
                    whatsapp_number: result.extracted_data.whatsapp,
                    user_type: result.extracted_data.user_category,
                    startup_name: result.extracted_data.startup_name,
                    ai_summary: result.extracted_data.summary,
                    visibility: result.extracted_data.visibility || 'public',
                    portfolio_link: result.extracted_data.portfolio_link,
                    status: 'waiting'
                }, { onConflict: 'email' })
                .select()
                .single();

            if (saveErr) console.error('💾 Persistence Error:', saveErr.message);

            // 2. Scan for instant match
            const match = await findMatch(newUser || result.extracted_data);

            if (match) {
                console.log(`🔥 Instant Match Found: ${newUser?.name} <-> ${match.name}`);
                result.message = `🔥 Perfect timing — I just found someone you can connect with.\n\n${match.name} is a ${match.user_type.replace('_', ' ')} looking for exactly what you offer. \n\n**Would you like me to share your contact details (WhatsApp/Email) with them so you can both connect?**`;
                result.match_found = true;
                result.cofounder = {
                    name: match.name,
                    summary: match.ai_summary || match.experience_summary || "Founding member looking for collaboration."
                };
            } else {
                result.message = `🚀 You’re now in the system, ${result.extracted_data.name}! I’ll instantly match you as soon as someone compatible joins. Keep an eye on your WhatsApp and email for notifications.`;
            }
        }
        
        res.json(result);
    } catch (err) {
        console.error('💬 Chat Error:', err);
        res.status(500).json({ error: err.message });
    }
});

/**
 * ⚡ INSTANT MATCHING ENGINE (MVP)
 */
async function findMatch(user) {
    let targetCategory = '';
    
    if (user.user_type === 'technical_founder') {
        targetCategory = 'non_technical_founder';
    } else if (user.user_type === 'non_technical_founder') {
        targetCategory = 'technical_founder';
    } else if (user.user_type === 'technical_for_technical') {
        targetCategory = 'technical_for_technical';
    }

    if (!targetCategory) return null;

    const { data: matches, error } = await supabase.from('founders_applications')
        .select('*')
        .eq('user_type', targetCategory)
        .eq('status', 'waiting')
        .neq('email', user.email)
        .limit(1);

    if (error || !matches || matches.length === 0) return null;
    return matches[0];
}

/**
 * 🔍 PENDING CO-FOUNDERS DIRECTORY
 */
app.get('/api/founders/pending', async (req, res) => {
    try {
        const { category } = req.query;
        let query = supabase.from('founders_applications')
            .select('id, name, user_type, ai_summary, startup_name, tech_stack, portfolio_link')
            .eq('status', 'waiting')
            .neq('visibility', 'private'); // Only show public profiles

        if (category && category !== 'all') {
            query = query.eq('user_type', category);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * 🔗 MANUAL CONNECTION REQUEST
 */
app.post('/api/founders/connect', async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        // Simple instant-accept for MVP: Mark both as matched
        const { error: updateErr } = await supabase.from('founders_applications')
            .update({ status: 'matched', match_id: receiverId })
            .in('id', [senderId, receiverId]);

        if (updateErr) throw updateErr;

        // Fetch contact details to reveal to sender
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
 * 🔒 DEFINITIVE FINALIZATION & ACTIVATION
 */
app.post('/api/founders/finalize', async (req, res) => {
    const { profile } = req.body;
    try {
        if (!profile || !profile.email) {
            return res.status(400).json({ error: 'Missing profile data (email required).' });
        }

        console.log(`🔒 Finalizing Application for: ${profile.name} (${profile.email})`);

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
                status: 'waiting' // Force waiting status for the directory
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

app.post('/api/founders/validate', async (req, res) => {
    const { data } = req.body;
    console.log('🧐 AI Validating application...');
    const result = await validateApplication(data);
    res.json(result);
});

/**
 * Robust Text Extraction from PDF Buffer
 */
async function extractTextFromPDF(buffer) {
    try {
        console.log(`📄 Scanning PDF Buffer (${buffer.length} bytes)...`);
        
        // Use unique variable to avoid any global or scope collisions
        const parseFunc = (typeof PDF_SCANNER_ENGINE === 'function') ? PDF_SCANNER_ENGINE : 
                          (PDF_SCANNER_ENGINE.PDFParse || PDF_SCANNER_ENGINE.default || PDF_SCANNER_ENGINE.pdf || PDF_SCANNER_ENGINE);
        
        if (typeof parseFunc !== 'function') {
            console.error('❌ PDF Engine Still Failing. Full Info:', {
                type: typeof PDF_SCANNER_ENGINE,
                keys: PDF_SCANNER_ENGINE ? Object.keys(PDF_SCANNER_ENGINE) : 'null'
            });
            throw new Error('PDF Engine initialization failure.');
        }

        const data = await parseFunc(buffer);
        return data.text || '';
    } catch (err) {
        console.error('❌ PDF Engine Error Details:', err);
        throw err;
    }
}

const { analyzeCV, generateMatchReasoning } = require('./groqService');

// Separate endpoint for CV scanning (supports Multipart to bypass JSON length limits)
app.post('/api/founders/cv-scan', upload.single('file'), async (req, res) => {
    try {
        let buffer;
        if (req.file) {
            console.log(`📄 Received file via Multipart: ${req.file.originalname} (${req.file.size} bytes)`);
            buffer = req.file.buffer;
        } else if (req.body.base64) {
            console.log('📄 Parsing Base64 document (legacy fallback)...');
            buffer = Buffer.from(req.body.base64, 'base64');
        } else if (req.body.cvUrl) {
            console.log(`📄 Fetching CV from URL: ${req.body.cvUrl}`);
            const response = await fetch(req.body.cvUrl);
            const arrayBuffer = await response.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        } else {
            return res.status(400).json({ error: 'No document data provided. Please upload a file.' });
        }

        console.log('🔍 Extracting text from PDF...');
        const text = await extractTextFromPDF(buffer);
        console.log(`📖 Text Extracted (${text.length} chars). Sending to AI...`);

        if (text.trim().length === 0) {
            throw new Error('PDF appears to be empty or unscannable (scanned images are not yet supported).');
        }

        const structuredData = await analyzeCV(text);
        console.log('✅ AI Data Extraction Complete');
        res.json(structuredData);
    } catch (err) {
        console.error('❌ CV Scan Error:', err);
        res.status(500).json({ error: err.message || 'Failed to scan document.' });
    }
});

// Refined Matching Logic using the stable 'founders_applications' table
app.post('/api/founders/match', async (req, res) => {
    console.log('🤖 Running Hybrid AI Matching Engine...');
    
    try {
        // 1. Fetch all searching founders and technical candidates
        const { data: founders, error: fError } = await supabase.from('founders_applications')
            .select('*')
            .eq('user_type', 'founder')
            .eq('status', 'searching');

        const { data: talents, error: tError } = await supabase.from('founders_applications')
            .select('*')
            .eq('user_type', 'talent')
            .eq('status', 'searching');
        
        if (fError || tError) throw fError || tError;

        let matchesFound = 0;

        for (const founder of founders) {
            for (const talent of talents) {
                // Skip if already in a match
                if (founder.match_id || talent.match_id) continue;

                // --- HYBRID SCORING ---
                let score = 0;
                
                // Skill Match
                const neededSkills = (founder.tech_stack || '').split(',').map(s => s.trim().toLowerCase());
                const talentSkills = (talent.primary_skillset || '').split(',').map(s => s.trim().toLowerCase());
                const skillMatches = talentSkills.filter(s => neededSkills.includes(s)).length;
                score += skillMatches * 20;

                // Industry Match
                if (founder.ai_industry === talent.startup_preference) score += 20;

                // Experience Match
                if (parseInt(talent.ai_experience || '0') > 60) score += 15;

                // --- AI VERIFICATION (IF SCORE > 50) ---
                if (score >= 50) {
                    const reasoning = await generateMatchReasoning(founder, talent);
                    const matchId = `match-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

                    // Update both records with match info
                    await supabase.from('founders_applications')
                        .update({ match_id: matchId, match_reason: reasoning, status: 'matched' })
                        .eq('id', founder.id);

                    await supabase.from('founders_applications')
                        .update({ match_id: matchId, match_reason: reasoning, status: 'matched' })
                        .eq('id', talent.id);

                    matchesFound++;
                    console.log(`✨ Match Found (${score}%): ${founder.name} & ${talent.name}`);
                    
                    // Optional: Call sendMatchEmails here
                    // await sendMatchEmails(founder, talent, reasoning).catch(console.error);
                }
            }
        }

        res.json({ success: true, matches_found: matchesFound });
    } catch (err) {
        console.error('❌ Matchmaking Error:', err);
        res.status(500).json({ error: err.message });
    }
});

/**
 * Handle Match Consent
 */
app.post('/api/founders/match/consent', async (req, res) => {
    const { matchId, userId, type, consent } = req.body;
    try {
        const updateField = type === 'founder' ? 'founder_consent' : 'technical_consent';
        const { error } = await supabase.from('matchmaking_matches')
            .update({ [updateField]: consent })
            .eq('id', matchId);
            
        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

async function sendMatchEmails(founder, talent, reason) {
    const founderMail = {
        from: `"OOU Future Tech" <${process.env.EMAIL_USER}>`,
        to: founder.email,
        subject: `🔥 Match Found: A Technical Co-founder for ${founder.startup_name}!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px;">
                <h2 style="color: #E63946;">Great News, ${founder.name}!</h2>
                <p>We found a highly compatible technical co-founder for <strong>${founder.startup_name}</strong> using our AI matching engine.</p>
                <div style="background: #f4f4f5; padding: 20px; border: 2px solid #000; border-radius: 15px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Match Profile: ${talent.name}</h3>
                    <p><strong>Primary Skill:</strong> ${talent.primary_skillset}</p>
                    <p><strong>Tech Stack:</strong> ${talent.tech_stack}</p>
                    <p><strong>Why this match:</strong> ${reason}</p>
                    <p><strong>WhatsApp:</strong> <a href="https://wa.me/${talent.whatsapp_number.replace(/\D/g, '')}">${talent.whatsapp_number}</a></p>
                </div>
                <p>Connect and start building!</p>
            </div>
        `
    };

    const talentMail = {
        from: `"OOU Future Tech" <${process.env.EMAIL_USER}>`,
        to: talent.email,
        subject: `🔥 Match Found: A Startup matching your profile!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px;">
                <h2 style="color: #E63946;">Great News, ${talent.name}!</h2>
                <p>Our AI model discovered a startup that aligns perfectly with your skills and interests.</p>
                <div style="background: #f4f4f5; padding: 20px; border: 2px solid #000; border-radius: 15px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Startup: ${founder.startup_name}</h3>
                    <p><strong>Founder:</strong> ${founder.name}</p>
                    <p><strong>Why this match:</strong> ${reason}</p>
                    <p><strong>WhatsApp:</strong> <a href="https://wa.me/${founder.whatsapp_number.replace(/\D/g, '')}">${founder.whatsapp_number}</a></p>
                </div>
                <p>Connect and explore the vision!</p>
            </div>
        `
    };

    try {
        await Promise.all([
            transporter.sendMail(founderMail),
            transporter.sendMail(talentMail)
        ]);
        console.log(`📧 Match emails sent to ${founder.email} and ${talent.email}`);
    } catch (err) {
        console.error('❌ Failed to send match emails:', err);
    }
}

app.patch('/api/toggle-check-in/:ticketId', async (req, res) => {
  const { ticketId } = req.params;
  const decodedTicketId = decodeURIComponent(ticketId);

  try {
    console.log(`📡 Toggling check-in for ${decodedTicketId}...`);

    // 1. Fetch current list
    const settingsRes = await fetch(`${supabaseUrl}/rest/v1/site_settings?key=eq.checked_in_attendees&select=value`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    let checkedInList = [];
    let existingEntry = false;

    if (settingsRes.ok) {
      const settings = await settingsRes.json();
      if (settings && settings.length > 0) {
        existingEntry = true;
        try {
          checkedInList = JSON.parse(settings[0].value);
        } catch (e) {
          console.error('❌ Resetting malformed check-in list');
        }
      }
    }

    // 2. Toggle the ID
    const index = checkedInList.indexOf(decodedTicketId);
    if (index > -1) {
      checkedInList.splice(index, 1);
    } else {
      checkedInList.push(decodedTicketId);
    }

    // 3. Update site_settings (Upsert)
    // We use SERVICE_ROLE_KEY to bypass RLS for updates if available
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;
    
    const updateRes = await fetch(`${supabaseUrl}/rest/v1/site_settings${existingEntry ? '?key=eq.checked_in_attendees' : ''}`, {
      method: existingEntry ? 'PATCH' : 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        key: 'checked_in_attendees',
        value: JSON.stringify(checkedInList),
        updated_at: new Date().toISOString()
      })
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error('❌ Update failed:', errText);
      throw new Error(`Failed to update check-in status: ${updateRes.statusText}`);
    }

    res.json({ success: true, checked_in: index === -1 });
  } catch (error) {
    console.error('Error toggling check-in:', error);
    res.status(500).json({ error: error.message || 'Failed to toggle check-in' });
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
