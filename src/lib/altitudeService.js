import { supabase } from './supabase';

export const ALTITUDE_CATEGORIES = [
  // A. TECHNOLOGY & INNOVATION
  {
    id: 'student-dev-of-year',
    code: 'TECH-01',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'Student Developer of the Year',
    shortDesc: 'Student software engineers building high-impact web, mobile, or core systems.',
    criteria: 'Code quality, technical complexity, and real-world deployment.'
  },
  {
    id: 'ai-innovator-of-year',
    code: 'TECH-02',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'AI Innovator of the Year',
    shortDesc: 'Pioneers developing machine learning models and intelligent data systems.',
    criteria: 'Algorithmic rigor, practical novelty, and African context impact.'
  },
  {
    id: 'tech-entrepreneur-of-year',
    code: 'TECH-03',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'Outstanding Tech Entrepreneur of the Year',
    shortDesc: 'Student founders scaling commercially viable technology ventures.',
    criteria: 'Revenue traction, customer growth, and operational execution.'
  },
  {
    id: 'best-student-startup',
    code: 'TECH-04',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'Best Student Tech Startup',
    shortDesc: 'Campus-incubated ventures with exceptional traction and product design.',
    criteria: 'Product defensibility, user growth, and market opportunity.'
  },
  {
    id: 'emerging-cybersecurity',
    code: 'TECH-05',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'Emerging Cybersecurity Talent',
    shortDesc: 'Top talent securing digital infrastructure and discovering vulnerabilities.',
    criteria: 'Security architecture, vulnerability discovery, and research impact.'
  },
  {
    id: 'female-tech-talent',
    code: 'TECH-06',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'Outstanding Female Tech Talent',
    shortDesc: 'Women breaking ground in software engineering and technical leadership.',
    criteria: 'Engineering excellence, peer mentorship, and career trajectory.'
  },
  {
    id: 'tech-community-builder',
    code: 'TECH-07',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'Technology Community Builder of the Year',
    shortDesc: 'Leaders nurturing developer clubs, hackathons, and talent pipelines.',
    criteria: 'Community reach, developer mentorship, and selfless advocacy.'
  },
  {
    id: 'young-innovator',
    code: 'TECH-08',
    group: 'TECHNOLOGY & INNOVATION',
    name: 'Young Innovator of the Year',
    shortDesc: 'Young talent under 22 demonstrating remarkable technical ingenuity.',
    criteria: 'Prototype execution, technical creativity, and future potential.'
  },

  // B. CREATIVE EXCELLENCE
  {
    id: 'digital-creator-of-year',
    code: 'CREAT-01',
    group: 'CREATIVE EXCELLENCE',
    name: 'Digital Creator of the Year',
    shortDesc: 'Creators shaping African digital narratives and brand culture.',
    criteria: 'Visual craftsmanship, originality, and multi-platform presence.'
  },
  {
    id: 'graphic-designer-of-year',
    code: 'CREAT-02',
    group: 'CREATIVE EXCELLENCE',
    name: 'Graphic Designer of the Year',
    shortDesc: 'Visual artists pushing typography, editorial craft, and brand identity.',
    criteria: 'Typographic hierarchy, portfolio depth, and brand cohesion.'
  },
  {
    id: 'animator-of-year',
    code: 'CREAT-03',
    group: 'CREATIVE EXCELLENCE',
    name: 'Animator of the Year',
    shortDesc: 'Motion designers and 3D artists animating concepts with cinematic polish.',
    criteria: 'Timing, 2D/3D execution, and visual storytelling.'
  },
  {
    id: 'videographer-of-year',
    code: 'CREAT-04',
    group: 'CREATIVE EXCELLENCE',
    name: 'Videographer of the Year',
    shortDesc: 'Cinematographers crafting compelling digital stories and brand films.',
    criteria: 'Cinematography, color grading, sound design, and narrative flow.'
  },
  {
    id: 'photographer-of-year',
    code: 'CREAT-05',
    group: 'CREATIVE EXCELLENCE',
    name: 'Photographer of the Year',
    shortDesc: 'Lens artists documenting technological culture and human stories.',
    criteria: 'Composition, lighting, emotional depth, and technical clarity.'
  },
  {
    id: 'content-creator-of-year',
    code: 'CREAT-06',
    group: 'CREATIVE EXCELLENCE',
    name: 'Content Creator of the Year',
    shortDesc: 'Influential voices educating and inspiring the African tech ecosystem.',
    criteria: 'Educational value, consistency, and community uplift.'
  },
  {
    id: 'creative-innovator',
    code: 'CREAT-07',
    group: 'CREATIVE EXCELLENCE',
    name: 'Creative Innovator of the Year',
    shortDesc: 'Cross-disciplinary innovators blending design, code, and African culture.',
    criteria: 'Artistic courage, cross-disciplinary code, and novel design.'
  },

  // C. SPECIAL RECOGNITION
  {
    id: 'student-of-the-year',
    code: 'SPEC-01',
    group: 'SPECIAL RECOGNITION',
    name: 'Outstanding Student of the Year',
    shortDesc: 'Apex student honor recognizing academic, tech, and leadership excellence.',
    criteria: 'Academic standing, software projects, and peer leadership.'
  },
  {
    id: 'tech-leadership-excellence',
    code: 'SPEC-02',
    group: 'SPECIAL RECOGNITION',
    name: 'Excellence in Technology Leadership',
    shortDesc: 'Youth leaders managing major engineering teams and strategic roadmaps.',
    criteria: 'Strategic execution, team leadership, and delivery.'
  },
  {
    id: 'oou-ecosystem-contribution',
    code: 'SPEC-03',
    group: 'SPECIAL RECOGNITION',
    name: 'Outstanding Contribution to the OOU Tech Ecosystem',
    shortDesc: 'Pioneers whose mentorship elevated OOU’s technological footprint.',
    criteria: 'Campus impact, talent cultivation, and departmental elevation.'
  },
  {
    id: 'lifetime-contribution',
    code: 'SPEC-04',
    group: 'SPECIAL RECOGNITION',
    name: 'Lifetime Contribution to the OOU Technology Community',
    shortDesc: 'Highest decoration celebrating transformative, enduring technology legacy.',
    criteria: 'Generational footprint, pioneering work, and sustained impact.'
  }
];

export const CATEGORY_GROUPS = [
  'ALL NOMINEES',
  'TECHNOLOGY & INNOVATION',
  'CREATIVE EXCELLENCE',
  'SPECIAL RECOGNITION'
];

const LOCAL_STORAGE_KEY = 'altitude_nominations_v1';

// Helper: load local fallback list
function getLocalNominations() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Helper: save local fallback list
function saveLocalNominations(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

/**
 * Submit a new Altitude Award nomination
 * Status is ALWAYS 'pending', never published immediately.
 */
export async function submitAltitudeNomination(formData) {
  const referenceId = `ALT-2027-${Math.floor(10000 + Math.random() * 90000)}`;
  
  // Find category metadata
  const catObj = ALTITUDE_CATEGORIES.find(c => c.name === formData.category) || ALTITUDE_CATEGORIES[0];

  const nominationPayload = {
    reference_id: referenceId,
    nominee_name: formData.nomineeName.trim(),
    nominee_email: formData.nomineeEmail?.trim() || '',
    nominee_phone: formData.nomineePhone?.trim() || '',
    organization: formData.organization?.trim() || 'OOU, Ago-Iwoye',
    department: formData.department?.trim() || '',
    current_role: formData.currentRole?.trim() || '',
    location: formData.location?.trim() || 'Nigeria',
    category: catObj.name,
    category_id: catObj.id,
    category_code: catObj.code,
    category_group: catObj.group,
    portfolio_url: formData.portfolioUrl?.trim() || '',
    linkedin_url: formData.linkedinUrl?.trim() || '',
    instagram_url: formData.instagramUrl?.trim() || '',
    other_links: formData.otherLinks?.trim() || '',
    achievement: formData.achievement?.trim() || '',
    major_projects: formData.majorProjects?.trim() || '',
    impact_recognition: formData.impactRecognition?.trim() || '',
    why_win: formData.whyWin?.trim() || '',
    evidence_links: formData.evidenceLinks?.trim() || '',
    nominator_name: formData.nominatorName.trim(),
    nominator_email: formData.nominatorEmail.trim(),
    nominator_relationship: formData.nominatorRelationship.trim(),
    nominator_org: formData.nominatorOrg?.trim() || '',
    status: 'pending', // 'pending' | 'under_review' | 'approved' | 'rejected'
    is_published: false,
    is_featured: false,
    image_url: '', // Populated by admin only
    bio: '',
    admin_notes: '',
    submitted_at: new Date().toISOString()
  };

  let savedId = null;

  // 1. Try Supabase save to 'stories' table
  try {
    const { data, error } = await supabase
      .from('stories')
      .insert([{
        name: nominationPayload.nominee_name,
        email: nominationPayload.nominator_email,
        location: nominationPayload.organization,
        era: '2027',
        category: 'altitude_nomination',
        title: nominationPayload.category,
        content: JSON.stringify(nominationPayload)
      }])
      .select('id, created_at')
      .maybeSingle();

    if (!error && data) {
      savedId = data.id;
      nominationPayload.id = data.id;
      nominationPayload.created_at = data.created_at;
    } else {
      console.warn('Supabase stories insert error (using local storage fallback):', error);
      nominationPayload.id = `local-${Date.now()}`;
      nominationPayload.created_at = new Date().toISOString();
      savedId = nominationPayload.id;
    }
  } catch (err) {
    console.warn('Network error saving nomination:', err);
    nominationPayload.id = `local-${Date.now()}`;
    nominationPayload.created_at = new Date().toISOString();
    savedId = nominationPayload.id;
  }

  // 2. Mirror into LocalStorage for seamless offline / instant preview
  const locals = getLocalNominations();
  locals.unshift(nominationPayload);
  saveLocalNominations(locals);

  return {
    success: true,
    referenceId,
    nominationId: savedId,
    nomination: nominationPayload
  };
}

/**
 * Fetch all nominations for Admin view (all statuses)
 */
export async function fetchAllNominationsAdmin() {
  const localList = getLocalNominations();
  const resultMap = new Map();

  // Load from local storage first
  localList.forEach(item => {
    if (item.id || item.reference_id) {
      resultMap.set(item.id || item.reference_id, item);
    }
  });

  // Query Supabase stories
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('category', 'altitude_nomination')
      .order('created_at', { ascending: false });

    if (!error && data) {
      data.forEach(row => {
        try {
          const payload = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
          payload.id = row.id;
          payload.created_at = row.created_at;
          resultMap.set(row.id, payload);
        } catch (e) {
          // ignore malformed rows
        }
      });
    }
  } catch (err) {
    console.warn('Failed to fetch admin nominations from Supabase:', err);
  }

  return Array.from(resultMap.values()).sort((a, b) => 
    new Date(b.created_at || b.submitted_at || 0) - new Date(a.created_at || a.submitted_at || 0)
  );
}

/**
 * Fetch only approved AND published nominees for public showcase
 */
export async function fetchPublishedNominees() {
  const all = await fetchAllNominationsAdmin();
  // Filter strictly for approved AND published
  return all.filter(n => n.status === 'approved' && n.is_published === true);
}

/**
 * Fetch featured nominees for "The Altitude Wall"
 */
export async function fetchFeaturedNominees() {
  const published = await fetchPublishedNominees();
  return published.filter(n => n.is_featured === true);
}

/**
 * Update nomination status (e.g. 'approved', 'rejected', 'under_review', 'pending')
 */
export async function updateNominationStatus(id, newStatus, adminNotes = '') {
  const all = await fetchAllNominationsAdmin();
  const target = all.find(n => n.id === id);
  if (!target) return { success: false, error: 'Nomination not found' };

  target.status = newStatus;
  if (adminNotes) target.admin_notes = adminNotes;
  target.reviewed_at = new Date().toISOString();

  // If rejected, automatically unpublish
  if (newStatus === 'rejected') {
    target.is_published = false;
    target.is_featured = false;
  }

  // Update Supabase
  if (!String(id).startsWith('local-')) {
    try {
      await supabase
        .from('stories')
        .update({ content: JSON.stringify(target) })
        .eq('id', id);
    } catch (e) {
      console.error('Failed to update Supabase row:', e);
    }
  }

  // Update localStorage
  const locals = getLocalNominations().map(n => n.id === id ? target : n);
  saveLocalNominations(locals);

  return { success: true, nomination: target };
}

/**
 * Toggle publication of an approved nominee
 */
export async function toggleNomineePublish(id, isPublished) {
  const all = await fetchAllNominationsAdmin();
  const target = all.find(n => n.id === id);
  if (!target) return { success: false, error: 'Nomination not found' };

  if (isPublished && target.status !== 'approved') {
    return { success: false, error: 'Only approved nominations can be published.' };
  }

  target.is_published = isPublished;

  // Update Supabase
  if (!String(id).startsWith('local-')) {
    try {
      await supabase
        .from('stories')
        .update({ content: JSON.stringify(target) })
        .eq('id', id);
    } catch (e) {
      console.error('Failed to update Supabase row:', e);
    }
  }

  // Update localStorage
  const locals = getLocalNominations().map(n => n.id === id ? target : n);
  saveLocalNominations(locals);

  return { success: true, nomination: target };
}

/**
 * Toggle featured state for The Altitude Wall
 */
export async function toggleNomineeFeatured(id, isFeatured) {
  const all = await fetchAllNominationsAdmin();
  const target = all.find(n => n.id === id);
  if (!target) return { success: false, error: 'Nomination not found' };

  target.is_featured = isFeatured;

  // Update Supabase
  if (!String(id).startsWith('local-')) {
    try {
      await supabase
        .from('stories')
        .update({ content: JSON.stringify(target) })
        .eq('id', id);
    } catch (e) {
      console.error('Failed to update Supabase row:', e);
    }
  }

  // Update localStorage
  const locals = getLocalNominations().map(n => n.id === id ? target : n);
  saveLocalNominations(locals);

  return { success: true, nomination: target };
}

/**
 * Update nominee photograph and public details
 */
export async function updateNomineeProfile(id, updates) {
  const all = await fetchAllNominationsAdmin();
  const target = all.find(n => n.id === id);
  if (!target) return { success: false, error: 'Nomination not found' };

  Object.assign(target, updates);

  // Update Supabase
  if (!String(id).startsWith('local-')) {
    try {
      await supabase
        .from('stories')
        .update({ 
          name: target.nominee_name,
          title: target.category,
          location: target.organization,
          content: JSON.stringify(target) 
        })
        .eq('id', id);
    } catch (e) {
      console.error('Failed to update Supabase row:', e);
    }
  }

  // Update localStorage
  const locals = getLocalNominations().map(n => n.id === id ? target : n);
  saveLocalNominations(locals);

  return { success: true, nomination: target };
}

/**
 * Delete a nomination record (Admin only)
 */
export async function deleteNomination(id) {
  if (!String(id).startsWith('local-')) {
    try {
      await supabase.from('stories').delete().eq('id', id);
    } catch (e) {
      console.error('Failed to delete from Supabase:', e);
    }
  }

  const locals = getLocalNominations().filter(n => n.id !== id);
  saveLocalNominations(locals);

  return { success: true };
}

/**
 * Upload nominee image to Supabase Storage with local dataURL fallback
 */
export async function uploadNomineePhoto(file) {
  if (!file) throw new Error('No file provided');

  // Verify file size (< 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image file is too large. Please upload an image under 5MB.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `altitude_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `altitude/${fileName}`;

  try {
    const { data, error } = await supabase.storage
      .from('cms-images')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (!error && data) {
      const { data: urlData } = supabase.storage
        .from('cms-images')
        .getPublicUrl(filePath);

      let publicUrl = urlData.publicUrl;
      if (publicUrl && !publicUrl.includes('/public/')) {
        publicUrl = publicUrl.replace('/object/cms-images/', '/object/public/cms-images/');
      }
      return publicUrl;
    }
  } catch (err) {
    console.warn('Storage upload encountered network issue, generating local dataURL preview fallback:', err);
  }

  // Fallback to Base64 Data URL so admin can preview and publish immediately
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
