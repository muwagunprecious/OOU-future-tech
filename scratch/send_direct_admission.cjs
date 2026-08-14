const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const supabaseUrl = 'https://addtzgrmmoybmvasmxss.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZHR6Z3JtbW95Ym12YXNteHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjA5NjQsImV4cCI6MjA4OTIzNjk2NH0.3HxmO3dim9C3gSR7TvYNiEUvu0NgiItDIZgB1408rN4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const targetEmail = 'ademuwagunmayokun@gmail.com';
    const candidateName = 'Ademuwagun Mayokun';
    const courseTrack = 'Product Design (UI/UX)';
    const cohort = 'Cohort 1';

    console.log(`🔍 Checking database for candidate ${targetEmail}...`);

    const { data: existing, error: searchError } = await supabase
        .from('registrations')
        .select('*')
        .eq('email', targetEmail)
        .maybeSingle();

    if (searchError) {
        console.error('Error searching Supabase:', searchError);
    }

    let parsedProducts = {};
    if (existing && existing.products) {
        try {
            parsedProducts = typeof existing.products === 'string' ? JSON.parse(existing.products) : existing.products;
        } catch (e) {}
    }

    const updatedProducts = JSON.stringify({
        ...parsedProducts,
        level: parsedProducts.level || 'Beginner',
        admitted: true,
        rejected: false,
        cohort: cohort,
        admitted_at: new Date().toISOString()
    });

    if (existing) {
        console.log(`Updating existing record for ${targetEmail}...`);
        const { error: updateErr } = await supabase
            .from('registrations')
            .update({
                name: existing.name || candidateName,
                company_name: courseTrack,
                products: updatedProducts
            })
            .eq('id', existing.id);

        if (updateErr) console.error('Update error:', updateErr);
        else console.log('✅ Supabase database record updated successfully!');
    } else {
        console.log(`Creating new record for ${targetEmail}...`);
        const generatedTicketId = `#OOU-EDU-${Math.floor(10000 + Math.random() * 90000)}`;
        const { error: insertErr } = await supabase
            .from('registrations')
            .insert([{
                name: candidateName,
                email: targetEmail,
                ticket_id: generatedTicketId,
                company_name: courseTrack,
                ticket_type: 'tech_waitlist_product_design_(ui/ux)',
                products: updatedProducts
            }]);

        if (insertErr) console.error('Insert error:', insertErr);
        else console.log('✅ New candidate record inserted into Supabase!');
    }

    // Now send the admission email
    console.log(`📧 Sending admission email to ${targetEmail}...`);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ooufuturetech@gmail.com',
            pass: 'yibpdhaegcarbojv'
        }
    });

    const lmsLink = `https://ooufuturetech.com.ng/academy`;
    const setPasswordLink = `https://ooufuturetech.com.ng/academy`;

    const mailOptions = {
        from: `"OOU Future Tech Academy" <ooufuturetech@gmail.com>`,
        to: targetEmail,
        subject: `Future Tech Academy Admission Letter - Product Design (UI/UX) [Classes Start Tomorrow!]`,
        html: `
            <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
                        Future Tech Academy
                    </div>
                </div>
                
                <h2 style="color: #E63946; text-align: center; font-size: 24px; font-weight: 900; text-transform: uppercase;">
                    🎉 Congratulations! Official Admission Letter
                </h2>
                
                <p style="font-size: 16px; color: #000000; line-height: 1.6;">
                    Dear <strong>${candidateName}</strong>,
                </p>
                
                <p style="font-size: 15px; color: #333333; line-height: 1.6;">
                    We are pleased to inform you that you have been offered official admission into <strong>Cohort One</strong> of the <strong>${courseTrack}</strong> track at Future Tech Academy!
                </p>
                
                <div style="background: #f4f4f5; padding: 25px; border: 3px solid #000000; border-radius: 15px; margin: 25px 0; box-shadow: 4px 4px 0 #000000;">
                    <h4 style="margin-top: 0; text-transform: uppercase; font-size: 13px; color: #E63946; letter-spacing: 0.5px;">Program & Schedule Details</h4>
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr>
                            <td style="padding-bottom: 10px; width: 38%;"><strong>Cohort:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #000;">Cohort One</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Course Track:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #000;">${courseTrack}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 10px;"><strong>Classes Start:</strong></td>
                            <td style="padding-bottom: 10px; font-weight: bold; color: #E63946; font-size: 15px;">Tomorrow (Saturday, August 15th, 2026)</td>
                        </tr>
                        <tr>
                            <td><strong>LMS Portal:</strong></td>
                            <td>Future Tech Academy LMS</td>
                        </tr>
                    </table>
                </div>

                <div style="background: #eff6ff; border: 3px solid #2563eb; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                    <h4 style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px; font-weight: 900; text-transform: uppercase;">
                        🔐 Important: Set Up Your LMS Password & Account
                    </h4>
                    <p style="margin: 0; font-size: 14px; color: #1e3a8a; line-height: 1.6;">
                        Classes begin tomorrow! Please set up your student account password immediately so you can log in to access your Product Design course modules, tutors, and learning resources.
                    </p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${setPasswordLink}" style="display: inline-block; background: #E63946; color: #ffffff; padding: 14px 32px; font-size: 16px; font-weight: 900; text-decoration: none; border: 3.5px solid #000000; border-radius: 10px; box-shadow: 4px 4px 0 #000000; text-transform: uppercase; letter-spacing: 0.5px;">
                        🔑 Set Up Password & Access LMS
                    </a>
                </div>

                <p style="font-size: 13px; color: #666666; line-height: 1.5; font-style: italic; background: #fffbeb; border: 1.5px solid #d97706; padding: 12px; border-radius: 8px;">
                    💡 <strong>Instructions:</strong> Click the button above, enter your registered email (<code>${targetEmail}</code>), and create your LMS password to log in.
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
        console.log(`🎉 SUCCESS! Admission email sent to ${targetEmail}. MessageID: ${info.messageId}`);
    } catch (err) {
        console.error('❌ Failed to send email:', err);
    }
}

run();
