import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Building, 
  Camera, 
  Plus, 
  X,
  Palette,
  Eye,
  Save,
  Upload,
  Link,
  Trash2,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Card, SocialLink, CustomField } from '../types';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

interface CardForm {
  name: string;
  title: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  avatar?: string;
  template: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

const CreateCard = () => {
  const navigate = useNavigate();
  const { addCard } = useStore();
  const [socialLinks, setSocialLinks] = useState<Omit<SocialLink, 'id'>[]>([]);
  const [customFields, setCustomFields] = useState<Omit<CustomField, 'id'>[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CardForm>({
    defaultValues: {
      template: 'modern',
      colors: {
        primary: '#1D4ED8',
        secondary: '#00D1B2',
        background: '#FFFFFF',
        text: '#2D2D2D'
      }
    }
  });

  const watchedValues = watch();

  const templates = [
    { id: 'modern', name: 'عصري', preview: '/templates/modern.png' },
    { id: 'classic', name: 'كلاسيكي', preview: '/templates/classic.png' },
    { id: 'creative', name: 'إبداعي', preview: '/templates/creative.png' },
    { id: 'corporate', name: 'مؤسسي', preview: '/templates/corporate.png' },
    { id: 'minimal', name: 'بسيط', preview: '/templates/minimal.png' }
  ];

  const socialPlatforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
    { id: 'twitter', name: 'Twitter', icon: 'twitter', placeholder: 'https://twitter.com/username' },
    { id: 'instagram', name: 'Instagram', icon: 'instagram', placeholder: 'https://instagram.com/username' },
    { id: 'facebook', name: 'Facebook', icon: 'facebook', placeholder: 'https://facebook.com/username' },
    { id: 'github', name: 'GitHub', icon: 'github', placeholder: 'https://github.com/username' },
    { id: 'youtube', name: 'YouTube', icon: 'youtube', placeholder: 'https://youtube.com/@username' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', placeholder: 'https://wa.me/966501234567' },
    { id: 'telegram', name: 'Telegram', icon: 'telegram', placeholder: 'https://t.me/username' }
  ];

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, {
      platform: '',
      url: '',
      icon: '',
      isVisible: true,
      order: socialLinks.length + 1
    }]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === 'platform') {
      const platform = socialPlatforms.find(p => p.id === value);
      if (platform) {
        updated[index].icon = platform.icon;
      }
    }
    
    setSocialLinks(updated);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, {
      label: '',
      value: '',
      type: 'text',
      isVisible: true,
      order: customFields.length + 1
    }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateCustomField = (index: number, field: string, value: string) => {
    const updated = [...customFields];
    updated[index] = { ...updated[index], [field]: value };
    setCustomFields(updated);
  };

  const onSubmit = async (data: CardForm) => {
    setIsLoading(true);
    
    try {
      const newCard: Omit<Card, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: '1', // سيتم تحديثه من المستخدم الحالي
        name: data.name,
        title: data.title,
        company: data.company,
        phone: data.phone,
        email: data.email,
        website: data.website,
        avatar: data.avatar,
        nfcEnabled: false,
        isActive: true,
        views: 0,
        shares: 0,
        clicks: 0,
        template: data.template,
        colors: data.colors,
        socialLinks: socialLinks.map((link, index) => ({
          ...link,
          id: `social_${index + 1}`
        })),
        customFields: customFields.map((field, index) => ({
          ...field,
          id: `custom_${index + 1}`
        }))
      };

      addCard(newCard);
      toast.success('تم إنشاء البطاقة بنجاح! 🎉');
      navigate('/cards');
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء البطاقة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => navigate('/cards')}
              className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                إنشاء بطاقة جديدة
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                أنشئ بطاقتك الرقمية الاحترافية في دقائق
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={cn(
                "flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors",
                previewMode
                  ? "bg-secondary-500 text-white"
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              )}
            >
              <Eye className="w-4 h-4" />
              <span>معاينة</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="card">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  المعلومات الأساسية
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      الاسم الكامل *
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        {...register('name', { required: 'الاسم مطلوب' })}
                        className="input-field pr-10"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      المسمى الوظيفي *
                    </label>
                    <input
                      {...register('title', { required: 'المسمى الوظيفي مطلوب' })}
                      className="input-field"
                      placeholder="مثال: مطور تطبيقات"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      الشركة
                    </label>
                    <div className="relative">
                      <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        {...register('company')}
                        className="input-field pr-10"
                        placeholder="اسم الشركة أو المؤسسة"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        رقم الهاتف
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          {...register('phone')}
                          className="input-field pr-10"
                          placeholder="+966501234567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        البريد الإلكتروني
                      </label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          {...register('email')}
                          type="email"
                          className="input-field pr-10"
                          placeholder="example@domain.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      الموقع الإلكتروني
                    </label>
                    <div className="relative">
                      <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        {...register('website')}
                        className="input-field pr-10"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="card">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  الصورة الشخصية
                </h2>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                    {watchedValues.avatar ? (
                      <img 
                        src={watchedValues.avatar} 
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-neutral-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <button
                      type="button"
                      className="btn-secondary flex items-center space-x-2 space-x-reverse"
                    >
                      <Upload className="w-4 h-4" />
                      <span>رفع صورة</span>
                    </button>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      PNG أو JPG، الحد الأقصى 2MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div className="card">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  اختيار القالب
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                        watchedValues.template === template.id
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                      )}
                      onClick={() => setValue('template', template.id)}
                    >
                      <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-xs text-neutral-500">معاينة</span>
                      </div>
                      <p className="text-sm font-medium text-center text-neutral-700 dark:text-neutral-300">
                        {template.name}
                      </p>
                      {watchedValues.template === template.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Customization */}
              <div className="card">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  تخصيص الألوان
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      اللون الأساسي
                    </label>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="color"
                        {...register('colors.primary')}
                        className="w-12 h-10 rounded-lg border border-neutral-300 dark:border-neutral-600"
                      />
                      <input
                        type="text"
                        {...register('colors.primary')}
                        className="input-field flex-1"
                        placeholder="#1D4ED8"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      اللون الثانوي
                    </label>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="color"
                        {...register('colors.secondary')}
                        className="w-12 h-10 rounded-lg border border-neutral-300 dark:border-neutral-600"
                      />
                      <input
                        type="text"
                        {...register('colors.secondary')}
                        className="input-field flex-1"
                        placeholder="#00D1B2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    روابط التواصل الاجتماعي
                  </h2>
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="btn-secondary flex items-center space-x-2 space-x-reverse"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة رابط</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <select
                        value={link.platform}
                        onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                        className="input-field w-32"
                      >
                        <option value="">اختر المنصة</option>
                        {socialPlatforms.map((platform) => (
                          <option key={platform.id} value={platform.id}>
                            {platform.name}
                          </option>
                        ))}
                      </select>
                      
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                        placeholder={socialPlatforms.find(p => p.id === link.platform)?.placeholder || 'أدخل الرابط'}
                        className="input-field flex-1"
                      />
                      
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {socialLinks.length === 0 && (
                    <p className="text-center text-neutral-500 dark:text-neutral-400 py-4">
                      لم تتم إضافة أي روابط تواصل اجتماعي بعد
                    </p>
                  )}
                </div>
              </div>

              {/* Custom Fields */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    حقول مخصصة
                  </h2>
                  <button
                    type="button"
                    onClick={addCustomField}
                    className="btn-secondary flex items-center space-x-2 space-x-reverse"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة حقل</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {customFields.map((field, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateCustomField(index, 'label', e.target.value)}
                        placeholder="اسم الحقل"
                        className="input-field col-span-4"
                      />
                      
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => updateCustomField(index, 'value', e.target.value)}
                        placeholder="القيمة"
                        className="input-field col-span-6"
                      />
                      
                      <select
                        value={field.type}
                        onChange={(e) => updateCustomField(index, 'type', e.target.value)}
                        className="input-field col-span-1"
                      >
                        <option value="text">نص</option>
                        <option value="url">رابط</option>
                        <option value="email">إيميل</option>
                        <option value="phone">هاتف</option>
                      </select>
                      
                      <button
                        type="button"
                        onClick={() => removeCustomField(index)}
                        className="col-span-1 p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {customFields.length === 0 && (
                    <p className="text-center text-neutral-500 dark:text-neutral-400 py-4">
                      لم تتم إضافة أي حقول مخصصة بعد
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={() => navigate('/cards')}
                  className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'جاري الحفظ...' : 'حفظ البطاقة'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                معاينة البطاقة
              </h2>
              
              <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-lg p-6 min-h-96">
                {/* Card Preview */}
                <div 
                  className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg max-w-sm mx-auto"
                  style={{ 
                    borderTop: `4px solid ${watchedValues.colors?.primary || '#1D4ED8'}` 
                  }}
                >
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                      {watchedValues.avatar ? (
                        <img 
                          src={watchedValues.avatar} 
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-neutral-400" />
                      )}
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {watchedValues.name || 'اسمك هنا'}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {watchedValues.title || 'المسمى الوظيفي'}
                    </p>
                    {watchedValues.company && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-500">
                        {watchedValues.company}
                      </p>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    {watchedValues.phone && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Phone className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-600 dark:text-neutral-400">{watchedValues.phone}</span>
                      </div>
                    )}
                    {watchedValues.email && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Mail className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-600 dark:text-neutral-400">{watchedValues.email}</span>
                      </div>
                    )}
                    {watchedValues.website && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Globe className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-600 dark:text-neutral-400">{watchedValues.website}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Links Preview */}
                  {socialLinks.length > 0 && (
                    <div className="flex justify-center space-x-3 space-x-reverse mb-4">
                      {socialLinks.slice(0, 4).map((link, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center"
                        >
                          <span className="text-xs text-neutral-600 dark:text-neutral-400">
                            {link.platform ? link.platform.charAt(0).toUpperCase() : '?'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    className="w-full py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: watchedValues.colors?.primary || '#1D4ED8' }}
                  >
                    حفظ جهة الاتصال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
