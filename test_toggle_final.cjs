
const http = require('http');

console.log('📡 Testing Toggle API on port 3001...');

const postData = JSON.stringify({
    ticket_id: '#OOU-3935',
    checked_in: true
});

const options = {
    hostname: '127.0.0.1',
    port: 3001,
    path: '/api/toggle-check-in',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode}`);
        try {
            const parsed = JSON.parse(data);
            console.log(`✅ Updated: ${parsed.ticket_id}, checked_in: ${parsed.checked_in}`);
        } catch (e) {
            console.log(`❌ Failed to parse response: ${data}`);
        }
        process.exit(0);
    });
});

req.on('error', (e) => {
    console.error(`❌ Request error: ${e.message}`);
    process.exit(1);
});

req.write(postData);
req.end();

setTimeout(() => {
    console.log('❌ Timeout reached');
    process.exit(1);
}, 10000);
