const { execSync } = require('child_process');
const port = 3001;
console.log(`🔍 Searching for processes on port ${port}...`);
try {
    const stdout = execSync(`netstat -ano | findstr :${port}`).toString();
    const lines = stdout.split('\r\n').filter(line => line.trim());
    const pids = new Set();
    lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0' && /^\d+$/.test(pid)) pids.add(pid);
    });
    console.log(`Found PIDs: ${Array.from(pids).join(', ')}`);
    pids.forEach(pid => {
        console.log(`🚀 Killing PID ${pid}...`);
        try { execSync(`taskkill /F /PID ${pid}`); } catch (e) { console.error(`Failed to kill ${pid}: ${e.message}`); }
    });
} catch (e) {
    console.log(`No active processes found on port ${port} or error occurred.`);
}
console.log('✅ Port cleanup complete.');
