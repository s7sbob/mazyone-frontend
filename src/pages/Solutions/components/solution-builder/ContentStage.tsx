import React, { useState, useEffect } from 'react';
import { Link, Copy, Check, RefreshCw, Image, Upload, X, Plus } from 'lucide-react';
import TemplateCarousel from './TemplateCarousel';
import { getTemplatesForSolution, getTemplateFields } from '../../config/templateConfigs';

interface ContentStageProps {
  solutionConfig: any;
  data: any;
  onDataUpdate: (data: any) => void;
}

const ContentStage: React.FC<ContentStageProps> = ({ 
  solutionConfig, 
  data, 
  onDataUpdate 
}) => {
  const [pageUrl, setPageUrl] = useState(data.pageUrl || '');
  const [selectedTemplate, setSelectedTemplate] = useState(data.selectedTemplate || '');
  const [copied, setCopied] = useState(false);
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});

  // توليد URL عشوائي
  const generateRandomUrl = () => {
    setIsGeneratingUrl(true);
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setTimeout(() => {
      setPageUrl(result);
      handleDataUpdate('pageUrl', result);
      setIsGeneratingUrl(false);
    }, 500);
  };

  // نسخ الرابط
  const copyUrl = () => {
    const fullUrl = `https://mazyone.com/${pageUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // تحديث البيانات
  const handleDataUpdate = (field: string, value: any) => {
    onDataUpdate({
      [field]: value
    });
  };

  // معالجة رفع الصور
  const handleImageUpload = async (fieldId: string, file: File) => {
    setUploadingImages(prev => ({ ...prev, [fieldId]: true }));
    
    // محاكاة رفع الصورة
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      handleDataUpdate(fieldId, imageUrl);
      setUploadingImages(prev => ({ ...prev, [fieldId]: false }));
    }, 1500);
  };

  // توليد URL تلقائي عند بدء التطبيق
  useEffect(() => {
    if (!pageUrl) {
      generateRandomUrl();
    }
  }, []);

  const templates = getTemplatesForSolution(solutionConfig.id);
  const templateFields = selectedTemplate ? getTemplateFields(solutionConfig.id, selectedTemplate) : [];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    handleDataUpdate('selectedTemplate', templateId);
  };

  // رندر الحقول الديناميكية
  const renderDynamicField = (field: any) => {
    const value = data[field.id] || field.defaultValue || '';

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
              placeholder={field.placeholder}
              maxLength={field.maxLength}
            />
            {field.hint && (
              <p className="text-xs text-neutral-500 mt-1">{field.hint}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input min-h-[80px]"
              placeholder={field.placeholder}
              rows={field.rows || 3}
              maxLength={field.maxLength}
            />
            {field.maxLength && (
              <p className="text-xs text-neutral-500 mt-1">
                {value.length}/{field.maxLength} حرف
              </p>
            )}
          </div>
        );

      case 'email':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
              placeholder={field.placeholder}
            />
          </div>
        );

      case 'tel':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="tel"
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
              placeholder={field.placeholder}
            />
          </div>
        );

      case 'url':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="url"
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
              placeholder={field.placeholder}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
            >
              <option value="">اختر...</option>
              {field.options?.map((option: string, index: number) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'color':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center space-x-3 space-x-reverse">
              <input
                type="color"
                value={value || field.defaultValue || '#000000'}
                onChange={(e) => handleDataUpdate(field.id, e.target.value)}
                className="w-12 h-12 rounded-lg border-2 border-neutral-200 cursor-pointer"
              />
              <input
                type="text"
                value={value || field.defaultValue || '#000000'}
                onChange={(e) => handleDataUpdate(field.id, e.target.value)}
                className="input flex-1 font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className={`w-20 h-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center overflow-hidden ${field.shape === 'circle' ? 'rounded-full' : ''}`}>
                {value ? (
                  <img 
                    src={value} 
                    alt={field.label} 
                    className={`w-full h-full object-cover ${field.shape === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
                  />
                ) : (
                  <Image className="w-8 h-8 text-neutral-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <label className="btn-secondary cursor-pointer flex items-center space-x-2 space-x-reverse">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImages[field.id] ? 'جار الرفع...' : 'رفع صورة'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(field.id, file);
                      }}
                      disabled={uploadingImages[field.id]}
                    />
                  </label>
                  {value && (
                    <button
                      onClick={() => handleDataUpdate(field.id, '')}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="حذف الصورة"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  {field.allowedFormats || 'PNG، JPG'} - حد أقصى {field.maxSize || '2MB'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'date':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
              min={field.min}
              max={field.max}
            />
          </div>
        );

      case 'time':
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="time"
              value={value}
              onChange={(e) => handleDataUpdate(field.id, e.target.value)}
              className="input"
            />
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-3 space-x-reverse">
            <input
              type="checkbox"
              id={field.id}
              checked={value || false}
              onChange={(e) => handleDataUpdate(field.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={field.id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {field.label}
            </label>
          </div>
        );

      case 'list':
        const listValue = Array.isArray(value) ? value : [];
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {listValue.map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newList = [...listValue];
                      newList[index] = e.target.value;
                      handleDataUpdate(field.id, newList);
                    }}
                    className="input flex-1"
                    placeholder={`${field.placeholder} ${index + 1}`}
                  />
                  <button
                    onClick={() => {
                      const newList = listValue.filter((_, i) => i !== index);
                      handleDataUpdate(field.id, newList);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  handleDataUpdate(field.id, [...listValue, '']);
                }}
                className="flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة {field.itemName || 'عنصر'}</span>
              </button>
            </div>
            {field.hint && (
              <p className="text-xs text-neutral-500 mt-1">{field.hint}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          إعداد المحتوى
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          قم بإعداد رابط الصفحة واختر التصميم المناسب
        </p>
      </div>

      {/* 1. Page URL Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Link className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            رابط صفحتك
          </h3>
          <span className="text-sm text-neutral-500">(لا يمكن تغييره بعد الحفظ)</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex-1 flex items-center border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                https://mazyone.com/
              </div>
              <input
                type="text"
                value={pageUrl}
                onChange={(e) => {
                  const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
                  if (value.length <= 20) {
                    setPageUrl(value);
                    handleDataUpdate('pageUrl', value);
                  }
                }}
                className="flex-1 px-4 py-3 border-0 focus:outline-none focus:ring-0 bg-white dark:bg-neutral-900"
                placeholder="اكتب الرابط المخصص"
                minLength={5}
              />
            </div>
            
            <button
              onClick={generateRandomUrl}
              disabled={isGeneratingUrl}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
              title="توليد رابط عشوائي"
            >
              {isGeneratingUrl ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={copyUrl}
              className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              title="نسخ الرابط"
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <p>• الحد الأدنى 5 أحرف، الحد الأقصى 20 حرف</p>
            <p>• يُسمح بالأحرف الإنجليزية والأرقام فقط</p>
            <p>• الرابط النهائي: <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">https://mazyone.com/{pageUrl}</span></p>
          </div>
        </div>
      </div>

      {/* 2. Template Selection Carousel */}
      <TemplateCarousel
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        solutionType={solutionConfig.id}
      />

      {/* 3. Dynamic Template Fields */}
      {selectedTemplate && templateFields.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-5 h-5 text-green-500">📝</div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              تخصيص القالب
            </h3>
            <span className="text-sm text-neutral-500">
              ({templateFields.filter(f => f.required).length} حقل مطلوب)
            </span>
          </div>
          
          {/* Group fields by section */}
          {(() => {
            const sections = templateFields.reduce((acc, field) => {
              const section = field.section || 'عام';
              if (!acc[section]) acc[section] = [];
              acc[section].push(field);
              return acc;
            }, {} as Record<string, any[]>);

            return Object.entries(sections).map(([sectionName, sectionFields]) => (
              <div key={sectionName} className="space-y-4">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 border-r-4 pr-3" 
                    style={{ borderColor: sectionFields[0]?.sectionColor || '#3B82F6' }}>
                  {sectionName}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectionFields.map(field => 
                    field.fullWidth ? (
                      <div key={field.id} className="md:col-span-2">
                        {renderDynamicField(field)}
                      </div>
                    ) : (
                      renderDynamicField(field)
                    )
                  )}
                </div>
              </div>
            ));
          })()}
        </div>
      )}

      {/* Template Instructions */}
      {selectedTemplate && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
            إرشادات القالب
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• املأ جميع الحقول المطلوبة للحصول على أفضل نتيجة</li>
            <li>• استخدم صوراً عالية الجودة لتحسين المظهر</li>
            <li>• تأكد من صحة البيانات قبل المتابعة</li>
            <li>• يمكنك معاينة التغييرات في الوقت الفعلي</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContentStage;
