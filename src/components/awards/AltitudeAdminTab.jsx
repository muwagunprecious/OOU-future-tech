import React, { useState, useEffect } from 'react';
import { 
  fetchAllNominationsAdmin, 
  updateNominationStatus, 
  toggleNomineePublish, 
  toggleNomineeFeatured, 
  updateNomineeProfile, 
  deleteNomination, 
  uploadNomineePhoto,
  ALTITUDE_CATEGORIES 
} from '../../lib/altitudeService';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Star, 
  Globe, 
  Trash2, 
  RefreshCw, 
  Edit3, 
  ExternalLink,
  ShieldAlert,
  AlertCircle,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

export default function AltitudeAdminTab() {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Review Modal State
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [editingBio, setEditingBio] = useState(false);
  const [editedAchievement, setEditedAchievement] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  // Load nominations
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllNominationsAdmin();
      setNominations(data);
    } catch (err) {
      console.error('Failed to load nominations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter nominations
  const filteredList = nominations.filter(item => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const nMatch = (item.nominee_name || '').toLowerCase().includes(q);
      const oMatch = (item.organization || '').toLowerCase().includes(q);
      const cMatch = (item.category || '').toLowerCase().includes(q);
      const refMatch = (item.reference_id || '').toLowerCase().includes(q);
      const nominatorMatch = (item.nominator_name || '').toLowerCase().includes(q);
      if (!nMatch && !oMatch && !cMatch && !refMatch && !nominatorMatch) return false;
    }
    return true;
  });

  // Calculate stats
  const stats = {
    total: nominations.length,
    pending: nominations.filter(n => n.status === 'pending').length,
    underReview: nominations.filter(n => n.status === 'under_review').length,
    approved: nominations.filter(n => n.status === 'approved').length,
    rejected: nominations.filter(n => n.status === 'rejected').length,
    published: nominations.filter(n => n.is_published).length,
    featured: nominations.filter(n => n.is_featured).length,
  };

  // Open review modal
  const openReview = (nomination) => {
    setSelectedNomination(nomination);
    setAdminNotes(nomination.admin_notes || '');
    setEditedAchievement(nomination.achievement || '');
    setEditedRole(nomination.current_role || '');
    setEditingBio(false);
    setActionMessage(null);
  };

  // Close review modal
  const closeReview = () => {
    setSelectedNomination(null);
    setActionMessage(null);
  };

  // Handle Status Update
  const handleStatusChange = async (newStatus) => {
    if (!selectedNomination) return;
    setStatusUpdating(true);
    try {
      const res = await updateNominationStatus(selectedNomination.id, newStatus, adminNotes);
      if (res.success) {
        setSelectedNomination(res.nomination);
        setActionMessage({ type: 'success', text: `Status updated to ${newStatus.toUpperCase()}` });
        await loadData();
      }
    } catch (e) {
      setActionMessage({ type: 'error', text: 'Failed to update status.' });
    } finally {
      setStatusUpdating(false);
    }
  };

  // Handle Publish Toggle
  const handleTogglePublish = async () => {
    if (!selectedNomination) return;
    const nextState = !selectedNomination.is_published;
    if (nextState && selectedNomination.status !== 'approved') {
      alert('Only approved nominations can be published to the public registry.');
      return;
    }
    try {
      const res = await toggleNomineePublish(selectedNomination.id, nextState);
      if (res.success) {
        setSelectedNomination(res.nomination);
        setActionMessage({ 
          type: 'success', 
          text: nextState ? 'Nominee published to public registry!' : 'Nominee unpublished from public view.' 
        });
        await loadData();
      }
    } catch (e) {
      alert('Error updating publication status.');
    }
  };

  // Handle Featured Toggle
  const handleToggleFeatured = async () => {
    if (!selectedNomination) return;
    const nextState = !selectedNomination.is_featured;
    try {
      const res = await toggleNomineeFeatured(selectedNomination.id, nextState);
      if (res.success) {
        setSelectedNomination(res.nomination);
        setActionMessage({ 
          type: 'success', 
          text: nextState ? 'Inducted to The Altitude Wall!' : 'Removed from The Altitude Wall.' 
        });
        await loadData();
      }
    } catch (e) {
      alert('Error updating featured status.');
    }
  };

  // Handle Photo Upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedNomination) return;

    setUploadingPhoto(true);
    try {
      const uploadedUrl = await uploadNomineePhoto(file);
      const res = await updateNomineeProfile(selectedNomination.id, { image_url: uploadedUrl });
      if (res.success) {
        setSelectedNomination(res.nomination);
        setActionMessage({ type: 'success', text: 'Nominee photograph updated successfully!' });
        await loadData();
      }
    } catch (err) {
      alert(err.message || 'Failed to upload photo.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Save Bio / Role Edits
  const handleSaveBio = async () => {
    if (!selectedNomination) return;
    try {
      const res = await updateNomineeProfile(selectedNomination.id, {
        achievement: editedAchievement,
        current_role: editedRole
      });
      if (res.success) {
        setSelectedNomination(res.nomination);
        setEditingBio(false);
        setActionMessage({ type: 'success', text: 'Nominee bio details saved!' });
        await loadData();
      }
    } catch (e) {
      alert('Error saving bio changes.');
    }
  };

  // Delete Nomination
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this nomination record?')) return;
    try {
      await deleteNomination(id);
      if (selectedNomination?.id === id) closeReview();
      await loadData();
    } catch (e) {
      alert('Failed to delete nomination.');
    }
  };

  // Export CSV for jury evaluation
  const exportCSV = () => {
    if (nominations.length === 0) return alert('No nominations to export.');
    
    const headers = [
      'Reference Code',
      'Nominee Name',
      'Category Code',
      'Category',
      'University/Org',
      'Role',
      'Status',
      'Is Published',
      'Is Featured',
      'Achievement',
      'Why Win',
      'Nominator Name',
      'Nominator Email',
      'Relationship',
      'Submission Date'
    ];

    const rows = nominations.map(n => [
      `"${n.reference_id || ''}"`,
      `"${(n.nominee_name || '').replace(/"/g, '""')}"`,
      `"${n.category_code || ''}"`,
      `"${(n.category || '').replace(/"/g, '""')}"`,
      `"${(n.organization || '').replace(/"/g, '""')}"`,
      `"${(n.current_role || '').replace(/"/g, '""')}"`,
      `"${n.status || 'pending'}"`,
      `"${n.is_published ? 'YES' : 'NO'}"`,
      `"${n.is_featured ? 'YES' : 'NO'}"`,
      `"${(n.achievement || '').replace(/"/g, '""')}"`,
      `"${(n.why_win || '').replace(/"/g, '""')}"`,
      `"${(n.nominator_name || '').replace(/"/g, '""')}"`,
      `"${(n.nominator_email || '').replace(/"/g, '""')}"`,
      `"${(n.nominator_relationship || '').replace(/"/g, '""')}"`,
      `"${n.submitted_at || n.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Altitude_Awards_2027_Jury_Dossier_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
      {/* Title & Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#E31B2B',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={18} />
            </div>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.6rem', margin: 0, textTransform: 'uppercase' }}>
              The Altitude Awards 2027 Panel
            </h2>
          </div>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#71717a' }}>
            Jury Review, Nomination Approvals, Photography Curation & The Altitude Wall Inductions
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={exportCSV}
            style={{
              padding: '0.6rem 1.1rem',
              background: '#000',
              color: '#fff',
              border: '2px solid #000',
              borderRadius: '8px',
              fontFamily: 'Outfit',
              fontWeight: 900,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '3px 3px 0 #000'
            }}
          >
            <Download size={14} /> EXPORT JURY DOSSIER (CSV)
          </button>

          <button
            onClick={loadData}
            style={{
              padding: '0.6rem 1rem',
              background: '#fff',
              color: '#000',
              border: '2px solid #000',
              borderRadius: '8px',
              fontFamily: 'Outfit',
              fontWeight: 900,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '3px 3px 0 #000'
            }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> REFRESH
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '1rem', padding: '1.25rem', boxShadow: '4px 4px 0 #000' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'Outfit', fontWeight: 900, color: '#71717a' }}>TOTAL NOMINATIONS</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 900, color: '#000', marginTop: '0.2rem' }}>{stats.total}</div>
        </div>

        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '1rem', padding: '1.25rem', boxShadow: '4px 4px 0 #000' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'Outfit', fontWeight: 900, color: '#F59E0B' }}>PENDING</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 900, color: '#F59E0B', marginTop: '0.2rem' }}>{stats.pending}</div>
        </div>

        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '1rem', padding: '1.25rem', boxShadow: '4px 4px 0 #000' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'Outfit', fontWeight: 900, color: '#3B82F6' }}>UNDER REVIEW</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 900, color: '#3B82F6', marginTop: '0.2rem' }}>{stats.underReview}</div>
        </div>

        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '1rem', padding: '1.25rem', boxShadow: '4px 4px 0 #000' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'Outfit', fontWeight: 900, color: '#16A34A' }}>APPROVED</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 900, color: '#16A34A', marginTop: '0.2rem' }}>{stats.approved}</div>
        </div>

        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '1rem', padding: '1.25rem', boxShadow: '4px 4px 0 #000' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'Outfit', fontWeight: 900, color: '#059669' }}>PUBLICLY SHOWN</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 900, color: '#059669', marginTop: '0.2rem' }}>{stats.published}</div>
        </div>

        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '1rem', padding: '1.25rem', boxShadow: '4px 4px 0 #000' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'Outfit', fontWeight: 900, color: '#D97706' }}>ALTITUDE WALL</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 900, color: '#D97706', marginTop: '0.2rem' }}>{stats.featured}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#fff',
        border: '3px solid #000',
        borderRadius: '1rem',
        padding: '1.25rem',
        boxShadow: '4px 4px 0 #000',
        marginBottom: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search nominee, role, or ref code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem 0.6rem 2.4rem',
              border: '2px solid #000',
              borderRadius: '8px',
              fontFamily: 'Outfit',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              border: '2px solid #000',
              borderRadius: '8px',
              fontFamily: 'Outfit',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              border: '2px solid #000',
              borderRadius: '8px',
              fontFamily: 'Outfit',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            <option value="all">All 19 Categories</option>
            {ALTITUDE_CATEGORIES.map(c => (
              <option key={c.id} value={c.name}>[{c.code}] {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Nominations Table */}
      <div style={{
        background: '#fff',
        border: '3px solid #000',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        boxShadow: '6px 6px 0 #000',
        marginBottom: '2rem'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'Outfit' }}>
            <thead>
              <tr style={{ background: '#f4f4f5', borderBottom: '3px solid #000' }}>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>Ref / Code</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>Nominee</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>Award Category</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase' }}>Public</th>
                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((n) => {
                  const statusColors = {
                    pending: { bg: '#FEF3C7', text: '#B45309' },
                    under_review: { bg: '#DBEAFE', text: '#1E40AF' },
                    approved: { bg: '#DCFCE7', text: '#15803D' },
                    rejected: { bg: '#FEE2E2', text: '#B91C1C' }
                  };
                  const color = statusColors[n.status] || statusColors.pending;

                  return (
                    <tr key={n.id || n.reference_id} style={{ borderBottom: '1px solid #e4e4e7' }}>
                      {/* Ref */}
                      <td style={{ padding: '1rem', fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700 }}>
                        {n.reference_id || 'ALT-2027'}
                      </td>

                      {/* Nominee */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{n.nominee_name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#71717a' }}>
                          {n.current_role} • {n.organization}
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '1rem', fontSize: '0.8rem' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.2rem 0.5rem',
                          background: '#f4f4f5',
                          borderRadius: '4px',
                          border: '1px solid #d4d4d8',
                          fontWeight: 700
                        }}>
                          [{n.category_code || 'HONORIS'}] {n.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          background: color.bg,
                          color: color.text,
                          fontWeight: 800,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase'
                        }}>
                          {n.status || 'pending'}
                        </span>
                      </td>

                      {/* Public Status */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          {n.is_published ? (
                            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#16a34a' }}>LIVE</span>
                          ) : (
                            <span style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>HIDDEN</span>
                          )}
                          {n.is_featured && (
                            <Star size={13} fill="#f59e0b" color="#f59e0b" title="Altitude Wall Featured" />
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => openReview(n)}
                            style={{
                              padding: '0.4rem 0.85rem',
                              background: '#000',
                              color: '#fff',
                              border: '2px solid #000',
                              borderRadius: '6px',
                              fontFamily: 'Outfit',
                              fontWeight: 800,
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            REVIEW DOSSIER
                          </button>

                          <button
                            onClick={() => handleDelete(n.id)}
                            style={{
                              padding: '0.4rem',
                              background: '#fee2e2',
                              color: '#b91c1c',
                              border: '2px solid #b91c1c',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                            title="Delete record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#71717a', fontSize: '0.9rem' }}>
                    No nominations match your current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL DOSSIER REVIEW MODAL */}
      {selectedNomination && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: '#fff',
            border: '4px solid #000',
            borderRadius: '1.5rem',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '10px 10px 0 #000',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 800, color: '#E31B2B' }}>
                  [{selectedNomination.category_code || 'HONORIS'}] // {selectedNomination.category}
                </span>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', margin: '0.2rem 0 0 0' }}>
                  {selectedNomination.nominee_name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#71717a' }}>
                  Dossier Ref: {selectedNomination.reference_id} • Organization: {selectedNomination.organization}
                </div>
              </div>

              <button
                onClick={closeReview}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 900
                }}
              >
                ✕
              </button>
            </div>

            {/* Action Feedback Banner */}
            {actionMessage && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: actionMessage.type === 'success' ? '#DCFCE7' : '#FEE2E2',
                color: actionMessage.type === 'success' ? '#15803D' : '#B91C1C',
                border: `2px solid ${actionMessage.type === 'success' ? '#15803D' : '#B91C1C'}`
              }}>
                {actionMessage.text}
              </div>
            )}

            {/* Dossier Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '2rem' }}>
              {/* Left Column: Photo & Controls */}
              <div>
                {/* Photo preview */}
                <div style={{
                  border: '3px solid #000',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  height: '240px',
                  background: '#f4f4f5',
                  marginBottom: '1rem',
                  position: 'relative'
                }}>
                  <img
                    src={selectedNomination.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                    alt="Nominee portrait"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {selectedNomination.is_featured && (
                    <span style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      background: '#f59e0b',
                      color: '#000',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontWeight: 900,
                      fontSize: '0.65rem'
                    }}>
                      ALTITUDE WALL
                    </span>
                  )}
                </div>

                {/* Upload Photo Button */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem',
                    background: '#f4f4f5',
                    border: '2px solid #000',
                    borderRadius: '8px',
                    fontFamily: 'Outfit',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    cursor: uploadingPhoto ? 'wait' : 'pointer'
                  }}>
                    <Upload size={14} />
                    <span>{uploadingPhoto ? 'UPLOADING...' : 'UPLOAD OFFICIAL PHOTO'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Status Selector */}
                <div style={{
                  background: '#f8f8f8',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                    CHANGE JURY STATUS:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleStatusChange('under_review')}
                      disabled={statusUpdating}
                      style={{
                        padding: '0.45rem',
                        background: selectedNomination.status === 'under_review' ? '#3B82F6' : '#fff',
                        color: selectedNomination.status === 'under_review' ? '#fff' : '#000',
                        border: '2px solid #000',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      UNDER REVIEW
                    </button>

                    <button
                      onClick={() => handleStatusChange('approved')}
                      disabled={statusUpdating}
                      style={{
                        padding: '0.45rem',
                        background: selectedNomination.status === 'approved' ? '#16A34A' : '#fff',
                        color: selectedNomination.status === 'approved' ? '#fff' : '#000',
                        border: '2px solid #000',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      APPROVE
                    </button>

                    <button
                      onClick={() => handleStatusChange('rejected')}
                      disabled={statusUpdating}
                      style={{
                        padding: '0.45rem',
                        background: selectedNomination.status === 'rejected' ? '#EF4444' : '#fff',
                        color: selectedNomination.status === 'rejected' ? '#fff' : '#000',
                        border: '2px solid #000',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      REJECT
                    </button>

                    <button
                      onClick={() => handleStatusChange('pending')}
                      disabled={statusUpdating}
                      style={{
                        padding: '0.45rem',
                        background: selectedNomination.status === 'pending' ? '#F59E0B' : '#fff',
                        color: selectedNomination.status === 'pending' ? '#fff' : '#000',
                        border: '2px solid #000',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      RESET PENDING
                    </button>
                  </div>
                </div>

                {/* Publication & Wall Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={handleTogglePublish}
                    style={{
                      padding: '0.6rem',
                      background: selectedNomination.is_published ? '#059669' : '#000',
                      color: '#fff',
                      border: '2px solid #000',
                      borderRadius: '8px',
                      fontFamily: 'Outfit',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Globe size={14} />
                    <span>{selectedNomination.is_published ? 'UNPUBLISH FROM PUBLIC SITE' : 'PUBLISH TO NOMINEES REGISTRY'}</span>
                  </button>

                  <button
                    onClick={handleToggleFeatured}
                    style={{
                      padding: '0.6rem',
                      background: selectedNomination.is_featured ? '#D97706' : '#fff',
                      color: selectedNomination.is_featured ? '#fff' : '#000',
                      border: '2px solid #000',
                      borderRadius: '8px',
                      fontFamily: 'Outfit',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Star size={14} />
                    <span>{selectedNomination.is_featured ? 'REMOVE FROM ALTITUDE WALL' : 'FEATURE ON THE ALTITUDE WALL'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: In-Depth Merit Data */}
              <div>
                {/* Role / Achievement Editor */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: '#71717a' }}>
                      Nominee Achievement Dossier
                    </span>
                    <button
                      onClick={() => setEditingBio(!editingBio)}
                      style={{ background: 'none', border: 'none', color: '#000', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                    >
                      <Edit3 size={12} /> {editingBio ? 'Cancel Edit' : 'Edit Description'}
                    </button>
                  </div>

                  {editingBio ? (
                    <div>
                      <input
                        type="text"
                        value={editedRole}
                        onChange={(e) => setEditedRole(e.target.value)}
                        placeholder="Current Role"
                        style={{ width: '100%', padding: '0.5rem', border: '2px solid #000', borderRadius: '6px', marginBottom: '0.5rem', fontFamily: 'Outfit' }}
                      />
                      <textarea
                        value={editedAchievement}
                        onChange={(e) => setEditedAchievement(e.target.value)}
                        rows={4}
                        style={{ width: '100%', padding: '0.5rem', border: '2px solid #000', borderRadius: '6px', marginBottom: '0.5rem', fontFamily: 'Outfit' }}
                      />
                      <button
                        onClick={handleSaveBio}
                        style={{ padding: '0.4rem 0.8rem', background: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        Save Bio Updates
                      </button>
                    </div>
                  ) : (
                    <div style={{ background: '#f8f8f8', border: '2px solid #000', borderRadius: '8px', padding: '1rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                        {selectedNomination.current_role}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
                        "{selectedNomination.achievement}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Major Projects */}
                {selectedNomination.major_projects && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: '#71717a' }}>
                      Major Projects & Innovations:
                    </span>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      {selectedNomination.major_projects}
                    </p>
                  </div>
                )}

                {/* Why Win */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: '#E31B2B' }}>
                    Jury Statement (Why Win):
                  </span>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{selectedNomination.why_win}"
                  </p>
                </div>

                {/* Nominator Information */}
                <div style={{ background: '#f4f4f5', border: '1px solid #d4d4d8', borderRadius: '8px', padding: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#71717a', marginBottom: '0.3rem' }}>
                    CONFIDENTIAL NOMINATOR ATTESTATION
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                    {selectedNomination.nominator_name} ({selectedNomination.nominator_relationship})
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#52525b' }}>
                    Email: {selectedNomination.nominator_email} • Org: {selectedNomination.nominator_org || 'N/A'}
                  </div>
                </div>

                {/* Evidence Links */}
                {selectedNomination.evidence_links && (
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: '#71717a' }}>
                      Evidence Links:
                    </span>
                    <div style={{ fontSize: '0.8rem', color: '#2563EB', wordBreak: 'break-all' }}>
                      {selectedNomination.evidence_links}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '2px solid #000' }}>
              <button
                onClick={closeReview}
                style={{
                  padding: '0.6rem 1.5rem',
                  background: '#000',
                  color: '#fff',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  fontFamily: 'Outfit',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                DONE REVIEWING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
