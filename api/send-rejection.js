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
        console.error('❌ Missing required fields for rejection email:', { email, name });
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

    console.log(`📧 Attempting to send rejection email to: ${email}`);

    const senderEmail = (process.env.EMAIL_USER || 'ooufuturetech@gmail.com').trim();

    const mailOptions = {
        from: `"OOU Future Tech Academy" <${senderEmail}>`,
        to: email,
        subject: `Future Tech Academy Cohort One Application Update`,
        html: `
            <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
                        Future Tech Academy
                    </div>
                </div>
                
                <h2 style="color: #000000; text-align: center; font-size: 22px; font-weight: 900; text-transform: uppercase;">
                    Cohort One Application Status
                </h2>
                
                <p style="font-size: 16px; color: #000000; line-height: 1.6;">
                    Hello <strong>${name}</strong>,
                </p>
                
                <p style="font-size: 15px; color: #333333; line-height: 1.6;">
                    Thank you for applying to Future Tech Academy and taking the time to complete our application process for the <strong>${course || 'Tech'}</strong> track.
                </p>
                
                <div style="background: #f4f4f5; padding: 25px; border: 3px solid #000000; border-radius: 15px; margin: 25px 0; box-shadow: 4px 4px 0 #000000;">
                    <p style="margin: 0; font-size: 15px; color: #1f2937; line-height: 1.6;">
                        Due to an overwhelming number of applications and limited available slots for <strong>Cohort One</strong>, we regret to inform you that we are unable to accept your application for this cohort.
                    </p>
                </div>

                <div style="background: #eff6ff; border: 2.5px solid #1d4ed8; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                    <h4 style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
                        🚀 What's Next? (Cohort Two Priority)
                    </h4>
                    <p style="margin: 0; font-size: 14px; color: #1e3a8a; line-height: 1.5;">
                        Your profile remains in our talent database under <strong>Priority Waitlist</strong> status. We will reach out to you directly via email as soon as applications for <strong>Cohort Two</strong> go live so you can secure your spot first.
                    </p>
                </div>

                <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
                    We strongly encourage you to keep building your skills and stay connected with our community.
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
        console.log(`✅ Rejection email sent successfully to ${email}. MessageID: ${info.messageId}`);
        return res.status(200).json({
            message: 'Rejection email sent successfully',
            messageId: info.messageId,
            accepted: info.accepted
        });
    } catch (error) {
        console.error('❌ Rejection Email Error:', error);
        return res.status(500).json({
            error: 'Failed to send rejection email',
            details: error.message
        });
    }
}
