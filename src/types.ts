export interface DistrictInfo {
  name: string;
  number: string;
  year: string;
  theme: string;
  motto: string;
  governorName: string;
  governorTitle: string;
  governorFullTitle: string;
  governorImage: string;
  installationDate: string;
  installationVenue: string;
  installationCity: string;
  statesCovered: string[];
  totalClubs: number;
  totalMembers: number;
  welcomeHeading: string;
  welcomeSubheading: string;
  governorMessage: string;
  governorCitationBio: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  secretariatEmail: string;
  secretariatPhone: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string; // e.g. "District Governor 2026-27", "RI President 2026-27", "Executive Governor, Bayelsa State"
  roleCategory: 'ri_leadership' | 'district_executive' | 'committee_chairs' | 'state_governors' | 'royal_patron';
  clubOrOrg?: string;
  image: string;
  bio?: string;
  email?: string;
  phone?: string;
  order: number;
}

export interface RotaryClub {
  id: string;
  name: string;
  state: 'Bayelsa' | 'Rivers' | 'Edo' | 'Delta';
  area: number; // e.g., Area 1, Area 17, Area 32
  assistantGovernor: string;
  agPhone?: string;
  meetingDay: string;
  meetingTime: string;
  venue: string;
  presidentName: string;
  presidentPhone?: string;
  secretaryName: string;
  secretaryEmail?: string;
  membersCount?: number;
  charterYear?: number | string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  summary: string;
  photoUrl?: string;
}

export interface DistrictProject {
  id: string;
  title: string;
  category: 'Literacy & Education' | 'Disease Prevention & Health' | 'Maternal & Child Health' | 'Peace & Conflict Resolution' | 'Water & Sanitation' | 'Economic Development' | 'Environmental Sustainability' | 'Youth Empowerment';
  shortDescription: string;
  fullDescription: string;
  location: string;
  targetFund: number;
  raisedFund: number;
  beneficiariesCount: number;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  image: string;
  galleryImages?: string[];
  keyPillars: string[];
  updates?: ProjectUpdate[];
  featured?: boolean;
}

export interface DistrictEvent {
  id: string;
  title: string;
  acronym?: string;
  date: string; // YYYY-MM-DD format or ISO string for timer calculations
  time?: string; // e.g. "09:00 AM"
  formattedDate: string;
  location: string;
  city: string;
  state: string;
  description: string;
  category: 'Seminar' | 'Installation' | 'Conference' | 'Institute' | 'Youth' | 'Convention' | 'Community Service' | 'Fundraising';
  image?: string;
  isUpcoming: boolean;
  isFeatured?: boolean;
  eventFeeNgn?: number; // 0 for Free
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  targetAudience?: string;
  maxCapacity?: number;
}

export interface DistrictAnnouncement {
  id: string;
  title: string;
  category: 'District News' | 'Governor Bulletin' | 'TRF Update' | 'Emergency Service' | 'Club Charter' | 'Policy Notice' | 'Impact Story';
  date: string; // YYYY-MM-DD
  summary: string;
  content: string;
  isFeatured: boolean;
  authorTitle: string;
  authorName?: string;
  image?: string;
  linkText?: string;
  status?: 'Published' | 'Draft' | 'Scheduled';
  scheduledPublishDate?: string;
  tags?: string[];
}

export interface DistrictImpactMetric {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  description: string;
  category: 'health' | 'education' | 'environment' | 'youth' | 'relief' | 'membership';
  iconName?: string;
  imageUrl?: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  category: 'health' | 'youth' | 'environment' | 'relief' | 'literacy';
  description: string;
  imageUrl: string;
  videoUrl?: string;
  impactStats: string;
  stateLocation: string;
  featured: boolean;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  registrationRef: string;
  fullName: string;
  email: string;
  phone: string;
  clubName?: string;
  specialRequests?: string;
  feePaidNgn: number;
  paymentGateway?: 'Paystack' | 'Flutterwave' | 'Free / Exempt';
  paymentReference?: string;
  registeredAt: string;
  status: 'Confirmed' | 'Pending Payment' | 'Cancelled';
}

export type MembershipStatus =
  | 'Pending'
  | 'Under Review'
  | 'Approved'
  | 'Payment Pending'
  | 'Active'
  | 'Rejected';

export interface MembershipApplication {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  state: 'Bayelsa' | 'Rivers' | 'Edo' | 'Delta' | 'Other';
  city: string;
  occupation: string;
  preferredClubId?: string;
  preferredClubName: string;
  areasOfInterest: string[];
  previousExperience: string;
  address: string;
  passportPhotoUrl?: string;
  message?: string;
  submittedAt: string;
  status: MembershipStatus;
  adminNotes?: string;
  assignedFeeId?: string;
  assignedFeeName?: string;
  feeAmountNgn?: number;
  paymentReference?: string;
  paidAt?: string;
}

export interface MembershipFee {
  id: string;
  feeName: string;
  description: string;
  amountNgn: number;
  category: 'New Member Charter' | 'Annual Dues' | 'Rotaractor Dual Membership' | 'Honorary Member' | 'Corporate Partner';
  isActive: boolean;
  updatedAt: string;
}

export interface MembershipPayment {
  id: string;
  applicationId: string;
  applicantRef: string;
  fullName: string;
  memberName?: string;
  email: string;
  feeName: string;
  amountNgn: number;
  paymentGateway: 'Paystack' | 'Flutterwave' | 'Bank Transfer Simulation' | string;
  paymentReference: string;
  status: 'Completed' | 'Pending' | 'Failed';
  paidAt: string;
  receiptNumber: string;
}

export interface ActiveMember {
  id: string;
  memberId: string;
  fullName: string;
  classification: string;
  clubName: string;
  email: string;
  phone: string;
  status?: string;
  state?: string;
  city?: string;
}

export interface ProjectDonation {
  id: string;
  projectId?: string;
  projectTitle: string;
  donorName: string; // "Anonymous Donor" if isAnonymous
  donorEmail: string;
  donorPhone?: string;
  amountNgn: number;
  isAnonymous: boolean;
  isRecurring: boolean;
  recurringFrequency?: 'Monthly' | 'Quarterly' | 'Annual';
  message?: string;
  paymentGateway: 'Paystack' | 'Flutterwave' | 'Direct Transfer';
  paymentReference: string;
  status: 'Completed' | 'Pending';
  donatedAt: string;
  receiptNumber: string;
}

export interface DigitalReceipt {
  id: string;
  receiptNumber: string;
  type: 'Project Donation' | 'Membership Fee' | 'Event Registration';
  payerName: string;
  payerEmail: string;
  payerPhone?: string;
  amountNgn: number;
  purpose: string;
  reference: string;
  paymentMethod: string;
  issuedAt: string;
  notes?: string;
}

export interface GoodwillMessage {
  id: string;
  senderName: string;
  senderTitle: string;
  organizationOrClub: string;
  message: string;
  image?: string;
  date: string;
  isFeatured: boolean;
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  category: 'Installation' | 'Projects' | 'Polio Walk' | 'Leadership' | 'Rotaract & Youth' | 'Community Outreach';
  imageUrl: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  caption: string;
  date: string;
}

export interface MembershipInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  state: 'Bayelsa' | 'Rivers' | 'Edo' | 'Delta';
  preferredCity: string;
  profession: string;
  interestNotes: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Assigned To Club';
}

export interface DonationRecord {
  id: string;
  donorName: string;
  email: string;
  phone?: string;
  amountNgn: number;
  cause: 'BRED Literacy Project' | 'PolioPlus Eradication' | 'Rotary Healthy Communities' | 'District Annual Fund' | 'General Humanitarian';
  paymentMethod: string;
  reference: string;
  date: string;
  status: 'Completed' | 'Pending';
}

