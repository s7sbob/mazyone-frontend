export const APP_NAME = 'مزيون';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CARDS: '/cards',
  CONTACTS: '/contacts',
  JOBS: '/jobs',
  QR_GENERATOR: '/qr-generator',
  ANALYTICS: '/analytics',
  SCAN: '/scan',
  CV_BUILDER: '/cv-builder',
  LANDING_PAGES: '/landing-pages',
  REFERRALS: '/referrals',
  SETTINGS: '/settings',
  SUPPORT: '/support'
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  CORE: 'core',
  PRO: 'pro',
  PRO_PLUS: 'pro-plus',
  BUSINESS: 'business'
} as const;

export const CARD_TEMPLATES = [
  { id: 'modern', name: 'عصري' },
  { id: 'classic', name: 'كلاسيكي' },
  { id: 'creative', name: 'إبداعي' },
  { id: 'corporate', name: 'مؤسسي' },
  { id: 'minimal', name: 'بسيط' }
] as const;

export const SOCIAL_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
  { id: 'twitter', name: 'Twitter', icon: 'twitter' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'github', name: 'GitHub', icon: 'github' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp' },
  { id: 'telegram', name: 'Telegram', icon: 'telegram' }
] as const;
