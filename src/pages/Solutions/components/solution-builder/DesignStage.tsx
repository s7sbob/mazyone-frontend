import React, { useState } from 'react';
import { Palette, Image, Type, Layout, Sliders } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface DesignStageProps {
  solutionConfig: any;
  data: any;
  onDataUpdate: (data: any) => void;
}

const DesignStage: React.FC<DesignStageProps> = ({ 
  solutionConfig, 
  data, 
  onDataUpdate 
}) => {
  const [activeTab, setActiveTab] = useState('colors');

  const handleDesignChange = (field: string, value: any) => {
    onDataUpdate({
      design: {
        ...data.design,
        [field]: value
      }
    });
  };

  const colorThemes = [
    { name: 'الأزرق الكلاسيكي', primary: '#3B82F6', secondary: '#EFF6FF', text: '#1F2937' },
    { name: 'الأخضر الطبيعي', primary: '#10B981', secondary: '#ECFDF5', text: '#1F2937' },
    { name: 'البنفسجي الأنيق', primary: '#8B5CF6', secondary: '#F3E8FF', text: '#1F2937' },
    { name: 'البرتقالي النابض', primary: '#F59E0B', secondary: '#FFFBEB', text: '#1F2937' },
    { name: 'الوردي الناعم', primary: '#EC4899', secondary: '#FDF2F8', text: '#1F2937' },
    { name: 'الأحمر القوي', primary: '#EF4444', secondary: '#FEF2F2', text: '#1F2937' },
    { name: 'الرمادي المحايد', primary: '#6B7280', secondary: '#F9FAFB', text: '#1F2937' },
    { name: 'التيل الهادئ', primary: '#14B8A6', secondary: '#F0FDFA', text: '#1F2937' }
  ];

  const fontFamilies = [
    { name: 'Tajawal', value: 'Tajawal, sans-serif', preview: 'أبجد هوز حطي' },
    { name: 'Amiri', value: 'Amiri, serif', preview: 'أبجد هوز حطي' },
    { name: 'Cairo', value: 'Cairo, sans-serif', preview: 'أبجد هوز حطي' },
    { name: 'Noto Sans Arabic', value: 'Noto Sans Arabic, sans-serif', preview: 'أبجد هوز حطي' }
  ];

  const layouts = [
    { id: 'modern', name: 'عصري', preview: '/api/placeholder/120/80' },
    { id: 'classic', name: 'كلاسيكي', preview: '/api/placeholder/120/80' },
    { id: 'minimal', name: 'بسيط', preview: '/api/placeholder/120/80' },
    { id: 'elegant', name: 'أنيق', preview: '/api/placeholder/120/80' }
  ];

  const tabs = [
    { id: 'colors', name: 'الألوان', icon: Palette },
    { id: 'typography', name: 'الخطوط', icon: Type },
    { id: 'layout', name: 'التخطيط', icon: Layout },
    { id: 'styling', name: 'التنسيق', icon: Sliders }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          تصميم {solutionConfig.title}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          خصص الشكل والألوان والخطوط
        </p>
      </div>

      {/* Design Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <nav className="flex space-x-8 space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-2 space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                اختر نظام الألوان
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {colorThemes.map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => handleDesignChange('colorTheme', theme)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                      data.design?.colorTheme?.primary === theme.primary
                        ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>
                      <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        {theme.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Custom Colors */}
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                ألوان مخصصة
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    اللون الأساسي
                  </label>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <input
                      type="color"
                      value={data.design?.primaryColor || '#3B82F6'}
                      onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-neutral-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.design?.primaryColor || '#3B82F6'}
                      onChange={(e) => handleDesignChange('primaryColor', e.target.value)}
                      className="input flex-1 font-mono"
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
                      value={data.design?.secondaryColor || '#EFF6FF'}
                      onChange={(e) => handleDesignChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-neutral-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.design?.secondaryColor || '#EFF6FF'}
                      onChange={(e) => handleDesignChange('secondaryColor', e.target.value)}
                      className="input flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                اختر نوع الخط
              </h3>
              <div className="space-y-3">
                {fontFamilies.map((font, index) => (
                  <button
                    key={index}
                    onClick={() => handleDesignChange('fontFamily', font.value)}
                    className={cn(
                      "w-full text-right p-4 rounded-xl border-2 transition-all duration-200",
                      data.design?.fontFamily === font.value
                        ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20 bg-blue-50 dark:bg-blue-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {font.name}
                      </span>
                      <span 
                        className="text-xl text-neutral-600"
                        style={{ fontFamily: font.value }}
                      >
                        {font.preview}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Font Size Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  حجم خط العنوان
                </label>
                <input
                  type="range"
                  min="18"
                  max="48"
                  value={data.design?.titleFontSize || 24}
                  onChange={(e) => handleDesignChange('titleFontSize', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-neutral-500">
                  {data.design?.titleFontSize || 24}px
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  حجم النص العادي
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={data.design?.bodyFontSize || 16}
                  onChange={(e) => handleDesignChange('bodyFontSize', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-neutral-500">
                  {data.design?.bodyFontSize || 16}px
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                اختر تخطيط الصفحة
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {layouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => handleDesignChange('layout', layout.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                      data.design?.layout === layout.id
                        ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="w-full h-20 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                        {/* Layout preview placeholder */}
                      </div>
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {layout.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'styling' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  نصف قطر الحواف
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={data.design?.borderRadius || 8}
                  onChange={(e) => handleDesignChange('borderRadius', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-neutral-500">
                  {data.design?.borderRadius || 8}px
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  الظل
                </label>
                <select
                  value={data.design?.shadow || 'medium'}
                  onChange={(e) => handleDesignChange('shadow', e.target.value)}
                  className="input"
                >
                  <option value="none">بدون ظل</option>
                  <option value="light">ظل خفيف</option>
                  <option value="medium">ظل متوسط</option>
                  <option value="heavy">ظل قوي</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignStage;
