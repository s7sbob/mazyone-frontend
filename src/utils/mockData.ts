import type {
    User, Card, Contact, Job, Notification, LandingPage, QRCode, CV,
    Tag, Referral, Analytics, JobApplication
} from '../types';

export const mockUser: User = {
  id: '1',
  name: 'أحمد محمد السعيد',
  email: 'ahmed@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'user',
  createdAt: '2024-01-15T10:00:00Z',
  subscription: 'pro',
  company: 'شركة التقنية المتقدمة',
  phone: '+966501234567',
  website: 'https://ahmed-dev.com',
  bio: 'مطور تطبيقات محترف مع خبرة 8 سنوات في React وNode.js',
  preferences: {
    language: 'ar',
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    timezone: 'Asia/Riyadh'
  }
};

export const mockCards: Card[] = [
  {
    id: '1',
    userId: '1',
    name: 'أحمد محمد السعيد',
    title: 'مطور تطبيقات أول',
    company: 'شركة التقنية المتقدمة',
    phone: '+966501234567',
    email: 'ahmed@example.com',
    website: 'https://ahmed-dev.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    nfcEnabled: true,
    isActive: true,
    views: 1245,
    shares: 89,
    clicks: 156,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-07-08T15:30:00Z',
    template: 'modern',
    colors: {
      primary: '#1D4ED8',
      secondary: '#00D1B2',
      background: '#FFFFFF',
      text: '#2D2D2D'
    },
    socialLinks: [
      { id: '1', platform: 'LinkedIn', url: 'https://linkedin.com/in/ahmed', icon: 'linkedin', isVisible: true, order: 1 },
      { id: '2', platform: 'Twitter', url: 'https://twitter.com/ahmed', icon: 'twitter', isVisible: true, order: 2 },
      { id: '3', platform: 'GitHub', url: 'https://github.com/ahmed', icon: 'github', isVisible: true, order: 3 },
      { id: '4', platform: 'WhatsApp', url: 'https://wa.me/966501234567', icon: 'whatsapp', isVisible: true, order: 4 }
    ],
    customFields: [
      { id: '1', label: 'التخصص', value: 'React & Node.js', type: 'text', isVisible: true, order: 1 },
      { id: '2', label: 'سنوات الخبرة', value: '8 سنوات', type: 'text', isVisible: true, order: 2 },
      { id: '3', label: 'الموقع الشخصي', value: 'https://ahmed-portfolio.com', type: 'url', isVisible: true, order: 3 }
    ],
    landingPageId: '1'
  },
  {
    id: '2',
    userId: '1',
    name: 'بطاقة الشركة',
    title: 'مدير المشاريع',
    company: 'مزيون للتقنية',
    phone: '+966509876543',
    email: 'projects@mazyone.com',
    website: 'https://mazyone.com',
    nfcEnabled: false,
    isActive: true,
    views: 567,
    shares: 34,
    clicks: 78,
    createdAt: '2024-02-10T08:00:00Z',
    updatedAt: '2024-07-05T12:00:00Z',
    template: 'corporate',
    colors: {
      primary: '#1D4ED8',
      secondary: '#00D1B2',
      background: '#F4F1EA',
      text: '#2D2D2D'
    },
    socialLinks: [
      { id: '5', platform: 'LinkedIn', url: 'https://linkedin.com/company/mazyone', icon: 'linkedin', isVisible: true, order: 1 },
      { id: '6', platform: 'Instagram', url: 'https://instagram.com/mazyone', icon: 'instagram', isVisible: true, order: 2 }
    ],
    customFields: [
      { id: '4', label: 'نوع الخدمة', value: 'تطوير التطبيقات', type: 'text', isVisible: true, order: 1 }
    ]
  },
  {
    id: '3',
    userId: '1',
    name: 'بطاقة المؤتمرات',
    title: 'متحدث تقني',
    company: 'مستقل',
    phone: '+966501234567',
    email: 'speaker@ahmed.com',
    nfcEnabled: true,
    isActive: false,
    views: 234,
    shares: 12,
    clicks: 23,
    createdAt: '2024-03-20T14:00:00Z',
    updatedAt: '2024-06-15T09:00:00Z',
    template: 'creative',
    colors: {
      primary: '#FACC15',
      secondary: '#1D4ED8',
      background: '#FFFFFF',
      text: '#2D2D2D'
    },
    socialLinks: [
      { id: '7', platform: 'YouTube', url: 'https://youtube.com/@ahmed', icon: 'youtube', isVisible: true, order: 1 }
    ],
    customFields: []
  }
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'سارة أحمد الزهراني',
    email: 'sara@example.com',
    phone: '+966501111111',
    company: 'شركة الابتكار التقني',
    position: 'مديرة التسويق',
    source: 'card',
    tags: ['عميل', 'مهتم', 'تسويق'],
    notes: 'مهتمة بخدمات تطوير التطبيقات للشركات الناشئة',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastInteraction: '2024-07-08T10:30:00Z',
    interactionCount: 5,
    createdAt: '2024-06-20T14:00:00Z',
    updatedAt: '2024-07-08T10:30:00Z',
    socialLinks: [
      { id: '1', platform: 'LinkedIn', url: 'https://linkedin.com/in/sara', icon: 'linkedin', isVisible: true, order: 1 }
    ]
  },
  {
    id: '2',
    name: 'محمد علي الغامدي',
    email: 'mohammed@example.com',
    phone: '+966502222222',
    company: 'استوديو التصميم الحديث',
    position: 'مصمم UI/UX',
    source: 'qr',
    tags: ['شريك', 'تصميم'],
    notes: 'تعاون محتمل في مشاريع التصميم',
    interactionCount: 3,
    createdAt: '2024-06-18T10:30:00Z',
    updatedAt: '2024-07-01T15:20:00Z'
  },
  {
    id: '3',
    name: 'فاطمة خالد النجار',
    email: 'fatima@startup.com',
    phone: '+966503333333',
    company: 'شركة ناشئة للتجارة الإلكترونية',
    position: 'المؤسسة والرئيسة التنفيذية',
    source: 'nfc',
    tags: ['عميل محتمل', 'ريادة أعمال'],
    notes: 'تبحث عن حلول تقنية لمتجرها الإلكتروني',
    lastInteraction: '2024-07-07T16:45:00Z',
    interactionCount: 8,
    createdAt: '2024-05-25T09:15:00Z',
    updatedAt: '2024-07-07T16:45:00Z'
  },
  {
    id: '4',
    name: 'عبدالله سعد المطيري',
    email: 'abdullah@tech.sa',
    phone: '+966504444444',
    company: 'مجموعة التقنية السعودية',
    position: 'مدير تطوير الأعمال',
    source: 'manual',
    tags: ['شريك استراتيجي', 'استثمار'],
    notes: 'مهتم بالاستثمار في مشاريع التقنية المالية',
    interactionCount: 12,
    createdAt: '2024-04-10T11:00:00Z',
    updatedAt: '2024-07-06T14:30:00Z'
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'مطور React Frontend محترف',
    company: 'شركة التقنية الحديثة',
    location: 'الرياض، السعودية',
    type: 'full-time',
    description: 'نبحث عن مطور React محترف للانضمام لفريقنا المتنامي وتطوير تطبيقات ويب حديثة ومبتكرة.',
    requirements: [
      'خبرة 3+ سنوات في React وTypeScript',
      'معرفة قوية بـ Redux أو Zustand',
      'خبرة في Git وأدوات CI/CD',
      'فهم عميق لمبادئ UX/UI',
      'إجادة اللغة الإنجليزية'
    ],
    responsibilities: [
      'تطوير واجهات مستخدم تفاعلية',
      'التعاون مع فريق التصميم والباك إند',
      'كتابة كود نظيف وقابل للصيانة',
      'إجراء مراجعات الكود',
      'تحسين أداء التطبيقات'
    ],
    salary: {
      min: 8000,
      max: 15000,
      currency: 'SAR'
    },
    benefits: [
      'تأمين صحي شامل',
      'إجازة سنوية مدفوعة',
      'فرص تطوير مهني',
      'بيئة عمل مرنة'
    ],
    status: 'open',
    postedBy: '1',
    createdAt: '2024-07-01T09:00:00Z',
    updatedAt: '2024-07-08T12:00:00Z',
    applications: [],
    tags: ['react', 'frontend', 'typescript', 'remote-friendly'],
    expiresAt: '2024-08-01T23:59:59Z'
  },
  {
    id: '2',
    title: 'مصمم UI/UX إبداعي',
    company: 'استوديو الإبداع الرقمي',
    location: 'جدة، السعودية',
    type: 'part-time',
    description: 'مطلوب مصمم واجهات مستخدم مبدع لتصميم تجارب رقمية استثنائية.',
    requirements: [
      'خبرة في Figma وAdobe XD',
      'معرفة بمبادئ UX Research',
      'portfolio قوي ومتنوع',
      'فهم للتصميم المتجاوب',
      'مهارات تواصل ممتازة'
    ],
    responsibilities: [
      'تصميم واجهات مستخدم جذابة',
      'إجراء بحوث المستخدمين',
      'إنشاء النماذج الأولية',
      'التعاون مع فريق التطوير'
    ],
    salary: {
      min: 4000,
      max: 8000,
      currency: 'SAR'
    },
    status: 'open',
    postedBy: '1',
    createdAt: '2024-06-25T11:00:00Z',
    updatedAt: '2024-07-05T16:30:00Z',
    applications: [],
    tags: ['design', 'ui', 'ux', 'figma', 'part-time']
  },
  {
    id: '3',
    title: 'مطور Full Stack (Node.js + React)',
    company: 'شركة الحلول التقنية المتكاملة',
    location: 'الدمام، السعودية',
    type: 'full-time',
    description: 'فرصة ممتازة للمطورين الشاملين للعمل على مشاريع متنوعة ومثيرة.',
    requirements: [
      'خبرة 4+ سنوات في Node.js و React',
      'معرفة بقواعد البيانات (MongoDB, PostgreSQL)',
      'خبرة في AWS أو Azure',
      'فهم لمبادئ الأمان السيبراني',
      'خبرة في Docker وKubernetes'
    ],
    responsibilities: [
      'تطوير APIs متكاملة',
      'بناء واجهات مستخدم حديثة',
      'إدارة قواعد البيانات',
      'تطبيق أفضل ممارسات الأمان'
    ],
    salary: {
      min: 12000,
      max: 20000,
      currency: 'SAR'
    },
    status: 'open',
    postedBy: '1',
    createdAt: '2024-06-30T08:00:00Z',
    updatedAt: '2024-07-07T14:15:00Z',
    applications: [],
    tags: ['fullstack', 'nodejs', 'react', 'aws', 'senior']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'card_view',
    title: 'مشاهدة جديدة لبطاقتك',
    message: 'تم عرض بطاقة "أحمد محمد السعيد" 5 مرات اليوم',
    data: { cardId: '1', views: 5 },
    isRead: false,
    actionUrl: '/cards/1/analytics',
    actionText: 'عرض التحليلات',
    createdAt: '2024-07-10T12:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    type: 'contact_add',
    title: 'جهة اتصال جديدة',
    message: 'تم إضافة "سارة أحمد الزهراني" إلى جهات اتصالك',
    data: { contactId: '1' },
    isRead: false,
    actionUrl: '/contacts/1',
    actionText: 'عرض جهة الاتصال',
    createdAt: '2024-07-10T10:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    type: 'success',
    title: 'تم إنشاء بطاقة جديدة',
    message: 'تم إنشاء بطاقة "بطاقة المؤتمرات" بنجاح',
    data: { cardId: '3' },
    isRead: true,
    actionUrl: '/cards/3',
    actionText: 'عرض البطاقة',
    createdAt: '2024-07-09T15:45:00Z'
  },
  {
    id: '4',
    userId: '1',
    type: 'warning',
    title: 'تحديث الاشتراك',
    message: 'ينتهي اشتراكك Pro خلال 7 أيام',
    isRead: false,
    actionUrl: '/settings/subscription',
    actionText: 'تجديد الاشتراك',
    createdAt: '2024-07-09T09:00:00Z',
    expiresAt: '2024-07-17T23:59:59Z'
  },
  {
    id: '5',
    userId: '1',
    type: 'job_application',
    title: 'تقديم جديد على وظيفة',
    message: 'تم تقديم طلب جديد على وظيفة "مطور React Frontend محترف"',
    data: { jobId: '1', applicationId: 'app1' },
    isRead: true,
    actionUrl: '/jobs/1/applications',
    actionText: 'عرض الطلبات',
    createdAt: '2024-07-08T14:20:00Z'
  }
];

export const mockTags: Tag[] = [
  {
    id: '1',
    userId: '1',
    name: 'عميل',
    color: '#10B981',
    description: 'العملاء الحاليين والمحتملين',
    usageCount: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-07-08T15:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    name: 'شريك',
    color: '#3B82F6',
    description: 'الشركاء في العمل والمشاريع',
    usageCount: 8,
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-07-05T10:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    name: 'مهتم',
    color: '#F59E0B',
    description: 'أشخاص مهتمون بالخدمات',
    usageCount: 23,
    createdAt: '2024-02-15T14:30:00Z',
    updatedAt: '2024-07-09T16:45:00Z'
  },
  {
    id: '4',
    userId: '1',
    name: 'تسويق',
    color: '#EF4444',
    description: 'جهات اتصال متعلقة بالتسويق',
    usageCount: 12,
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-07-07T11:20:00Z'
  },
  {
    id: '5',
    userId: '1',
    name: 'تقنية',
    color: '#8B5CF6',
    description: 'المتخصصين في التقنية',
    usageCount: 19,
    createdAt: '2024-03-10T16:00:00Z',
    updatedAt: '2024-07-08T13:10:00Z'
  }
];

export const mockQRCodes: QRCode[] = [
  {
    id: '1',
    userId: '1',
    type: 'url',
    title: 'موقعي الشخصي',
    content: 'https://ahmed-dev.com',
    customization: {
      foregroundColor: '#1D4ED8',
      backgroundColor: '#FFFFFF',
      size: 512,
      logo: 'https://ahmed-dev.com/logo.png',
      logoSize: 64,
      cornerRadius: 8,
      style: 'rounded'
    },
    analytics: {
      scans: 156,
      uniqueScans: 134,
      lastScan: '2024-07-10T11:30:00Z'
    },
    isActive: true,
    createdAt: '2024-06-15T10:00:00Z',
    updatedAt: '2024-07-10T11:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    type: 'vcard',
    title: 'بطاقة التعريف',
    content: {
      vcard: {
        firstName: 'أحمد',
        lastName: 'محمد السعيد',
        organization: 'شركة التقنية المتقدمة',
        phone: '+966501234567',
        email: 'ahmed@example.com',
        url: 'https://ahmed-dev.com',
        note: 'مطور تطبيقات محترف'
      }
    },
    customization: {
      foregroundColor: '#00D1B2',
      backgroundColor: '#F4F1EA',
      size: 256,
      style: 'square'
    },
    analytics: {
      scans: 89,
      uniqueScans: 76,
      lastScan: '2024-07-09T16:20:00Z'
    },
    isActive: true,
    createdAt: '2024-06-20T14:00:00Z',
    updatedAt: '2024-07-09T16:20:00Z'
  },
  {
    id: '3',
    userId: '1',
    type: 'wifi',
    title: 'شبكة المكتب',
    content: {
      wifi: {
        ssid: 'Office_WiFi',
        password: 'SecurePass123',
        security: 'WPA',
        hidden: false
      }
    },
    customization: {
      foregroundColor: '#FACC15',
      backgroundColor: '#FFFFFF',
      size: 256,
      style: 'dots'
    },
    analytics: {
      scans: 234,
      uniqueScans: 45,
      lastScan: '2024-07-10T09:15:00Z'
    },
    isActive: true,
    createdAt: '2024-05-10T08:00:00Z',
    updatedAt: '2024-07-10T09:15:00Z'
  }
];

export const mockLandingPages: LandingPage[] = [
  {
    id: '1',
    userId: '1',
    cardId: '1',
    title: 'أحمد محمد السعيد - مطور تطبيقات',
    slug: 'ahmed-developer',
    description: 'صفحة شخصية لمطور تطبيقات محترف متخصص في React وNode.js',
    template: 'developer',
    sections: [
      {
        id: 's1',
        type: 'hero',
        title: 'أحمد محمد السعيد',
        content: 'مطور تطبيقات محترف | خبرة 8 سنوات في React & Node.js',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        order: 1,
        isVisible: true,
        settings: {
          backgroundColor: '#1D4ED8',
          textColor: '#FFFFFF',
          layout: 'center'
        }
      },
      {
        id: 's2',
        type: 'about',
        title: 'نبذة عني',
        content: 'مطور تطبيقات شغوف بالتقنية مع خبرة واسعة في تطوير الحلول الرقمية المبتكرة. أتخصص في React وNode.js وأساعد الشركات على تحويل أفكارها إلى تطبيقات عملية وفعالة.',
        order: 2,
        isVisible: true,
        settings: {
          backgroundColor: '#FFFFFF',
          textColor: '#2D2D2D',
          layout: 'left'
        }
      },
      {
        id: 's3',
        type: 'services',
        title: 'خدماتي',
        content: 'تطوير تطبيقات الويب\nتطوير واجهات المستخدم\nاستشارات تقنية\nتحسين الأداء',
        order: 3,
        isVisible: true,
        settings: {
          backgroundColor: '#F4F1EA',
          textColor: '#2D2D2D',
          layout: 'grid'
        }
      },
      {
        id: 's4',
        type: 'contact',
        title: 'تواصل معي',
        content: 'جاهز لمناقشة مشروعك القادم؟',
        order: 4,
        isVisible: true,
        settings: {
          backgroundColor: '#00D1B2',
          textColor: '#FFFFFF',
          layout: 'center'
        }
      }
    ],
    seo: {
      title: 'أحمد محمد السعيد - مطور تطبيقات محترف',
      description: 'مطور تطبيقات محترف متخصص في React وNode.js. خبرة 8 سنوات في تطوير الحلول الرقمية المبتكرة.',
      keywords: ['مطور تطبيقات', 'React', 'Node.js', 'تطوير ويب', 'السعودية'],
      ogImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&h=630&fit=crop&crop=face'
    },
    analytics: {
      views: 1456,
      uniqueViews: 1234,
      clicks: 234,
      conversions: 23
    },
    isPublished: true,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-07-08T15:30:00Z'
  }
];

export const mockCV: CV = {
  id: '1',
  userId: '1',
  title: 'السيرة الذاتية - أحمد محمد السعيد',
  template: 'modern',
  personalInfo: {
    firstName: 'أحمد',
    lastName: 'محمد السعيد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    address: 'الرياض، السعودية',
    website: 'https://ahmed-dev.com',
    linkedin: 'https://linkedin.com/in/ahmed',
    github: 'https://github.com/ahmed',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  summary: 'مطور تطبيقات محترف مع خبرة 8 سنوات في تطوير الحلول الرقمية المبتكرة. متخصص في React وNode.js مع شغف بالتقنيات الحديثة وتطوير تجارب المستخدم الاستثنائية.',
  experience: [
    {
      id: 'exp1',
      company: 'شركة التقنية المتقدمة',
      position: 'مطور تطبيقات أول',
      location: 'الرياض، السعودية',
      startDate: '2020-01-01',
      endDate: '',
      current: true,
      description: 'قيادة فريق تطوير التطبيقات وتطوير حلول مبتكرة للعملاء',
      achievements: [
        'تطوير 15+ تطبيق ويب ناجح',
        'تحسين أداء التطبيقات بنسبة 40%',
        'قيادة فريق من 5 مطورين'
      ],
      order: 1
    },
    {
      id: 'exp2',
      company: 'شركة الحلول الذكية',
      position: 'مطور Frontend',
      location: 'جدة، السعودية',
      startDate: '2018-06-01',
      endDate: '2019-12-31',
      current: false,
      description: 'تطوير واجهات مستخدم تفاعلية وحديثة',
      achievements: [
        'تطوير 10+ واجهة مستخدم',
        'تحسين تجربة المستخدم بنسبة 60%'
      ],
      order: 2
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'جامعة الملك سعود',
      degree: 'بكالوريوس',
      field: 'علوم الحاسب',
      location: 'الرياض، السعودية',
      startDate: '2014-09-01',
      endDate: '2018-06-01',
      current: false,
      gpa: '3.8/4.0',
      description: 'تخصص في هندسة البرمجيات وقواعد البيانات',
      order: 1
    }
  ],
  skills: [
    { id: 'skill1', name: 'React', level: 'expert', category: 'Frontend', order: 1 },
    { id: 'skill2', name: 'Node.js', level: 'expert', category: 'Backend', order: 2 },
    { id: 'skill3', name: 'TypeScript', level: 'advanced', category: 'Programming', order: 3 },
    { id: 'skill4', name: 'MongoDB', level: 'advanced', category: 'Database', order: 4 },
    { id: 'skill5', name: 'AWS', level: 'intermediate', category: 'Cloud', order: 5 }
  ],
  languages: [
    { id: 'lang1', name: 'العربية', level: 'native', order: 1 },
    { id: 'lang2', name: 'الإنجليزية', level: 'fluent', order: 2 }
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      issueDate: '2023-03-15',
      expiryDate: '2026-03-15',
      credentialId: 'AWS-123456',
      url: 'https://aws.amazon.com/certification/',
      order: 1
    }
  ],
  projects: [
    {
      id: 'proj1',
      name: 'منصة التجارة الإلكترونية',
      description: 'تطوير منصة تجارة إلكترونية متكاملة باستخدام React وNode.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      url: 'https://ecommerce-demo.com',
      github: 'https://github.com/ahmed/ecommerce',
      startDate: '2023-01-01',
      endDate: '2023-06-01',
      order: 1
    }
  ],
  references: [
    {
      id: 'ref1',
      name: 'سعد الأحمد',
      position: 'مدير التقنية',
      company: 'شركة التقنية المتقدمة',
      email: 'saad@techcompany.com',
      phone: '+966501111111',
      relationship: 'مدير مباشر',
      order: 1
    }
  ],
  customSections: [],
  settings: {
    visibility: 'public',
    allowDownload: true,
    showPhoto: true,
    colorScheme: 'blue'
  },
  analytics: {
    views: 234,
    downloads: 45
  },
  createdAt: '2024-04-01T10:00:00Z',
  updatedAt: '2024-07-08T15:30:00Z'
};

export const mockReferrals: Referral[] = [
  {
    id: '1',
    referrerId: '1',
    refereeId: '2',
    refereeEmail: 'friend1@example.com',
    code: 'AHMED2024',
    status: 'completed',
    reward: {
      type: 'credit',
      value: 50,
      description: 'رصيد 50 ريال'
    },
    createdAt: '2024-05-15T10:00:00Z',
    completedAt: '2024-05-20T14:30:00Z'
  },
  {
    id: '2',
    referrerId: '1',
    refereeEmail: 'friend2@example.com',
    code: 'AHMED2024',
    status: 'pending',
    reward: {
      type: 'discount',
      value: 20,
      description: 'خصم 20% على الاشتراك'
    },
    createdAt: '2024-06-01T12:00:00Z'
  }
];

export const mockAnalytics: Analytics = {
  cardViews: [
    { date: '2024-07-01', value: 45 },
    { date: '2024-07-02', value: 52 },
    { date: '2024-07-03', value: 38 },
    { date: '2024-07-04', value: 61 },
    { date: '2024-07-05', value: 49 },
    { date: '2024-07-06', value: 73 },
    { date: '2024-07-07', value: 56 },
    { date: '2024-07-08', value: 68 },
    { date: '2024-07-09', value: 42 },
    { date: '2024-07-10', value: 59 }
  ],
  cardShares: [
    { date: '2024-07-01', value: 8 },
    { date: '2024-07-02', value: 12 },
    { date: '2024-07-03', value: 6 },
    { date: '2024-07-04', value: 15 },
    { date: '2024-07-05', value: 9 },
    { date: '2024-07-06', value: 18 },
    { date: '2024-07-07', value: 11 },
    { date: '2024-07-08', value: 14 },
    { date: '2024-07-09', value: 7 },
    { date: '2024-07-10', value: 13 }
  ],
  qrScans: [
    { date: '2024-07-01', value: 23 },
    { date: '2024-07-02', value: 31 },
    { date: '2024-07-03', value: 18 },
    { date: '2024-07-04', value: 27 },
    { date: '2024-07-05', value: 35 },
    { date: '2024-07-06', value: 42 },
    { date: '2024-07-07', value: 29 },
    { date: '2024-07-08', value: 38 },
    { date: '2024-07-09', value: 25 },
    { date: '2024-07-10', value: 33 }
  ],
  contactAdds: [
    { date: '2024-07-01', value: 5 },
    { date: '2024-07-02', value: 8 },
    { date: '2024-07-03', value: 3 },
    { date: '2024-07-04', value: 7 },
    { date: '2024-07-05', value: 6 },
    { date: '2024-07-06', value: 12 },
    { date: '2024-07-07', value: 4 },
    { date: '2024-07-08', value: 9 },
    { date: '2024-07-09', value: 2 },
    { date: '2024-07-10', value: 6 }
  ],
  topCards: [
    {
      cardId: '1',
      cardName: 'أحمد محمد السعيد',
      views: 1245,
      shares: 89,
      clicks: 156
    },
    {
      cardId: '2',
      cardName: 'بطاقة الشركة',
      views: 567,
      shares: 34,
      clicks: 78
    },
    {
      cardId: '3',
      cardName: 'بطاقة المؤتمرات',
      views: 234,
      shares: 12,
      clicks: 23
    }
  ],
  demographics: {
    countries: {
      'السعودية': 65,
      'الإمارات': 15,
      'الكويت': 8,
      'قطر': 5,
      'البحرين': 3,
      'عمان': 2,
      'أخرى': 2
    },
    devices: {
      'موبايل': 78,
      'كمبيوتر': 18,
      'تابلت': 4
    },
    browsers: {
      'Chrome': 45,
      'Safari': 32,
      'Firefox': 12,
      'Edge': 8,
      'أخرى': 3
    }
  },
  period: {
    start: '2024-07-01',
    end: '2024-07-10'
  }
};
