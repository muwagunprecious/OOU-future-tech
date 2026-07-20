const fs = require('fs');
const path = require('path');

const recipientsPath = path.join(__dirname, 'recipients.json');

if (!fs.existsSync(recipientsPath)) {
    console.log('❌ recipients.json not found!');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(recipientsPath, 'utf8'));

const statusCounts = {};
data.forEach(r => {
    const status = r.status || 'pending';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
});

console.log('📊 Recipients Status Summary:');
console.log(JSON.stringify(statusCounts, null, 2));

const failedList = data.filter(r => r.status === 'failed');
if (failedList.length > 0) {
    console.log(`\n❌ Failed List (first 5):`);
    console.log(failedList.slice(0, 5).map(r => `${r.email}: ${r.error}`));
}
