export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'editor';
  createdAt: string;
  subscription: 'free' | 'core' | 'pro' | 'pro-plus' | 'business';
  company?: string;
  phone?: string;
  website?: string;
  bio?: string;
  preferences: {
    language: 'ar' | 'en';
    darkMode: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
    timezone: string;
  };
}

export interface Card {
  id: string;
  userId: string;
  name: string;
  title: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  avatar?: string;
  qrCode?: string;
  nfcEnabled: boolean;
  isActive: boolean;
  views: number;
  shares: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
  socialLinks: SocialLink[];
  customFields: CustomField[];
  template: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  landingPageId?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  isVisible: boolean;
  order: number;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'url' | 'email' | 'phone' | 'textarea';
  isVisible: boolean;
  order: number;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  source: 'manual' | 'card' | 'qr' | 'nfc' | 'import' | 'scan';
  tags: string[];
  notes?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
  lastInteraction?: string;
  interactionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  benefits?: string[];
  status: 'open' | 'closed' | 'draft' | 'paused';
  postedBy: string;
  createdAt: string;
  updatedAt: string;
  applications: JobApplication[];
  tags: string[];
  expiresAt?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  updatedAt: string;
}

export interface LandingPage {
  id: string;
  userId: string;
  cardId?: string;
  title: string;
  slug: string;
  description?: string;
  template: string;
  sections: LandingPageSection[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  analytics: {
    views: number;
    uniqueViews: number;
    clicks: number;
    conversions: number;
  };
  isPublished: boolean;
  customDomain?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandingPageSection {
  id: string;
  type: 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials' | 'contact' | 'gallery' | 'video' | 'map' | 'custom';
  title?: string;
  content?: string;
  image?: string;
  video?: string;
  data?: any;
  order: number;
  isVisible: boolean;
  settings: {
    backgroundColor?: string;
    textColor?: string;
    layout?: string;
  };
}

export interface QRCode {
  id: string;
  userId: string;
  type: 'url' | 'vcard' | 'wifi' | 'text' | 'email' | 'sms' | 'phone' | 'location' | 'event' | 'app' | 'social' | 'payment';
  title: string;
  content: string | QRCodeData;
  customization: {
    foregroundColor: string;
    backgroundColor: string;
    size: number;
    logo?: string;
    logoSize?: number;
    cornerRadius?: number;
    style: 'square' | 'dots' | 'rounded';
  };
  analytics: {
    scans: number;
    uniqueScans: number;
    lastScan?: string;
  };
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QRCodeData {
  url?: string;
  text?: string;
  email?: {
    to: string;
    subject?: string;
    body?: string;
  };
  sms?: {
    number: string;
    message?: string;
  };
  phone?: string;
  wifi?: {
    ssid: string;
    password: string;
    security: 'WPA' | 'WEP' | 'nopass';
    hidden?: boolean;
  };
  vcard?: {
    firstName: string;
    lastName: string;
    organization?: string;
    phone?: string;
    email?: string;
    url?: string;
    note?: string;
  };
  location?: {
    latitude: number;
    longitude: number;
    query?: string;
  };
  event?: {
    title: string;
    description?: string;
    location?: string;
    startDate: string;
    endDate?: string;
  };
}

export interface CV {
  id: string;
  userId: string;
  title: string;
  template: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    avatar?: string;
  };
  summary?: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
  languages: CVLanguage[];
  certifications: CVCertification[];
  projects: CVProject[];
  references: CVReference[];
  customSections: CVCustomSection[];
  settings: {
    visibility: 'public' | 'private' | 'link-only';
    allowDownload: boolean;
    showPhoto: boolean;
    colorScheme: string;
  };
  analytics: {
    views: number;
    downloads: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CVExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements?: string[];
  order: number;
}

export interface CVEducation {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
  order: number;
}

export interface CVSkill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
  order: number;
}

export interface CVLanguage {
  id: string;
  name: string;
  level: 'basic' | 'conversational' | 'fluent' | 'native';
  order: number;
}

export interface CVCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  order: number;
}

export interface CVProject {
  id: string;
  name: string;
  description?: string;
  technologies?: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  order: number;
}

export interface CVReference {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
  order: number;
}

export interface CVCustomSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list' | 'table';
  order: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'card_view' | 'card_share' | 'contact_add' | 'job_application' | 'system';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface Tag {
  id: string;
  userId: string;
  name: string;
  color: string;
  description?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  cardViews: AnalyticsData[];
  cardShares: AnalyticsData[];
  qrScans: AnalyticsData[];
  contactAdds: AnalyticsData[];
  topCards: {
    cardId: string;
    cardName: string;
    views: number;
    shares: number;
    clicks: number;
  }[];
  demographics: {
    countries: { [key: string]: number };
    devices: { [key: string]: number };
    browsers: { [key: string]: number };
  };
  period: {
    start: string;
    end: string;
  };
}

export interface AnalyticsData {
  date: string;
  value: number;
}

export interface Referral {
  id: string;
  referrerId: string;
  refereeId?: string;
  refereeEmail?: string;
  code: string;
  status: 'pending' | 'completed' | 'expired';
  reward?: {
    type: 'credit' | 'discount' | 'feature';
    value: number;
    description: string;
  };
  createdAt: string;
  completedAt?: string;
}

export interface WhiteLabelSettings {
  id: string;
  userId: string;
  brandName: string;
  logo?: string;
  favicon?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  customDomain?: string;
  emailSettings: {
    fromName: string;
    fromEmail: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpUsername?: string;
    smtpPassword?: string;
    smtpSecure: boolean;
  };
  hideOriginalBranding: boolean;
  customTexts: { [key: string]: string };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: TeamMember[];
  settings: {
    allowMemberInvites: boolean;
    defaultRole: 'viewer' | 'editor' | 'admin';
  };
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  permissions: string[];
  joinedAt: string;
  invitedBy: string;
}

export interface Integration {
  id: string;
  userId: string;
  platform: 'google' | 'linkedin' | 'zapier' | 'whatsapp' | 'mailchimp' | 'hubspot' | 'salesforce';
  isConnected: boolean;
  accessToken?: string;
  refreshToken?: string;
  settings: { [key: string]: any };
  lastSync?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScanSession {
  id: string;
  userId?: string;
  type: 'qr' | 'nfc' | 'manual';
  scannedData: string;
  result: {
    type: 'card' | 'contact' | 'url' | 'text' | 'error';
    data: any;
  };
  location?: {
    country: string;
    city: string;
    coordinates?: [number, number];
  };
  device: {
    type: 'mobile' | 'tablet' | 'desktop';
    os: string;
    browser: string;
  };
  createdAt: string;
}





export interface QRCodeCustomization {
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  customStrokeColor: string;
  customEyeColor: string;
  customEyeStrokeColor: string;
  customEyeballColor: string;
  shape: string;
  pattern: 'square' | 'dots' | 'rounded' | 'diamond' | 'star';
  logo: string;
  logoSize: number;
  logoBackgroundColor: string;
  logoCornerRadius: number;
  sticker: string;
  backgroundImage: string;
  qrPosition: { x: number; y: number };
  qrScale: number;
}

export interface QRTemplate {
  id: string;
  name: string;
  category: string;
  customization: QRCodeCustomization;
  preview: string;
}