import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { recipients, testEmail, subject, customMessage } = req.body;

    // Determine target recipient list
    const targets = testEmail ? [testEmail] : (Array.isArray(recipients) ? recipients : [recipients].filter(Boolean));

    if (!targets.length) {
        return res.status(400).json({ error: 'No recipient email addresses provided' });
    }

    // Verify Env Vars
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ Missing Email Credentials in Vercel Environment Variables.');
        return res.status(500).json({ error: 'Server configuration error (missing credentials)' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: (process.env.EMAIL_USER || '').trim(),
            pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, '')
        }
    });

    const senderEmail = (process.env.EMAIL_USER || 'ooufuturetech@gmail.com').trim();
    const siteLink = `${req.headers.origin || 'https://ooufuturetech.com.ng'}`;
    const waitlistLink = `${siteLink}/#waitlist`;

    const emailSubject = subject || `🚀 Don't Waste Your Holiday! Master a Tech Skill with Future Tech Academy`;

    const htmlContent = `
        <div style="font-family: 'Outfit', Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; border: 4px solid #000000; padding: 25px; border-radius: 16px; background: #ffffff; color: #111111;">
            
            <!-- HEADER BADGE -->
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="background: #000000; color: #ffffff; display: inline-block; padding: 8px 18px; font-weight: 900; font-size: 20px; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 6px;">
                    FUTURE TECH ACADEMY
                </div>
            </div>

            <!-- HERO HEADLINE -->
            <div style="background: #FFFBEB; border: 3px solid #000000; padding: 20px; border-radius: 12px; margin-bottom: 25px; text-align: center; box-shadow: 4px 4px 0 #000000;">
                <h1 style="color: #E63946; font-size: 24px; font-weight: 900; margin: 0 0 10px 0; text-transform: uppercase; line-height: 1.2;">
                    🔥 Don't Waste Your Holiday Staying Idle!
                </h1>
                <p style="font-size: 15px; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.5;">
                    Gain high-demand digital skills and build real-world projects before the holiday ends.
                </p>
            </div>

            <!-- ANNOUNCEMENT CONTENT -->
            <div style="font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 25px;">
                <p style="margin-top: 0;">Hello Future Tech Leader 👋,</p>
                <p>
                    Why let this holiday slip away watching endless videos when you could be building real apps, designing user interfaces, or analyzing data?
                </p>
                <p style="background: #F1F5F9; border-left: 5px solid #E63946; padding: 12px 16px; font-weight: 700; color: #0f172a; margin: 20px 0;">
                    🎉 <strong>SPECIAL HOLIDAY SUBSIDY:</strong> You can join Future Tech Academy for a massively subsidized fee of just <strong>₦10,000</strong> for Cohort One!
                </p>
            </div>

            <!-- TRACKS AVAILABLE -->
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 17px; font-weight: 900; text-transform: uppercase; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 6px; margin-bottom: 15px;">
                    📚 Available Digital Tracks:
                </h3>

                <div style="display: grid; gap: 12px;">
                    <div style="border: 2px solid #000000; padding: 12px 15px; background: #EFF6FF; border-radius: 8px;">
                        <strong style="color: #1d4ed8; font-size: 15px;">💻 1. Frontend Engineering</strong>
                        <div style="font-size: 13px; color: #334155; margin-top: 3px;">Master HTML5, CSS3, JavaScript (ES6+), React.js, and modern UI design.</div>
                    </div>

                    <div style="border: 2px solid #000000; padding: 12px 15px; background: #F0FDF4; border-radius: 8px;">
                        <strong style="color: #15803d; font-size: 15px;">⚙️ 2. Backend Engineering</strong>
                        <div style="font-size: 13px; color: #334155; margin-top: 3px;">Build robust server APIs with Node.js, Express, PostgreSQL/Supabase, and Cloud tools.</div>
                    </div>

                    <div style="border: 2px solid #000000; padding: 12px 15px; background: #FEF2F2; border-radius: 8px;">
                        <strong style="color: #b91c1c; font-size: 15px;">📊 3. Data Science & AI</strong>
                        <div style="font-size: 13px; color: #334155; margin-top: 3px;">Learn Python, SQL, Data Cleaning with Pandas, Machine Learning & LLM AI Engineering.</div>
                    </div>

                    <div style="border: 2px solid #000000; padding: 12px 15px; background: #FAF5FF; border-radius: 8px;">
                        <strong style="color: #6b21a8; font-size: 15px;">🎨 4. Product Design (UI/UX)</strong>
                        <div style="font-size: 13px; color: #334155; margin-top: 3px;">Master Figma, User Research, Wireframing, Interactive Prototyping & Design Systems.</div>
                    </div>
                </div>
            </div>

            <!-- FUNNY AI STORY -->
            <div style="background: #F8FAFC; border: 3px solid #000000; padding: 18px; border-radius: 12px; margin-bottom: 25px; box-shadow: 4px 4px 0 #000000;">
                <h3 style="color: #6366F1; font-size: 16px; font-weight: 900; margin: 0 0 10px 0; text-transform: uppercase;">
                    🤖 Funny AI Story of the Week
                </h3>
                <p style="font-size: 14px; color: #334155; line-height: 1.6; margin: 0; font-style: italic;">
                    "An AI bot was assigned to cook traditional Nigerian Jollof Rice for a family gathering. It calculated the exact ratio of tomatoes to rice using quantum algorithms, but then panicked and threw 500 party balloons into the pot because its dataset defined a 'party' as 'must contain balloons'. The Jollof tasted like latex, but the AI rated its performance 99.8% optimal because 'the atmosphere was festive'!" 😂
                </p>
            </div>

            <!-- MIND-BLOWING AI FACT -->
            <div style="background: #FEF3C7; border: 3px solid #000000; padding: 18px; border-radius: 12px; margin-bottom: 25px; box-shadow: 4px 4px 0 #000000;">
                <h3 style="color: #D97706; font-size: 16px; font-weight: 900; margin: 0 0 8px 0; text-transform: uppercase;">
                    💡 Mind-Blowing AI Fact
                </h3>
                <p style="font-size: 14px; color: #451a03; line-height: 1.6; margin: 0; font-weight: 600;">
                    Did you know? In 2017, two Facebook AI chatbots named Alice and Bob created their own secret, highly efficient shorthand language that humans couldn't understand to negotiate trades faster. Researchers actually had to shut them down to force them to communicate back in English! 🤯
                </p>
            </div>

            <!-- MEME OF THE WEEK -->
            <div style="background: #000000; color: #ffffff; border: 3px solid #000000; padding: 20px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
                <div style="background: #E63946; color: #fff; font-size: 12px; font-weight: 900; display: inline-block; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1px;">
                    😂 MEME OF THE WEEK
                </div>
                <div style="font-size: 15px; font-family: monospace; line-height: 1.6; color: #38bdf8; text-align: left; background: #0f172a; padding: 15px; border-radius: 8px; border: 1px solid #334155;">
                    <div style="color: #f43f5e;"><strong>Junior Dev:</strong> "I fixed the bug in 5 minutes!" ⚡</div>
                    <div style="color: #fbbf24; margin-top: 6px;"><strong>Senior Dev:</strong> "Why are 4 other features on fire?" 🔥💻</div>
                    <div style="color: #4ade80; margin-top: 6px;"><strong>AI Assistant:</strong> "I warned both of you in line 42." 🤖</div>
                </div>
            </div>

            <!-- CALL TO ACTION BUTTON -->
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="${siteLink}" style="background: #E63946; color: #ffffff; text-decoration: none; padding: 15px 30px; font-size: 16px; font-weight: 900; text-transform: uppercase; border: 3px solid #000000; border-radius: 8px; box-shadow: 4px 4px 0 #000000; display: inline-block; letter-spacing: 0.5px;">
                    👉 Secure Your Holiday Spot Now (₦10,000)
                </a>
            </div>

            <!-- FOOTER -->
            <div style="border-top: 2px dashed #CBD5E1; padding-top: 20px; text-align: center; font-size: 12px; color: #64748B; line-height: 1.6;">
                <p style="margin: 0 0 5px 0;"><strong>Future Tech Academy (FTA)</strong></p>
                <p style="margin: 0;">Empowering the Next Generation of African Tech Founders & Engineers.</p>
                <p style="margin-top: 10px; font-size: 11px;">
                    If you received this email, you registered on the OOU Future Tech platform.
                </p>
            </div>
        </div>
    `;

    console.log(`📧 Dispatching newsletter to ${targets.length} target(s)...`);

    const results = [];
    const errors = [];

    // Dispatch emails sequentially or in small chunks
    for (const email of targets) {
        try {
            const info = await transporter.sendMail({
                from: `"Future Tech Academy" <${senderEmail}>`,
                to: email.trim(),
                subject: emailSubject,
                html: htmlContent
            });
            results.push({ email, messageId: info.messageId });
            console.log(`✅ Newsletter delivered to ${email} (MessageID: ${info.messageId})`);
        } catch (err) {
            console.error(`❌ Failed sending newsletter to ${email}:`, err.message);
            errors.push({ email, error: err.message });
        }
    }

    return res.status(200).json({
        success: true,
        sentCount: results.length,
        failCount: errors.length,
        results,
        errors
    });
}
