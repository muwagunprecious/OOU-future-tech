
const http = require('http');

console.log('📡 Fetching 5 attendees from port 3001...');

http.get('http://127.0.0.1:3001/api/attendees', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            console.log(`✅ Status: ${res.statusCode}`);
            const parsed = JSON.parse(data);
            if (parsed.length > 0) {
                console.log('✅ First item raw:', JSON.stringify(parsed[0], null, 2));
            }
            console.log('✅ Attendees:');
            parsed.slice(0, 5).forEach(a => {
                console.log(`- ${a.name} (ID: ${a.ticket_id}) [Checked In: ${a.checked_in}]`);
            });
        } catch (e) {
            console.log('❌ Error parsing:', data.substring(0, 100));
            console.log(e);
        }
        process.exit(0);
    });
}).on('error', (e) => {
    console.error('❌ Error:', e.message);
    process.exit(1);
});
