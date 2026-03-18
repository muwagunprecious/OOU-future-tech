const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { Pool } = require('pg');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Direct Postgres Pool for bypassing Supabase cache
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.post(['/send-ticket', '/api/send-ticket'], async (req, res) => {
    const { email, name, ticketId, type } = req.body;

    console.log(`📧 Attempting to send ticket to: ${email}`);

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
        console.log(`✅ Ticket sent to ${email}`);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('❌ Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.post(['/send-pitch-status', '/api/send-pitch-status'], async (req, res) => {
    const { email, name, startup_name, status } = req.body;
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
                    <p>Your pitch was highly impressive, and we would love to have you present it at the <strong>OOU Future Tech Conference 2026</strong>!</p>
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
        res.status(200).json({ message: 'Status email sent successfully' });
    } catch (error) {
        console.error('❌ Email status error:', error);
        res.status(500).json({ error: 'Failed to send status email' });
    }
});

// COMBINED ENDPOINT: Direct Database Update Only (Admin will mail manually)
app.post('/api/update-pitch-status-direct', async (req, res) => {
    const { id, status } = req.body;

    console.log(`🚀 DIRECT UPDATE: Setting ${id} to ${status}`);

    try {
        // 1. Direct Postgres Update (Bypasses all caches)
        const dbResult = await pool.query('UPDATE pitches SET status = $1 WHERE id = $2', [status, id]);
        
        if (dbResult.rowCount === 0) {
            return res.status(404).json({ error: 'Pitch not found' });
        }

        console.log(`✅ DB Updated via Direct PG connection.`);
        res.status(200).json({ success: true, message: 'Status updated successfully' });

    } catch (error) {
        console.error('❌ Direct Update Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Email proxy server running on http://localhost:${PORT}`);
});
