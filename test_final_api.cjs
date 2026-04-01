
const http = require('http');

console.log('📡 Testing Local API on port 3001...');

const req = http.get('http://127.0.0.1:3001/api/attendees', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode}`);
        try {
            const parsed = JSON.parse(data);
            console.log(`✅ Data count: ${parsed.length}`);
            if (parsed.length > 0) {
                console.log(`✅ Sample: ${parsed[0].name} (${parsed[0].ticket_id})`);
            }
        } catch (e) {
            console.log(`❌ Failed to parse response: ${data.substring(0, 100)}`);
        }
        process.exit(0);
    });
});

req.on('error', (e) => {
    console.error(`❌ Request error: ${e.message}`);
    process.exit(1);
});

setTimeout(() => {
    console.log('❌ Timeout reached');
    process.exit(1);
}, 10000);
