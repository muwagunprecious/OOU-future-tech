const fs = require('fs');
const path = require('path');

const recipientsPath = path.join(__dirname, 'recipients.json');

if (!fs.existsSync(recipientsPath)) {
    console.log('❌ recipients.json not found!');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(recipientsPath, 'utf8'));

let resetCount = 0;
data.forEach(r => {
    if (r.status === 'failed') {
        r.status = 'pending';
        delete r.error;
        resetCount++;
    }
});

fs.writeFileSync(recipientsPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`✅ Reset ${resetCount} failed recipients back to 'pending'.`);
