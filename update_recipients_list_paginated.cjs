const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manual .env parser
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2 && !parts[0].trim().startsWith('#')) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const db1 = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
const db2 = createClient(env.NEW_SUPABASE_URL, env.NEW_SUPABASE_ANON_KEY);

async function fetchAllFromTable(supabaseClient, tableName, fields = 'email, name') {
    let allData = [];
    let start = 0;
    const limit = 1000;
    let hasMore = true;

    console.log(`📡 Fetching paginated data from table: ${tableName}...`);
    while (hasMore) {
        const end = start + limit - 1;
        const { data, error } = await supabaseClient
            .from(tableName)
            .select(fields)
            .range(start, end);

        if (error) {
            console.error(`❌ Error fetching ${tableName} range [${start}-${end}]:`, error.message);
            break;
        }

        if (data && data.length > 0) {
            allData = allData.concat(data);
            console.log(`   Fetched ${data.length} records (Total so far: ${allData.length})`);
            start += limit;
        } else {
            hasMore = false;
        }
    }
    return allData;
}

async function reprepareRecipients() {
    // 1. Load existing recipients
    const recipientsFile = path.join(__dirname, 'recipients.json');
    let existingRecipients = [];
    if (fs.existsSync(recipientsFile)) {
        existingRecipients = JSON.parse(fs.readFileSync(recipientsFile, 'utf8'));
    }
    console.log(`📁 Loaded ${existingRecipients.length} existing recipients from recipients.json.`);

    // Map of existing email -> full object
    const existingMap = new Map();
    existingRecipients.forEach(r => {
        existingMap.set(r.email.trim().toLowerCase(), r);
    });

    // 2. Fetch all from both databases paginated
    const reg1 = await fetchAllFromTable(db1, 'registrations');
    const founders1 = await fetchAllFromTable(db1, 'founders_applications');
    const reg2 = await fetchAllFromTable(db2, 'registrations');

    console.log(`\n📊 Query Results:`);
    console.log(`- New DB registrations: ${reg1.length}`);
    console.log(`- New DB co-founders: ${founders1.length}`);
    console.log(`- Old DB registrations: ${reg2.length}`);

    // Helper to validate and add
    let newCount = 0;
    const addOrUpdate = (item) => {
        if (!item || !item.email) return;
        const email = item.email.trim().toLowerCase();
        
        // Basic validation
        if (email.includes('@') && email.includes('.') && !email.includes('test') && !email.includes('example.com')) {
            const name = item.name ? item.name.trim() : 'Innovator';
            
            if (!existingMap.has(email)) {
                // Newly discovered email! Mark as pending
                existingMap.set(email, {
                    email,
                    name,
                    status: 'pending'
                });
                newCount++;
            }
        }
    };

    // Process all fetched rows
    reg1.forEach(addOrUpdate);
    founders1.forEach(addOrUpdate);
    reg2.forEach(addOrUpdate);

    // Convert back to array
    const updatedRecipients = Array.from(existingMap.values());

    console.log(`\n✅ Finished merging!`);
    console.log(`- Total unique emails in list now: ${updatedRecipients.length}`);
    console.log(`- Newly added pending emails: ${newCount}`);

    // Save back to recipients.json
    fs.writeFileSync(recipientsFile, JSON.stringify(updatedRecipients, null, 2), 'utf8');
    console.log(`💾 Saved updated list to recipients.json.`);
}

reprepareRecipients();
