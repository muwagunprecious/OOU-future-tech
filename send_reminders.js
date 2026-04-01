import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Configuration from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!supabaseUrl || !supabaseAnonKey || !emailUser || !emailPass) {
    console.error('❌ Missing environment variables. Please check your .env file.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    pool: true,
    maxConnections: 3, // Reduced concurrency to avoid triggers
    maxMessages: 100,
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

async function fetchAllAttendees() {
    console.log('🚀 Fetching ALL attendees from Supabase (paginated)...');
    let allData = [];
    let from = 0;
    const step = 1000;
    let fetching = true;

    while (fetching) {
        const { data, error } = await supabase
            .from('registrations')
            .select('name, email, ticket_id, ticket_type')
            .order('created_at', { ascending: true })
            .range(from, from + step - 1);

        if (error) throw error;
        allData = allData.concat(data || []);
        console.log(`📡 Fetched ${allData.length} records so far...`);
        if (!data || data.length < step) fetching = false;
        from += step;
    }
    return allData;
}

// Helper for timeout
const sendMailWithTimeout = (options, timeoutMs) => {
    return Promise.race([
        transporter.sendMail(options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP Timeout after ' + timeoutMs + 'ms')), timeoutMs))
    ]);
};

async function sendReminders() {
    let attendees;
    try {
        attendees = await fetchAllAttendees();
    } catch (error) {
        console.error('❌ Error fetching attendees:', error.message);
        return;
    }

    const total = attendees.length;
    console.log(`✅ Total attendees to process: ${total}`);

    const isDryRun = process.argv.includes('--dry-run');
    const testEmail = process.argv.find(arg => arg.startsWith('--test-email='))?.split('=')[1];
    const offsetArg = process.argv.find(arg => arg.startsWith('--offset='))?.split('=')[1];
    const offset = offsetArg ? parseInt(offsetArg) : 0;

    if (isDryRun) console.log('⚠️ DRY RUN MODE: No emails will be sent.');
    if (testEmail) console.log(`🎯 TEST MODE: Only sending to ${testEmail}`);
    if (offset > 0) console.log(`⏩ RESUME MODE: Starting from index ${offset}`);

    let sentCount = 0;
    let failCount = 0;

    for (let i = offset; i < total; i++) {
        const attendee = attendees[i];
        if (testEmail && attendee.email.toLowerCase() !== testEmail.toLowerCase()) continue;

        console.log(`📧 [${i + 1}/${total}] Processing: ${attendee.name} (${attendee.email})...`);

        const mailOptions = {
            from: `"OOU Future Tech" <${emailUser}>`,
            to: attendee.email,
            subject: `⏰ REMINDER: OOU Future Tech 2026 is Tomorrow!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 5px solid #000; padding: 30px; border-radius: 20px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="background: #000; color: #fff; display: inline-block; padding: 10px 20px; font-weight: 900; font-size: 24px;">OOU FUTURE TECH</div>
                    </div>
                    <h2 style="color: #000; text-align: center;">See You Tomorrow!</h2>
                    <p>Hello <strong>${attendee.name}</strong>,</p>
                    <p>This is a friendly reminder that the <strong>OOU Future Tech Conference 2026</strong> is happening <strong>TOMORROW, March 27, 2026</strong>!</p>
                    <p>We are resending your ticket details below for easy access during check-in.</p>
                    
                    <div style="background: #f4f4f5; padding: 25px; border: 2px solid #000; border-radius: 15px; margin: 25px 0;">
                        <table style="width: 100%;">
                            <tr>
                                <td style="padding-bottom: 10px;"><strong>Attendee:</strong></td>
                                <td style="padding-bottom: 10px;">${attendee.name}</td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 10px;"><strong>Ticket ID:</strong></td>
                                <td style="padding-bottom: 10px; font-family: monospace; color: #cc0000; font-weight: 900;">${attendee.ticket_id}</td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 10px;"><strong>Pass Class:</strong></td>
                                <td style="padding-bottom: 10px; text-transform: uppercase;">${attendee.ticket_type}</td>
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
                        <strong>Instructions:</strong> Please have your <strong>Ticket ID</strong> ready at the check-in desk. 
                        Join us for a day of innovation, networking, and future-shaping technology!
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

        if (isDryRun) {
            console.log(`✅ [DRY RUN] Would have sent to ${attendee.email}`);
            sentCount++;
        } else {
            try {
                // Use 15-second timeout for each send
                await sendMailWithTimeout(mailOptions, 15000);
                console.log(`✅ Reminder sent to ${attendee.email}`);
                sentCount++;
            } catch (err) {
                console.error(`❌ Failed/Timed out for ${attendee.email}:`, err.message);
                failCount++;
            }
            // Small delay to keep the pool healthy
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        if (testEmail && attendee.email.toLowerCase() === testEmail.toLowerCase()) {
            console.log('✅ Test email processed. Stopping script.');
            break;
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Total processed from start index ${offset}: ${sentCount + failCount}`);
    console.log(`Successfully sent: ${sentCount}`);
    console.log(`Failed/Timed out: ${failCount}`);
    console.log('🏁 Script execution finished.');
    transporter.close();
}

sendReminders();
