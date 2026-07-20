const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Manual .env parser
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2 && !parts[0].trim().startsWith('#')) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
});

const brainDir = 'C:/Users/TINGO-AI-010/.gemini/antigravity/brain/1a32dac7-117a-4c01-a50d-19ee27c66cda';

const attachments = [
    { filename: 'hero_banner.png', path: path.join(brainDir, 'hero_banner_rbw_1784287109446.png'), cid: 'hero_banner' },
    { filename: 'opening_intro.png', path: path.join(brainDir, 'opening_intro_rbw_1784287151117.png'), cid: 'opening_intro' },
    { filename: 'this_week_in_tech.png', path: path.join(brainDir, 'this_week_in_tech_rbw_1784287210283.png'), cid: 'this_week_in_tech' },
    { filename: 'gizmo_mockup.png', path: path.join(brainDir, 'gizmo_mockup_rbw_1784287251827.png'), cid: 'gizmo_mockup' },
    { filename: 'career_roadmap.png', path: path.join(brainDir, 'career_roadmap_rbw_1784287284449.png'), cid: 'career_roadmap' },
    { filename: 'african_founder.png', path: path.join(brainDir, 'african_founder_rbw_1784287352755.png'), cid: 'african_founder' },
    { filename: 'student_spotlight.png', path: path.join(brainDir, 'student_spotlight_rbw_1784287391750.png'), cid: 'student_spotlight' },
    { filename: 'mind_matters.png', path: path.join(brainDir, 'mind_matters_rbw_1784287434267.png'), cid: 'mind_matters' },
    { filename: 'build_challenge.png', path: path.join(brainDir, 'build_challenge_rbw_1784287461165.png'), cid: 'build_challenge' },
    { filename: 'meme_of_the_week.png', path: path.join(brainDir, 'meme_of_the_week_rbw_1784287490407.png'), cid: 'meme_of_the_week' }
];

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Future Byte Daily</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            color: #111827;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .view-browser {
            text-align: center;
            font-size: 11px;
            color: #6b7280;
            padding: 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .view-browser a {
            color: #6b7280;
            text-decoration: underline;
        }
        .container {
            max-width: 600px;
            margin: 0 auto 40px auto;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .logo-badge {
            margin-bottom: 24px;
            text-align: left;
        }
        .logo-box {
            display: inline-block;
            background-color: #000000;
            padding: 6px 10px;
            border-radius: 4px;
        }
        .logo-box span {
            color: #ffffff;
            font-weight: 700;
            font-size: 13px;
            letter-spacing: 0.5px;
        }
        .banner-img {
            max-width: 480px;
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
        }
        .lang-switcher {
            background-color: #fafafa;
            border: 1px solid #f3f4f6;
            padding: 10px 14px;
            font-size: 12px;
            margin: 24px 0 32px 0;
            border-radius: 4px;
        }
        .lang-left {
            float: left;
        }
        .lang-right {
            float: right;
            direction: rtl;
        }
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }
        .divider {
            height: 1px;
            background-color: #f3f4f6;
            margin: 32px 0;
        }
        .category-tag {
            font-size: 11px;
            text-transform: uppercase;
            color: #e11d48; /* Red accent */
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        h2 {
            font-size: 20px;
            font-weight: 700;
            line-height: 1.3;
            color: #000000;
            margin-top: 0;
            margin-bottom: 16px;
            letter-spacing: -0.3px;
        }
        .article-img {
            max-width: 440px;
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto 8px auto;
            border-radius: 4px;
            border: 1px solid #f3f4f6;
        }
        .image-caption {
            font-size: 11px;
            color: #6b7280;
            line-height: 1.4;
            margin-bottom: 20px;
            text-align: center;
        }
        p {
            font-size: 14px;
            line-height: 1.6;
            color: #374151;
            margin-top: 0;
            margin-bottom: 16px;
        }
        p a {
            color: #e11d48; /* Red accent */
            text-decoration: underline;
            font-weight: 500;
        }
        .btn-black {
            display: inline-block;
            background-color: #000000;
            color: #ffffff !important;
            text-decoration: none;
            padding: 10px 20px;
            font-weight: 600;
            border-radius: 4px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 8px 0;
            border: none;
        }
        .list-check {
            list-style: none;
            padding-left: 0;
            margin: 16px 0;
        }
        .list-check li {
            font-size: 13.5px;
            color: #4b5563;
            margin-bottom: 6px;
            padding-left: 18px;
            position: relative;
        }
        .list-check li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #e11d48;
            font-weight: bold;
        }
        .roadmap-list {
            background-color: #fafafa;
            border: 1px solid #f3f4f6;
            border-radius: 4px;
            padding: 16px 20px;
            margin: 16px 0;
        }
        .roadmap-item {
            font-size: 13px;
            color: #374151;
            margin-bottom: 6px;
        }
        .roadmap-item:last-child {
            margin-bottom: 0;
        }
        .footer {
            border-top: 1px solid #f3f4f6;
            padding-top: 32px;
            margin-top: 40px;
            text-align: center;
        }
        .footer h3 {
            font-size: 16px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 8px;
            color: #000000;
        }
        .footer-links {
            margin: 16px 0;
        }
        .footer-links a {
            font-size: 11px;
            color: #6b7280;
            text-decoration: none;
            margin: 0 8px;
        }
    </style>
</head>
<body>
    <div class="view-browser">
        Can't see this email? <a href="#">View in browser</a>
    </div>

    <div class="container">
        <!-- Badge -->
        <div class="logo-badge">
            <div class="logo-box">
                <span>FB</span>
            </div>
        </div>
        <!-- HEADER -->
        <div style="margin-top: 15px; margin-bottom: 10px;">
            <img src="cid:hero_banner" alt="Future Byte Banner" class="banner-img" style="border-radius: 4px;">
        </div>

        <!-- Language switcher -->
        <div class="lang-switcher clearfix">
            <div class="lang-left">
                <a href="#" style="color:#000000; text-decoration:none; font-weight:700;">Lire en Français</a>
            </div>
            <div class="lang-right">
                <a href="#" style="color:#000000; text-decoration:none; font-weight:700;">اقرأ هذا باللغة العربية</a>
            </div>
        </div>

        <!-- Opening Section -->
        <div class="category-tag">INTRODUCTION</div>
        <h2>The Future Won't Wait. Neither Should You.</h2>
        <img src="cid:opening_intro" alt="Students in Hub" class="article-img">
        <div class="image-caption">OFTC Campus Hub, Sagamu. Image Source: Future Tech Hub Archive.</div>
        
        <p>
            As the digital landscape rapidly shifts across regional nodes, OOU Future Tech Club continues to drive access to high-value frameworks, tools, and developer opportunities. This week, we examine the practical implications of decentralized computing, present direct roadmaps for prospective AI engineers, and share mental fitness routines to counter early career burnout.
        </p>

        <div class="divider"></div>

        <!-- SECTION 1: This Week in Tech -->
        <div class="category-tag">AFRICAN TECH</div>
        <h2>The Rise of Decentralized Campus AI Foundries</h2>
        <img src="cid:this_week_in_tech" alt="AI in Africa" class="article-img">
        <div class="image-caption">Conceptualizing decentralized node networks. Image Source: AI Foundry Network.</div>

        <p>
            What started as a question about whether localized hardware setups could support heavy neural workloads has quickly evolved into <a href="#">a decentralized developer movement</a> across South-West Nigeria. 
        </p>
        <p>
            <strong>What's the backstory?</strong> To handle large language tasks, developers traditionally relied on expensive global API frameworks. However, local campus builders are setting up custom edge-nodes to train smaller, targeted micro-models tailored specifically for local commerce, fintech systems, and educational networks.
        </p>

        <div class="divider"></div>

        <!-- SECTION 2: AI Tool -->
        <div class="category-tag">PRODUCTIVITY TOOL</div>
        <h2>AI Tool of the Week: Gizmo</h2>
        <img src="cid:gizmo_mockup" alt="Gizmo Mockup" class="article-img">
        <div class="image-caption">Gizmo IDE in dark mode mockups. Image Source: Gizmo Dev Team.</div>

        <p>
            <strong>What is it?</strong> Gizmo is a modern coding companion built specifically for students. It simplifies setting up local workspaces, parsing layout errors, and generating clean documentation.
        </p>
        <p>
            <strong>Why students love it:</strong> Unlike heavy IDE extensions, Gizmo runs smoothly on legacy hardware and provides offline support for basic syntax queries. Rating: 5/5 stars.
        </p>
        <a href="#" class="btn-black">Try Gizmo</a>

        <div class="divider"></div>

        <!-- SECTION 3: Career Path -->
        <div class="category-tag">CAREER PATHWAY</div>
        <h2>Path to Becoming an Artificial Intelligence Engineer</h2>
        <img src="cid:career_roadmap" alt="Roadmap" class="article-img">
        <div class="image-caption">The visual progression of AI engineering capabilities. Image Source: OFTC Roadmap.</div>

        <p>
            AI Engineering has quickly become one of the most high-demand career tracks globally. Here is the direct milestone timeline to help you navigate from zero to job-ready:
        </p>

        <div class="roadmap-list">
            <div class="roadmap-item"><strong>Step 1:</strong> Python Programming & Logic</div>
            <div class="roadmap-item"><strong>Step 2:</strong> Data Structures & Basic Algorithms</div>
            <div class="roadmap-item"><strong>Step 3:</strong> Math Fundamentals (Linear Algebra & Calculus)</div>
            <div class="roadmap-item"><strong>Step 4:</strong> Core Machine Learning Libraries (Scikit-Learn)</div>
            <div class="roadmap-item"><strong>Step 5:</strong> Deep Learning Frameworks (PyTorch / TensorFlow)</div>
            <div class="roadmap-item"><strong>Step 6:</strong> Independent Projects & GitHub Portfolio</div>
            <div class="roadmap-item"><strong>Step 7:</strong> Internships & Junior AI roles</div>
        </div>

        <p>
            <strong>The economic outlook:</strong> Standard entry-level remote positions for AI Engineers begin around <strong>$85,000/year</strong> internationally, with competitive local offers starting from <strong>₦1.2M/month</strong>.
        </p>
        
        <p><strong>Join Future Tech Learning Platform for access to:</strong></p>
        <ul class="list-check">
            <li>Complete Roadmaps & Free Courses</li>
            <li>Curated Projects & Certifications</li>
            <li>Direct Internship Alerts</li>
            <li>Mentorship Community</li>
        </ul>
        <a href="#" class="btn-black">JOIN THE WAITLIST</a>

        <div class="divider"></div>

        <!-- SECTION 4: Entrepreneur -->
        <div class="category-tag">ENTREPRENEUR SPOTLIGHT</div>
        <h2>Building Campus-Scale Logistics Systems</h2>
        <img src="cid:african_founder" alt="Founder Portrait" class="article-img">
        <div class="image-caption">Ademuwagun Precious, founder of OFTC Hub. Image Source: TechCabal Daily.</div>

        <p>
            <strong>The backstory:</strong> Ademuwagun Precious launched a localized campus logistics network to streamline deliveries for student vendors. Today, the platform operates at a $1.2M Annual Run Rate.
        </p>
        <p>
            <strong>Key Lesson:</strong> "Focus on the local audience first. If your campus directory doesn't work, don't rush to scale to the national market."
        </p>

        <div class="divider"></div>

        <!-- SECTION 5: Student Spotlight -->
        <div class="category-tag">STUDENT SPOTLIGHT</div>
        <h2>Pharmacy Education Reimagined: StudyRx</h2>
        <img src="cid:student_spotlight" alt="Student Spotlight" class="article-img">
        <div class="image-caption">Isaac Ayomide Esther, developer of StudyRx. Image Source: Student Innovation Directory.</div>

        <p>
            <strong>The Project:</strong> StudyRx is a web application designed to host and optimize study resources for pharmacy students. Developed by Isaac Ayomide Esther using React, TailwindCSS, and Supabase, it has served over 300+ students in its initial fortnight.
        </p>
        <a href="#" class="btn-black">Submit Your Project</a>

        <div class="divider"></div>

        <!-- SECTION 6: Mind Matters -->
        <div class="category-tag">MIND MATTERS</div>
        <h2>Managing Academic Pressure and Burnout</h2>
        <img src="cid:mind_matters" alt="Hope illustration" class="article-img">
        <div class="image-caption">Finding balance amid campus pressures. Image Source: OFTC Wellness.</div>

        <p>
            Balancing intense technology tracks with academic standards can trigger substantial stress. Many student builders—especially young women navigating complex parental expectations—frequently struggle silently with pressure.
        </p>
        <p>
            <strong>How to take care of yourself:</strong> Reach out to trusted peers, prioritize consistent sleep schedules, and do not hesitate to contact on-campus student counseling support. 
        </p>
        <p style="font-style:italic; font-weight:700; text-align:center; color:#666666; margin: 25px 0;">
            "You are stronger than this moment. Your story is still being written."
        </p>

        <div class="divider"></div>

        <!-- SECTION 7: Weekend Challenge -->
        <div class="category-tag">WEEKEND BUILD</div>
        <h2>Build a Minimal Developer Portfolio Website</h2>
        <img src="cid:build_challenge" alt="Coding Challenge" class="article-img">
        <p>
            <strong>The challenge:</strong> Design a single-page responsive portfolio detailing your active tech stacks and projects. Host it on GitHub Pages or Vercel. 
        </p>

        <div class="divider"></div>

        <!-- SECTION 8: Opportunity Radar -->
        <div class="category-tag">OPPORTUNITY RADAR</div>
        <p>
            • <strong>🏆 Future Tech Campus Hackathon:</strong> ₦500,000 in cash prizes. Registrations close on July 25th.<br>
            • <strong>💼 Junior AI Engineer (Remote):</strong> Stripe Africa Initiatives. Python/PyTorch focus.
        </p>

        <div class="divider"></div>

        <!-- SECTION 9: Meme -->
        <div class="category-tag">MEME OF THE WEEK</div>
        <img src="cid:meme_of_the_week" alt="Developer Meme" class="article-img" style="max-width:400px; margin: 0 auto; display:block;">

        <div class="divider"></div>

        <!-- SECTION 10: Quote -->
        <div class="category-tag">QUOTE OF THE WEEK</div>
        <p style="font-size: 18px; font-weight: 700; color: #000000; text-align: center; margin: 30px 0; line-height: 1.4;">
            "The best way to predict the future is to create it." <br>
            <span style="font-size: 12px; color:#888888; text-transform:uppercase; letter-spacing:1px; display:block; margin-top:10px;">— Peter Drucker</span>
        </p>

        <!-- FOOTER -->
        <div class="footer">
            <h3>Ready to Build the Future?</h3>
            <p style="font-size:14px; color:#666666; margin-bottom: 25px;">Join the next generation of African tech innovators.</p>
            
            <a href="#" class="btn-black" style="margin-bottom:20px;">Join Waitlist</a>

            <div class="footer-links">
                <a href="#">Visit OFTC</a> | 
                <a href="#">Newsletter Archive</a> | 
                <a href="#">Privacy Policy</a>
            </div>
            
            <p style="font-size: 11px; color: #888888; margin-top: 20px; line-height: 1.5;">
                Published with ❤️ by OOU Future Tech Conference.<br>
                &copy; 2026 Future Tech Club. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`;

async function sendNewsletter() {
    console.log('Sending premium TC Daily style newsletter...');
    try {
        const mailOptions = {
            from: `"Future Byte" <${env.EMAIL_USER}>`,
            to: 'ademuwagunremi60@gmail.com',
            subject: 'Future Byte Daily: The Future, One Byte at a Time 🌍',
            html: htmlContent,
            attachments: attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Premium TC Daily Newsletter sent successfully: ' + info.messageId);
    } catch (err) {
        console.error('❌ Failed to send newsletter email:', err.message);
    }
}

sendNewsletter();
