const nodemailer = require('nodemailer');

async function testSMTP() {
    console.log('Testing SMTP connection to mail.gocycle.africa on port 465 (SSL)...');
    
    let transporter = nodemailer.createTransport({
        host: 'mail.gocycle.africa',
        port: 465,
        secure: true, // SSL
        auth: {
            user: 'oftc@gocycle.africa',
            pass: 'oftc@@OOU'
        },
        tls: {
            rejectUnauthorized: false // bypass SSL cert checks if needed
        }
    });

    try {
        await transporter.verify();
        console.log('✅ SMTP connection successful on port 465!');
        return transporter;
    } catch (err) {
        console.log('❌ SMTP connection failed on port 465:', err.message);
        
        console.log('Testing SMTP connection to mail.gocycle.africa on port 587 (TLS)...');
        transporter = nodemailer.createTransport({
            host: 'mail.gocycle.africa',
            port: 587,
            secure: false, // TLS
            auth: {
                user: 'oftc@gocycle.africa',
                pass: 'oftc@@OOU'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        try {
            await transporter.verify();
            console.log('✅ SMTP connection successful on port 587!');
            return transporter;
        } catch (err2) {
            console.log('❌ SMTP connection failed on port 587:', err2.message);
            
            console.log('Testing SMTP connection to gocycle.africa on port 465 (SSL)...');
            transporter = nodemailer.createTransport({
                host: 'gocycle.africa',
                port: 465,
                secure: true,
                auth: {
                    user: 'oftc@gocycle.africa',
                    pass: 'oftc@@OOU'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            
            try {
                await transporter.verify();
                console.log('✅ SMTP connection successful on direct domain port 465!');
                return transporter;
            } catch (err3) {
                console.log('❌ SMTP connection failed on direct domain port 465:', err3.message);
            }
        }
    }
}

testSMTP();
