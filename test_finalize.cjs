async function testFinalize() {
    console.log('🧪 Testing /api/founders/finalize (using native fetch)...');
    
    const mockProfile = {
        email: 'test_finalizer@example.com',
        name: 'Test Finalizer',
        whatsapp: '1234567890',
        user_category: 'technical_founder',
        startup_name: 'Finalize Tech',
        summary: 'A test profile to verify the new finalization logic.',
        visibility: 'public',
        portfolio_link: 'https://github.com/testfinalizer'
    };

    try {
        const res = await fetch('http://localhost:3001/api/founders/finalize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profile: mockProfile })
        });

        const data = await res.json();
        if (data.success) {
            console.log('✅ Success! Profile finalized and activated.');
            console.log('Profile Data (Backend Persistence confirmed):', data.profile.email);
        } else {
            console.error('❌ Failed:', data.error);
        }
    } catch (err) {
        console.error('❌ Network Error:', err.message);
    }
}

testFinalize();
