const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://addtzgrmmoybmvasmxss.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZHR6Z3JtbW95Ym12YXNteHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjA5NjQsImV4cCI6MjA4OTIzNjk2NH0.3HxmO3dim9C3gSR7TvYNiEUvu0NgiItDIZgB1408rN4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixMayokun() {
    const email = 'ademuwagunmayokun@gmail.com';
    const productsObj = {
        level: 'Beginner',
        admitted: true,
        rejected: false,
        cohort: 'Cohort 1',
        track: 'Product Design (UI/UX)',
        admitted_at: new Date().toISOString()
    };

    const { error } = await supabase
        .from('registrations')
        .update({
            ticket_type: 'tech_waitlist_product_design_(ui/ux)',
            company_name: 'Product Design (UI/UX)',
            products: JSON.stringify(productsObj)
        })
        .ilike('email', email);

    if (error) {
        console.error('Error updating Mayokun:', error);
    } else {
        console.log('✅ Successfully updated Mayokun in Supabase! Ticket type set to tech_waitlist_product_design_(ui/ux) and admitted = true.');
    }
}

fixMayokun();
