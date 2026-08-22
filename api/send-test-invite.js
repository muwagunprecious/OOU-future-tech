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

    const { email, name, course } = req.body;

    if (!email || !name) {
        console.error('❌ Missing required fields for test invite email:', { email, name });
        return res.status(400).json({ error: 'Missing required fields' });
    }

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

    const testLink = `${req.headers.origin || 'https://ooufuturetech.com.ng'}/test`;
    const senderEmail = (process.env.EMAIL_USER || 'ooufuturetech@gmail.com').trim();
    const courseTrack = course || 'Tech Track';

    console.log(`📧 Sending screening test invitation to: ${email}`);

    const mailOptions = {
        from: `"OOU Future Tech Academy" <${senderEmail}>`,
        to: email,
        subject: `Future Tech Academy Cohort 2 - Take Your Screening Test (${courseTrack})`,
        html: `
            <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
                        Future Tech Academy
                    </div>
                </div>
                
                <h2 style="color: #E63946; text-align: center; font-size: 24px; font-weight: 900; text-transform: uppercase;">
                    🧪 Complete Your Cohort 2 Screening Test
                </h2>
                
                <p style="font-size: 16px; color: #000000; line-height: 1.6;">
                    Hello <strong>${name}</strong>,
                </p>
                
                <p style="font-size: 15px; color: #333333; line-height: 1.6;">
                    Thank you for joining the waitlist for Future Tech Academy! To proceed with your application evaluation for <strong>Cohort 2</strong> (starting <strong>August 24th, 2026</strong>) in the <strong>${courseTrack}</strong> track, you are invited to take your online Screening Test.
                </p>
                
                <div style="background: #f4f4f5; padding: 25px; border: 3px solid #000000; border-radius: 15px; margin: 25px 0; box-shadow: 4px 4px 0 #000000;">
                    <h4 style="margin-top: 0; text-transform: uppercase; font-size: 13px; color: #E63946; letter-spacing: 0.5px;">Test Details & Instructions</h4>
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr>
                            <td style="padding-bottom: 10px; width: 35%;"><strong>Target Cohort:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #E63946;">Cohort 2 (Starts August 24th, 2026)</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Course Track:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #000;">${courseTrack}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Registered Email:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #E63946;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Format:</strong></td>
                            <td style="padding-bottom: 10px; color: #333;">Multiple Choice (20s per question)</td>
                        </tr>
                    </table>
                </div>

                <div style="background: #fffbeb; border: 2.5px solid #d97706; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                    <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
                        ⚠️ Important Requirement
                    </h4>
                    <p style="margin: 0; font-size: 14px; color: #78350f; line-height: 1.5;">
                        When you open the test page, you will be prompted to enter your registered email address. You <strong>MUST</strong> enter: <strong style="color: #000; background: #fef3c7; padding: 2px 6px; border-radius: 4px;">${email}</strong> to gain access.
                    </p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${testLink}" style="display: inline-block; background: #E63946; color: #ffffff; padding: 14px 32px; font-size: 16px; font-weight: 900; text-decoration: none; border: 3.5px solid #000000; border-radius: 10px; box-shadow: 4px 4px 0 #000000; text-transform: uppercase; letter-spacing: 0.5px;">
                        📝 Take Screening Test Now
                    </a>
                </div>

                <p style="font-size: 13px; color: #666666; line-height: 1.5; text-align: center;">
                    Or copy & paste this link in your browser: <br/>
                    <a href="${testLink}" style="color: #E63946; font-weight: bold;">${testLink}</a>
                </p>

                <div style="text-align: center; margin-top: 35px; border-top: 2px dashed #000000; padding-top: 20px;">
                    <p style="font-size: 12px; color: #71717a; margin: 0;">
                        Sent by Future Tech Academy Admissions Office<br/>
                        ooufuturetech@gmail.com
                    </p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Screening test invite email sent successfully to ${email}. MessageID: ${info.messageId}`);
        return res.status(200).json({
            message: 'Test invitation email sent successfully',
            messageId: info.messageId,
            accepted: info.accepted
        });
    } catch (error) {
        console.error('❌ Test Invite Email Error:', error);
        return res.status(500).json({
            error: 'Failed to send test invitation email',
            details: error.message
        });
    }
}
