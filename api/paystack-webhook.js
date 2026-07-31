import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEW_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEW_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
    api: {
        bodyParser: false // Parse raw body for signature verification
    }
};

async function getRawBody(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const rawBody = await getRawBody(req);
        const secret = (process.env.PAYSTACK_SECRET_KEY || '').trim();

        // Verify Paystack signature
        const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
        const paystackSignature = req.headers['x-paystack-signature'];

        if (hash !== paystackSignature) {
            console.error('❌ Invalid Paystack signature verification failure');
            return res.status(401).json({ error: 'Invalid Paystack signature' });
        }

        const event = JSON.parse(rawBody.toString('utf8'));
        console.log(`🔔 Paystack Webhook Event Received: ${event.event}`);

        if (event.event === 'charge.success') {
            const data = event.data;
            const email = data.customer?.email;
            const reference = data.reference;
            const amountPaid = data.amount / 100; // in Naira
            const metadata = data.metadata || {};
            const candidateName = metadata.name || data.customer?.first_name || 'Student';
            const courseTrack = metadata.course || 'Tech Track';

            console.log(`💳 Charge success verified for ${email} (Ref: ${reference}, Amount: ₦${amountPaid})`);

            // 1. Find and update candidate in Supabase registrations table
            if (email) {
                const { data: records, error: fetchErr } = await supabase
                    .from('registrations')
                    .select('*')
                    .ilike('email', email.trim());

                if (fetchErr) {
                    console.error('❌ Supabase fetch error in webhook:', fetchErr);
                } else if (records && records.length > 0) {
                    for (const record of records) {
                        let parsedProducts = {};
                        try {
                            parsedProducts = typeof record.products === 'string' ? JSON.parse(record.products) : (record.products || {});
                        } catch (e) {}

                        const updatedProducts = JSON.stringify({
                            ...parsedProducts,
                            paid: true,
                            payment_reference: reference,
                            payment_amount: amountPaid,
                            payment_date: new Date().toISOString()
                        });

                        const { error: updateErr } = await supabase
                            .from('registrations')
                            .update({ products: updatedProducts })
                            .eq('id', record.id);

                        if (updateErr) {
                            console.error(`❌ Error updating payment status for record ${record.id}:`, updateErr);
                        } else {
                            console.log(`✅ Supabase payment status updated to PAID for ${email}`);
                        }
                    }
                }
            }

            // 2. Send post-payment confirmation email
            if (email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                try {
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: (process.env.EMAIL_USER || '').trim(),
                            pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, '')
                        }
                    });

                    const senderEmail = (process.env.EMAIL_USER || 'ooufuturetech@gmail.com').trim();
                    const mailOptions = {
                        from: `"OOU Future Tech Academy" <${senderEmail}>`,
                        to: email,
                        subject: `✅ Payment Confirmed! Cohort 1 Registration - Future Tech Academy`,
                        html: `
                            <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px; background: #ffffff;">
                                <div style="text-align: center; margin-bottom: 25px;">
                                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
                                        Future Tech Academy
                                    </div>
                                </div>
                                
                                <h2 style="color: #16a34a; text-align: center; font-size: 24px; font-weight: 900; text-transform: uppercase;">
                                    ✅ Payment Received & Seat Confirmed!
                                </h2>
                                
                                <p style="font-size: 16px; color: #000000; line-height: 1.6;">
                                    Hello <strong>${candidateName}</strong>,
                                </p>

                                <div style="background: #f4f4f5; padding: 25px; border: 3px solid #000000; border-radius: 15px; margin: 25px 0; box-shadow: 4px 4px 0 #000000;">
                                    <h4 style="margin-top: 0; text-transform: uppercase; font-size: 13px; color: #16a34a; letter-spacing: 0.5px;">Receipt Details</h4>
                                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding-bottom: 10px; width: 40%;"><strong>Track Name:</strong></td>
                                            <td style="padding-bottom: 10px; font-weight: bold; color: #000;">${courseTrack}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 10px;"><strong>Amount Paid:</strong></td>
                                            <td style="padding-bottom: 10px; font-weight: 900; color: #16a34a;">₦${amountPaid.toLocaleString()} Naira</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 10px;"><strong>Payment Reference:</strong></td>
                                            <td style="padding-bottom: 10px; font-weight: bold; color: #64748b; font-family: monospace;">${reference}</td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <div style="background: #eff6ff; border: 2.5px solid #2563eb; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                                    <p style="margin: 0 0 12px 0; font-size: 15px; color: #1e3a8a; line-height: 1.6; font-weight: 700;">
                                        The admin will send you an email to log in to your dashboard soon!
                                    </p>
                                    <p style="margin: 0; font-size: 14px; color: #1e40af; line-height: 1.6;">
                                        <strong>Cohort 1 starts August 15th.</strong> You will have access to tutors every 2 weeks and also a vibrant community of fellow learners to build and grow together!
                                    </p>
                                </div>

                                <div style="text-align: center; margin-top: 35px; border-top: 2px dashed #000000; padding-top: 20px;">
                                    <p style="font-size: 12px; color: #71717a; margin: 0;">
                                        Sent by Future Tech Academy Admissions & Finance Office<br/>
                                        ooufuturetech@gmail.com
                                    </p>
                                </div>
                            </div>
                        `
                    };
                    await transporter.sendMail(mailOptions);
                    console.log(`✅ Post-payment confirmation email dispatched to ${email}`);
                } catch (emailError) {
                    console.error('❌ Post-payment email dispatch error:', emailError);
                }
            }
        }

        return res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error('❌ Webhook error:', err);
        return res.status(500).json({ error: 'Webhook processing error', details: err.message });
    }
}
