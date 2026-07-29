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

    const { email, name, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Missing email or OTP' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        // Return 200 with fallback so client can proceed with local verification if env is missing
        return res.status(200).json({ message: 'OTP generated locally (email env not configured)', localOnly: true });
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

    const mailOptions = {
        from: `"OOU Future Tech Academy" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Password Reset Verification Code - Future Tech Academy`,
        html: `
            <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 4px solid #000; padding: 25px; border-radius: 15px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 8px 16px; font-weight: 900; font-size: 18px; text-transform: uppercase;">
                        Future Tech Academy
                    </div>
                </div>
                
                <h3 style="color: #E63946; text-align: center; font-size: 20px; font-weight: 900; text-transform: uppercase; margin-top: 0;">
                    🔐 Password Reset Request
                </h3>
                
                <p style="font-size: 14px; color: #333333; line-height: 1.5;">
                    Hello ${name || 'Student'},
                </p>
                
                <p style="font-size: 14px; color: #333333; line-height: 1.5;">
                    Use the 6-digit one-time code below to reset your LMS password:
                </p>
                
                <div style="background: #f4f4f5; padding: 15px; border: 3px solid #000; text-align: center; margin: 20px 0; border-radius: 10px;">
                    <span style="font-family: monospace; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #E63946;">${otp}</span>
                </div>

                <p style="font-size: 12px; color: #666666; font-style: italic;">
                    If you did not request a password reset, please ignore this email.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('❌ Send OTP Error:', error);
        return res.status(200).json({ message: 'OTP processed (email failed)', error: error.message });
    }
}
