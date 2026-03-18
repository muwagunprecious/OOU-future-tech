import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, name, startup_name, status } = req.body;

    if (!email || !name || !startup_name || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return res.status(500).json({ error: 'Server configuration error (missing credentials)' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const isAccepted = status === 'accepted';
    const subject = isAccepted ? `Great news! Your pitch for ${startup_name} was accepted` : `Update regarding your pitch for ${startup_name}`;

    const mailOptions = {
        from: `"OOU Future Tech" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 24px;">OOU FUTURE TECH</div>
                </div>
                <h2 style="color: #000; text-align: center;">${isAccepted ? 'Congratulations!' : 'Pitch Status Update'}</h2>
                <p>Hello <strong>${name}</strong>,</p>
                <p>We are writing to provide an update on your startup pitch for <strong>${startup_name}</strong>.</p>
                
                <div style="background: ${isAccepted ? '#f0fdf4' : '#fef2f2'}; padding: 25px; border: 2px solid ${isAccepted ? '#16a34a' : '#ef4444'}; border-radius: 15px; margin: 25px 0;">
                    <p style="margin: 0; font-size: 1.1rem; font-weight: 700; color: ${isAccepted ? '#15803d' : '#991b1b'}; text-align: center;">
                        Status: ${status.toUpperCase()}
                    </p>
                </div>

                ${isAccepted ? `
                    <p>Your pitch was highly impressive, and we would love to have you present it at the **OOU Future Tech Conference 2026**!</p>
                    <p>Next steps will be sent to you shortly via another email with details on the scheduling and format of the presentation.</p>
                ` : `
                    <p>Thank you for sharing your startup vision with us. After careful review, we have decided not to proceed with your pitch for this edition of the conference.</p>
                    <p>This was a difficult decision as we received many high-quality submissions. We appreciate your interest and wish you the best of luck with <strong>${startup_name}</strong>. Please keep building!</p>
                `}

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
        return res.status(200).json({ message: 'Status email sent successfully' });
    } catch (error) {
        console.error('❌ Email Status Error:', error);
        return res.status(500).json({ error: 'Failed to send status email' });
    }
}
