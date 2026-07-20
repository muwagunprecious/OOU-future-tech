const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/TINGO-AI-010/.gemini/antigravity/brain/1a32dac7-117a-4c01-a50d-19ee27c66cda';

const transporter = nodemailer.createTransport({
    host: 'mail.gocycle.africa',
    port: 465,
    secure: true,
    auth: {
        user: 'oftc@gocycle.africa',
        pass: 'oftc@@OOU'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const attachments = [
    { filename: 'samuel_photo.jpg', path: path.join(brainDir, 'media__1784393033396.jpg'), cid: 'samuel_photo' },
    { filename: 'byte_banter_flyer.jpg', path: path.join(brainDir, 'media__1784393033409.jpg'), cid: 'byte_banter_flyer' },
    { filename: 'meme_of_the_week.png', path: path.join(brainDir, 'meme_of_the_week_rbw_1784287490407.png'), cid: 'meme_of_the_week' }
];

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OOU FutureTech Newsletter - The AI Edition</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; color: #111827; margin: 0; padding: 20px 10px; -webkit-font-smoothing: antialiased;">
    <div style="max-width: 600px; margin: 0 auto;">
        
        <!-- TITLE CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 30px 25px; margin-bottom: 25px; text-align: center;">
            <div style="background-color: #e11d48; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 1px;">
                Future Tech Academy (FTA)
            </div>
            <h1 style="font-size: 26px; font-weight: 900; color: #000000; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: -0.5px; line-height: 1.2;">
                🤖 OOU FUTURETECH NEWSLETTER
            </h1>
            <h2 style="font-size: 18px; font-weight: 700; color: #e11d48; margin: 0 0 20px 0; text-transform: uppercase;">
                The AI Edition
            </h2>
            <div style="height: 2px; background-color: #000000; margin-bottom: 20px; width: 100%;"></div>
            <p style="font-size: 14px; font-style: italic; font-weight: 700; color: #374151; margin: 0;">
                "The future isn't coming... it's already typing."
            </p>
        </div>

        <!-- WELCOME CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px;">
            <div style="background-color: #e11d48; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Welcome
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase;">
                👋 Welcome to the AI Edition!
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Hello Remi! 👋
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Welcome to another edition of the <strong>OOU FutureTech Newsletter</strong>, where we bring you the latest in technology, opportunities, campus talent, and everything exciting happening in our community.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                This month's edition is dedicated to one of the hottest topics on the planet...
            </p>
            <p style="font-size: 16px; font-weight: 900; color: #e11d48; text-transform: uppercase; margin: 15px 0;">
                🤖 ARTIFICIAL INTELLIGENCE
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0;">
                Whether you love it, fear it, or use it to finish assignments five minutes before submission (we're not judging 😅), AI is changing everything.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 15px 0 0 0;">
                From the way we learn and write code to how businesses operate and how students prepare for exams, Artificial Intelligence is transforming the world faster than ever before. The best part? You're living in the generation that has the opportunity not just to use AI—but to build with it. Let's dive into this month's AI Edition.
            </p>
        </div>

        <!-- TECH EXPLAINED CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px;">
            <div style="background-color: #000000; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Tech Explained
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase;">
                How Does AI Actually Work?
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Everyone talks about AI... But how does it actually "think"? Here's the simplest explanation.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Imagine you've watched over <strong>50 million football matches</strong>. Now someone asks,
            </p>
            <div style="border-left: 4px solid #e11d48; padding-left: 15px; font-style: italic; font-weight: 700; color: #374151; margin: 15px 0;">
                "Who is more likely to score next?"
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                You don't know the future... You simply recognize patterns. That's exactly how AI works.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                AI studies enormous amounts of information:
            </p>
            <ul style="padding-left: 20px; margin: 0 0 15px 0; font-size: 14px; color: #1f2937;">
                <li style="margin-bottom: 6px;">📚 Books</li>
                <li style="margin-bottom: 6px;">🌐 Websites</li>
                <li style="margin-bottom: 6px;">🖼 Images</li>
                <li style="margin-bottom: 6px;">🎥 Videos</li>
                <li style="margin-bottom: 6px;">💬 Conversations</li>
                <li style="margin-bottom: 6px;">💻 Computer Code</li>
                <li style="margin-bottom: 6px;">📄 Research Papers</li>
            </ul>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                From these, it learns patterns instead of memorizing answers. When you ask:
            </p>
            <div style="border-left: 4px solid #e11d48; padding-left: 15px; font-style: italic; font-weight: 700; color: #374151; margin: 15px 0;">
                "Write an email."
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                AI doesn't search Google. Instead, it predicts the next most likely words based on everything it has learned.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0; font-weight: 700;">
                Think of AI as:
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #e11d48; font-weight: 800; text-align: center; margin: 15px 0; background-color: #fafafa; padding: 12px; border: 2px dashed #000000;">
                🧠 Pattern Recognition + 📊 Mathematics + <br>📚 Massive Data + ⚡ Powerful Computers
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                The more quality data an AI has seen, the better its predictions become. That's why AI can:
            </p>
            <p style="font-size: 13px; line-height: 1.5; color: #374151; margin: 0;">
                ✅ Write code &nbsp;&nbsp; ✅ Generate images &nbsp;&nbsp; ✅ Design websites <br>
                ✅ Translate languages &nbsp;&nbsp; ✅ Solve mathematics &nbsp;&nbsp; ✅ Explain concepts <br>
                ✅ Assist doctors &nbsp;&nbsp; ✅ Help businesses &nbsp;&nbsp; ✅ Support teachers & students
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 20px 0 0 0;">
                One important thing to remember: <strong>AI is a powerful assistant, not a replacement for your creativity.</strong> It can help you move faster, but your ideas, critical thinking, and originality are what make the difference.
            </p>
        </div>

        <!-- AI STORY OF THE MONTH CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px;">
            <div style="background-color: #e11d48; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Story of the Month
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase;">
                😂 The Day AI Tried to Become a Nigerian Student
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                One Monday morning, ChatGPT woke up and announced:
            </p>
            <div style="border-left: 4px solid #e11d48; padding-left: 15px; font-style: italic; font-weight: 700; color: #374151; margin: 15px 0;">
                "Today, I identify as a 300-level Computer Engineering student at OOU."
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Immediately it began preparing for school. First challenge... It tried to register courses online.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                <strong>Portal:</strong> <em>"An error occurred."</em> <br>
                <strong>AI replied:</strong> <em>"Please try again."</em> <br>
                <strong>Portal replied:</strong> <em>"No, YOU try again."</em>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                After 47 refreshes, AI finally understood why Nigerian students believe patience is a superpower.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Then it ordered a bike to class. The rider called: <em>"Boss, I'm at your location."</em> AI checked GPS. The rider was somehow 3 km away. Confused, AI recalculated the route. The rider said: <em>"No worry... I'm close."</em> Twenty-five minutes later... Still "close."
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                During lectures, the lecturer announced: <em>"No AI in this class."</em> AI quietly closed itself and opened Microsoft Word.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Finally, exam season arrived. A student whispered, <em>"ChatGPT, help me."</em> AI looked around nervously and replied, <em>"My brother... even I don't know what this lecturer is asking."</em>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0; font-weight: 700;">
                After surviving one semester... AI updated its status:
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #e11d48; font-weight: 900; text-align: center; margin: 15px 0; background-color: #fafafa; padding: 12px; border: 2px dashed #000000; text-transform: uppercase;">
                "Respect to every Nigerian student. My algorithms were not designed for this."
            </p>
        </div>

        <!-- STUDENT SPOTLIGHT CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px; text-align: center;">
            <div style="background-color: #000000; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Student Spotlight
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 20px 0; text-transform: uppercase; text-align: center;">
                Meet This Month's FutureTech Star
            </h2>
            
            <div style="margin-bottom: 20px;">
                <img src="cid:samuel_photo" alt="Ogunkoya Samuel Opemipo" style="max-width: 320px; width: 100%; height: auto; border: 3px solid #000000; box-shadow: 4px 4px 0px #000000; display: block; margin: 0 auto;">
            </div>

            <h3 style="font-size: 18px; font-weight: 900; color: #e11d48; margin: 0 0 5px 0; text-transform: uppercase;">
                Ogunkoya Samuel Opemipo
            </h3>
            <p style="font-size: 12px; font-weight: 800; color: #374151; margin: 0 0 20px 0; letter-spacing: 1px; text-transform: uppercase;">
                Creative. Passionate. Focused.
            </p>

            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 15px 0;">
                Every memorable event has someone working behind the scenes to capture the moments that matter—and this month we're celebrating one of those talented individuals.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 15px 0;">
                Samuel specializes in <strong>Media Services (Photography)</strong>, using his camera to tell stories that words sometimes cannot. From campus events to creative shoots, he consistently demonstrates professionalism, creativity, and attention to detail, preserving memories one frame at a time.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 20px 0;">
                Photography isn't just about taking pictures; it's about capturing emotions, celebrating achievements, and documenting history. Through his work, Samuel continues to contribute to the growing creative ecosystem within our campus community.
            </p>

            <div style="background-color: #fafafa; border: 3px solid #000000; padding: 15px; text-align: left; margin-bottom: 10px;">
                <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #6b7280; margin-bottom: 5px;">What He Does Best</div>
                <div style="font-size: 14px; font-weight: 900; color: #000000; margin-bottom: 15px;">📸 Media Services (Photography)</div>
                <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #6b7280; margin-bottom: 5px;">Contact</div>
                <div style="font-size: 14px; font-weight: 900; color: #e11d48;">📞 07017178465</div>
            </div>
        </div>

        <!-- HOLIDAY SPECIAL CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px;">
            <div style="background-color: #e11d48; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Holiday Special
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase;">
                Learn a Tech Skill This Holiday!
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                The semester break is finally here! While many people will spend the holiday scrolling endlessly on social media, you can spend yours building a skill that could change your future forever.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                OOU FutureTech is officially opening the waitlist for <strong>Cohort One of our Web & App Development Program (Future Tech Academy - FTA).</strong>
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Whether you're starting from scratch or already know a little programming, this cohort is designed to take you from beginner to confident developer through practical, project-based learning.
            </p>

            <h3 style="font-size: 14px; font-weight: 900; color: #000000; margin: 20px 0 10px 0; text-transform: uppercase;">
                What You'll Learn:
            </h3>
            <div style="background-color: #fafafa; border: 2px solid #000000; padding: 15px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #1f2937; font-weight: 700;">
                    <tr>
                        <td style="padding: 4px 0;">💻 HTML & CSS</td>
                        <td style="padding: 4px 0;">⚡ JavaScript</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 0;">⚛ React & Next.js</td>
                        <td style="padding: 4px 0;">🗄 Databases</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 0;">🖥 Backend Dev</td>
                        <td style="padding: 4px 0;">📱 Mobile Apps</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 4px 0; color: #e11d48;">💼 Building Real-World Projects</td>
                    </tr>
                </table>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 20px 0; font-weight: 700;">
                Seats are limited. Reserve your place today and be among the first students to join Cohort One.
            </p>

            <div style="text-align: center;">
                <a href="https://ooufuturetech.com.ng/techwaitlist" style="background-color: #e11d48; color: #ffffff !important; text-decoration: none; border: 3px solid #000000; box-shadow: 4px 4px 0px #000000; padding: 12px 24px; font-weight: 900; text-transform: uppercase; font-size: 13px; display: inline-block;">
                    👉 Join the Waitlist
                </a>
            </div>
        </div>

        <!-- WEB DEVELOPMENT ROADMAP CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px;">
            <div style="background-color: #000000; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Roadmap
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase;">
                🛣️ Web Development Roadmap
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 20px 0;">
                Not sure where to begin? Here's the roadmap every aspiring developer should follow.
            </p>

            <!-- ROADMAP TIMELINE VISUAL -->
            <div style="background-color: #fafafa; border: 3px solid #000000; padding: 20px; font-family: monospace;">
                
                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; margin-bottom: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">🌐 Stage 1 — HTML</strong><br>
                    <span style="font-size: 11px; color: #555;">Learn how websites are structured.</span>
                </div>
                
                <div style="text-align: center; margin: 5px 0; font-weight: 900; font-size: 18px; color: #000000;">↓</div>

                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; margin-bottom: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">🎨 Stage 2 — CSS</strong><br>
                    <span style="font-size: 11px; color: #555;">Learn how to style beautiful and responsive websites.</span>
                </div>

                <div style="text-align: center; margin: 5px 0; font-weight: 900; font-size: 18px; color: #000000;">↓</div>

                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; margin-bottom: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">⚡ Stage 3 — JavaScript</strong><br>
                    <span style="font-size: 11px; color: #555;">Make your websites interactive and dynamic.</span>
                </div>

                <div style="text-align: center; margin: 5px 0; font-weight: 900; font-size: 18px; color: #000000;">↓</div>

                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; margin-bottom: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">⚛ Stage 4 — React</strong><br>
                    <span style="font-size: 11px; color: #555;">Build modern user interfaces used by companies worldwide.</span>
                </div>

                <div style="text-align: center; margin: 5px 0; font-weight: 900; font-size: 18px; color: #000000;">↓</div>

                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; margin-bottom: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">▲ Stage 5 — Next.js</strong><br>
                    <span style="font-size: 11px; color: #555;">Develop fast, scalable, production-ready web applications.</span>
                </div>

                <div style="text-align: center; margin: 5px 0; font-weight: 900; font-size: 18px; color: #000000;">↓</div>

                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; margin-bottom: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">🗄 Stage 6 — Databases</strong><br>
                    <span style="font-size: 11px; color: #555;">Learn how applications store and manage data.</span>
                </div>

                <div style="text-align: center; margin: 5px 0; font-weight: 900; font-size: 18px; color: #000000;">↓</div>

                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; margin-bottom: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">🖥 Stage 7 — Backend Development</strong><br>
                    <span style="font-size: 11px; color: #555;">Build APIs, authentication systems, and server-side applications.</span>
                </div>

                <div style="text-align: center; margin: 5px 0; font-weight: 900; font-size: 18px; color: #000000;">↓</div>

                <div style="background: #ffffff; border: 2px solid #000000; padding: 10px; box-shadow: 2px 2px 0px #000000;">
                    <strong style="color:#e11d48;">☁ Stage 8 — Deployment</strong><br>
                    <span style="font-size: 11px; color: #555;">Launch your applications to the internet for the world to use.</span>
                </div>

            </div>

            <p style="font-size: 15px; font-weight: 900; color: #e11d48; text-align: center; margin-top: 20px; text-transform: uppercase;">
                🎉 Congratulations! You've just completed the journey to becoming a Full-Stack Developer.
            </p>
        </div>

        <!-- BYTE & BANTER CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px; text-align: center;">
            <div style="background-color: #e11d48; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Podcast
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 20px 0; text-transform: uppercase; text-align: center;">
                🎙 Byte & Banter
            </h2>
            
            <div style="margin-bottom: 20px;">
                <img src="cid:byte_banter_flyer" alt="Byte and Banter Flyer" style="max-width: 360px; width: 100%; height: auto; border: 3px solid #000000; box-shadow: 4px 4px 0px #000000; display: block; margin: 0 auto;">
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 15px 0;">
                Technology is serious… But learning it doesn't have to be.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 15px 0;">
                That's why OOU FutureTech created <strong>Byte & Banter</strong>, our monthly podcast where technology meets fun conversation. Every episode explores trending topics in tech while keeping the discussion engaging, relatable, and entertaining.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 15px 0;">
                Expect conversations about:
            </p>
            <p style="font-size: 13px; line-height: 1.5; color: #374151; text-align: left; margin: 10px 0;">
                🎧 Artificial Intelligence &nbsp;&nbsp;&nbsp; 🎧 Software Development &nbsp;&nbsp;&nbsp; 🎧 Cybersecurity <br>
                🎧 Tech Startups &nbsp;&nbsp;&nbsp; 🎧 Digital Careers &nbsp;&nbsp;&nbsp; 🎧 Student Entrepreneurship <br>
                🎧 Productivity &nbsp;&nbsp;&nbsp; …and of course, plenty of banter along the way.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 15px 0 0 0;">
                Whether you're a tech enthusiast or simply curious about what's happening in the digital world, Byte & Banter is the perfect podcast for you. <strong>Stay tuned for this month's episode!</strong>
            </p>
        </div>

        <!-- MEME OF THE WEEK CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px; text-align: center;">
            <div style="background-color: #000000; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Humor
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 20px 0; text-transform: uppercase; text-align: center;">
                😂 Meme of the Week
            </h2>

            <div style="margin-bottom: 20px;">
                <img src="cid:meme_of_the_week" alt="AI Meme" style="max-width: 320px; width: 100%; height: auto; border: 3px solid #000000; box-shadow: 4px 4px 0px #000000; display: block; margin: 0 auto;">
            </div>

            <div style="background-color: #fafafa; border: 2px dashed #000000; padding: 15px; text-align: left; font-size: 14px; line-height: 1.5; color: #374151;">
                <strong>Lecturer:</strong> "No AI tools should be used for this assignment." <br><br>
                <strong>Student:</strong> <em>*Uses Grammarly.*</em> <br><br>
                <strong>Lecturer:</strong> "That's acceptable." <br><br>
                <strong>Student:</strong> <em>*Uses ChatGPT to explain the assignment.*</em> <br><br>
                <strong>Lecturer:</strong> 👀😂
            </div>
        </div>

        <!-- TECH FACT CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px;">
            <div style="background-color: #e11d48; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Tech Fact
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase;">
                💡 Tech Fact of the Month
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                Did you know? More than <strong>90% of developers</strong> now use AI-powered tools to help them write code, debug applications, learn new technologies, and become more productive.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0;">
                The future isn't about AI replacing developers. It's about developers who know how to use AI building faster, smarter, and better than ever before. The earlier you start learning these tools, the greater your advantage.
            </p>
        </div>

        <!-- COMING NEXT CARD -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 25px; margin-bottom: 25px;">
            <div style="background-color: #000000; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Coming Up
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase;">
                📅 What's Coming Next?
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; margin: 0 0 15px 0;">
                There's a lot happening at OOU FutureTech, and we don't want you to miss out! Keep an eye out for:
            </p>
            <ul style="padding-left: 20px; margin: 0; font-size: 14px; color: #1f2937; line-height: 1.6;">
                <li style="margin-bottom: 6px;">🚀 Tech Trainings</li>
                <li style="margin-bottom: 6px;">💡 AI Workshops</li>
                <li style="margin-bottom: 6px;">🏆 Hackathons</li>
                <li style="margin-bottom: 6px;">🎤 Guest Speaker Sessions</li>
                <li style="margin-bottom: 6px;">💼 Internship Opportunities</li>
                <li style="margin-bottom: 6px;">👨‍💻 Coding Challenges</li>
                <li style="margin-bottom: 6px;">🌟 Student Spotlights</li>
                <li style="margin-bottom: 6px;">🎙️ New Byte & Banter Episodes</li>
            </ul>
        </div>

        <!-- THANK YOU CARD & FOOTER -->
        <div style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 6px 6px 0px #000000; padding: 30px 25px; text-align: center; margin-bottom: 40px;">
            <div style="background-color: #e11d48; color: #ffffff; padding: 4px 10px; border: 2px solid #000000; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; display: inline-block; letter-spacing: 0.5px;">
                Appreciation
            </div>
            <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 15px 0; text-transform: uppercase; text-align: center;">
                ❤️ Thank You
            </h2>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 15px 0;">
                Thank you for being part of the OOU FutureTech community. Every event you attend, every skill you learn, every project you build, and every conversation you have contributes to a stronger tech ecosystem on our campus.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1f2937; text-align: left; margin: 0 0 25px 0;">
                We're excited to continue this journey with you as we build a generation of creators, innovators, entrepreneurs, and problem-solvers.
            </p>
            <p style="font-size: 15px; font-weight: 900; color: #000000; text-align: center; margin-bottom: 25px; line-height: 1.4;">
                Keep Learning. &nbsp;&nbsp; Keep Building. &nbsp;&nbsp; Keep Innovating. <br>
                <span style="color:#e11d48; font-size: 12px; font-weight: 900; display:block; margin-top: 5px;">See you in the next edition!</span>
            </p>

            <div style="height: 2px; background-color: #000000; margin: 25px 0;"></div>

            <h3 style="font-size: 16px; font-weight: 900; color: #000000; margin: 0 0 5px 0; text-transform: uppercase;">
                Future Tech Academy (FTA)
            </h3>
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 20px 0; font-weight: 700;">
                Building Africa's Next Generation of Tech Innovators.
            </p>

            <div style="margin-bottom: 20px;">
                <a href="https://ooufuturetech.com.ng" style="font-size: 11px; color: #e11d48; font-weight: 900; text-decoration: none; margin: 0 10px; text-transform: uppercase;">🌐 Website</a>
                <span style="color:#e5e7eb;">|</span>
                <a href="https://ooufuturetech.com.ng/techwaitlist" style="font-size: 11px; color: #e11d48; font-weight: 900; text-decoration: none; margin: 0 10px; text-transform: uppercase;">🚀 Waitlist</a>
            </div>

            <p style="font-size: 11px; color: #6b7280; line-height: 1.5; margin: 0;">
                Published with ❤️ by Future Tech Academy.<br>
                &copy; 2026 Future Tech Club. All rights reserved.
            </p>
        </div>

    </div>
</body>
</html>
`;

async function sendTest() {
    console.log('Sending single test webmail email using oftc@gocycle.africa...');
    try {
        const mailOptions = {
            from: `"Future Tech Academy (FTA)" <oftc@gocycle.africa>`,
            to: 'ademuwagunremi60@gmail.com',
            subject: '🤖 OOU FutureTech Newsletter: The AI Edition 🌍',
            html: htmlContent,
            attachments: attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Test email successfully delivered: ' + info.messageId);
    } catch (err) {
        console.error('❌ Failed to send test webmail:', err.message);
    }
}

sendTest();
