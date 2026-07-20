const { Client } = require('pg');

const regions = [
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'ap-southeast-1',
    'ap-northeast-1',
    'sa-east-1'
];

async function scanPoolers() {
    console.log('📡 Scanning active database poolers for tenant addtzgrmmoybmvasmxss...');
    
    for (const region of regions) {
        const host = `aws-0-${region}.pooler.supabase.com`;
        // Try both pooled port 6543 and direct port 5432
        const connectionString = `postgresql://postgres.addtzgrmmoybmvasmxss:YZ8dY*fqxk$h+*j@${host}:6543/postgres?pgbouncer=true`;
        
        const client = new Client({
            connectionString: connectionString,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 3000 // 3 seconds timeout
        });
        
        try {
            await client.connect();
            console.log(`🎉 SUCCESS! Region ${region} connected!`);
            const res = await client.query('SELECT now()');
            console.log('Time:', res.rows[0]);
            await client.end();
            return; // We found it!
        } catch(e) {
            if (e.message.includes('tenant/user') || e.message.includes('ENOTFOUND')) {
                // Not this region
            } else {
                console.log(`⚠️ Region ${region} failed with different error:`, e.message);
            }
        }
    }
    console.log('Scan completed. No active region connected.');
}

scanPoolers();
