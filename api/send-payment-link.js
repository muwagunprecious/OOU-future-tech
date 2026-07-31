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
        console.error('❌ Missing required fields for payment link email:', { email, name });
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

    const origin = req.headers.origin || 'https://oou-future-tech.vercel.app';
    const checkoutLink = `${origin}/pay?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&course=${encodeURIComponent(course || 'Tech Track')}`;
    const senderEmail = (process.env.EMAIL_USER || 'ooufuturetech@gmail.com').trim();
    const courseTrack = course || 'Tech Track';

    console.log(`📧 Sending payment link email to: ${email}`);

    const mailOptions = {
        from: `"OOU Future Tech Academy" <${senderEmail}>`,
        to: email,
        subject: `🎉 Congratulations! Complete Your Enrollment (₦10,000) - Future Tech Academy`,
        html: `
            <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
                        Future Tech Academy
                    </div>
                </div>
                
                <h2 style="color: #16a34a; text-align: center; font-size: 24px; font-weight: 900; text-transform: uppercase;">
                    🎉 Congratulations on Passing Your Test!
                </h2>
                
                <p style="font-size: 16px; color: #000000; line-height: 1.6;">
                    Hello <strong>${name}</strong>,
                </p>
                
                <p style="font-size: 15px; color: #333333; line-height: 1.6;">
                    Great news! Based on your performance in the screening test, you have been selected for the <strong>${courseTrack}</strong> track in <strong>Cohort One</strong> at Future Tech Academy!
                </p>
                
                <div style="background: #f4f4f5; padding: 25px; border: 3px solid #000000; border-radius: 15px; margin: 25px 0; box-shadow: 4px 4px 0 #000000;">
                    <h4 style="margin-top: 0; text-transform: uppercase; font-size: 13px; color: #E63946; letter-spacing: 0.5px;">Enrollment Fee Details</h4>
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr>
                            <td style="padding-bottom: 10px; width: 40%;"><strong>Assigned Track:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #000;">${courseTrack}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Course Fee:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: 900; color: #16a34a; font-size: 18px;">₦10,000 Naira</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Cohort 1 Start Date:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #000;">August 15th, 2026</td>
                        </tr>
                    </table>
                </div>

                <p style="font-size: 15px; color: #333333; line-height: 1.6;">
                    To confirm your acceptance and lock your seat for Cohort One, please click below to complete your payment of ₦10,000.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${checkoutLink}" style="display: inline-block; background: #16a34a; color: #ffffff; padding: 16px 36px; font-size: 17px; font-weight: 900; text-decoration: none; border: 3.5px solid #000000; border-radius: 10px; box-shadow: 4px 4px 0 #000000; text-transform: uppercase; letter-spacing: 0.5px;">
                        💳 Pay ₦10,000 & Confirm Seat
                    </a>
                </div>

                <p style="font-size: 13px; color: #666666; line-height: 1.5; text-align: center;">
                    Or copy & paste this checkout link in your browser: <br/>
                    <a href="${checkoutLink}" style="color: #16a34a; font-weight: bold;">${checkoutLink}</a>
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
        console.log(`✅ Payment link email sent successfully to ${email}. MessageID: ${info.messageId}`);
        return res.status(200).json({
            message: 'Payment link email sent successfully',
            messageId: info.messageId,
            accepted: info.accepted
        });
    } catch (error) {
        console.error('❌ Send Payment Link Email Error:', error);
        return res.status(500).json({
            error: 'Failed to send payment link email',
            details: error.message
        });
    }
}
