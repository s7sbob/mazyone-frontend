export interface SolutionConfig {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  gradient: string;
  isPopular?: boolean;
  isNew?: boolean;
  contentFields: ContentField[];
  designOptions: DesignOptions;
  preview: PreviewConfig;
}

export interface ContentField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'email' | 'tel' | 'url' | 'date' | 'time' | 'number' | 'select' | 'file' | 'color';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // للـ select
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  group?: string; // لتجميع الحقول
  conditional?: {
    field: string;
    value: any;
  };
}

export interface DesignOptions {
  templates: Template[];
  colorThemes: ColorTheme[];
  fonts: Font[];
  layouts: Layout[];
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  isPro?: boolean;
}

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

export interface Font {
  id: string;
  name: string;
  family: string;
  weights: number[];
  preview: string;
}

export interface Layout {
  id: string;
  name: string;
  preview: string;
  description: string;
}

export interface PreviewConfig {
  type: 'mobile' | 'desktop' | 'business-card' | 'qr-card';
  aspectRatio: string;
  backgroundColor: string;
}

// إعدادات الحلول الكاملة
const solutionConfigs: Record<string, SolutionConfig> = {
  // البطاقات التجارية الرقمية
  'digital-business-cards': {
    id: 'digital-business-cards',
    title: 'البطاقات التجارية الرقمية',
    description: 'أنشئ بطاقات أعمال رقمية احترافية في دقائق باستخدام قوالب جاهزة. تواصل بسهولة، واترك انطباعاً دائماً وروابط هادفة.',
    category: 'business',
    icon: 'Briefcase',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    isPopular: true,
    contentFields: [
      {
        id: 'fullName',
        name: 'fullName',
        type: 'text',
        label: 'الاسم الكامل',
        placeholder: 'أحمد محمد السعيد',
        required: true,
        group: 'personal',
        validation: { minLength: 2, maxLength: 50 }
      },
      {
        id: 'jobTitle',
        name: 'jobTitle',
        type: 'text',
        label: 'المنصب الوظيفي',
        placeholder: 'مطور واجهات أمامية',
        group: 'personal'
      },
      {
        id: 'company',
        name: 'company',
        type: 'text',
        label: 'اسم الشركة',
        placeholder: 'شركة التقنيات المتقدمة',
        group: 'personal'
      },
      {
        id: 'phone',
        name: 'phone',
        type: 'tel',
        label: 'رقم الهاتف',
        placeholder: '+966 50 123 4567',
        required: true,
        group: 'contact'
      },
      {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'البريد الإلكتروني',
        placeholder: 'example@company.com',
        required: true,
        group: 'contact'
      },
      {
        id: 'website',
        name: 'website',
        type: 'url',
        label: 'الموقع الإلكتروني',
        placeholder: 'https://www.company.com',
        group: 'contact'
      },
      {
        id: 'linkedin',
        name: 'linkedin',
        type: 'url',
        label: 'لينكد إن',
        placeholder: 'https://linkedin.com/in/username',
        group: 'social'
      },
      {
        id: 'twitter',
        name: 'twitter',
        type: 'url',
        label: 'تويتر',
        placeholder: 'https://twitter.com/username',
        group: 'social'
      },
      {
        id: 'address',
        name: 'address',
        type: 'textarea',
        label: 'العنوان',
        placeholder: 'الرياض، المملكة العربية السعودية',
        group: 'contact'
      },
      {
        id: 'bio',
        name: 'bio',
        type: 'textarea',
        label: 'نبذة شخصية',
        placeholder: 'اكتب نبذة مختصرة عنك...',
        group: 'personal',
        validation: { maxLength: 200 }
      },
      {
        id: 'profileImage',
        name: 'profileImage',
        type: 'file',
        label: 'الصورة الشخصية',
        group: 'media'
      },
      {
        id: 'logo',
        name: 'logo',
        type: 'file',
        label: 'شعار الشركة',
        group: 'media'
      }
    ],
    designOptions: {
      templates: [
        { id: 'modern', name: 'عصري', preview: '/templates/business-card/modern.jpg' },
        { id: 'classic', name: 'كلاسيكي', preview: '/templates/business-card/classic.jpg' },
        { id: 'minimal', name: 'بسيط', preview: '/templates/business-card/minimal.jpg' },
        { id: 'elegant', name: 'أنيق', preview: '/templates/business-card/elegant.jpg', isPro: true },
        { id: 'creative', name: 'إبداعي', preview: '/templates/business-card/creative.jpg', isPro: true }
      ],
      colorThemes: [
        { id: 'blue', name: 'الأزرق المهني', primary: '#3B82F6', secondary: '#EFF6FF', accent: '#1D4ED8', text: '#1F2937', background: '#FFFFFF' },
        { id: 'green', name: 'الأخضر الطبيعي', primary: '#10B981', secondary: '#ECFDF5', accent: '#047857', text: '#1F2937', background: '#FFFFFF' },
        { id: 'purple', name: 'البنفسجي الملكي', primary: '#8B5CF6', secondary: '#F3E8FF', accent: '#7C3AED', text: '#1F2937', background: '#FFFFFF' },
        { id: 'gray', name: 'الرمادي الأنيق', primary: '#6B7280', secondary: '#F9FAFB', accent: '#4B5563', text: '#1F2937', background: '#FFFFFF' }
      ],
      fonts: [
        { id: 'tajawal', name: 'Tajawal', family: 'Tajawal, sans-serif', weights: [300, 400, 500, 700], preview: 'أبجد هوز حطي' },
        { id: 'cairo', name: 'Cairo', family: 'Cairo, sans-serif', weights: [300, 400, 600, 700], preview: 'أبجد هوز حطي' },
        { id: 'amiri', name: 'Amiri', family: 'Amiri, serif', weights: [400, 700], preview: 'أبجد هوز حطي' },
        { id: 'noto', name: 'Noto Sans Arabic', family: 'Noto Sans Arabic, sans-serif', weights: [300, 400, 500, 700], preview: 'أبجد هوز حطي' }
      ],
      layouts: [
        { id: 'centered', name: 'وسط', preview: '/layouts/centered.jpg', description: 'محاذاة وسط مع توزيع متوازن' },
        { id: 'left', name: 'يسار', preview: '/layouts/left.jpg', description: 'محاذاة يسار مع تدفق طبيعي' },
        { id: 'split', name: 'مقسم', preview: '/layouts/split.jpg', description: 'تقسيم الشاشة لعرض أفضل' },
        { id: 'card', name: 'بطاقة', preview: '/layouts/card.jpg', description: 'تصميم بطاقة كلاسيكي' }
      ]
    },
    preview: {
      type: 'business-card',
      aspectRatio: '16/10',
      backgroundColor: '#f8fafc'
    }
  },

  // رمز QR للمنتجات
  'product-qr-code': {
    id: 'product-qr-code',
    title: 'رمز QR للمنتجات',
    description: 'اعرض منتجك بقوالب مذهلة قابلة للتخصيص. تفاعل مع عملائك، شارك قصة علامتك التجارية، وعزز المبيعات بسهولة.',
    category: 'business',
    icon: 'ShoppingCart',
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    contentFields: [
      {
        id: 'productName',
        name: 'productName',
        type: 'text',
        label: 'اسم المنتج',
        placeholder: 'iPhone 15 Pro Max',
        required: true,
        group: 'product'
      },
      {
        id: 'productDescription',
        name: 'productDescription',
        type: 'textarea',
        label: 'وصف المنتج',
        placeholder: 'وصف تفصيلي للمنتج وميزاته...',
        required: true,
        group: 'product'
      },
      {
        id: 'price',
        name: 'price',
        type: 'number',
        label: 'السعر',
        placeholder: '0.00',
        group: 'pricing',
        validation: { min: 0 }
      },
      {
        id: 'currency',
        name: 'currency',
        type: 'select',
        label: 'العملة',
        options: ['SAR', 'USD', 'EUR', 'GBP'],
        group: 'pricing'
      },
      {
        id: 'discountPrice',
        name: 'discountPrice',
        type: 'number',
        label: 'سعر بعد الخصم',
        placeholder: '0.00',
        group: 'pricing',
        validation: { min: 0 }
      },
      {
        id: 'sku',
        name: 'sku',
        type: 'text',
        label: 'رمز المنتج (SKU)',
        placeholder: 'PROD-001',
        group: 'product'
      },
      {
        id: 'category',
        name: 'category',
        type: 'text',
        label: 'فئة المنتج',
        placeholder: 'إلكترونيات',
        group: 'product'
      },
      {
        id: 'brand',
        name: 'brand',
        type: 'text',
        label: 'العلامة التجارية',
        placeholder: 'Apple',
        group: 'product'
      },
      {
        id: 'features',
        name: 'features',
        type: 'textarea',
        label: 'الميزات الرئيسية',
        placeholder: 'ميزة 1\nميزة 2\nميزة 3',
        group: 'product'
      },
      {
        id: 'specifications',
        name: 'specifications',
        type: 'textarea',
        label: 'المواصفات التقنية',
        placeholder: 'المواصفة 1: القيمة\nالمواصفة 2: القيمة',
        group: 'product'
      },
      {
        id: 'buyLink',
        name: 'buyLink',
        type: 'url',
        label: 'رابط الشراء',
        placeholder: 'https://store.example.com/product',
        group: 'links'
      },
      {
        id: 'moreInfoLink',
        name: 'moreInfoLink',
        type: 'url',
        label: 'رابط المزيد من المعلومات',
        placeholder: 'https://example.com/product-info',
        group: 'links'
      },
      {
        id: 'productImages',
        name: 'productImages',
        type: 'file',
        label: 'صور المنتج',
        group: 'media'
      },
      {
        id: 'productVideo',
        name: 'productVideo',
        type: 'url',
        label: 'فيديو المنتج',
        placeholder: 'https://youtube.com/watch?v=...',
        group: 'media'
      }
    ],
    designOptions: {
      templates: [
        { id: 'showcase', name: 'عرض المنتج', preview: '/templates/product/showcase.jpg' },
        { id: 'catalog', name: 'كتالوج', preview: '/templates/product/catalog.jpg' },
        { id: 'ecommerce', name: 'متجر إلكتروني', preview: '/templates/product/ecommerce.jpg' },
        { id: 'premium', name: 'بريميوم', preview: '/templates/product/premium.jpg', isPro: true }
      ],
      colorThemes: [
        { id: 'product-green', name: 'أخضر المنتجات', primary: '#10B981', secondary: '#ECFDF5', accent: '#047857', text: '#1F2937', background: '#FFFFFF' },
        { id: 'product-blue', name: 'أزرق التقني', primary: '#0EA5E9', secondary: '#F0F9FF', accent: '#0284C7', text: '#1F2937', background: '#FFFFFF' },
        { id: 'product-orange', name: 'برتقالي الطاقة', primary: '#F59E0B', secondary: '#FFFBEB', accent: '#D97706', text: '#1F2937', background: '#FFFFFF' },
        { id: 'product-purple', name: 'بنفسجي الإبداع', primary: '#A855F7', secondary: '#FAF5FF', accent: '#9333EA', text: '#1F2937', background: '#FFFFFF' }
      ],
      fonts: [
        { id: 'tajawal', name: 'Tajawal', family: 'Tajawal, sans-serif', weights: [400, 500, 700], preview: 'أبجد هوز حطي' },
        { id: 'cairo', name: 'Cairo', family: 'Cairo, sans-serif', weights: [400, 600, 700], preview: 'أبجد هوز حطي' }
      ],
      layouts: [
        { id: 'grid', name: 'شبكي', preview: '/layouts/product-grid.jpg', description: 'تخطيط شبكي لعرض المنتجات' },
        { id: 'hero', name: 'بطولي', preview: '/layouts/product-hero.jpg', description: 'عرض بطولي للمنتج الرئيسي' },
        { id: 'details', name: 'تفصيلي', preview: '/layouts/product-details.jpg', description: 'تركيز على تفاصيل المنتج' }
      ]
    },
    preview: {
      type: 'mobile',
      aspectRatio: '9/16',
      backgroundColor: '#ffffff'
    }
  },

  // رمز QR للنماذج
  'form-qr-code': {
    id: 'form-qr-code',
    title: 'رمز QR للنماذج',
    description: 'أنشئ نماذج احترافية برموز QR باستخدام قوالب جذابة. اجمع بيانات الطرف الأول بسرعة مثل الآراء والملاحظات والتسجيلات وأكثر.',
    category: 'forms',
    icon: 'FormInput',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    isNew: true,
    contentFields: [
      {
        id: 'formTitle',
        name: 'formTitle',
        type: 'text',
        label: 'عنوان النموذج',
        placeholder: 'استطلاع رضا العملاء',
        required: true,
        group: 'form'
      },
      {
        id: 'formDescription',
        name: 'formDescription',
        type: 'textarea',
        label: 'وصف النموذج',
        placeholder: 'ساعدنا في تحسين خدماتنا من خلال مشاركة آرائك...',
        group: 'form'
      },
      {
        id: 'successMessage',
        name: 'successMessage',
        type: 'textarea',
        label: 'رسالة النجاح',
        placeholder: 'شكراً لك! تم إرسال إجاباتك بنجاح.',
        group: 'form'
      },
      {
        id: 'collectEmail',
        name: 'collectEmail',
        type: 'select',
        label: 'جمع البريد الإلكتروني',
        options: ['نعم', 'لا'],
        group: 'settings'
      },
      {
        id: 'collectPhone',
        name: 'collectPhone',
        type: 'select',
        label: 'جمع رقم الهاتف',
        options: ['نعم', 'لا'],
        group: 'settings'
      },
      {
        id: 'redirectUrl',
        name: 'redirectUrl',
        type: 'url',
        label: 'رابط التوجيه بعد الإرسال',
        placeholder: 'https://example.com/thank-you',
        group: 'settings'
      },
      {
        id: 'googleFormUrl',
        name: 'googleFormUrl',
        type: 'url',
        label: 'رابط نموذج جوجل (اختياري)',
        placeholder: 'https://forms.google.com/...',
        group: 'integration'
      }
    ],
    designOptions: {
      templates: [
        { id: 'survey', name: 'استطلاع', preview: '/templates/form/survey.jpg' },
        { id: 'feedback', name: 'ملاحظات', preview: '/templates/form/feedback.jpg' },
        { id: 'registration', name: 'تسجيل', preview: '/templates/form/registration.jpg' },
        { id: 'contact', name: 'اتصال', preview: '/templates/form/contact.jpg' }
      ],
      colorThemes: [
        { id: 'form-purple', name: 'بنفسجي النماذج', primary: '#8B5CF6', secondary: '#F3E8FF', accent: '#7C3AED', text: '#1F2937', background: '#FFFFFF' },
        { id: 'form-blue', name: 'أزرق المؤسسي', primary: '#3B82F6', secondary: '#EFF6FF', accent: '#2563EB', text: '#1F2937', background: '#FFFFFF' },
        { id: 'form-green', name: 'أخضر الثقة', primary: '#10B981', secondary: '#ECFDF5', accent: '#059669', text: '#1F2937', background: '#FFFFFF' }
      ],
      fonts: [
        { id: 'tajawal', name: 'Tajawal', family: 'Tajawal, sans-serif', weights: [400, 500, 700], preview: 'أبجد هوز حطي' },
        { id: 'cairo', name: 'Cairo', family: 'Cairo, sans-serif', weights: [400, 600], preview: 'أبجد هوز حطي' }
      ],
      layouts: [
        { id: 'single', name: 'صفحة واحدة', preview: '/layouts/form-single.jpg', description: 'جميع الحقول في صفحة واحدة' },
        { id: 'multi-step', name: 'متعدد الخطوات', preview: '/layouts/form-multi.jpg', description: 'تقسيم النموذج لخطوات' },
        { id: 'conversational', name: 'حواري', preview: '/layouts/form-chat.jpg', description: 'تجربة حوارية تفاعلية' }
      ]
    },
    preview: {
      type: 'mobile',
      aspectRatio: '9/16',
      backgroundColor: '#f8fafc'
    }
  },

  // vCard Plus
  'vcard-plus': {
    id: 'vcard-plus',
    title: 'vCard Plus',
    description: 'vCard Plus يساعدك على إنشاء صفحات ملف شخصي مذهلة لبطاقات العمل. يجعل من السهل جداً على الآخرين إضافتك إلى دفتر جهات الاتصال وضبط تذكيرات المتابعة.',
    category: 'business',
    icon: 'Users',
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-600',
    contentFields: [
      {
        id: 'fullName',
        name: 'fullName',
        type: 'text',
        label: 'الاسم الكامل',
        placeholder: 'د. أحمد محمد العلي',
        required: true,
        group: 'personal'
      },
      {
        id: 'jobTitle',
        name: 'jobTitle',
        type: 'text',
        label: 'المنصب الوظيفي',
        placeholder: 'المدير التنفيذي',
        group: 'personal'
      },
      {
        id: 'company',
        name: 'company',
        type: 'text',
        label: 'الشركة/المؤسسة',
        placeholder: 'شركة الابتكار التقني',
        group: 'personal'
      },
      {
        id: 'department',
        name: 'department',
        type: 'text',
        label: 'القسم',
        placeholder: 'قسم التطوير',
        group: 'personal'
      },
      {
        id: 'phone',
        name: 'phone',
        type: 'tel',
        label: 'هاتف العمل',
        placeholder: '+966 11 123 4567',
        group: 'contact'
      },
      {
        id: 'mobile',
        name: 'mobile',
        type: 'tel',
        label: 'الجوال',
        placeholder: '+966 50 123 4567',
        required: true,
        group: 'contact'
      },
      {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'البريد الإلكتروني',
        placeholder: 'ahmed@company.com',
        required: true,
        group: 'contact'
      },
      {
        id: 'website',
        name: 'website',
        type: 'url',
        label: 'الموقع الإلكتروني',
        placeholder: 'https://www.company.com',
        group: 'contact'
      },
      {
        id: 'officeAddress',
        name: 'officeAddress',
        type: 'textarea',
        label: 'عنوان المكتب',
        placeholder: 'شارع الملك فهد، الرياض 12345',
        group: 'contact'
      },
      {
        id: 'note',
        name: 'note',
        type: 'textarea',
        label: 'ملاحظة شخصية',
        placeholder: 'التقينا في معرض التقنية 2024',
        group: 'personal'
      }
    ],
    designOptions: {
      templates: [
        { id: 'executive', name: 'تنفيذي', preview: '/templates/vcard/executive.jpg' },
        { id: 'professional', name: 'مهني', preview: '/templates/vcard/professional.jpg' },
        { id: 'creative', name: 'إبداعي', preview: '/templates/vcard/creative.jpg', isPro: true },
        { id: 'corporate', name: 'مؤسسي', preview: '/templates/vcard/corporate.jpg' }
      ],
      colorThemes: [
        { id: 'vcard-indigo', name: 'نيلي مهني', primary: '#6366F1', secondary: '#EEF2FF', accent: '#4F46E5', text: '#1F2937', background: '#FFFFFF' },
        { id: 'vcard-gray', name: 'رمادي أنيق', primary: '#6B7280', secondary: '#F9FAFB', accent: '#4B5563', text: '#1F2937', background: '#FFFFFF' },
        { id: 'vcard-blue', name: 'أزرق كلاسيكي', primary: '#3B82F6', secondary: '#EFF6FF', accent: '#2563EB', text: '#1F2937', background: '#FFFFFF' }
      ],
      fonts: [
        { id: 'tajawal', name: 'Tajawal', family: 'Tajawal, sans-serif', weights: [400, 500, 700], preview: 'أبجد هوز حطي' },
        { id: 'amiri', name: 'Amiri', family: 'Amiri, serif', weights: [400, 700], preview: 'أبجد هوز حطي' }
      ],
      layouts: [
        { id: 'contact-card', name: 'بطاقة اتصال', preview: '/layouts/vcard-contact.jpg', description: 'تخطيط بطاقة اتصال كلاسيكي' },
        { id: 'profile', name: 'ملف شخصي', preview: '/layouts/vcard-profile.jpg', description: 'صفحة ملف شخصي شاملة' }
      ]
    },
    preview: {
      type: 'business-card',
      aspectRatio: '16/10',
      backgroundColor: '#f8fafc'
    }
  }

  // يمكن إضافة باقي الحلول هنا بنفس الطريقة...
};

// دالة للحصول على إعدادات حل محدد
export const getSolutionConfig = (solutionId: string): SolutionConfig | null => {
  return solutionConfigs[solutionId] || null;
};

// دالة للحصول على جميع الحلول
export const getAllSolutionConfigs = (): SolutionConfig[] => {
  return Object.values(solutionConfigs);
};

// دالة للحصول على حلول بفئة محددة
export const getSolutionsByCategory = (category: string): SolutionConfig[] => {
  return Object.values(solutionConfigs).filter(config => config.category === category);
};

// دالة للبحث في الحلول
export const searchSolutions = (query: string): SolutionConfig[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(solutionConfigs).filter(config =>
    config.title.toLowerCase().includes(lowerQuery) ||
    config.description.toLowerCase().includes(lowerQuery)
  );
};

export default solutionConfigs;
