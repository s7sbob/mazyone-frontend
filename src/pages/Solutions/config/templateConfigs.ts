import React from 'react';

// Business Card Templates
import BusinessCardTemplate1 from '../components/templates/business-cards/BusinessCardTemplate1';
import BusinessCardTemplate2 from '../components/templates/business-cards/BusinessCardTemplate2';
import BusinessCardTemplate3 from '../components/templates/business-cards/BusinessCardTemplate3';
import BusinessCardTemplate4 from '../components/templates/business-cards/BusinessCardTemplate4';

// Product Templates
import ProductTemplate1 from '../components/templates/products/ProductTemplate1';
import ProductTemplate2 from '../components/templates/products/ProductTemplate2';
import ProductTemplate3 from '../components/templates/products/ProductTemplate3';

// Form Templates
import FormTemplate1 from '../components/templates/forms/FormTemplate1';
import FormTemplate2 from '../components/templates/forms/FormTemplate2';
import FormTemplate3 from '../components/templates/forms/FormTemplate3';

// Event Templates
import EventTemplate1 from '../components/templates/events/EventTemplate1';
import EventTemplate2 from '../components/templates/events/EventTemplate2';

// Menu Templates
import MenuTemplate1 from '../components/templates/menus/MenuTemplate1';
import MenuTemplate2 from '../components/templates/menus/MenuTemplate2';

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  previewComponent?: React.ComponentType<any>;
  isPro?: boolean;
  isPopular?: boolean;
  category?: string;
}

export interface TemplateField {
  id: string;
  type: 'text' | 'textarea' | 'email' | 'tel' | 'url' | 'number' | 'select' | 'color' | 'image' | 'date' | 'time' | 'checkbox' | 'list';
  label: string;
  placeholder?: string;
  required?: boolean;
  section?: string;
  sectionColor?: string;
  fullWidth?: boolean;
  defaultValue?: any;
  options?: string[];
  min?: number | string;
  max?: number | string;
  step?: number;
  maxLength?: number;
  rows?: number;
  hint?: string;
  allowedFormats?: string;
  maxSize?: string;
  shape?: 'square' | 'circle';
  itemName?: string;
}

export const getTemplatesForSolution = (solutionId: string): Template[] => {
  switch (solutionId) {
    case 'digital-business-cards':
      return [
        {
          id: 'modern-card',
          name: 'بطاقة عصرية',
          description: 'تصميم عصري مع ألوان متدرجة وتخطيط نظيف',
          preview: '/templates/business-card/modern.jpg',
          previewComponent: BusinessCardTemplate1,
          isPopular: true,
          category: 'عصري'
        },
        {
          id: 'classic-card',
          name: 'بطاقة كلاسيكية',
          description: 'تصميم أنيق وكلاسيكي مناسب للمهن التقليدية',
          preview: '/templates/business-card/classic.jpg',
          previewComponent: BusinessCardTemplate2,
          category: 'كلاسيكي'
        },
        {
          id: 'minimal-card',
          name: 'بطاقة بسيطة',
          description: 'تصميم بسيط ونظيف يركز على المعلومات الأساسية',
          preview: '/templates/business-card/minimal.jpg',
          previewComponent: BusinessCardTemplate3,
          category: 'بسيط'
        },
        {
          id: 'luxury-card',
          name: 'بطاقة فاخرة',
          description: 'تصميم فاخر مع تأثيرات ذهبية ومظهر راقي',
          preview: '/templates/business-card/luxury.jpg',
          previewComponent: BusinessCardTemplate4,
          isPro: true,
          category: 'فاخر'
        }
      ];

    case 'product-qr-code':
      return [
        {
          id: 'product-showcase',
          name: 'عرض المنتج',
          description: 'عرض جذاب للمنتج مع معلومات كاملة وصور عالية الجودة',
          preview: '/templates/product/showcase.jpg',
          previewComponent: ProductTemplate1,
          isPopular: true,
          category: 'تسويقي'
        },
        {
          id: 'product-catalog',
          name: 'كتالوج المنتج',
          description: 'تصميم كتالوج احترافي مناسب للشركات الكبيرة',
          preview: '/templates/product/catalog.jpg',
          previewComponent: ProductTemplate2,
          category: 'كتالوج'
        },
        {
          id: 'product-premium',
          name: 'منتج بريميوم',
          description: 'تصميم فاخر للمنتجات الراقية والعلامات التجارية المميزة',
          preview: '/templates/product/premium.jpg',
          previewComponent: ProductTemplate3,
          isPro: true,
          category: 'بريميوم'
        }
      ];

    case 'form-qr-code':
      return [
        {
          id: 'form-modern',
          name: 'نموذج عصري',
          description: 'تصميم نموذج عصري وسهل الاستخدام مع تجربة مستخدم محسنة',
          preview: '/templates/form/modern.jpg',
          previewComponent: FormTemplate1,
          isPopular: true,
          category: 'تفاعلي'
        },
        {
          id: 'form-survey',
          name: 'استطلاع رأي',
          description: 'تصميم مخصص للاستطلاعات مع مؤشرات التقدم',
          preview: '/templates/form/survey.jpg',
          previewComponent: FormTemplate2,
          category: 'استطلاع'
        },
        {
          id: 'form-contact',
          name: 'نموذج اتصال',
          description: 'نموذج التواصل والاستفسارات مع تصميم احترافي',
          preview: '/templates/form/contact.jpg',
          previewComponent: FormTemplate3,
          isPro: true,
          category: 'اتصال'
        }
      ];

    case 'event':
      return [
        {
          id: 'event-conference',
          name: 'مؤتمر احترافي',
          description: 'تصميم مخصص للمؤتمرات المهنية والندوات العلمية',
          preview: '/templates/event/conference.jpg',
          previewComponent: EventTemplate1,
          isPopular: true,
          category: 'مؤتمرات'
        },
        {
          id: 'event-gala',
          name: 'حفل رسمي',
          description: 'تصميم أنيق للحفلات الرسمية والمناسبات المهمة',
          preview: '/templates/event/gala.jpg',
          previewComponent: EventTemplate2,
          isPro: true,
          category: 'رسمي'
        }
      ];

    case 'menu':
      return [
        {
          id: 'menu-restaurant',
          name: 'مطعم فاخر',
          description: 'قائمة طعام فاخرة للمطاعم الراقية مع تصميم أنيق',
          preview: '/templates/menu/restaurant.jpg',
          previewComponent: MenuTemplate1,
          isPopular: true,
          category: 'فاخر'
        },
        {
          id: 'menu-cafe',
          name: 'كافيه عصري',
          description: 'قائمة مقهى عصرية وبسيطة مع ألوان دافئة',
          preview: '/templates/menu/cafe.jpg',
          previewComponent: MenuTemplate2,
          category: 'عصري'
        }
      ];

    default:
      return [
        {
          id: 'default-modern',
          name: 'تصميم عصري',
          description: 'تصميم عصري متعدد الاستخدامات',
          preview: '/templates/default/modern.jpg',
          category: 'عام'
        }
      ];
  }
};

export const getTemplateFields = (solutionId: string, templateId: string): TemplateField[] => {
  const key = `${solutionId}-${templateId}`;
  
  switch (key) {
    // ===== Business Card Templates =====
    case 'digital-business-cards-modern-card':
      return [
        // Personal Info Section
        { id: 'fullName', type: 'text', label: 'الاسم الكامل', placeholder: 'أحمد محمد السعيد', required: true, section: 'المعلومات الشخصية', sectionColor: '#3B82F6' },
        { id: 'jobTitle', type: 'text', label: 'المنصب الوظيفي', placeholder: 'مطور واجهات أمامية', section: 'المعلومات الشخصية', sectionColor: '#3B82F6' },
        { id: 'company', type: 'text', label: 'اسم الشركة', placeholder: 'شركة التقنيات المتقدمة', section: 'المعلومات الشخصية', sectionColor: '#3B82F6' },
        
        // Contact Section
        { id: 'phone', type: 'tel', label: 'رقم الهاتف', placeholder: '+966 50 123 4567', required: true, section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'email', type: 'email', label: 'البريد الإلكتروني', placeholder: 'example@company.com', required: true, section: 'معلومات الاتصال', sectionColor: '#10B981', fullWidth: true },
        { id: 'website', type: 'url', label: 'الموقع الإلكتروني', placeholder: 'https://www.company.com', section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'linkedin', type: 'url', label: 'لينكد إن', placeholder: 'https://linkedin.com/in/username', section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'twitter', type: 'url', label: 'تويتر', placeholder: 'https://twitter.com/username', section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'address', type: 'textarea', label: 'العنوان', placeholder: 'الرياض، المملكة العربية السعودية', rows: 2, section: 'معلومات الاتصال', sectionColor: '#10B981', fullWidth: true },
        
        // Media Section
        { id: 'profileImage', type: 'image', label: 'الصورة الشخصية', shape: 'circle', allowedFormats: 'PNG, JPG', maxSize: '2MB', section: 'الوسائط', sectionColor: '#8B5CF6' },
        { id: 'companyLogo', type: 'image', label: 'شعار الشركة', shape: 'square', allowedFormats: 'PNG, SVG', maxSize: '1MB', section: 'الوسائط', sectionColor: '#8B5CF6' },
        
        // Design Section
        { id: 'primaryColor', type: 'color', label: 'اللون الأساسي', defaultValue: '#3B82F6', section: 'التصميم', sectionColor: '#F59E0B' },
        { id: 'secondaryColor', type: 'color', label: 'اللون الثانوي', defaultValue: '#EFF6FF', section: 'التصميم', sectionColor: '#F59E0B' }
      ];

    case 'digital-business-cards-classic-card':
      return [
        // Personal Info
        { id: 'fullName', type: 'text', label: 'الاسم الكامل', placeholder: 'أحمد محمد السعيد', required: true, section: 'المعلومات الشخصية', sectionColor: '#6B7280' },
        { id: 'jobTitle', type: 'text', label: 'المنصب الوظيفي', placeholder: 'مدير تنفيذي', section: 'المعلومات الشخصية', sectionColor: '#6B7280' },
        { id: 'company', type: 'text', label: 'اسم الشركة', placeholder: 'الشركة المحدودة', section: 'المعلومات الشخصية', sectionColor: '#6B7280' },
        
        // Contact
        { id: 'phone', type: 'tel', label: 'رقم الهاتف', placeholder: '+966 11 123 4567', required: true, section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'email', type: 'email', label: 'البريد الإلكتروني', placeholder: 'info@company.com', required: true, section: 'معلومات الاتصال', sectionColor: '#10B981', fullWidth: true },
        { id: 'website', type: 'url', label: 'الموقع الإلكتروني', placeholder: 'https://www.company.com', section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'fax', type: 'tel', label: 'رقم الفاكس', placeholder: '+966 11 123 4568', section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'address', type: 'textarea', label: 'العنوان الكامل', placeholder: 'ص.ب 1234، الرياض 11564، المملكة العربية السعودية', rows: 3, section: 'معلومات الاتصال', sectionColor: '#10B981', fullWidth: true },
        
        // Media
        { id: 'profileImage', type: 'image', label: 'الصورة الشخصية', shape: 'circle', section: 'الوسائط', sectionColor: '#8B5CF6' },
        { id: 'companyLogo', type: 'image', label: 'شعار الشركة', shape: 'square', section: 'الوسائط', sectionColor: '#8B5CF6' }
      ];

    case 'digital-business-cards-minimal-card':
      return [
        { id: 'fullName', type: 'text', label: 'الاسم الكامل', placeholder: 'أحمد محمد', required: true, section: 'المعلومات الأساسية', sectionColor: '#059669' },
        { id: 'jobTitle', type: 'text', label: 'التخصص', placeholder: 'مصمم جرافيك', section: 'المعلومات الأساسية', sectionColor: '#059669' },
        { id: 'company', type: 'text', label: 'الشركة/المؤسسة', placeholder: 'استوديو الإبداع', section: 'المعلومات الأساسية', sectionColor: '#059669' },
        { id: 'email', type: 'email', label: 'البريد الإلكتروني', placeholder: 'ahmed@example.com', required: true, section: 'الاتصال', sectionColor: '#0284C7', fullWidth: true },
        { id: 'phone', type: 'tel', label: 'رقم الهاتف', placeholder: '+966 50 123 4567', required: true, section: 'الاتصال', sectionColor: '#0284C7' },
        { id: 'website', type: 'url', label: 'الموقع الشخصي', placeholder: 'https://portfolio.com', section: 'الاتصال', sectionColor: '#0284C7' },
        { id: 'profileImage', type: 'image', label: 'الصورة الشخصية', shape: 'circle', section: 'الصورة', sectionColor: '#7C3AED' }
      ];

    case 'digital-business-cards-luxury-card':
      return [
        { id: 'fullName', type: 'text', label: 'الاسم الكامل', placeholder: 'د. عبدالله العثمان', required: true, section: 'المعلومات الشخصية', sectionColor: '#D97706' },
        { id: 'title', type: 'text', label: 'اللقب المهني', placeholder: 'المدير العام والمؤسس', section: 'المعلومات الشخصية', sectionColor: '#D97706' },
        { id: 'company', type: 'text', label: 'اسم الشركة', placeholder: 'مجموعة العثمان القابضة', section: 'المعلومات الشخصية', sectionColor: '#D97706' },
        { id: 'department', type: 'text', label: 'القسم', placeholder: 'الإدارة التنفيذية', section: 'المعلومات الشخصية', sectionColor: '#D97706' },
        
        { id: 'phone', type: 'tel', label: 'هاتف العمل', placeholder: '+966 11 123 4567', required: true, section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'mobile', type: 'tel', label: 'الجوال', placeholder: '+966 50 123 4567', section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'email', type: 'email', label: 'البريد الإلكتروني', placeholder: 'ceo@company.com', required: true, section: 'معلومات الاتصال', sectionColor: '#10B981', fullWidth: true },
        { id: 'website', type: 'url', label: 'الموقع الإلكتروني', placeholder: 'https://www.company.com', section: 'معلومات الاتصال', sectionColor: '#10B981' },
        { id: 'address', type: 'textarea', label: 'عنوان المقر الرئيسي', placeholder: 'برج التجارة، الطابق 40، حي الملك فهد، الرياض', rows: 2, section: 'معلومات الاتصال', sectionColor: '#10B981', fullWidth: true },
        
        { id: 'profileImage', type: 'image', label: 'الصورة الشخصية', shape: 'circle', allowedFormats: 'PNG, JPG', maxSize: '3MB', section: 'الوسائط', sectionColor: '#8B5CF6' },
        { id: 'companyLogo', type: 'image', label: 'الشعار الذهبي', allowedFormats: 'PNG, SVG', maxSize: '2MB', section: 'الوسائط', sectionColor: '#8B5CF6' },
        
        { id: 'primaryColor', type: 'color', label: 'اللون الذهبي الأساسي', defaultValue: '#F59E0B', section: 'التصميم الفاخر', sectionColor: '#F59E0B' },
        { id: 'accentColor', type: 'color', label: 'لون التمييز', defaultValue: '#EAB308', section: 'التصميم الفاخر', sectionColor: '#F59E0B' }
      ];

    // ===== Product Templates =====
    case 'product-qr-code-product-showcase':
      return [
        { id: 'productName', type: 'text', label: 'اسم المنتج', placeholder: 'iPhone 15 Pro Max', required: true, section: 'معلومات المنتج', sectionColor: '#10B981' },
        { id: 'brand', type: 'text', label: 'العلامة التجارية', placeholder: 'Apple', section: 'معلومات المنتج', sectionColor: '#10B981' },
        { id: 'category', type: 'select', label: 'فئة المنتج', options: ['إلكترونيات', 'أزياء', 'كتب', 'رياضة', 'منزل وحديقة', 'سيارات', 'صحة وجمال', 'أخرى'], section: 'معلومات المنتج', sectionColor: '#10B981' },
        { id: 'sku', type: 'text', label: 'رمز المنتج (SKU)', placeholder: 'PROD-001', section: 'معلومات المنتج', sectionColor: '#10B981' },
        
        { id: 'productDescription', type: 'textarea', label: 'وصف المنتج', placeholder: 'أحدث هواتف آيفون بتقنيات متقدمة وكاميرا احترافية لتجربة استثنائية...', required: true, rows: 4, maxLength: 500, section: 'الوصف والميزات', sectionColor: '#3B82F6', fullWidth: true },
        { id: 'features', type: 'list', label: 'الميزات الرئيسية', placeholder: 'شاشة Super Retina XDR', itemName: 'ميزة', hint: 'أضف المميزات الرئيسية للمنتج', section: 'الوصف والميزات', sectionColor: '#3B82F6', fullWidth: true },
        { id: 'specifications', type: 'textarea', label: 'المواصفات التقنية', rows: 4, placeholder: 'الشاشة: 6.7 بوصة\nالمعالج: A17 Pro\nالذاكرة: 256 جيجابايت\nالكاميرا: 48 ميجابكسل', section: 'الوصف والميزات', sectionColor: '#3B82F6', fullWidth: true },
        
        { id: 'price', type: 'number', label: 'السعر', placeholder: '2999', min: 0, step: 0.01, section: 'التسعير', sectionColor: '#DC2626' },
        { id: 'discountPrice', type: 'number', label: 'سعر بعد الخصم', placeholder: '2499', min: 0, step: 0.01, section: 'التسعير', sectionColor: '#DC2626' },
        { id: 'currency', type: 'select', label: 'العملة', options: ['ر.س', '$', '€', '£'], defaultValue: 'ر.س', section: 'التسعير', sectionColor: '#DC2626' },
        
        { id: 'productImages', type: 'image', label: 'صور المنتج', allowedFormats: 'PNG, JPG, WEBP', maxSize: '5MB', hint: 'استخدم صوراً عالية الجودة للحصول على أفضل نتيجة', section: 'الوسائط', sectionColor: '#8B5CF6' },
        { id: 'productVideo', type: 'url', label: 'فيديو المنتج', placeholder: 'https://youtube.com/watch?v=...', hint: 'رابط يوتيوب أو فيميو', section: 'الوسائط', sectionColor: '#8B5CF6', fullWidth: true },
        
        { id: 'buyLink', type: 'url', label: 'رابط الشراء', placeholder: 'https://store.example.com/product', hint: 'الرابط المباشر لشراء المنتج', section: 'الروابط', sectionColor: '#059669', fullWidth: true },
        { id: 'moreInfoLink', type: 'url', label: 'رابط المزيد من المعلومات', placeholder: 'https://example.com/product-info', section: 'الروابط', sectionColor: '#059669', fullWidth: true }
      ];

    case 'product-qr-code-product-catalog':
      return [
        { id: 'productName', type: 'text', label: 'اسم المنتج', placeholder: 'لابتوب Dell XPS 13', required: true, section: 'المعلومات الأساسية', sectionColor: '#6366F1' },
        { id: 'productCode', type: 'text', label: 'كود المنتج', placeholder: 'CAT-2024-001', section: 'المعلومات الأساسية', sectionColor: '#6366F1' },
        { id: 'category', type: 'text', label: 'التصنيف', placeholder: 'حاسوب محمول', section: 'المعلومات الأساسية', sectionColor: '#6366F1' },
        { id: 'productDescription', type: 'textarea', label: 'الوصف المختصر', rows: 3, maxLength: 200, placeholder: 'لابتوب عالي الأداء مناسب للعمل والدراسة...', section: 'المعلومات الأساسية', sectionColor: '#6366F1', fullWidth: true },
        
        { id: 'specifications', type: 'textarea', label: 'المواصفات التفصيلية', rows: 6, placeholder: 'المعالج: Intel Core i7\nالذاكرة: 16 جيجابايت\nالتخزين: 512 جيجابايت SSD\nالشاشة: 13.3 بوصة 4K\nنظام التشغيل: Windows 11', section: 'التفاصيل التقنية', sectionColor: '#DC2626', fullWidth: true },
        { id: 'dimensions', type: 'text', label: 'الأبعاد', placeholder: '30 x 21 x 1.5 سم', section: 'التفاصيل التقنية', sectionColor: '#DC2626' },
        { id: 'weight', type: 'text', label: 'الوزن', placeholder: '1.2 كيلوجرام', section: 'التفاصيل التقنية', sectionColor: '#DC2626' },
        { id: 'material', type: 'text', label: 'المادة', placeholder: 'ألمنيوم مُعاد التدوير', section: 'التفاصيل التقنية', sectionColor: '#DC2626' },
        { id: 'color', type: 'text', label: 'الألوان المتاحة', placeholder: 'فضي، ذهبي، أسود', section: 'التفاصيل التقنية', sectionColor: '#DC2626' },
        
        { id: 'price', type: 'number', label: 'السعر', placeholder: '4999', min: 0, section: 'السعر والتوفر', sectionColor: '#059669' },
        { id: 'availability', type: 'select', label: 'حالة التوفر', options: ['متوفر', 'غير متوفر', 'قريباً', 'نفد المخزون'], defaultValue: 'متوفر', section: 'السعر والتوفر', sectionColor: '#059669' },
        { id: 'warranty', type: 'text', label: 'الضمان', placeholder: 'سنتان ضمان دولي', section: 'السعر والتوفر', sectionColor: '#059669' },
        
        { id: 'productImages', type: 'image', label: 'صورة المنتج الرئيسية', allowedFormats: 'PNG, JPG', maxSize: '3MB', section: 'الصور', sectionColor: '#8B5CF6' }
      ];

    case 'product-qr-code-product-premium':
      return [
        { id: 'productName', type: 'text', label: 'اسم المنتج الفاخر', placeholder: 'ساعة رولكس ديتونا الذهبية', required: true, section: 'المعلومات الحصرية', sectionColor: '#D97706' },
        { id: 'exclusiveFeature', type: 'text', label: 'الميزة الحصرية', placeholder: 'إصدار محدود مرقم يدوياً', section: 'المعلومات الحصرية', sectionColor: '#D97706' },
        { id: 'limitedEdition', type: 'checkbox', label: 'إصدار محدود', defaultValue: true, section: 'المعلومات الحصرية', sectionColor: '#D97706' },
        { id: 'serialNumber', type: 'text', label: 'الرقم التسلسلي', placeholder: 'LUX-2024-001', section: 'المعلومات الحصرية', sectionColor: '#D97706' },
        
        { id: 'productDescription', type: 'textarea', label: 'الوصف الفاخر', placeholder: 'قطعة فنية استثنائية تجمع بين الحرفية التقليدية والتقنيات الحديثة...', rows: 4, section: 'التفاصيل الراقية', sectionColor: '#8B5CF6', fullWidth: true },
        { id: 'premiumFeatures', type: 'list', label: 'الميزات الفاخرة', placeholder: 'مرصعة بالألماس الطبيعي', itemName: 'ميزة فاخرة', section: 'التفاصيل الراقية', sectionColor: '#8B5CF6', fullWidth: true },
        { id: 'craftsmanship', type: 'textarea', label: 'تفاصيل الصناعة', placeholder: 'صنعت يدوياً بواسطة أمهر الحرفيين في سويسرا...', rows: 3, section: 'التفاصيل الراقية', sectionColor: '#8B5CF6', fullWidth: true },
        
        { id: 'price', type: 'number', label: 'السعر الحصري', placeholder: '89999', min: 0, section: 'التسعير الفاخر', sectionColor: '#DC2626' },
        { id: 'vipPrice', type: 'number', label: 'سعر كبار الشخصيات', placeholder: '79999', min: 0, hint: 'سعر خاص للعملاء المميزين', section: 'التسعير الفاخر', sectionColor: '#DC2626' },
        { id: 'paymentOptions', type: 'text', label: 'خيارات الدفع', placeholder: 'نقداً، تقسيط VIP، عملات رقمية', section: 'التسعير الفاخر', sectionColor: '#DC2626' },
        
        { id: 'premiumService', type: 'textarea', label: 'الخدمات الحصرية', placeholder: '• توصيل شخصي بسيارة فاخرة\n• تغليف هدايا فاخر\n• خدمة عملاء مخصصة 24/7\n• صيانة مجانية مدى الحياة', rows: 4, section: 'الخدمات المميزة', sectionColor: '#10B981', fullWidth: true },
        { id: 'warranty', type: 'text', label: 'الضمان الممتد', placeholder: 'ضمان مدى الحياة + تأمين شامل', section: 'الخدمات المميزة', sectionColor: '#10B981' },
        { id: 'conciergeService', type: 'checkbox', label: 'خدمة الكونسيرج', defaultValue: true, section: 'الخدمات المميزة', sectionColor: '#10B981' },
        
        { id: 'productImages', type: 'image', label: 'الصور الفاخرة', allowedFormats: 'PNG, JPG, TIFF', maxSize: '10MB', hint: 'استخدم أعلى جودة ممكنة', section: 'المعرض الحصري', sectionColor: '#F59E0B' },
        { id: 'certificateImage', type: 'image', label: 'شهادة الأصالة', allowedFormats: 'PNG, JPG, PDF', maxSize: '5MB', section: 'المعرض الحصري', sectionColor: '#F59E0B' }
      ];

    // ===== Form Templates =====
    case 'form-qr-code-form-modern':
      return [
        { id: 'formTitle', type: 'text', label: 'عنوان النموذج', placeholder: 'استطلاع رضا العملاء', required: true, section: 'إعدادات النموذج', sectionColor: '#3B82F6' },
        { id: 'formDescription', type: 'textarea', label: 'وصف النموذج', placeholder: 'ساعدنا في تحسين خدماتنا من خلال مشاركة آرائك القيمة', rows: 3, section: 'إعدادات النموذج', sectionColor: '#3B82F6', fullWidth: true },
        { id: 'submitButtonText', type: 'text', label: 'نص زر الإرسال', defaultValue: 'إرسال النموذج', section: 'إعدادات النموذج', sectionColor: '#3B82F6' },
        { id: 'formType', type: 'select', label: 'نوع النموذج', options: ['استطلاع رأي', 'ملاحظات', 'تسجيل', 'اتصال', 'شكوى', 'اقتراح'], defaultValue: 'استطلاع رأي', section: 'إعدادات النموذج', sectionColor: '#3B82F6' },
        
        { id: 'collectName', type: 'checkbox', label: 'جمع الاسم الكامل', defaultValue: true, section: 'الحقول المطلوبة', sectionColor: '#10B981' },
        { id: 'collectEmail', type: 'checkbox', label: 'جمع البريد الإلكتروني', defaultValue: true, section: 'الحقول المطلوبة', sectionColor: '#10B981' },
        { id: 'collectPhone', type: 'checkbox', label: 'جمع رقم الهاتف', defaultValue: false, section: 'الحقول المطلوبة', sectionColor: '#10B981' },
        { id: 'collectRating', type: 'checkbox', label: 'تقييم بالنجوم (1-5)', defaultValue: true, section: 'الحقول المطلوبة', sectionColor: '#10B981' },
        { id: 'collectMessage', type: 'checkbox', label: 'مربع نص للملاحظات', defaultValue: true, section: 'الحقول المطلوبة', sectionColor: '#10B981' },
        { id: 'collectCompany', type: 'checkbox', label: 'اسم الشركة/المؤسسة', defaultValue: false, section: 'الحقول المطلوبة', sectionColor: '#10B981' },
        
        { id: 'successMessage', type: 'textarea', label: 'رسالة النجاح', defaultValue: 'شكراً لك! تم إرسال إجاباتك بنجاح. نقدر وقتك واهتمامك.', rows: 2, section: 'رسائل النظام', sectionColor: '#059669', fullWidth: true },
        { id: 'errorMessage', type: 'textarea', label: 'رسالة الخطأ', defaultValue: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', rows: 2, section: 'رسائل النظام', sectionColor: '#059669', fullWidth: true },
        { id: 'redirectUrl', type: 'url', label: 'صفحة التوجيه بعد الإرسال', placeholder: 'https://example.com/thank-you', hint: 'اتركه فارغاً لعرض رسالة النجاح فقط', section: 'رسائل النظام', sectionColor: '#059669', fullWidth: true },
        
        { id: 'primaryColor', type: 'color', label: 'اللون الأساسي', defaultValue: '#3B82F6', section: 'تصميم النموذج', sectionColor: '#8B5CF6' },
        { id: 'accentColor', type: 'color', label: 'لون التمييز', defaultValue: '#10B981', section: 'تصميم النموذج', sectionColor: '#8B5CF6' },
        { id: 'backgroundColor', type: 'color', label: 'لون الخلفية', defaultValue: '#F8FAFC', section: 'تصميم النموذج', sectionColor: '#8B5CF6' }
      ];

    case 'form-qr-code-form-survey':
      return [
        { id: 'formTitle', type: 'text', label: 'عنوان الاستطلاع', placeholder: 'استطلاع رضا العملاء الشامل', required: true, section: 'إعدادات الاستطلاع', sectionColor: '#6366F1' },
        { id: 'formDescription', type: 'textarea', label: 'مقدمة الاستطلاع', placeholder: 'مرحباً! نحن نقدر رأيك ونود معرفة تجربتك معنا', rows: 3, section: 'إعدادات الاستطلاع', sectionColor: '#6366F1', fullWidth: true },
        { id: 'estimatedTime', type: 'text', label: 'الوقت المتوقع للإكمال', placeholder: 'دقيقتان', section: 'إعدادات الاستطلاع', sectionColor: '#6366F1' },
        { id: 'surveyType', type: 'select', label: 'نوع الاستطلاع', options: ['رضا العملاء', 'تقييم الخدمة', 'تقييم المنتج', 'استطلاع السوق', 'بحث أكاديمي'], section: 'إعدادات الاستطلاع', sectionColor: '#6366F1' },
        
        { id: 'multiStep', type: 'checkbox', label: 'تقسيم الاستطلاع لخطوات', defaultValue: true, section: 'هيكل الاستطلاع', sectionColor: '#DC2626' },
        { id: 'showProgress', type: 'checkbox', label: 'إظهار شريط التقدم', defaultValue: true, section: 'هيكل الاستطلاع', sectionColor: '#DC2626' },
        { id: 'randomizeQuestions', type: 'checkbox', label: 'ترتيب عشوائي للأسئلة', defaultValue: false, section: 'هيكل الاستطلاع', sectionColor: '#DC2626' },
        
        { id: 'questions', type: 'list', label: 'أسئلة الاستطلاع', placeholder: 'كيف تقيم جودة خدماتنا؟', itemName: 'سؤال', hint: 'أضف الأسئلة المطلوبة للاستطلاع', section: 'الأسئلة', sectionColor: '#10B981', fullWidth: true },
        { id: 'questionTypes', type: 'textarea', label: 'أنواع الأسئلة', placeholder: 'السؤال 1: اختيار متعدد\nالسؤال 2: تقييم بالنجوم\nالسؤال 3: نص مفتوح', rows: 4, section: 'الأسئلة', sectionColor: '#10B981', fullWidth: true },
        
        { id: 'completionMessage', type: 'textarea', label: 'رسالة إتمام الاستطلاع', defaultValue: 'شكراً لمشاركتك! إجاباتك مهمة جداً لتطوير خدماتنا.', rows: 2, section: 'رسائل الإنجاز', sectionColor: '#059669', fullWidth: true },
        { id: 'incentive', type: 'text', label: 'حافز المشاركة', placeholder: 'احصل على خصم 10% على طلبك القادم', section: 'رسائل الإنجاز', sectionColor: '#059669' }
      ];

    case 'form-qr-code-form-contact':
      return [
        { id: 'formTitle', type: 'text', label: 'عنوان نموذج الاتصال', placeholder: 'تواصل معنا', required: true, section: 'إعدادات التواصل', sectionColor: '#0EA5E9' },
        { id: 'formDescription', type: 'textarea', label: 'رسالة الترحيب', placeholder: 'نحن هنا لمساعدتك! أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن', rows: 3, section: 'إعدادات التواصل', sectionColor: '#0EA5E9', fullWidth: true },
        { id: 'responseTime', type: 'text', label: 'وقت الاستجابة المتوقع', placeholder: '24 ساعة', section: 'إعدادات التواصل', sectionColor: '#0EA5E9' },
        
        { id: 'departmentOptions', type: 'list', label: 'الأقسام المتاحة', placeholder: 'خدمة العملاء', itemName: 'قسم', defaultValue: ['خدمة العملاء', 'الدعم التقني', 'المبيعات', 'الشكاوى'], section: 'أقسام التواصل', sectionColor: '#DC2626', fullWidth: true },
        { id: 'priorityLevels', type: 'list', label: 'مستويات الأولوية', placeholder: 'عادي', itemName: 'مستوى', defaultValue: ['عادي', 'مهم', 'عاجل'], section: 'أقسام التواصل', sectionColor: '#DC2626', fullWidth: true },
        
        { id: 'contactInfo', type: 'textarea', label: 'معلومات الاتصال المعروضة', placeholder: 'الهاتف: +966 11 123 4567\nالإيميل: info@company.com\nالعنوان: الرياض، المملكة العربية السعودية', rows: 4, section: 'معلومات الشركة', sectionColor: '#10B981', fullWidth: true },
        { id: 'businessHours', type: 'textarea', label: 'ساعات العمل', placeholder: 'السبت - الأربعاء: 9:00 ص - 6:00 م\nالخميس: 9:00 ص - 3:00 م\nالجمعة: مغلق', rows: 3, section: 'معلومات الشركة', sectionColor: '#10B981', fullWidth: true },
        { id: 'emergencyContact', type: 'text', label: 'رقم الطوارئ', placeholder: '+966 50 999 8888', section: 'معلومات الشركة', sectionColor: '#10B981' },
        
        { id: 'autoReply', type: 'checkbox', label: 'تفعيل الرد التلقائي', defaultValue: true, section: 'إعدادات الردود', sectionColor: '#8B5CF6' },
        { id: 'autoReplyMessage', type: 'textarea', label: 'رسالة الرد التلقائي', defaultValue: 'شكراً لتواصلك معنا! تم استلام رسالتك وسنرد عليك في أقرب وقت ممكن.', rows: 2, section: 'إعدادات الردود', sectionColor: '#8B5CF6', fullWidth: true },
        { id: 'ccEmails', type: 'text', label: 'إيميلات إضافية للإشعار', placeholder: 'manager@company.com, support@company.com', hint: 'افصل بين الإيميلات بفواصل', section: 'إعدادات الردود', sectionColor: '#8B5CF6', fullWidth: true }
      ];

    // ===== Event Templates =====
    case 'event-event-conference':
      return [
        { id: 'eventName', type: 'text', label: 'اسم المؤتمر', placeholder: 'مؤتمر التكنولوجيا والذكاء الاصطناعي 2024', required: true, section: 'معلومات المؤتمر', sectionColor: '#3B82F6' },
        { id: 'eventSubtitle', type: 'text', label: 'العنوان الفرعي', placeholder: 'مستقبل التكنولوجيا في المنطقة', section: 'معلومات المؤتمر', sectionColor: '#3B82F6' },
        { id: 'eventDescription', type: 'textarea', label: 'وصف المؤتمر', placeholder: 'انضم إلينا في رحلة استكشافية لأحدث التطورات في عالم التكنولوجيا والذكاء الاصطناعي...', rows: 4, section: 'معلومات المؤتمر', sectionColor: '#3B82F6', fullWidth: true },
        { id: 'eventType', type: 'select', label: 'نوع المؤتمر', options: ['تقني', 'طبي', 'تعليمي', 'تجاري', 'أكاديمي', 'علمي'], section: 'معلومات المؤتمر', sectionColor: '#3B82F6' },
        
        { id: 'eventDate', type: 'date', label: 'تاريخ المؤتمر', required: true, section: 'التوقيت والمكان', sectionColor: '#10B981' },
        { id: 'eventTime', type: 'time', label: 'وقت البداية', required: true, section: 'التوقيت والمكان', sectionColor: '#10B981' },
        { id: 'eventEndTime', type: 'time', label: 'وقت الانتهاء', section: 'التوقيت والمكان', sectionColor: '#10B981' },
        { id: 'eventLocation', type: 'text', label: 'مكان المؤتمر', placeholder: 'مركز الرياض الدولي للمؤتمرات والمعارض', required: true, section: 'التوقيت والمكان', sectionColor: '#10B981' },
        { id: 'venue', type: 'text', label: 'اسم القاعة', placeholder: 'قاعة الملك فيصل الكبرى', section: 'التوقيت والمكان', sectionColor: '#10B981' },
        { id: 'address', type: 'textarea', label: 'العنوان التفصيلي', placeholder: 'طريق الملك فهد، حي الصحافة، الرياض 13315', rows: 2, section: 'التوقيت والمكان', sectionColor: '#10B981', fullWidth: true },
        
        { id: 'speakers', type: 'list', label: 'المتحدثون الرئيسيون', placeholder: 'د. أحمد المطيري - خبير الذكاء الاصطناعي', itemName: 'متحدث', section: 'البرنامج', sectionColor: '#8B5CF6', fullWidth: true },
        { id: 'agenda', type: 'textarea', label: 'جدول المؤتمر', placeholder: '9:00 - 9:30: التسجيل والإفطار\n9:30 - 10:30: الجلسة الافتتاحية\n10:30 - 12:00: الجلسة الأولى', rows: 6, section: 'البرنامج', sectionColor: '#8B5CF6', fullWidth: true },
        { id: 'topics', type: 'list', label: 'المحاور الرئيسية', placeholder: 'الذكاء الاصطناعي في الطب', itemName: 'محور', section: 'البرنامج', sectionColor: '#8B5CF6', fullWidth: true },
        
        { id: 'registrationRequired', type: 'checkbox', label: 'يتطلب التسجيل المسبق', defaultValue: true, section: 'التسجيل', sectionColor: '#DC2626' },
        { id: 'registrationFee', type: 'number', label: 'رسوم التسجيل', placeholder: '0', min: 0, hint: 'اتركه 0 للمؤتمرات المجانية', section: 'التسجيل', sectionColor: '#DC2626' },
        { id: 'maxAttendees', type: 'number', label: 'الحد الأقصى للمشاركين', placeholder: '500', min: 1, section: 'التسجيل', sectionColor: '#DC2626' },
        { id: 'registrationDeadline', type: 'date', label: 'آخر موعد للتسجيل', section: 'التسجيل', sectionColor: '#DC2626' },
        { id: 'registrationLink', type: 'url', label: 'رابط التسجيل', placeholder: 'https://conference.example.com/register', section: 'التسجيل', sectionColor: '#DC2626', fullWidth: true },
        
        { id: 'organizer', type: 'text', label: 'جهة التنظيم', placeholder: 'جامعة الملك سعود', section: 'معلومات إضافية', sectionColor: '#059669' },
        { id: 'sponsors', type: 'list', label: 'الرعاة', placeholder: 'شركة أرامكو السعودية', itemName: 'راعي', section: 'معلومات إضافية', sectionColor: '#059669', fullWidth: true },
        { id: 'contactEmail', type: 'email', label: 'إيميل التواصل', placeholder: 'conference@example.com', section: 'معلومات إضافية', sectionColor: '#059669' },
        { id: 'contactPhone', type: 'tel', label: 'هاتف التواصل', placeholder: '+966 11 123 4567', section: 'معلومات إضافية', sectionColor: '#059669' }
      ];

    case 'event-event-gala':
      return [
        { id: 'eventName', type: 'text', label: 'اسم الحفل', placeholder: 'حفل تكريم رواد الأعمال', required: true, section: 'تفاصيل الحفل', sectionColor: '#D97706' },
        { id: 'eventTheme', type: 'text', label: 'موضوع الحفل', placeholder: 'ليلة التكريم الذهبية', section: 'تفاصيل الحفل', sectionColor: '#D97706' },
        { id: 'eventDescription', type: 'textarea', label: 'وصف الحفل', placeholder: 'ليلة استثنائية لتكريم أبرز الشخصيات والإنجازات في عالم الأعمال...', rows: 4, section: 'تفاصيل الحفل', sectionColor: '#D97706', fullWidth: true },
        { id: 'dressCode', type: 'select', label: 'قواعد اللباس', options: ['رسمي أسود', 'كوكتيل', 'ثوب تقليدي', 'ملابس سهرة'], defaultValue: 'رسمي أسود', section: 'تفاصيل الحفل', sectionColor: '#D97706' },
        
        { id: 'eventDate', type: 'date', label: 'تاريخ الحفل', required: true, section: 'التوقيت والمكان', sectionColor: '#8B5CF6' },
        { id: 'eventTime', type: 'time', label: 'وقت بداية الحفل', required: true, section: 'التوقيت والمكان', sectionColor: '#8B5CF6' },
        { id: 'receptionTime', type: 'time', label: 'وقت الاستقبال', hint: 'عادة قبل الحفل بـ 30 دقيقة', section: 'التوقيت والمكان', sectionColor: '#8B5CF6' },
        { id: 'eventLocation', type: 'text', label: 'مكان إقامة الحفل', placeholder: 'فندق الريتز كارلتون الرياض', required: true, section: 'التوقيت والمكان', sectionColor: '#8B5CF6' },
        { id: 'ballroom', type: 'text', label: 'القاعة', placeholder: 'القاعة الملكية - الطابق الثاني', section: 'التوقيت والمكان', sectionColor: '#8B5CF6' },
        
        { id: 'program', type: 'textarea', label: 'برنامج الحفل', placeholder: '7:00 م: استقبال الضيوف وكوكتيل ترحيبي\n7:30 م: كلمة افتتاحية\n8:00 م: تكريم المكرمين\n9:00 م: عشاء راقي\n10:30 م: فقرة ترفيهية', rows: 6, section: 'البرنامج', sectionColor: '#10B981', fullWidth: true },
        { id: 'honorees', type: 'list', label: 'المكرمون', placeholder: 'الأستاذ محمد العثمان - رجل الأعمال المتميز', itemName: 'مكرم', section: 'البرنامج', sectionColor: '#10B981', fullWidth: true },
        { id: 'entertainment', type: 'text', label: 'الفقرة الترفيهية', placeholder: 'عرض موسيقي بقيادة الفنان أحمد الحربي', section: 'البرنامج', sectionColor: '#10B981' },
        { id: 'keynote', type: 'text', label: 'المتحدث الرئيسي', placeholder: 'معالي الوزير د. عبدالله الراجحي', section: 'البرنامج', sectionColor: '#10B981' },
        
        { id: 'invitationOnly', type: 'checkbox', label: 'بدعوة خاصة فقط', defaultValue: true, section: 'معلومات الحضور', sectionColor: '#DC2626' },
        { id: 'rsvpRequired', type: 'checkbox', label: 'يتطلب تأكيد الحضور', defaultValue: true, section: 'معلومات الحضور', sectionColor: '#DC2626' },
        { id: 'rsvpDeadline', type: 'date', label: 'آخر موعد لتأكيد الحضور', section: 'معلومات الحضور', sectionColor: '#DC2626' },
        { id: 'guestLimit', type: 'number', label: 'عدد المرافقين المسموح', placeholder: '1', min: 0, max: 5, section: 'معلومات الحضور', sectionColor: '#DC2626' },
        { id: 'vipSection', type: 'checkbox', label: 'قسم كبار الشخصيات', defaultValue: true, section: 'معلومات الحضور', sectionColor: '#DC2626' },
        
        { id: 'organizer', type: 'text', label: 'منظم الحفل', placeholder: 'غرفة تجارة الرياض', section: 'معلومات التنظيم', sectionColor: '#059669' },
        { id: 'sponsor', type: 'text', label: 'الراعي الرئيسي', placeholder: 'البنك الأهلي السعودي', section: 'معلومات التنظيم', sectionColor: '#059669' },
        { id: 'mediaPartner', type: 'text', label: 'الشريك الإعلامي', placeholder: 'قناة العربية', section: 'معلومات التنظيم', sectionColor: '#059669' },
        { id: 'contactPerson', type: 'text', label: 'شخص الاتصال', placeholder: 'أ. سارة المطيري - مدير الفعاليات', section: 'معلومات التنظيم', sectionColor: '#059669' },
        { id: 'contactPhone', type: 'tel', label: 'هاتف التواصل', placeholder: '+966 11 123 4567', section: 'معلومات التنظيم', sectionColor: '#059669' },
        { id: 'contactEmail', type: 'email', label: 'إيميل التواصل', placeholder: 'events@chamber.com', section: 'معلومات التنظيم', sectionColor: '#059669' }
      ];

    // ===== Menu Templates =====
    case 'menu-menu-restaurant':
      return [
        { id: 'restaurantName', type: 'text', label: 'اسم المطعم', placeholder: 'مطعم الأصالة الملكي', required: true, section: 'معلومات المطعم', sectionColor: '#D97706' },
        { id: 'restaurantType', type: 'text', label: 'نوع المطعم', placeholder: 'مطعم عربي فاخر', section: 'معلومات المطعم', sectionColor: '#D97706' },
        { id: 'cuisine', type: 'select', label: 'نوع المأكولات', options: ['عربي', 'لبناني', 'شامي', 'خليجي', 'مغربي', 'تركي', 'هندي', 'إيطالي', 'فرنسي', 'آسيوي', 'عالمي'], section: 'معلومات المطعم', sectionColor: '#D97706' },
        { id: 'establishedYear', type: 'number', label: 'سنة التأسيس', placeholder: '1995', min: 1900, max: 2024, section: 'معلومات المطعم', sectionColor: '#D97706' },
        { id: 'chefName', type: 'text', label: 'اسم الشيف', placeholder: 'الشيف أحمد الحربي', section: 'معلومات المطعم', sectionColor: '#D97706' },
        
        { id: 'menuCategories', type: 'list', label: 'أقسام القائمة', placeholder: 'المقبلات', itemName: 'قسم', defaultValue: ['المقبلات', 'الأطباق الرئيسية', 'الحلويات', 'المشروبات'], section: 'هيكل القائمة', sectionColor: '#10B981', fullWidth: true },
        { id: 'specialDishes', type: 'list', label: 'الأطباق المميزة', placeholder: 'مندي الغنم الملكي', itemName: 'طبق مميز', section: 'هيكل القائمة', sectionColor: '#10B981', fullWidth: true },
        { id: 'todaysSpecial', type: 'text', label: 'طبق اليوم', placeholder: 'كبسة الجمبري بالزعفران', section: 'هيكل القائمة', sectionColor: '#10B981' },
        { id: 'seasonalMenu', type: 'checkbox', label: 'قائمة موسمية', defaultValue: true, section: 'هيكل القائمة', sectionColor: '#10B981' },
        
        { id: 'priceRange', type: 'select', label: 'الفئة السعرية', options: ['اقتصادي (50-100 ر.س)', 'متوسط (100-200 ر.س)', 'راقي (200-400 ر.س)', 'فاخر (400+ ر.س)'], section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        { id: 'currency', type: 'select', label: 'العملة', options: ['ر.س', '$', '€', '£'], defaultValue: 'ر.س', section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        { id: 'serviceCharge', type: 'number', label: 'رسوم الخدمة (%)', placeholder: '10', min: 0, max: 25, section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        { id: 'vatIncluded', type: 'checkbox', label: 'الأسعار شاملة الضريبة', defaultValue: true, section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        
        { id: 'businessHours', type: 'textarea', label: 'ساعات العمل', placeholder: 'يومياً من 12:00 ظهراً إلى 12:00 منتصف الليل\nالجمعة: من 2:00 ظهراً إلى 12:00 منتصف الليل', rows: 3, section: 'معلومات الخدمة', sectionColor: '#8B5CF6', fullWidth: true },
        { id: 'deliveryAvailable', type: 'checkbox', label: 'خدمة التوصيل متاحة', defaultValue: true, section: 'معلومات الخدمة', sectionColor: '#8B5CF6' },
        { id: 'takeAwayAvailable', type: 'checkbox', label: 'خدمة الطلب الخارجي', defaultValue: true, section: 'معلومات الخدمة', sectionColor: '#8B5CF6' },
        { id: 'reservationRequired', type: 'checkbox', label: 'يتطلب حجز مسبق', defaultValue: false, section: 'معلومات الخدمة', sectionColor: '#8B5CF6' },
        { id: 'privateRooms', type: 'checkbox', label: 'قاعات خاصة متاحة', defaultValue: true, section: 'معلومات الخدمة', sectionColor: '#8B5CF6' },
        
        { id: 'contactPhone', type: 'tel', label: 'رقم الهاتف', placeholder: '+966 11 123 4567', required: true, section: 'معلومات الاتصال', sectionColor: '#059669' },
        { id: 'whatsappNumber', type: 'tel', label: 'رقم الواتساب', placeholder: '+966 50 123 4567', section: 'معلومات الاتصال', sectionColor: '#059669' },
        { id: 'location', type: 'textarea', label: 'العنوان', placeholder: 'حي الملك فهد، شارع التحلية، الرياض', rows: 2, section: 'معلومات الاتصال', sectionColor: '#059669', fullWidth: true },
        { id: 'website', type: 'url', label: 'الموقع الإلكتروني', placeholder: 'https://www.restaurant.com', section: 'معلومات الاتصال', sectionColor: '#059669' },
        { id: 'socialMedia', type: 'textarea', label: 'وسائل التواصل الاجتماعي', placeholder: 'إنستغرام: @restaurant_name\nتويتر: @restaurant\nسناب شات: restaurant_snap', rows: 3, section: 'معلومات الاتصال', sectionColor: '#059669', fullWidth: true }
      ];

    case 'menu-menu-cafe':
      return [
        { id: 'restaurantName', type: 'text', label: 'اسم الكافيه', placeholder: 'كافيه الصباح', required: true, section: 'معلومات الكافيه', sectionColor: '#F59E0B' },
        { id: 'restaurantType', type: 'text', label: 'نوع الكافيه', placeholder: 'كافيه عصري للقهوة المختصة', section: 'معلومات الكافيه', sectionColor: '#F59E0B' },
        { id: 'coffeeOrigin', type: 'text', label: 'أصل القهوة', placeholder: 'حبوب عربية أثيوبية', section: 'معلومات الكافيه', sectionColor: '#F59E0B' },
        { id: 'specialty', type: 'text', label: 'التخصص', placeholder: 'قهوة مقطرة وتحميص خاص', section: 'معلومات الكافيه', sectionColor: '#F59E0B' },
        { id: 'ambiance', type: 'select', label: 'أجواء الكافيه', options: ['هادئ ومريح', 'نشط ومفعم بالحيوية', 'مناسب للعمل', 'رومانسي', 'عائلي', 'شبابي'], section: 'معلومات الكافيه', sectionColor: '#F59E0B' },
        
        { id: 'beverageCategories', type: 'list', label: 'أقسام المشروبات', placeholder: 'القهوة المختصة', itemName: 'قسم', defaultValue: ['القهوة المختصة', 'المشروبات الباردة', 'الشاي والمشروبات الساخنة', 'العصائر الطبيعية'], section: 'قائمة المشروبات', sectionColor: '#10B981', fullWidth: true },
        { id: 'foodOptions', type: 'list', label: 'الخيارات الغذائية', placeholder: 'كرواسون بالزبدة', itemName: 'صنف', defaultValue: ['المعجنات والحلى', 'الوجبات الخفيفة', 'السلطات الصحية', 'الساندويتشات'], section: 'قائمة المشروبات', sectionColor: '#10B981', fullWidth: true },
        { id: 'signatureDrinks', type: 'list', label: 'المشروبات المميزة', placeholder: 'لاتيه بنكهة الهيل', itemName: 'مشروب مميز', section: 'قائمة المشروبات', sectionColor: '#10B981', fullWidth: true },
        { id: 'healthyOptions', type: 'checkbox', label: 'خيارات صحية متاحة', defaultValue: true, section: 'قائمة المشروبات', sectionColor: '#10B981' },
        { id: 'veganOptions', type: 'checkbox', label: 'خيارات نباتية', defaultValue: true, section: 'قائمة المشروبات', sectionColor: '#10B981' },
        
        { id: 'averagePrice', type: 'text', label: 'متوسط الأسعار', placeholder: '15-35 ر.س للمشروبات', section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        { id: 'loyaltyProgram', type: 'checkbox', label: 'برنامج ولاء العملاء', defaultValue: true, section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        { id: 'studentDiscount', type: 'checkbox', label: 'خصم طلابي', defaultValue: true, section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        { id: 'happyHour', type: 'text', label: 'ساعة سعيدة', placeholder: '3:00-6:00 مساءً - خصم 20%', section: 'معلومات الأسعار', sectionColor: '#DC2626' },
        
        { id: 'wifiAvailable', type: 'checkbox', label: 'واي فاي مجاني', defaultValue: true, section: 'خدمات الكافيه', sectionColor: '#8B5CF6' },
        { id: 'workFriendly', type: 'checkbox', label: 'مناسب للعمل والدراسة', defaultValue: true, section: 'خدمات الكافيه', sectionColor: '#8B5CF6' },
        { id: 'musicType', type: 'select', label: 'نوع الموسيقى', options: ['هادئة وكلاسيكية', 'جاز وبلوز', 'موسيقى عربية خفيفة', 'إندي وبوب', 'بدون موسيقى'], section: 'خدمات الكافيه', sectionColor: '#8B5CF6' },
        { id: 'outdoorSeating', type: 'checkbox', label: 'جلسات خارجية', defaultValue: false, section: 'خدمات الكافيه', sectionColor: '#8B5CF6' },
        { id: 'petFriendly', type: 'checkbox', label: 'يسمح بالحيوانات الأليفة', defaultValue: false, section: 'خدمات الكافيه', sectionColor: '#8B5CF6' },
        
        { id: 'openingHours', type: 'textarea', label: 'ساعات العمل', placeholder: 'السبت - الخميس: 7:00 ص - 11:00 م\nالجمعة: 2:00 م - 11:00 م', rows: 2, section: 'معلومات العمل', sectionColor: '#059669', fullWidth: true },
        { id: 'phoneNumber', type: 'tel', label: 'رقم الهاتف', placeholder: '+966 50 123 4567', required: true, section: 'معلومات العمل', sectionColor: '#059669' },
        { id: 'deliveryApps', type: 'text', label: 'تطبيقات التوصيل', placeholder: 'جاهز، طلبات، مرسول', section: 'معلومات العمل', sectionColor: '#059669' },
        { id: 'address', type: 'textarea', label: 'العنوان', placeholder: 'حي العليا، شارع الأمير سلطان، الرياض', rows: 2, section: 'معلومات العمل', sectionColor: '#059669', fullWidth: true },
        { id: 'instagramHandle', type: 'text', label: 'حساب إنستغرام', placeholder: '@morning_cafe', section: 'معلومات العمل', sectionColor: '#059669' }
      ];

    default:
      return [];
  }
};
