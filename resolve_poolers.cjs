const dns = require('dns');

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

async function scanRegions() {
    console.log('📡 Scanning region poolers for tenant addtzgrmmoybmvasmxss...');
    
    for (const region of regions) {
        // Pooler hosts look like: aws-0-[region].pooler.supabase.com
        const host = `aws-0-${region}.pooler.supabase.com`;
        
        try {
            const addresses = await new Promise((resolve, reject) => {
                dns.resolve(host, (err, addrs) => {
                    if (err) reject(err);
                    else resolve(addrs);
                });
            });
            console.log(`✅ Region ${region} resolves to:`, addresses);
        } catch(e) {
            // ENOTFOUND is expected for non-existent domains
        }
    }
    
    // Also try db host variations
    const dbHosts = [
        'db.addtzgrmmoybmvasmxss.supabase.co',
        'db.addtzgrmmoybmvasmxss.supabase.net',
        'db.addtzgrmmoybmvasmxss.supabase.red',
        'addtzgrmmoybmvasmxss.supabase.co'
    ];
    
    for (const host of dbHosts) {
        try {
            const addresses = await new Promise((resolve, reject) => {
                dns.resolve(host, (err, addrs) => {
                    if (err) reject(err);
                    else resolve(addrs);
                });
            });
            console.log(`✅ Host ${host} resolves to:`, addresses);
        } catch(e) {
            // ignore
        }
    }
}

scanRegions();
