import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DistrictInfo,
  LeadershipMember,
  RotaryClub,
  DistrictProject,
  DistrictEvent,
  DistrictAnnouncement,
  EventRegistration,
  MembershipApplication,
  MembershipStatus,
  MembershipFee,
  MembershipPayment,
  ActiveMember,
  ProjectDonation,
  DigitalReceipt,
  GoodwillMessage,
  ImpactStory,
  ProjectUpdate,
  PhotoGalleryItem,
  MembershipInquiry,
  DonationRecord,
} from '../types';
import {
  initialDistrictInfo,
  initialLeadershipMembers,
  initialClubs,
  initialProjects,
  initialEvents,
  initialAnnouncements,
  initialImpactStories,
  initialMembershipFees,
  initialApplications,
  initialEventRegistrations,
  initialProjectDonations,
  initialDigitalReceipts,
  initialGoodwillMessages,
  initialGallery,
  initialInquiries,
  initialDonations,
} from '../data/initialData';

interface DataContextType {
  districtInfo: DistrictInfo;
  updateDistrictInfo: (info: DistrictInfo) => void;
  
  leadership: LeadershipMember[];
  addLeadershipMember: (member: Omit<LeadershipMember, 'id'>) => void;
  updateLeadershipMember: (id: string, member: Partial<LeadershipMember>) => void;
  deleteLeadershipMember: (id: string) => void;
  
  clubs: RotaryClub[];
  addClub: (club: Omit<RotaryClub, 'id'>) => void;
  updateClub: (id: string, club: Partial<RotaryClub>) => void;
  deleteClub: (id: string) => void;
  
  projects: DistrictProject[];
  addProject: (project: Omit<DistrictProject, 'id'>) => void;
  updateProject: (id: string, project: Partial<DistrictProject>) => void;
  deleteProject: (id: string) => void;
  addProjectUpdate: (projectId: string, update: Omit<ProjectUpdate, 'id'>) => void;
  
  events: DistrictEvent[];
  addEvent: (event: Omit<DistrictEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<DistrictEvent>) => void;
  deleteEvent: (id: string) => void;

  announcements: DistrictAnnouncement[];
  addAnnouncement: (announcement: Omit<DistrictAnnouncement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<DistrictAnnouncement>) => void;
  deleteAnnouncement: (id: string) => void;

  impactStories: ImpactStory[];
  addImpactStory: (story: Omit<ImpactStory, 'id'>) => void;
  updateImpactStory: (id: string, story: Partial<ImpactStory>) => void;
  deleteImpactStory: (id: string) => void;

  membershipFees: MembershipFee[];
  addMembershipFee: (fee: Omit<MembershipFee, 'id' | 'updatedAt'>) => void;
  updateMembershipFee: (id: string, fee: Partial<MembershipFee>) => void;
  deleteMembershipFee: (id: string) => void;

  applications: MembershipApplication[];
  addApplication: (app: Omit<MembershipApplication, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>) => MembershipApplication;
  updateApplicationStatus: (
    idOrParams: string | { id: string; status: MembershipStatus; assignedFeeName?: string; feeAmountNgn?: number; adminNotes?: string; feeId?: string },
    status?: MembershipStatus,
    adminNotes?: string,
    feeId?: string
  ) => void;
  recordMembershipPayment: (applicationId: string, gateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation', reference: string) => DigitalReceipt;

  members: ActiveMember[];
  membershipPayments: MembershipPayment[];

  eventRegistrations: EventRegistration[];
  addEventRegistration: (reg: Omit<EventRegistration, 'id' | 'registrationRef' | 'registeredAt' | 'status'>) => { registration: EventRegistration; receipt?: DigitalReceipt };

  projectDonations: ProjectDonation[];
  addProjectDonation: (don: Omit<ProjectDonation, 'id' | 'donatedAt' | 'status' | 'receiptNumber'>) => { donation: ProjectDonation; receipt: DigitalReceipt };

  digitalReceipts: DigitalReceipt[];
  
  goodwillMessages: GoodwillMessage[];
  addGoodwillMessage: (msg: Omit<GoodwillMessage, 'id'>) => void;
  updateGoodwillMessage: (id: string, msg: Partial<GoodwillMessage>) => void;
  deleteGoodwillMessage: (id: string) => void;
  
  gallery: PhotoGalleryItem[];
  addGalleryItem: (item: Omit<PhotoGalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<PhotoGalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  inquiries: MembershipInquiry[];
  addInquiry: (inquiry: Omit<MembershipInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: MembershipInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  
  donations: DonationRecord[];
  addDonation: (donation: Omit<DonationRecord, 'id' | 'date' | 'status' | 'reference'>) => DonationRecord;
  
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INFO: 'd9141_district_info_v3',
  LEADERSHIP: 'd9141_leadership_v3',
  CLUBS: 'd9141_clubs_v3',
  PROJECTS: 'd9141_projects_v3',
  EVENTS: 'd9141_events_v3',
  ANNOUNCEMENTS: 'd9141_announcements_v3',
  FEES: 'd9141_membership_fees_v3',
  APPLICATIONS: 'd9141_applications_v3',
  EVENT_REGS: 'd9141_event_regs_v3',
  PROJECT_DONS: 'd9141_project_dons_v3',
  RECEIPTS: 'd9141_receipts_v3',
  GOODWILL: 'd9141_goodwill_v3',
  GALLERY: 'd9141_gallery_v3',
  IMPACT_STORIES: 'd9141_impact_stories_v3',
  INQUIRIES: 'd9141_inquiries_v3',
  DONATIONS: 'd9141_donations_v3',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [districtInfo, setDistrictInfo] = useState<DistrictInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INFO);
    return saved ? JSON.parse(saved) : initialDistrictInfo;
  });

  const [leadership, setLeadership] = useState<LeadershipMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADERSHIP);
    return saved ? JSON.parse(saved) : initialLeadershipMembers;
  });

  const [clubs, setClubs] = useState<RotaryClub[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLUBS);
    return saved ? JSON.parse(saved) : initialClubs;
  });

  const [projects, setProjects] = useState<DistrictProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [events, setEvents] = useState<DistrictEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [announcements, setAnnouncements] = useState<DistrictAnnouncement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [impactStories, setImpactStories] = useState<ImpactStory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IMPACT_STORIES);
    return saved ? JSON.parse(saved) : initialImpactStories;
  });

  const [membershipFees, setMembershipFees] = useState<MembershipFee[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEES);
    return saved ? JSON.parse(saved) : initialMembershipFees;
  });

  const [applications, setApplications] = useState<MembershipApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENT_REGS);
    return saved ? JSON.parse(saved) : initialEventRegistrations;
  });

  const [projectDonations, setProjectDonations] = useState<ProjectDonation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECT_DONS);
    return saved ? JSON.parse(saved) : initialProjectDonations;
  });

  const [digitalReceipts, setDigitalReceipts] = useState<DigitalReceipt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
    return saved ? JSON.parse(saved) : initialDigitalReceipts;
  });

  const [goodwillMessages, setGoodwillMessages] = useState<GoodwillMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOODWILL);
    return saved ? JSON.parse(saved) : initialGoodwillMessages;
  });

  const [gallery, setGallery] = useState<PhotoGalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [inquiries, setInquiries] = useState<MembershipInquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return saved ? JSON.parse(saved) : initialDonations;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Persistence Effects
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(districtInfo)); }, [districtInfo]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LEADERSHIP, JSON.stringify(leadership)); }, [leadership]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CLUBS, JSON.stringify(clubs)); }, [clubs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(membershipFees)); }, [membershipFees]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.EVENT_REGS, JSON.stringify(eventRegistrations)); }, [eventRegistrations]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECT_DONS, JSON.stringify(projectDonations)); }, [projectDonations]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(digitalReceipts)); }, [digitalReceipts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GOODWILL, JSON.stringify(goodwillMessages)); }, [goodwillMessages]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.IMPACT_STORIES, JSON.stringify(impactStories)); }, [impactStories]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries)); }, [inquiries]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations)); }, [donations]);

  // Actions
  const updateDistrictInfo = (info: DistrictInfo) => setDistrictInfo(info);

  const addLeadershipMember = (member: Omit<LeadershipMember, 'id'>) => {
    setLeadership((prev) => [...prev, { ...member, id: `lead-${Date.now()}` }]);
  };
  const updateLeadershipMember = (id: string, member: Partial<LeadershipMember>) => {
    setLeadership((prev) => prev.map((m) => (m.id === id ? { ...m, ...member } : m)));
  };
  const deleteLeadershipMember = (id: string) => {
    setLeadership((prev) => prev.filter((m) => m.id !== id));
  };

  const addClub = (club: Omit<RotaryClub, 'id'>) => {
    setClubs((prev) => [{ ...club, id: `club-${Date.now()}` }, ...prev]);
  };
  const updateClub = (id: string, club: Partial<RotaryClub>) => {
    setClubs((prev) => prev.map((c) => (c.id === id ? { ...c, ...club } : c)));
  };
  const deleteClub = (id: string) => {
    setClubs((prev) => prev.filter((c) => c.id !== id));
  };

  const addProject = (project: Omit<DistrictProject, 'id'>) => {
    setProjects((prev) => [{ ...project, id: `proj-${Date.now()}`, updates: project.updates || [] }, ...prev]);
  };
  const updateProject = (id: string, project: Partial<DistrictProject>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...project } : p)));
  };
  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };
  const addProjectUpdate = (projectId: string, update: Omit<ProjectUpdate, 'id'>) => {
    const newUpdate: ProjectUpdate = {
      ...update,
      id: `upd-${Date.now()}`,
    };
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, updates: [newUpdate, ...(p.updates || [])] }
          : p
      )
    );
  };

  const addEvent = (event: Omit<DistrictEvent, 'id'>) => {
    setEvents((prev) => [{ ...event, id: `evt-${Date.now()}` }, ...prev]);
  };
  const updateEvent = (id: string, event: Partial<DistrictEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...event } : e)));
  };
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const addAnnouncement = (announcement: Omit<DistrictAnnouncement, 'id'>) => {
    setAnnouncements((prev) => [{ ...announcement, id: `ann-${Date.now()}` }, ...prev]);
  };
  const updateAnnouncement = (id: string, announcement: Partial<DistrictAnnouncement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...announcement } : a)));
  };
  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const addImpactStory = (story: Omit<ImpactStory, 'id'>) => {
    setImpactStories((prev) => [{ ...story, id: `imp-${Date.now()}` }, ...prev]);
  };
  const updateImpactStory = (id: string, story: Partial<ImpactStory>) => {
    setImpactStories((prev) => prev.map((s) => (s.id === id ? { ...s, ...story } : s)));
  };
  const deleteImpactStory = (id: string) => {
    setImpactStories((prev) => prev.filter((s) => s.id !== id));
  };

  const addMembershipFee = (fee: Omit<MembershipFee, 'id' | 'updatedAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    setMembershipFees((prev) => [{ ...fee, id: `fee-${Date.now()}`, updatedAt: today }, ...prev]);
  };
  const updateMembershipFee = (id: string, fee: Partial<MembershipFee>) => {
    const today = new Date().toISOString().split('T')[0];
    setMembershipFees((prev) => prev.map((f) => (f.id === id ? { ...f, ...fee, updatedAt: today } : f)));
  };
  const deleteMembershipFee = (id: string) => {
    setMembershipFees((prev) => prev.filter((f) => f.id !== id));
  };

  const addApplication = (app: Omit<MembershipApplication, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>): MembershipApplication => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refNum = `RID9141-MEM-2026-${randomSuffix}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const defaultFee = membershipFees.find((f) => f.isActive && f.category === 'New Member Charter') || membershipFees[0];

    const newApp: MembershipApplication = {
      ...app,
      id: `app-${Date.now()}`,
      referenceNumber: refNum,
      submittedAt: formattedDate,
      status: 'Pending',
      assignedFeeId: defaultFee?.id,
      assignedFeeName: defaultFee?.feeName,
      feeAmountNgn: defaultFee?.amountNgn || 75000,
    };

    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const updateApplicationStatus = (
    idOrParams: string | { id: string; status: MembershipStatus; assignedFeeName?: string; feeAmountNgn?: number; adminNotes?: string; feeId?: string },
    statusParam?: MembershipStatus,
    adminNotesParam?: string,
    feeIdParam?: string
  ) => {
    let targetId: string;
    let targetStatus: MembershipStatus;
    let targetNotes: string | undefined;
    let targetFeeId: string | undefined;
    let targetFeeName: string | undefined;
    let targetFeeNgn: number | undefined;

    if (typeof idOrParams === 'object') {
      targetId = idOrParams.id;
      targetStatus = idOrParams.status;
      targetNotes = idOrParams.adminNotes;
      targetFeeId = idOrParams.feeId;
      targetFeeName = idOrParams.assignedFeeName;
      targetFeeNgn = idOrParams.feeAmountNgn;
    } else {
      targetId = idOrParams;
      targetStatus = statusParam || 'Pending';
      targetNotes = adminNotesParam;
      targetFeeId = feeIdParam;
    }

    setApplications((prev) =>
      prev.map((a) => {
        if (a.id !== targetId) return a;
        let updated = { ...a, status: targetStatus, adminNotes: targetNotes !== undefined ? targetNotes : a.adminNotes };
        if (targetFeeId) {
          const selectedFee = membershipFees.find((f) => f.id === targetFeeId);
          if (selectedFee) {
            updated.assignedFeeId = selectedFee.id;
            updated.assignedFeeName = selectedFee.feeName;
            updated.feeAmountNgn = selectedFee.amountNgn;
          }
        } else {
          if (targetFeeName) updated.assignedFeeName = targetFeeName;
          if (targetFeeNgn !== undefined) updated.feeAmountNgn = targetFeeNgn;
        }
        return updated;
      })
    );
  };

  const recordMembershipPayment = (
    applicationId: string,
    gateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation',
    reference: string
  ): DigitalReceipt => {
    const targetApp = applications.find((a) => a.id === applicationId);
    const amount = targetApp?.feeAmountNgn || 75000;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const receiptNum = `RC-MEM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReceipt: DigitalReceipt = {
      id: `rec-${Date.now()}`,
      receiptNumber: receiptNum,
      type: 'Membership Fee',
      payerName: targetApp?.fullName || 'Rotary Member',
      payerEmail: targetApp?.email || '',
      payerPhone: targetApp?.phone,
      amountNgn: amount,
      purpose: `${targetApp?.assignedFeeName || 'Membership Induction Dues'} (${targetApp?.preferredClubName})`,
      reference: reference,
      paymentMethod: gateway,
      issuedAt: nowStr,
      notes: `Official Rotary District 9141 Active Membership Dues Receipt. Application Ref: ${targetApp?.referenceNumber}`,
    };

    setDigitalReceipts((prev) => [newReceipt, ...prev]);

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'Active', paymentReference: reference, paidAt: nowStr } : a))
    );

    return newReceipt;
  };

  const addEventRegistration = (
    reg: Omit<EventRegistration, 'id' | 'registrationRef' | 'registeredAt' | 'status'>
  ): { registration: EventRegistration; receipt?: DigitalReceipt } => {
    const regRef = `RID9141-EVT-REG-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newReg: EventRegistration = {
      ...reg,
      id: `ereg-${Date.now()}`,
      registrationRef: regRef,
      registeredAt: nowStr,
      status: 'Confirmed',
    };

    setEventRegistrations((prev) => [newReg, ...prev]);

    let createdReceipt: DigitalReceipt | undefined;
    if (reg.feePaidNgn > 0) {
      createdReceipt = {
        id: `rec-${Date.now()}`,
        receiptNumber: `RC-EVT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'Event Registration',
        payerName: reg.fullName,
        payerEmail: reg.email,
        payerPhone: reg.phone,
        amountNgn: reg.feePaidNgn,
        purpose: `Registration Fee: ${reg.eventTitle}`,
        reference: reg.paymentReference || regRef,
        paymentMethod: reg.paymentGateway || 'Paystack',
        issuedAt: nowStr,
        notes: `Official Ticket Pass for ${reg.eventTitle}. Registration ID: ${regRef}`,
      };
      setDigitalReceipts((prev) => [createdReceipt!, ...prev]);
    }

    return { registration: newReg, receipt: createdReceipt };
  };

  const addProjectDonation = (
    don: Omit<ProjectDonation, 'id' | 'donatedAt' | 'status' | 'receiptNumber'>
  ): { donation: ProjectDonation; receipt: DigitalReceipt } => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const receiptNum = `RC-DON-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newDonation: ProjectDonation = {
      ...don,
      id: `pdon-${Date.now()}`,
      donatedAt: nowStr,
      status: 'Completed',
      receiptNumber: receiptNum,
    };

    setProjectDonations((prev) => [newDonation, ...prev]);

    // Update project raised amount
    if (don.projectId) {
      setProjects((prev) =>
        prev.map((p) => (p.id === don.projectId ? { ...p, raisedFund: p.raisedFund + don.amountNgn } : p))
      );
    } else {
      setProjects((prev) =>
        prev.map((p) => (p.title.includes(don.projectTitle) ? { ...p, raisedFund: p.raisedFund + don.amountNgn } : p))
      );
    }

    // Generate Digital Receipt
    const newReceipt: DigitalReceipt = {
      id: `rec-${Date.now()}`,
      receiptNumber: receiptNum,
      type: 'Project Donation',
      payerName: don.isAnonymous ? 'Anonymous Donor' : don.donorName,
      payerEmail: don.donorEmail,
      payerPhone: don.donorPhone,
      amountNgn: don.amountNgn,
      purpose: `Humanitarian Donation: ${don.projectTitle}${don.isRecurring ? ` (${don.recurringFrequency} Subscription)` : ''}`,
      reference: don.paymentReference,
      paymentMethod: don.paymentGateway,
      issuedAt: nowStr,
      notes: 'Official Rotary District 9141 Humanitarian Foundation Tax-Deductible Receipt.',
    };

    setDigitalReceipts((prev) => [newReceipt, ...prev]);

    return { donation: newDonation, receipt: newReceipt };
  };

  const addGoodwillMessage = (msg: Omit<GoodwillMessage, 'id'>) => {
    setGoodwillMessages((prev) => [{ ...msg, id: `gw-${Date.now()}` }, ...prev]);
  };
  const updateGoodwillMessage = (id: string, msg: Partial<GoodwillMessage>) => {
    setGoodwillMessages((prev) => prev.map((g) => (g.id === id ? { ...g, ...msg } : g)));
  };
  const deleteGoodwillMessage = (id: string) => {
    setGoodwillMessages((prev) => prev.filter((g) => g.id !== id));
  };

  const addGalleryItem = (item: Omit<PhotoGalleryItem, 'id'>) => {
    setGallery((prev) => [{ ...item, id: `gal-${Date.now()}` }, ...prev]);
  };
  const updateGalleryItem = (id: string, item: Partial<PhotoGalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...item } : g)));
  };
  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const addInquiry = (inquiry: Omit<MembershipInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setInquiries((prev) => [{ ...inquiry, id: `inq-${Date.now()}`, submittedAt: formatted, status: 'Pending' }, ...prev]);
  };
  const updateInquiryStatus = (id: string, status: MembershipInquiry['status']) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };
  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const addDonation = (donation: Omit<DonationRecord, 'id' | 'date' | 'status' | 'reference'>): DonationRecord => {
    const now = new Date().toISOString().split('T')[0];
    const ref = `REF-DIST9141-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: DonationRecord = { ...donation, id: `don-${Date.now()}`, date: now, reference: ref, status: 'Completed' };
    setDonations((prev) => [newDonation, ...prev]);
    return newDonation;
  };

  const resetToDefaults = () => {
    setDistrictInfo(initialDistrictInfo);
    setLeadership(initialLeadershipMembers);
    setClubs(initialClubs);
    setProjects(initialProjects);
    setEvents(initialEvents);
    setAnnouncements(initialAnnouncements);
    setImpactStories(initialImpactStories);
    setMembershipFees(initialMembershipFees);
    setApplications(initialApplications);
    setEventRegistrations(initialEventRegistrations);
    setProjectDonations(initialProjectDonations);
    setDigitalReceipts(initialDigitalReceipts);
    setGoodwillMessages(initialGoodwillMessages);
    setGallery(initialGallery);
    setInquiries(initialInquiries);
    setDonations(initialDonations);
    localStorage.clear();
  };

  const members: ActiveMember[] = (applications || [])
    .filter((a) => a.status === 'Active' || a.status === 'Approved')
    .map((a) => ({
      id: a.id,
      memberId: a.referenceNumber,
      fullName: a.fullName,
      classification: a.occupation,
      clubName: a.preferredClubName,
      email: a.email,
      phone: a.phone,
      status: a.status,
      state: a.state,
      city: a.city,
    }));

  const membershipPayments: MembershipPayment[] = [
    ...(digitalReceipts || [])
      .filter((r) => r.type === 'Membership Fee')
      .map((r) => ({
        id: r.id,
        applicationId: '',
        applicantRef: r.reference,
        fullName: r.payerName,
        memberName: r.payerName,
        email: r.payerEmail,
        feeName: r.purpose,
        amountNgn: r.amountNgn,
        paymentGateway: r.paymentMethod,
        paymentReference: r.reference,
        status: 'Completed' as const,
        paidAt: r.issuedAt,
        receiptNumber: r.receiptNumber,
      })),
    ...(applications || [])
      .filter((a) => a.status === 'Active' && a.paymentReference && !(digitalReceipts || []).some((r) => r.reference === a.paymentReference))
      .map((a) => ({
        id: `mp-${a.id}`,
        applicationId: a.id,
        applicantRef: a.referenceNumber,
        fullName: a.fullName,
        memberName: a.fullName,
        email: a.email,
        feeName: a.assignedFeeName || 'Membership Induction Dues',
        amountNgn: a.feeAmountNgn || 75000,
        paymentGateway: 'Paystack' as const,
        paymentReference: a.paymentReference || a.referenceNumber,
        status: 'Completed' as const,
        paidAt: a.paidAt || a.submittedAt,
        receiptNumber: `RC-${a.referenceNumber}`,
      })),
  ];

  return (
    <DataContext.Provider
      value={{
        districtInfo,
        updateDistrictInfo,
        leadership,
        addLeadershipMember,
        updateLeadershipMember,
        deleteLeadershipMember,
        clubs,
        addClub,
        updateClub,
        deleteClub,
        projects,
        addProject,
        updateProject,
        deleteProject,
        addProjectUpdate,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        impactStories,
        addImpactStory,
        updateImpactStory,
        deleteImpactStory,
        membershipFees,
        addMembershipFee,
        updateMembershipFee,
        deleteMembershipFee,
        applications,
        addApplication,
        updateApplicationStatus,
        recordMembershipPayment,
        members,
        membershipPayments,
        eventRegistrations,
        addEventRegistration,
        projectDonations,
        addProjectDonation,
        digitalReceipts,
        goodwillMessages,
        addGoodwillMessage,
        updateGoodwillMessage,
        deleteGoodwillMessage,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        donations,
        addDonation,
        isAdmin,
        setIsAdmin,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
