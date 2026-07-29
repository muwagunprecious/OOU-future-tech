import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, name, course, portalOpenDate } = req.body;

    if (!email || !name || !course) {
        console.error('❌ Missing required fields:', { email, name, course });
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
        secure: true,
        auth: {
            user: (process.env.EMAIL_USER || '').trim(),
            pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, '')
        }
    });

    const lmsLink = `${req.headers.origin || 'https://oou-future-tech.vercel.app'}/academy`;
    console.log(`📧 Attempting to send admission email to: ${email}`);

    const mailOptions = {
        from: `"OOU Future Tech Academy" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Future Tech Academy Cohort One Admission - Congratulations!`,
        html: `
            <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
                        Future Tech Academy
                    </div>
                </div>
                
                <h2 style="color: #E63946; text-align: center; font-size: 24px; font-weight: 900; text-transform: uppercase;">
                    🎉 Congratulations! You have been admitted!
                </h2>
                
                <p style="font-size: 16px; color: #000000; line-height: 1.6;">
                    Hello <strong>${name}</strong>,
                </p>
                
                <p style="font-size: 15px; color: #333333; line-height: 1.6;">
                    We are excited to inform you that you have been offered admission into <strong>Cohort One</strong> of the <strong>${course}</strong> track at Future Tech Academy!
                </p>
                
                <div style="background: #f4f4f5; padding: 25px; border: 3px solid #000000; border-radius: 15px; margin: 25px 0; box-shadow: 4px 4px 0 #000000;">
                    <h4 style="margin-top: 0; text-transform: uppercase; font-size: 13px; color: #E63946; letter-spacing: 0.5px;">Program Details</h4>
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr>
                            <td style="padding-bottom: 8px; width: 35%;"><strong>Cohort:</strong></td>
                            <td style="padding-bottom: 8px; font-weight: bold; color: #000;">Cohort One (Starting August 15th, 2026)</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 8px;"><strong>Course Track:</strong></td>
                            <td style="padding-bottom: 8px; font-weight: bold; color: #000;">${course}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 8px;"><strong>Start Date:</strong></td>
                            <td style="padding-bottom: 8px; font-weight: bold; color: #E63946;">August 15th, 2026</td>
                        </tr>
                        <tr>
                            <td><strong>Platform:</strong></td>
                            <td>Future Tech Academy LMS</td>
                        </tr>
                        ${portalOpenDate ? `<tr>
                            <td style="padding-bottom: 8px;"><strong>Portal Opens:</strong></td>
                            <td style="padding-bottom: 8px; font-weight: bold; color: #E63946;">${new Date(portalOpenDate).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                        </tr>` : ''}
                    </table>
                </div>

                <p style="font-size: 15px; color: #333333; line-height: 1.6;">
                    To claim your admission slot and set up your student account, please click the button below to access the LMS:
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${lmsLink}" style="display: inline-block; background: #E63946; color: #ffffff; padding: 12px 30px; font-size: 15px; font-weight: 900; text-decoration: none; border: 3px solid #000000; border-radius: 8px; box-shadow: 4px 4px 0 #000000; text-transform: uppercase; letter-spacing: 0.5px;">
                        Setup Student Account & Log In
                    </a>
                </div>

                <p style="font-size: 13px; color: #666666; line-height: 1.5; font-style: italic; background: #fffbeb; border: 1.5px solid #d97706; padding: 12px; border-radius: 8px;">
                    💡 <strong>Admissions Note:</strong> If this is your first time accessing the academy, you will be prompted to choose a password, confirm it, and upload a profile picture. Returning users can log in using their email and chosen password.${portalOpenDate ? `<br/><br/>⏰ <strong>Important:</strong> Your account can be set up now, but course content will only be accessible once the portal opens on <strong>${new Date(portalOpenDate).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>.` : ''}
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
        await transporter.sendMail(mailOptions);
        console.log(`✅ Admission email sent successfully to ${email}`);
        return res.status(200).json({ message: 'Admission email sent successfully' });
    } catch (error) {
        console.error('❌ Admission Email Error:', error);
        return res.status(500).json({
            error: 'Failed to send admission email',
            details: error.message,
            code: error.code
        });
    }
}