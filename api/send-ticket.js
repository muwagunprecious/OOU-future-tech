const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, name, ticketId, type } = req.body;

    if (!email || !name || !ticketId || !type) {
        console.error('❌ Missing required fields:', { email, name, ticketId, type });
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify Env Vars
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ Missing Email Credentials in Vercel Environment Variables.');
        return res.status(500).json({ error: 'Server configuration error (missing credentials)' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    console.log(`📧 Vercel: Attempting to send ticket to: ${email}`);

    const mailOptions = {
        from: `"OOU Future Tech" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Your OOU Future Tech 2026 Ticket - ${ticketId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 24px;">OOU FUTURE TECH</div>
                </div>
                <h2 style="color: #000; text-align: center;">Registration Confirmed!</h2>
                <p>Hello <strong>${name}</strong>,</p>
                <p>Your spot at the <strong>OOU Future Tech Conference 2026</strong> has been reserved. We are excited to see you there!</p>
                
                <div style="background: #f4f4f5; padding: 25px; border: 2px solid #000; border-radius: 15px; margin: 25px 0;">
                    <table style="width: 100%;">
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Attendee:</strong></td>
                            <td style="padding-bottom: 10px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Ticket ID:</strong></td>
                            <td style="padding-bottom: 10px; font-family: monospace; color: #cc0000; font-weight: 900;">${ticketId}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Pass Class:</strong></td>
                            <td style="padding-bottom: 10px; text-transform: uppercase;">${type}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Event Date:</strong></td>
                            <td style="padding-bottom: 10px;">March 27, 2026</td>
                        </tr>
                        <tr>
                            <td><strong>Venue:</strong></td>
                            <td>OOU Main Campus, Ago-Iwoye</td>
                        </tr>
                    </table>
                </div>

                <p style="font-size: 0.9rem; color: #555;">
                    <strong>Instructions:</strong> Please keep this Ticket ID handy. You'll need to present it at the check-in desk on the day of the event. 
                    If you haven't already, you can download your visual digital ticket card directly from our website after registration.
                </p>

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
        console.log(`✅ Vercel: Ticket sent successfully to ${email}`);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('❌ Vercel Email Error:', error);
        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message,
            code: error.code
        });
    }
}
