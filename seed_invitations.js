import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🌱 Seeding sample test registrations with pending approval...');

  const sampleApplicants = [
    {
      name: 'Olumide Fashola',
      email: 'olumide.founder@ooufuturetech.com',
      ticket_type: 'Standard',
      ticket_id: 'FT2027-1042',
      whatsapp_number: '+2348031234567',
      company_name: 'STATUS:PENDING • PayFlow Labs',
      products: JSON.stringify({
        category: 'Founder',
        status: 'pending',
        phone: '+2348031234567',
        travel_class: 'Standard',
        company: 'PayFlow Labs',
        submitted_at: new Date().toISOString()
      })
    },
    {
      name: 'Amina Bello',
      email: 'amina.design@ooufuturetech.com',
      ticket_type: 'Standard',
      ticket_id: 'FT2027-2089',
      whatsapp_number: '+2348149876543',
      company_name: 'STATUS:PENDING',
      products: JSON.stringify({
        category: 'Creative',
        status: 'pending',
        phone: '+2348149876543',
        travel_class: 'Standard',
        submitted_at: new Date().toISOString()
      })
    },
    {
      name: 'Chukwudi Eze',
      email: 'chukwudi.tech@ooufuturetech.com',
      ticket_type: 'Standard',
      ticket_id: 'FT2027-3156',
      whatsapp_number: '+2347065551234',
      company_name: 'STATUS:PENDING',
      products: JSON.stringify({
        category: 'Techie',
        status: 'pending',
        phone: '+2347065551234',
        travel_class: 'Standard',
        submitted_at: new Date().toISOString()
      })
    },
    {
      name: 'Tolani Adeleke',
      email: 'tolani.ecosystem@ooufuturetech.com',
      ticket_type: 'Pro',
      ticket_id: 'FT2027-4921',
      whatsapp_number: '+2348094443322',
      company_name: 'STATUS:PENDING • Apex AI Studio',
      products: JSON.stringify({
        category: 'Others',
        status: 'pending',
        phone: '+2348094443322',
        travel_class: 'Pro',
        company: 'Apex AI Studio',
        exhibit_details: 'Autonomous workflow agent platform for African logistics',
        submitted_at: new Date().toISOString()
      })
    }
  ];

  for (const applicant of sampleApplicants) {
    const { data: existing } = await supabase
      .from('registrations')
      .select('id, email')
      .eq('email', applicant.email)
      .maybeSingle();

    if (existing) {
      console.log(`ℹ️ Record for ${applicant.email} already exists (ID: ${existing.id}).`);
    } else {
      const { error } = await supabase
        .from('registrations')
        .insert([applicant]);

      if (error) {
        console.error(`❌ Failed to insert ${applicant.name}:`, error.message);
      } else {
        console.log(`✅ Seeded ${applicant.name} [${applicant.products ? JSON.parse(applicant.products).category : ''}] - ${applicant.ticket_id}`);
      }
    }
  }

  // Count pending records
  const { data: pending } = await supabase
    .from('registrations')
    .select('id, name, ticket_id, company_name, products')
    .ilike('company_name', '%STATUS:PENDING%')
    .limit(10);

  console.log(`\n📊 Verified pending registrations in DB:`, pending?.length || 0);
  if (pending && pending.length > 0) {
    pending.forEach(p => console.log(` - ${p.name} (${p.ticket_id}): ${p.company_name}`));
  }
}

seed();
