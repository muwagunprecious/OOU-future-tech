import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, name, ticketId, type = 'Standard', category = 'Techie', phone = '', origin } = req.body;

    if (!email || !name || !ticketId) {
        console.error('❌ Missing required fields:', { email, name, ticketId });
        return res.status(400).json({ error: 'Missing required fields (email, name, ticketId)' });
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
            user: (process.env.EMAIL_USER || '').trim(),
            pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, '')
        }
    });

    console.log(`📧 Vercel: Attempting to send approved boarding pass to: ${email}`);

    const verifyUrl = `${origin || 'https://ooufuturetech.com'}/?verify=${encodeURIComponent(ticketId)}`;

    const mailOptions = {
        from: `"OOU FutureTech Airlines" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `✈️ Boarding Pass Approved: OOU FutureTech Flight Edition [${ticketId}]`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 4px solid #000000; border-radius: 16px; overflow: hidden; box-shadow: 8px 8px 0 #000000;">
                <!-- Header Stripe -->
                <div style="background: #E63946; padding: 20px 24px; text-align: left; border-bottom: 3px solid #000000;">
                    <div style="display: inline-block; background: #000000; color: #ffffff; font-size: 11px; font-weight: 900; letter-spacing: 0.12em; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px;">
                        FLIGHT FT2027 • ADMISSION CLEARED
                    </div>
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 900; margin: 0; text-transform: uppercase; letter-spacing: -0.02em;">
                        OOU FUTURETECH // FLIGHT EDITION
                    </h1>
                </div>

                <!-- Body Content -->
                <div style="padding: 28px 24px;">
                    <div style="background: #DCFCE7; border: 2px solid #16A34A; color: #166534; padding: 12px 16px; border-radius: 8px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px;">
                        ✓ INVITATION APPROVED • SEAT RESERVED
                    </div>

                    <h2 style="font-size: 20px; font-weight: 900; color: #000000; margin: 0 0 10px 0;">
                        Welcome Aboard, ${name}!
                    </h2>
                    <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 20px 0;">
                        Your registration for <strong>OOU FutureTech Flight Edition</strong> has been approved by the admissions dispatch committee. You are cleared for flight boarding.
                    </p>

                    <!-- Ticket Manifest Details -->
                    <div style="background: #F8FAFC; border: 2px solid #000000; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                            <tr style="border-bottom: 1px solid #E2E8F0;">
                                <td style="padding: 8px 0; color: #64748B; font-weight: 700; text-transform: uppercase; font-size: 11px;">Attendee Name</td>
                                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #000000;">${name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #E2E8F0;">
                                <td style="padding: 8px 0; color: #64748B; font-weight: 700; text-transform: uppercase; font-size: 11px;">Ticket / Boarding ID</td>
                                <td style="padding: 8px 0; text-align: right; font-weight: 900; font-family: monospace; color: #E63946; font-size: 15px;">${ticketId}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #E2E8F0;">
                                <td style="padding: 8px 0; color: #64748B; font-weight: 700; text-transform: uppercase; font-size: 11px;">Cohort / Category</td>
                                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #000000; text-transform: uppercase;">${category}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #E2E8F0;">
                                <td style="padding: 8px 0; color: #64748B; font-weight: 700; text-transform: uppercase; font-size: 11px;">Pass Class</td>
                                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #000000; text-transform: uppercase;">${type}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #E2E8F0;">
                                <td style="padding: 8px 0; color: #64748B; font-weight: 700; text-transform: uppercase; font-size: 11px;">Departure Date</td>
                                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #000000;">TO BE ANNOUNCED SOON</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748B; font-weight: 700; text-transform: uppercase; font-size: 11px;">Airport / Venue</td>
                                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #000000;">OGD Hall, OOU Main Campus, Ago-Iwoye</td>
                            </tr>
                        </table>
                    </div>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin-bottom: 24px;">
                        <a href="${verifyUrl}" style="display: inline-block; background: #000000; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid #000000; box-shadow: 4px 4px 0 #E63946;">
                            VIEW & VERIFY BOARDING PASS ➔
                        </a>
                    </div>

                    <p style="font-size: 12px; color: #64748B; line-height: 1.5; margin: 0 0 16px 0;">
                        <strong>Important Gate Instructions:</strong> Please save this email or click the button above to access your official QR code ticket. Present your QR code ticket at the check-in gates on the day of the event for fast-track boarding.
                    </p>
                </div>

                <!-- Footer -->
                <div style="background: #F1F5F9; border-top: 2px solid #000000; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748B;">
                    <div style="font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px;">
                        OOU FutureTech Flight Dispatch Board
                    </div>
                    <div>Flight Edition • Ogun State, Nigeria • ooufuturetech@gmail.com</div>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Vercel: Ticket sent successfully to ${email}`);
        return res.status(200).json({ message: 'Ticket email sent successfully', ticketId });
    } catch (error) {
        console.error('❌ Vercel Email Error:', error);
        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message,
            code: error.code
        });
    }
}