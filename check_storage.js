import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvghrhwkwlydpdlenrzo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z2hyaHdrd2x5ZHBkbGVucnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjE5ODEsImV4cCI6MjA4NzQzNzk4MX0.Bdrw5gQqcoVIwonYoMIfFno3BcnxnIfEIVumbWEnkx8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("📡 Testing Supabase Storage API directly...");

    try {
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            console.error("❌ Error listing buckets:", error.message);
            console.log("Full error detail:", JSON.stringify(error, null, 2));
        } else {
            console.log("✅ Connection Successful!");
            console.log("Available Buckets:", buckets.map(b => b.name).join(", "));

            const hasCmsImages = buckets.find(b => b.name === 'cms-images');
            if (hasCmsImages) {
                console.log("🚀 'cms-images' bucket EXIST!");
                console.log("   Public Access:", hasCmsImages.public ? "ENABLED" : "DISABLED");
            } else {
                console.log("❌ 'cms-images' bucket DOES NOT EXIST.");
                console.log("💡 You MUST create a bucket named 'cms-images' in your Supabase Dashboard.");
            }
        }
    } catch (e) {
        console.error("❌ Fatal Script Error:", e.message);
    }
}

check();
