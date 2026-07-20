const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Parse .env manual script
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2 && !parts[0].trim().startsWith('#')) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
});

function getHtmlTemplate(recipientName, partnerName, partnerEmail, partnerWhatsApp, partnerType, partnerSummary, partnerIdea) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Co-Founder Match confirmed!</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                background-color: #050505;
                color: #ffffff;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
            }
            .wrapper {
                width: 100%;
                background-color: #050505;
                padding: 40px 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #0b0b0b;
                border: 1px solid #1a1a1a;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
            }
            .header {
                background: linear-gradient(135deg, #E63946 0%, #9b1c26 100%);
                padding: 35px 40px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                color: #ffffff;
                font-size: 26px;
                font-weight: 800;
                letter-spacing: 1px;
                text-transform: uppercase;
            }
            .content {
                padding: 40px;
            }
            .greeting {
                font-size: 18px;
                font-weight: 600;
                margin-top: 0;
                margin-bottom: 20px;
                color: #ffffff;
            }
            .lead-text {
                font-size: 15px;
                line-height: 1.6;
                color: #b0b0b0;
                margin-bottom: 30px;
            }
            .profile-card {
                background-color: #121212;
                border: 1px solid #222222;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 30px;
            }
            .profile-title {
                font-size: 14px;
                text-transform: uppercase;
                color: #E63946;
                font-weight: 700;
                letter-spacing: 1.5px;
                margin-bottom: 15px;
                margin-top: 0;
            }
            .profile-detail {
                margin-bottom: 12px;
                font-size: 15px;
            }
            .profile-detail:last-child {
                margin-bottom: 0;
            }
            .label {
                font-weight: 600;
                color: #888888;
                display: inline-block;
                width: 120px;
            }
            .value {
                color: #ffffff;
            }
            .cta-box {
                text-align: center;
                background: rgba(230, 57, 70, 0.05);
                border: 1px dashed rgba(230, 57, 70, 0.3);
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 30px;
            }
            .cta-button {
                display: inline-block;
                background-color: #E63946;
                color: #ffffff !important;
                text-decoration: none;
                padding: 14px 35px;
                font-weight: 700;
                border-radius: 10px;
                font-size: 15px;
                transition: background-color 0.3s ease;
                box-shadow: 0 4px 15px rgba(230, 57, 70, 0.4);
            }
            .footer {
                text-align: center;
                padding: 30px 40px;
                border-top: 1px solid #1a1a1a;
                background-color: #080808;
            }
            .footer p {
                margin: 0;
                font-size: 13px;
                color: #666666;
                line-height: 1.5;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h1>Match Confirmed! 🎉</h1>
                </div>
                <div class="content">
                    <p class="greeting">Hi ${recipientName},</p>
                    <p class="lead-text">
                        Congratulations! We have successfully sealed your co-founder connection. Below is a quick overview of your partner and their contact details so you can start collaborating immediately.
                    </p>
                    
                    <div class="profile-card">
                        <h2 class="profile-title">Co-Founder Profile</h2>
                        <div class="profile-detail">
                            <span class="label">👤 Name:</span>
                            <span class="value">${partnerName}</span>
                        </div>
                        <div class="profile-detail">
                            <span class="label">🏷️ Role:</span>
                            <span class="value">${partnerType === 'technical_founder' ? 'Technical Founder' : 'Non-Technical Founder'}</span>
                        </div>
                        <div class="profile-detail">
                            <span class="label">💡 Startup / Idea:</span>
                            <span class="value">${partnerIdea || 'N/A'}</span>
                        </div>
                        <div class="profile-detail">
                            <span class="label">📝 Bio/Summary:</span>
                            <span class="value">${partnerSummary || 'N/A'}</span>
                        </div>
                    </div>

                    <div class="cta-box">
                        <p style="margin-top:0; font-size:16px; font-weight:700; color:#ffffff; margin-bottom:15px;">💬 Direct Contact Channels</p>
                        <p style="color:#b0b0b0; font-size:14px; margin-bottom:20px; line-height:1.5;">
                            We highly recommend reaching out directly to schedule a virtual call or grab a coffee.
                        </p>
                        <div style="margin-bottom: 20px;">
                            <div style="font-size: 15px; margin-bottom: 8px;">📧 <strong>Email:</strong> <a href="mailto:${partnerEmail}" style="color: #E63946; text-decoration: none;">${partnerEmail}</a></div>
                            <div style="font-size: 15px;">📱 <strong>WhatsApp:</strong> <a href="https://wa.me/${partnerWhatsApp.replace(/[^0-9]/g, '')}" style="color: #E63946; text-decoration: none;">${partnerWhatsApp}</a></div>
                        </div>
                        <a href="https://wa.me/${partnerWhatsApp.replace(/[^0-9]/g, '')}" class="cta-button">Say Hello on WhatsApp</a>
                    </div>
                    
                    <p class="lead-text" style="margin-bottom:0;">
                        Wishing you both ultimate success as you build something amazing together! Let us know how the journey unfolds.
                    </p>
                </div>
                <div class="footer">
                    <p>OOU Future Tech Co-Founder Matchmaker Platform</p>
                    <p style="margin-top: 5px;">&copy; 2026 Future Tech Club. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}

async function performManualMatch() {
    console.log('🔗 Querying profiles...');
    
    // 1. Get Isaac
    const { data: isaac, error: isaacErr } = await supabase
        .from('founders_applications')
        .select('*')
        .eq('email', 'isaacayomideone@gmail.com')
        .single();
    
    if (isaacErr) {
        console.error('Isaac fetch error:', isaacErr.message);
        return;
    }

    // 2. Get technical founders (We have two, but let's match with both or pick one? The prompt says "the only technical founder we have". We have Tijani Victor Habeeb and TELUFUSI FAWAZ FOLAKOLA. Let's match with Tijani Victor Habeeb first or both? The prompt mentions: "match make this person and the with the only technical founder we have" - meaning Tijani or Fawaz. Let's pair with Tijani Victor Habeeb!)
    const { data: tech, error: techErr } = await supabase
        .from('founders_applications')
        .select('*')
        .eq('email', 'habeebtijanivictor@gmail.com')
        .single();

    if (techErr) {
        console.error('Technical founder fetch error:', techErr.message);
        return;
    }

    console.log(`Matching: ${isaac.name} (${isaac.email}) <==> ${tech.name} (${tech.email})`);

    // Update status to matched & store match_id
    const { error: updateIsaac } = await supabase
        .from('founders_applications')
        .update({ status: 'matched', match_id: tech.id })
        .eq('id', isaac.id);

    const { error: updateTech } = await supabase
        .from('founders_applications')
        .update({ status: 'matched', match_id: isaac.id })
        .eq('id', tech.id);

    if (updateIsaac || updateTech) {
        console.error('Error updating matching status in Supabase:', updateIsaac || updateTech);
        return;
    }
    
    console.log('✅ DB updated successfully. Sending premium emails...');

    // Send Isaac email about Tijani
    const mailToIsaac = {
        from: `"Future Tech Matchmaker" <${env.EMAIL_USER}>`,
        to: isaac.email,
        subject: '🚀 Co-Founder Match Confirmed! (StudyRx & Marketplace Ecosystem)',
        html: getHtmlTemplate(
            isaac.name,
            tech.name,
            tech.email,
            tech.whatsapp_number || '08069343332',
            tech.user_type,
            tech.ai_summary,
            'String, a hyper-local, AI-augmented marketplace ecosystem'
        )
    };

    // Send Tijani email about Isaac
    const mailToTech = {
        from: `"Future Tech Matchmaker" <${env.EMAIL_USER}>`,
        to: tech.email,
        subject: '🚀 Co-Founder Match Confirmed! (Marketplace Ecosystem & StudyRx)',
        html: getHtmlTemplate(
            tech.name,
            isaac.name,
            isaac.email,
            isaac.whatsapp_number || '08108904399',
            isaac.user_type,
            isaac.ai_summary,
            'StudyRx — An educational platform specifically designed for pharmacy students'
        )
    };

    try {
        await transporter.sendMail(mailToIsaac);
        console.log(`✉️ Match confirmation email sent to Isaac (${isaac.email})`);
        
        await transporter.sendMail(mailToTech);
        console.log(`✉️ Match confirmation email sent to Tijani (${tech.email})`);
        
        console.log('\n🎉 MATCHMAKING PROCESS COMPLETED SUCCESSFULLY!');
    } catch (mailErr) {
        console.error('❌ Failed to send emails:', mailErr);
    }
}

performManualMatch();
