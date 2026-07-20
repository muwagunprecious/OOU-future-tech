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

// A clean, high-quality, professional minimalist email template (Microsoft/Facebook style)
// Uses light mode, clean sans-serif typography, generous spacing, and a clean primary CTA style.
function getProfessionalTemplate(recipientName) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Update on your Co-Founder Matchmaking status</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #f4f5f6;
                color: #2D3748;
                margin: 0;
                padding: 0;
            }
            .wrapper {
                width: 100%;
                background-color: #f4f5f6;
                padding: 40px 20px;
                box-sizing: border-box;
            }
            .container {
                max-width: 580px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #E2E8F0;
                border-radius: 8px;
                overflow: hidden;
            }
            .content {
                padding: 40px 48px;
            }
            .logo {
                font-size: 16px;
                font-weight: 700;
                color: #000000;
                letter-spacing: -0.5px;
                margin-bottom: 32px;
                text-transform: uppercase;
            }
            h1 {
                font-size: 22px;
                font-weight: 600;
                line-height: 1.3;
                color: #1A202C;
                margin-top: 0;
                margin-bottom: 20px;
                letter-spacing: -0.3px;
            }
            p {
                font-size: 15px;
                line-height: 1.6;
                color: #4A5568;
                margin-top: 0;
                margin-bottom: 24px;
            }
            .button-container {
                margin: 32px 0;
            }
            .btn {
                display: inline-block;
                background-color: #000000;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 24px;
                font-weight: 500;
                border-radius: 4px;
                font-size: 14px;
                text-align: center;
            }
            .divider {
                height: 1px;
                background-color: #E2E8F0;
                margin: 32px 0;
            }
            .footer-text {
                font-size: 12px;
                line-height: 1.5;
                color: #A0AEC0;
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="content">
                    <div class="logo">Future Tech Club</div>
                    <h1>Update on your Co-Founder Matchmaking status</h1>
                    <p>Hi ${recipientName},</p>
                    <p>
                        We are reaching out to sincerely apologize for the delay in finding your co-founder match. We experienced temporary system downtime that paused our matchmaking pipelines.
                    </p>
                    <p>
                        The Co-Founder Matchmaker is now fully restored and back online. Our platform is actively indexing new developers, designers, and builders.
                    </p>
                    <p><strong>Are you still looking for a co-founder?</strong></p>
                    <p>
                        If yes, please reply directly to this email to confirm you want to remain in the active matchmaking pool. Once you confirm, we will prioritize pairing your startup profile with our technical candidates.
                    </p>
                    
                    <div class="button-container">
                        <a href="mailto:${env.EMAIL_USER}?subject=Re:%20Confirming%20my%20Matchmaking%20Status&body=Hi%20Future%20Tech%20Team,%20Yes,%20I%20would%20like%20to%20remain%20active%20in%20the%20co-founder%20matchmaking%20pool." class="btn">Confirm Status</a>
                    </div>
                    
                    <p>Thank you for your patience and partnership.</p>
                    <p>Best regards,<br>The Future Tech Team</p>
                    
                    <div class="divider"></div>
                    
                    <p class="footer-text">
                        This email was sent to you because you registered with the Co-Founder Matchmaker directory at OOU Future Tech Club.<br>
                        &copy; 2026 Future Tech Club. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
}

async function sendBulkReminders() {
    console.log('📡 Fetching unmatched non-technical founders...');
    
    // Fetch all waiting non-technical founders (exclude Isaac who was just matched)
    const { data: users, error } = await supabase
        .from('founders_applications')
        .select('*')
        .eq('status', 'waiting')
        .or('user_type.eq.non_technical_founder,user_type.eq.Founder,user_type.eq.founder')
        .neq('email', 'isaacayomideone@gmail.com');

    if (error) {
        console.error('Error fetching users:', error.message);
        return;
    }

    if (!users || users.length === 0) {
        console.log('No unmatched non-technical founders found.');
        return;
    }

    console.log(`✉️ Found ${users.length} active unmatched non-tech founders.`);

    for (const user of users) {
        if (!user.email) {
            console.log(`⚠️ Skipping user ${user.name || 'Anonymous'} - missing email.`);
            continue;
        }

        const mailOptions = {
            from: `"Future Tech Club" <${env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Important update on your co-founder matchmaking profile',
            html: getProfessionalTemplate(user.name || 'Founder')
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Professional update email sent to ${user.name} (${user.email})`);
        } catch (sendErr) {
            console.error(`❌ Failed sending email to ${user.email}:`, sendErr.message);
        }
    }

    console.log('🏁 Bulk email process completed.');
}

sendBulkReminders();
