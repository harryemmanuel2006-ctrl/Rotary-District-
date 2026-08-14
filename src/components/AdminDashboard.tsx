import React, { useState } from 'react';
import {
  Shield,
  Settings,
  Calendar,
  Building2,
  Heart,
  Award,
  Save,
  Plus,
  Trash2,
  X,
  CheckCircle,
  Users,
  CreditCard,
  FileText,
  DollarSign,
  TrendingUp,
  Megaphone,
  Printer,
  Edit,
  Eye,
  Check,
  AlertCircle,
  Camera,
  Video,
  Play,
  Clock,
  Sparkles,
  TreePine,
  Activity,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { MembershipStatus, DigitalReceipt, DistrictProject, ImpactStory, PhotoGalleryItem, DistrictAnnouncement, DistrictEvent } from '../types';
import { DigitalReceiptModal } from './DigitalReceiptModal';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    districtInfo,
    updateDistrictInfo,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    eventRegistrations,
    membershipFees,
    addMembershipFee,
    updateMembershipFee,
    deleteMembershipFee,
    applications,
    updateApplicationStatus,
    members,
    membershipPayments,
    projects,
    addProject,
    updateProject,
    deleteProject,
    addProjectUpdate,
    impactStories,
    addImpactStory,
    updateImpactStory,
    deleteImpactStory,
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    projectDonations,
    digitalReceipts,
    clubs,
    addClub,
    resetToDefaults,
  } = useData();

  const [activeTab, setActiveTab] = useState<
    | 'announcements'
    | 'events'
    | 'projects'
    | 'impact_stories'
    | 'gallery'
    | 'applications'
    | 'fees'
    | 'dues_payments'
    | 'event_regs'
    | 'members'
    | 'donations'
    | 'receipts'
    | 'analytics'
    | 'info'
  >('announcements');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Updates saved successfully!');
  const [selectedReceipt, setSelectedReceipt] = useState<DigitalReceipt | null>(null);

  const showToast = (msg = 'Changes saved successfully!') => {
    setSuccessMessage(msg);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Editable District Info state
  const [infoForm, setInfoForm] = useState(districtInfo);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Seminar',
    acronym: '',
    formattedDate: '',
    date: '2026-08-20',
    time: '09:00 AM',
    location: '',
    city: '',
    state: 'Bayelsa',
    description: '',
    contactPerson: 'Rtn. Secretariat Officer',
    contactPhone: '+234 806 802 1958',
    eventFeeNgn: 0,
    isUpcoming: true,
  });

  // New Announcement / News Form State (with schedule date)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    category: 'Governor Bulletin',
    summary: '',
    content: '',
    authorRole: 'District Governor',
    publishedAt: new Date().toISOString().split('T')[0],
    isFeatured: true,
  });

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Literacy & Education',
    targetFund: 25000000,
    raisedFund: 5000000,
    beneficiariesCount: 5000,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    shortDescription: '',
    fullDescription: '',
    keyPillarsText: 'Direct Community Need, Sustainability, Rotary Partnership',
    status: 'In Progress' as const,
    featured: true,
  });

  // Project Update Dispatch Form State
  const [selectedProjectIdForUpdate, setSelectedProjectIdForUpdate] = useState<string>(projects[0]?.id || '');
  const [newProjectUpdate, setNewProjectUpdate] = useState({
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    author: 'Project Monitoring Committee',
  });

  // New Impact Story Form State
  const [newStory, setNewStory] = useState({
    title: '',
    subtitle: '',
    category: 'literacy',
    tag: 'BRED Literacy Impact',
    stateLocation: 'Bayelsa State',
    impactStats: '500 Desks Provided • 1,200 Pupils Equipped',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
  });

  // New Photo/Video Gallery Form State
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    caption: '',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80',
    category: 'Projects',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    mediaType: 'image' as 'image' | 'video',
    videoUrl: '',
  });

  // New Fee Structure Form State
  const [newFee, setNewFee] = useState({
    name: 'District Convention Registration Fee',
    category: 'Event/Convention',
    amountNgn: 35000,
    description: 'Covers registration kit, banquet dinner, and session access.',
    isActive: true,
  });

  // Application Review State
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [reviewStatus, setReviewStatus] = useState<MembershipStatus>('Approved');
  const [reviewFeeName, setReviewFeeName] = useState('New Member Charter & Induction Fee');
  const [reviewFeeNgn, setReviewFeeNgn] = useState<number>(75000);
  const [reviewNotes, setReviewNotes] = useState('');

  if (!isOpen) return null;

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateDistrictInfo(infoForm);
    showToast('District and Governor details updated!');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({ ...newEvent });
    setNewEvent({
      title: '',
      category: 'Seminar',
      acronym: '',
      formattedDate: '',
      date: '2026-08-20',
      time: '09:00 AM',
      location: '',
      city: '',
      state: 'Bayelsa',
      description: '',
      contactPerson: 'Rtn. Secretariat Officer',
      contactPhone: '+234 806 802 1958',
      eventFeeNgn: 0,
      isUpcoming: true,
    });
    showToast('Event published to District Calendar!');
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({ ...newAnnouncement });
    setNewAnnouncement({
      title: '',
      category: 'Governor Bulletin',
      summary: '',
      content: '',
      authorRole: 'District Governor',
      publishedAt: new Date().toISOString().split('T')[0],
      isFeatured: true,
    });
    showToast('News & Bulletin scheduled and published!');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const pillars = newProject.keyPillarsText.split(',').map((s) => s.trim()).filter(Boolean);
    addProject({
      title: newProject.title,
      category: newProject.category,
      targetFund: newProject.targetFund,
      raisedFund: newProject.raisedFund,
      beneficiariesCount: newProject.beneficiariesCount,
      image: newProject.image,
      shortDescription: newProject.shortDescription,
      fullDescription: newProject.fullDescription || newProject.shortDescription,
      keyPillars: pillars.length > 0 ? pillars : ['Community Impact', 'Sustainability'],
      status: newProject.status,
      featured: newProject.featured,
    });
    setNewProject({
      title: '',
      category: 'Literacy & Education',
      targetFund: 25000000,
      raisedFund: 5000000,
      beneficiariesCount: 5000,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      shortDescription: '',
      fullDescription: '',
      keyPillarsText: 'Direct Community Need, Sustainability, Rotary Partnership',
      status: 'In Progress',
      featured: true,
    });
    showToast('Humanitarian Project created successfully!');
  };

  const handlePostProjectUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectIdForUpdate) return;
    addProjectUpdate(selectedProjectIdForUpdate, {
      title: newProjectUpdate.title,
      date: newProjectUpdate.date,
      description: newProjectUpdate.description,
      imageUrl: newProjectUpdate.imageUrl,
      author: newProjectUpdate.author,
    });
    setNewProjectUpdate({
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      author: 'Project Monitoring Committee',
    });
    showToast('Field progress update posted to project!');
  };

  const handleAddImpactStory = (e: React.FormEvent) => {
    e.preventDefault();
    addImpactStory({ ...newStory });
    setNewStory({
      title: '',
      subtitle: '',
      category: 'literacy',
      tag: 'BRED Literacy Impact',
      stateLocation: 'Bayelsa State',
      impactStats: '500 Desks Provided • 1,200 Pupils Equipped',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    });
    showToast('Human Impact Story published to Our Impact section!');
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem({
      title: newGalleryItem.title,
      caption: newGalleryItem.caption,
      imageUrl: newGalleryItem.imageUrl,
      category: newGalleryItem.category,
      date: newGalleryItem.date,
      mediaType: newGalleryItem.mediaType,
      videoUrl: newGalleryItem.mediaType === 'video' ? newGalleryItem.videoUrl : undefined,
    });
    setNewGalleryItem({
      title: '',
      caption: '',
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80',
      category: 'Projects',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mediaType: 'image',
      videoUrl: '',
    });
    showToast('Media asset uploaded to Gallery!');
  };

  const handleAddFee = (e: React.FormEvent) => {
    e.preventDefault();
    addMembershipFee({ ...newFee });
    setNewFee({
      name: 'Special Assessment Fee',
      category: 'Administrative',
      amountNgn: 20000,
      description: 'District special initiative levy.',
      isActive: true,
    });
    showToast('Fee structure added!');
  };

  const handleUpdateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;

    updateApplicationStatus({
      id: selectedAppId,
      status: reviewStatus,
      assignedFeeName: reviewFeeName,
      feeAmountNgn: reviewFeeNgn,
      adminNotes: reviewNotes,
    });

    setSelectedAppId(null);
    showToast('Applicant status and assigned dues updated!');
  };

  // Calculations for Financial Analytics
  const duesList = membershipPayments || [];
  const donationsList = projectDonations || [];
  const registrationsList = eventRegistrations || [];
  const totalDuesCollected = duesList.reduce((acc, curr) => acc + (curr?.amountNgn || 0), 0);
  const totalProjectDonations = donationsList.reduce((acc, curr) => acc + (curr?.amountNgn || 0), 0);
  const totalEventRevenue = registrationsList.reduce((acc, curr) => acc + (curr?.feePaidNgn || 0), 0);
  const masterTotalRevenue = totalDuesCollected + totalProjectDonations + totalEventRevenue;

  return (
    <div className="fixed inset-0 z-50 bg-[#061329]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0B1E3D] border-2 border-amber-500/40 rounded-3xl max-w-6xl w-full my-4 p-5 sm:p-8 text-white shadow-2xl relative max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#162C52] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">District Secretariat Content Management System</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] uppercase">
                  Staff Admin Active
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Rotary District 9141 Official Website CMS • Self-Service Portal for Staff & Secretariat
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all sample data to default Rotary District 9141 presets?')) {
                  resetToDefaults();
                  showToast('Database reset to defaults!');
                }
              }}
              title="Reset Database to Defaults"
              className="p-2 rounded-xl bg-[#061329] text-slate-400 hover:text-amber-400 border border-[#162C52] text-xs flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#061329] text-slate-400 hover:text-white border border-[#162C52]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 py-3 border-b border-[#162C52] text-xs font-bold overflow-x-auto pb-3 flex-shrink-0 no-scrollbar flex-nowrap">
          {/* CMS Content Tabs */}
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'announcements' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            News & Bulletins ({announcements.length})
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'events' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Events & Calendar ({events.length})
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'projects' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Featured Projects & Updates ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('impact_stories')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'impact_stories' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Our Impact Stories ({impactStories.length})
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'gallery' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Photo & Video Gallery ({gallery.length})
          </button>

          {/* Membership & Finance Tabs */}
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'applications' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Applications ({applications.filter(a => a.status === 'Pending').length} New)
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'members' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Members ({members.length})
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'donations' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Donations ({projectDonations.length})
          </button>

          <button
            onClick={() => setActiveTab('receipts')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'receipts' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Digital Receipts ({digitalReceipts.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Financial Analytics
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'info' ? 'bg-amber-500 text-slate-950 shadow font-black' : 'bg-[#061329] text-slate-300 hover:text-white'
            }`}
          >
            Governor & Bank Info
          </button>
        </div>

        {/* Save Confirmation Toast */}
        {saveSuccess && (
          <div className="mt-2 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 flex-shrink-0">
            <CheckCircle className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Content Scrollable Body */}
        <div className="py-5 overflow-y-auto flex-1 pr-2 space-y-6">

          {/* TAB 1: Announcements & News CMS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6 text-xs">
              <form onSubmit={handleAddAnnouncement} className="bg-[#061329] p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Megaphone className="w-4 h-4" />
                  Create & Schedule News / Governor Bulletin
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Bulletin Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Governor's Monthly Address"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                    <select
                      value={newAnnouncement.category}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white focus:border-amber-500"
                    >
                      <option value="Governor Bulletin">Governor Bulletin</option>
                      <option value="District News">District News</option>
                      <option value="Humanitarian Project">Humanitarian Project</option>
                      <option value="Policy & Guidelines">Policy & Guidelines</option>
                      <option value="Youth & Rotaract">Youth & Rotaract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Publish / Schedule Date</label>
                    <input
                      type="date"
                      required
                      value={newAnnouncement.publishedAt}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, publishedAt: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Author Role / Byline</label>
                    <input
                      type="text"
                      placeholder="e.g. District Governor, Secretariat"
                      value={newAnnouncement.authorRole}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, authorRole: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                      <input
                        type="checkbox"
                        checked={newAnnouncement.isFeatured}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, isFeatured: e.target.checked })}
                        className="rounded text-amber-500 w-4 h-4"
                      />
                      <span>Pin as Featured Headline</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Summary Teaser (Short preview) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Short 1-sentence teaser for homepage cards"
                    value={newAnnouncement.summary}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, summary: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Full Bulletin Text Content *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write official announcement details..."
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish / Schedule News</span>
                </button>
              </form>

              {/* Announcements List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-amber-400">
                  <span>Published Bulletins & Press Releases ({announcements.length})</span>
                </div>
                {announcements.map((a) => (
                  <div key={a.id} className="p-4 bg-[#061329] border border-[#162C52] rounded-2xl space-y-2 flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm">{a.title}</span>
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono border border-amber-500/20">
                          {a.category}
                        </span>
                        {a.isFeatured && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-xs">{a.summary}</p>
                      <span className="text-[11px] text-slate-400 block font-mono">Date: {a.publishedAt} • Author: {a.authorRole}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete bulletin: "${a.title}"?`)) {
                          deleteAnnouncement(a.id);
                          showToast('Bulletin removed!');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-colors"
                      title="Delete Bulletin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Events & Calendar CMS */}
          {activeTab === 'events' && (
            <div className="space-y-6 text-xs">
              <form onSubmit={handleAddEvent} className="bg-[#061329] p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Publish New District Event / Learning Assembly
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Event Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. District Conference 2027"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    >
                      <option value="Seminar">Seminar</option>
                      <option value="Installation">Installation</option>
                      <option value="Conference">Conference</option>
                      <option value="Institute">Institute</option>
                      <option value="Youth">Youth</option>
                      <option value="Convention">Convention</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Event Registration Fee (NGN)</label>
                    <input
                      type="number"
                      placeholder="0 for Free"
                      value={newEvent.eventFeeNgn}
                      onChange={(e) => setNewEvent({ ...newEvent, eventFeeNgn: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Calendar Date</label>
                    <input
                      type="date"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Formatted Date Display</label>
                    <input
                      type="text"
                      placeholder="e.g. Saturday, 15th August 2026"
                      value={newEvent.formattedDate}
                      onChange={(e) => setNewEvent({ ...newEvent, formattedDate: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Event Time</label>
                    <input
                      type="text"
                      placeholder="09:00 AM WAT"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Venue & Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Banquet Hall, Yenagoa"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Yenagoa, Port Harcourt, Warri"
                      value={newEvent.city}
                      onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">State</label>
                    <select
                      value={newEvent.state}
                      onChange={(e) => setNewEvent({ ...newEvent, state: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    >
                      <option value="Bayelsa">Bayelsa</option>
                      <option value="Delta">Delta</option>
                      <option value="Edo">Edo</option>
                      <option value="Rivers">Rivers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Event Description</label>
                  <textarea
                    rows={3}
                    placeholder="Event objectives, speakers, dress code..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish District Event</span>
                </button>
              </form>

              {/* Events List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {events.map((e) => (
                  <div key={e.id} className="p-4 bg-[#061329] border border-[#162C52] rounded-2xl space-y-2 flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{e.title}</h4>
                        <span className="text-amber-400 font-bold font-mono text-[11px]">
                          {e.eventFeeNgn ? `₦${e.eventFeeNgn.toLocaleString()}` : 'Free'}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs">{e.formattedDate} ({e.time})</p>
                      <p className="text-slate-400 text-xs flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {e.location}, {e.city}, {e.state}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete event: "${e.title}"?`)) {
                          deleteEvent(e.id);
                          showToast('Event removed from calendar!');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Featured Projects & Updates CMS */}
          {activeTab === 'projects' && (
            <div className="space-y-8 text-xs">
              
              {/* Post Live Field Update to Existing Project */}
              <form onSubmit={handlePostProjectUpdate} className="bg-[#061329] p-5 rounded-2xl border-2 border-amber-500/40 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Post Live Field Progress Update / Photo Dispatch to Project
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Select Humanitarian Project *</label>
                    <select
                      value={selectedProjectIdForUpdate}
                      onChange={(e) => setSelectedProjectIdForUpdate(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-bold"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>{p.title} ({p.category})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Update Headline / Milestone *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 500 Dual-Desks Delivered to Nembe Community School"
                      value={newProjectUpdate.title}
                      onChange={(e) => setNewProjectUpdate({ ...newProjectUpdate, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Date of Dispatch</label>
                    <input
                      type="text"
                      value={newProjectUpdate.date}
                      onChange={(e) => setNewProjectUpdate({ ...newProjectUpdate, date: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Author / Field Lead</label>
                    <input
                      type="text"
                      value={newProjectUpdate.author}
                      onChange={(e) => setNewProjectUpdate({ ...newProjectUpdate, author: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Supporting Photo URL</label>
                    <input
                      type="url"
                      value={newProjectUpdate.imageUrl}
                      onChange={(e) => setNewProjectUpdate({ ...newProjectUpdate, imageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Field Report / Progress Summary</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Details on distribution, beneficiaries reached, partners involved..."
                    value={newProjectUpdate.description}
                    onChange={(e) => setNewProjectUpdate({ ...newProjectUpdate, description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs hover:from-amber-400 hover:to-yellow-400 shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Live Field Update</span>
                </button>
              </form>

              {/* Create New Project Form */}
              <form onSubmit={handleAddProject} className="bg-[#061329] p-5 rounded-2xl border border-[#162C52] space-y-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Add New District Humanitarian Project
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Clean Water Borehole & Sanitation Drive"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    >
                      <option value="Literacy & Education">Literacy & Education</option>
                      <option value="Disease Prevention & Health">Disease Prevention & Health</option>
                      <option value="Youth Empowerment">Youth Empowerment</option>
                      <option value="Environmental Sustainability">Environmental Sustainability</option>
                      <option value="Maternal & Child Health">Maternal & Child Health</option>
                      <option value="Peace & Conflict Resolution">Peace & Conflict Resolution</option>
                      <option value="Economic Development">Economic Development</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Target Goal (NGN)</label>
                    <input
                      type="number"
                      required
                      value={newProject.targetFund}
                      onChange={(e) => setNewProject({ ...newProject, targetFund: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Initial Funds Raised (NGN)</label>
                    <input
                      type="number"
                      value={newProject.raisedFund}
                      onChange={(e) => setNewProject({ ...newProject, raisedFund: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Beneficiaries Target</label>
                    <input
                      type="number"
                      value={newProject.beneficiariesCount}
                      onChange={(e) => setNewProject({ ...newProject, beneficiariesCount: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Cover Photo URL</label>
                  <input
                    type="url"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Short Summary</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief highlight for cards..."
                    value={newProject.shortDescription}
                    onChange={(e) => setNewProject({ ...newProject, shortDescription: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Key Pillars (Comma separated)</label>
                  <input
                    type="text"
                    value={newProject.keyPillarsText}
                    onChange={(e) => setNewProject({ ...newProject, keyPillarsText: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400"
                >
                  Publish New Humanitarian Project
                </button>
              </form>

              {/* Existing Projects List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-400">All Active Service Projects ({projects.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 bg-[#061329] border border-[#162C52] rounded-2xl space-y-2 flex justify-between items-start gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{p.title}</span>
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs line-clamp-2">{p.shortDescription}</p>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                          <span>Target: ₦{p.targetFund.toLocaleString()}</span>
                          <span>Raised: ₦{p.raisedFund.toLocaleString()}</span>
                          <span className="text-amber-400 font-bold">Updates: {p.updates?.length || 0}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project: "${p.title}"?`)) {
                            deleteProject(p.id);
                            showToast('Project deleted!');
                          }
                        }}
                        className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Our Impact Stories CMS */}
          {activeTab === 'impact_stories' && (
            <div className="space-y-6 text-xs">
              <form onSubmit={handleAddImpactStory} className="bg-[#061329] p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Publish Human Impact Story to "Our Impact" Section
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Story Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Free Eye Surgeries in Delta Riverine"
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Subtitle / Beneficiary</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Restoring Sight to 450 Elders"
                      value={newStory.subtitle}
                      onChange={(e) => setNewStory({ ...newStory, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                    <select
                      value={newStory.category}
                      onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    >
                      <option value="literacy">BRED Literacy</option>
                      <option value="health">Health & Pediatrics</option>
                      <option value="youth">Youth Mentorship</option>
                      <option value="environment">Eco-Preservation</option>
                      <option value="relief">Family Relief</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Tag Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Pediatrics Outreach"
                      value={newStory.tag}
                      onChange={(e) => setNewStory({ ...newStory, tag: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">State / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Delta State, Warri"
                      value={newStory.stateLocation}
                      onChange={(e) => setNewStory({ ...newStory, stateLocation: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Impact Stats Summary</label>
                    <input
                      type="text"
                      placeholder="e.g. 450 Surgeries • 1,200 Glasses"
                      value={newStory.impactStats}
                      onChange={(e) => setNewStory({ ...newStory, impactStats: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Photo Image URL</label>
                  <input
                    type="url"
                    value={newStory.imageUrl}
                    onChange={(e) => setNewStory({ ...newStory, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Full Story Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Full human interest testimonial, challenges overcome, and Rotary club involvement..."
                    value={newStory.description}
                    onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Impact Story</span>
                </button>
              </form>

              {/* Existing Stories List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {impactStories.map((story) => (
                  <div key={story.id} className="p-4 bg-[#061329] border border-[#162C52] rounded-2xl space-y-2 flex justify-between items-start gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{story.title}</span>
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                          {story.tag}
                        </span>
                      </div>
                      <p className="text-amber-300 text-xs font-semibold">{story.subtitle}</p>
                      <p className="text-slate-300 text-xs line-clamp-2">{story.description}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{story.stateLocation} • {story.impactStats}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete story: "${story.title}"?`)) {
                          deleteImpactStory(story.id);
                          showToast('Impact story deleted!');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20"
                      title="Delete Story"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Photo & Video Gallery CMS */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 text-xs">
              <form onSubmit={handleAddGalleryItem} className="bg-[#061329] p-5 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Upload Photo or Embed Video to Official District Gallery
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Media Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Free Eye Checkups at Yenagoa"
                      value={newGalleryItem.title}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Category Archive</label>
                    <select
                      value={newGalleryItem.category}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    >
                      <option value="Installation">Installation</option>
                      <option value="Projects">Projects</option>
                      <option value="Community Outreach">Community Outreach</option>
                      <option value="Polio Walk">Polio Walk</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Rotaract & Youth">Rotaract & Youth</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Media Type</label>
                    <select
                      value={newGalleryItem.mediaType}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, mediaType: e.target.value as 'image' | 'video' })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-bold"
                    >
                      <option value="image">Photo / Image</option>
                      <option value="video">Video with Link</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Image URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newGalleryItem.imageUrl}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono text-[11px]"
                    />
                  </div>
                  {newGalleryItem.mediaType === 'video' && (
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">Video Streaming URL (YouTube / Drive) *</label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={newGalleryItem.videoUrl}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, videoUrl: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white font-mono text-[11px]"
                      />
                    </div>
                  )}
                  {newGalleryItem.mediaType !== 'video' && (
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">Event Date</label>
                      <input
                        type="text"
                        value={newGalleryItem.date}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, date: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Caption / Detailed Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Short description of Rotarians, venue, and project scope..."
                    value={newGalleryItem.caption}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 shadow-md flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Media to Gallery</span>
                </button>
              </form>

              {/* Gallery Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="p-3 bg-[#061329] border border-[#162C52] rounded-2xl space-y-2 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 relative">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {item.mediaType === 'video' && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>Video</span>
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 bg-[#0B1E3D]/90 text-amber-300 text-[9px] px-2 py-0.5 rounded font-bold">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-300 line-clamp-2">{item.caption}</p>
                    </div>

                    <div className="pt-2 border-t border-[#162C52] flex justify-between items-center text-[10px] text-slate-400">
                      <span>{item.date}</span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${item.title}" from gallery?`)) {
                            deleteGalleryItem(item.id);
                            showToast('Gallery item removed!');
                          }
                        }}
                        className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Membership Applications Review */}
          {activeTab === 'applications' && (
            <div className="space-y-6 text-xs">
              <div className="flex justify-between items-center bg-[#061329] p-4 rounded-2xl border border-[#162C52]">
                <div>
                  <h3 className="text-sm font-bold text-white">Membership Applications Review & Approval Queue</h3>
                  <p className="text-slate-300 text-[11px]">Inspect applicant passport photos, update status, assign dynamic dues fees.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {applications.length} Total Submitted
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className={`bg-[#061329] border rounded-2xl p-5 space-y-3 relative ${
                      app.status === 'Pending'
                        ? 'border-yellow-500/60 shadow-lg shadow-yellow-500/5'
                        : app.status === 'Approved'
                        ? 'border-emerald-500/50'
                        : 'border-[#162C52]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={app.passportPhotoUrl}
                        alt={app.fullName}
                        className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shadow flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-[10px] text-amber-400 font-bold block">
                              {app.referenceNumber}
                            </span>
                            <h4 className="text-base font-extrabold text-white">{app.fullName}</h4>
                            <p className="text-slate-300 text-[11px]">{app.occupation} • {app.city}, {app.state}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                            app.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            app.status === 'Active' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-[#0B1E3D] p-2.5 rounded-xl text-[11px] border border-[#162C52]">
                      <div>
                        <span className="text-slate-400 block">Preferred Club:</span>
                        <span className="text-slate-100 font-semibold">{app.preferredClubName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Contact Info:</span>
                        <span className="text-slate-100 font-semibold">{app.phone}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 block">Areas of Focus:</span>
                        <span className="text-amber-300">{app.areasOfInterest.join(', ')}</span>
                      </div>
                    </div>

                    {app.adminNotes && (
                      <div className="text-[11px] text-slate-300 bg-[#0B1E3D] p-2 rounded-lg border border-[#162C52] italic">
                        Note: "{app.adminNotes}"
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between border-t border-[#162C52]">
                      <span className="text-[10px] text-slate-400">Submitted: {app.submittedAt}</span>
                      <button
                        onClick={() => {
                          setSelectedAppId(app.id);
                          setReviewStatus(app.status === 'Pending' ? 'Approved' : app.status);
                          setReviewFeeName(app.assignedFeeName || 'New Member Charter & Induction Fee');
                          setReviewFeeNgn(app.feeAmountNgn || 75000);
                          setReviewNotes(app.adminNotes || '');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition-all"
                      >
                        Review & Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Update Modal */}
              {selectedAppId && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-[#0B1E3D] border border-amber-500/40 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-[#162C52]">
                      <h4 className="font-bold text-amber-400">Review Application Status</h4>
                      <button onClick={() => setSelectedAppId(null)} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleUpdateApplication} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Set Application Status</label>
                        <select
                          value={reviewStatus}
                          onChange={(e) => setReviewStatus(e.target.value as MembershipStatus)}
                          className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white"
                        >
                          <option value="Pending">Pending Review</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved (Awaiting Dues Payment)</option>
                          <option value="Payment Pending">Payment Pending</option>
                          <option value="Active">Active (Dues Paid)</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Assigned Fee Category Name</label>
                        <input
                          type="text"
                          value={reviewFeeName}
                          onChange={(e) => setReviewFeeName(e.target.value)}
                          className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Assigned Membership Fee Amount (NGN)</label>
                        <input
                          type="number"
                          value={reviewFeeNgn}
                          onChange={(e) => setReviewFeeNgn(parseFloat(e.target.value) || 0)}
                          className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Secretariat Review Notes</label>
                        <textarea
                          rows={3}
                          placeholder="e.g. Cleared for induction at District Conference"
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                          className="w-full px-3.5 py-2 bg-[#061329] border border-[#162C52] rounded-xl text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedAppId(null)}
                          className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                        >
                          Save Status Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: Active Members Directory */}
          {activeTab === 'members' && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#061329] p-4 rounded-2xl border border-[#162C52] flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">District 9141 Official Rotarian Roster</h3>
                <span className="text-amber-400 font-bold">{members.length} Active Rotarians</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {members.map((m) => (
                  <div key={m.id} className="p-4 bg-[#061329] border border-[#162C52] rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 font-bold block">{m.memberId}</span>
                    <h4 className="font-bold text-white text-sm">{m.fullName}</h4>
                    <p className="text-slate-300">{m.classification} • {m.clubName}</p>
                    <p className="text-slate-400 text-[11px]">{m.email} • {m.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: Project Donations Ledger */}
          {activeTab === 'donations' && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#061329] p-4 rounded-2xl border border-[#162C52] flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">Humanitarian Project Donations</h3>
                <span className="text-amber-400 font-black text-base font-mono">
                  Total Donations: ₦{totalProjectDonations.toLocaleString()}
                </span>
              </div>

              <div className="bg-[#061329] border border-[#162C52] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0B1E3D] text-slate-300 border-b border-[#162C52] font-semibold">
                      <th className="p-3">Reference</th>
                      <th className="p-3">Donor Name</th>
                      <th className="p-3">Project Title</th>
                      <th className="p-3">Recurring</th>
                      <th className="p-3">Amount (NGN)</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#162C52] text-slate-200">
                    {projectDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-[#0B1E3D]/50">
                        <td className="p-3 font-mono text-amber-400 font-bold">{d.paymentReference}</td>
                        <td className="p-3 font-bold text-white">{d.donorName}</td>
                        <td className="p-3">{d.projectTitle}</td>
                        <td className="p-3">{d.isRecurring ? `Recurring (${d.recurringFrequency})` : 'One-time'}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">₦{d.amountNgn.toLocaleString()}</td>
                        <td className="p-3 text-slate-400">{d.donatedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: Master Digital Receipts */}
          {activeTab === 'receipts' && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#061329] p-4 rounded-2xl border border-[#162C52] flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">Master Digital Receipts Database</h3>
                <p className="text-slate-300 text-[11px]">Click any receipt to view printable official document.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {digitalReceipts.map((rcpt) => (
                  <div
                    key={rcpt.id}
                    onClick={() => setSelectedReceipt(rcpt)}
                    className="p-4 bg-[#061329] border border-amber-500/30 hover:border-amber-500 rounded-2xl space-y-2 cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-mono text-amber-400 font-bold">#{rcpt.receiptNumber}</span>
                      <span className="text-slate-400">{rcpt.issuedAt}</span>
                    </div>
                    <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">{rcpt.payerName}</h4>
                    <p className="text-slate-300 text-[11px] line-clamp-1">{rcpt.purpose}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-[#162C52]">
                      <span className="text-emerald-400 font-mono font-black text-sm">₦{rcpt.amountNgn.toLocaleString()}</span>
                      <span className="text-amber-400 text-[11px] flex items-center gap-1"><Printer className="w-3 h-3" /> Print</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: Financial Analytics & Summary */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#061329] p-5 rounded-2xl border border-amber-500/30">
                  <span className="text-slate-300 font-semibold block text-[11px]">Master Revenue</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">₦{masterTotalRevenue.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-400 mt-1">Across dues, projects, and events</p>
                </div>

                <div className="bg-[#061329] p-5 rounded-2xl border border-emerald-500/30">
                  <span className="text-slate-300 font-semibold block text-[11px]">Membership Dues</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">₦{totalDuesCollected.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-400 mt-1">{membershipPayments.length} verified transactions</p>
                </div>

                <div className="bg-[#061329] p-5 rounded-2xl border border-amber-500/30">
                  <span className="text-slate-300 font-semibold block text-[11px]">Humanitarian Donations</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">₦{totalProjectDonations.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-400 mt-1">{projectDonations.length} project supporters</p>
                </div>

                <div className="bg-[#061329] p-5 rounded-2xl border border-yellow-500/30">
                  <span className="text-slate-300 font-semibold block text-[11px]">Event Revenue</span>
                  <span className="text-2xl font-black text-yellow-400 font-mono">₦{totalEventRevenue.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-400 mt-1">{eventRegistrations.length} registered delegates</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: Governor & Bank Info */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveInfo} className="space-y-6 text-xs">
              <div className="bg-[#061329] p-5 rounded-2xl border border-[#162C52] space-y-4">
                <h3 className="text-sm font-bold text-amber-400">District Governor & Installation Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Governor Full Title</label>
                    <input
                      type="text"
                      value={infoForm.governorFullTitle}
                      onChange={(e) => setInfoForm({ ...infoForm, governorFullTitle: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Rotary Year Theme</label>
                    <input
                      type="text"
                      value={infoForm.theme}
                      onChange={(e) => setInfoForm({ ...infoForm, theme: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Installation Date</label>
                    <input
                      type="text"
                      value={infoForm.installationDate}
                      onChange={(e) => setInfoForm({ ...infoForm, installationDate: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Installation Venue</label>
                    <input
                      type="text"
                      value={infoForm.installationVenue}
                      onChange={(e) => setInfoForm({ ...infoForm, installationVenue: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#061329] p-5 rounded-2xl border border-[#162C52] space-y-4">
                <h3 className="text-sm font-bold text-amber-400">Official Secretariat Bank Account</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={infoForm.bankName}
                      onChange={(e) => setInfoForm({ ...infoForm, bankName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Account Name</label>
                    <input
                      type="text"
                      value={infoForm.accountName}
                      onChange={(e) => setInfoForm({ ...infoForm, accountName: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={infoForm.accountNumber}
                      onChange={(e) => setInfoForm({ ...infoForm, accountNumber: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#0B1E3D] border border-[#162C52] rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400"
              >
                Save Bank & Governor Settings
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#162C52] flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#061329] text-slate-300 border border-[#162C52] hover:text-white"
          >
            Close CMS Portal
          </button>
        </div>

      </div>

      {selectedReceipt && (
        <DigitalReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
      )}
    </div>
  );
};
