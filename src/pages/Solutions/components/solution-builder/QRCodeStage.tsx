import React, { useState } from 'react';
import { QrCode, Download, Palette, Settings, Eye } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface QRCodeStageProps {
  solutionConfig: any;
  data: any;
  onDataUpdate: (data: any) => void;
}

const QRCodeStage: React.FC<QRCodeStageProps> = ({ 
  solutionConfig, 
  data, 
  onDataUpdate 
}) => {
  const [activeTab, setActiveTab] = useState('design');

  const handleQRUpdate = (field: string, value: any) => {
    onDataUpdate({
      qrCode: {
        ...data.qrCode,
        [field]: value
      }
    });
  };

  const qrStyles = [
    { id: 'square', name: 'مربعات', preview: '⬛' },
    { id: 'circle', name: 'دوائر', preview: '●' },
    { id: 'rounded', name: 'مربعات مدورة', preview: '⬜' }
  ];

  const qrSizes = [
    { id: 'small', name: 'صغير', size: '200x200' },
    { id: 'medium', name: 'متوسط', size: '400x400' },
    { id: 'large', name: 'كبير', size: '600x600' },
    { id: 'xlarge', name: 'كبير جداً', size: '800x800' }
  ];

  const tabs = [
    { id: 'design', name: 'التصميم', icon: Palette },
    { id: 'settings', name: 'الإعدادات', icon: Settings },
    { id: 'preview', name: 'المعاينة', icon: Eye }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          رمز QR المخصص
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          صمم رمز QR فريد وجذاب لحلك
        </p>
      </div>

      {/* QR Tabs */}
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
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* QR Colors */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                ألوان رمز QR
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    لون المقدمة
                  </label>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <input
                      type="color"
                      value={data.qrCode?.foregroundColor || '#000000'}
                      onChange={(e) => handleQRUpdate('foregroundColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-neutral-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.qrCode?.foregroundColor || '#000000'}
                      onChange={(e) => handleQRUpdate('foregroundColor', e.target.value)}
                      className="input flex-1 font-mono"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    لون الخلفية
                  </label>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <input
                      type="color"
                      value={data.qrCode?.backgroundColor || '#FFFFFF'}
                      onChange={(e) => handleQRUpdate('backgroundColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-neutral-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.qrCode?.backgroundColor || '#FFFFFF'}
                      onChange={(e) => handleQRUpdate('backgroundColor', e.target.value)}
                      className="input flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* QR Style */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                شكل النقاط
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {qrStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleQRUpdate('style', style.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-200 text-center",
                      data.qrCode?.style === style.id
                        ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20 bg-blue-50 dark:bg-blue-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <div className="text-2xl mb-2">{style.preview}</div>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                إضافة شعار (اختياري)
              </h3>
              <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl p-8 text-center">
                {data.qrCode?.logo ? (
                  <div className="space-y-4">
                    <img 
                      src={data.qrCode.logo} 
                      alt="QR Logo" 
                      className="w-20 h-20 mx-auto rounded-lg object-cover"
                    />
                    <button 
                      onClick={() => handleQRUpdate('logo', null)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      إزالة الشعار
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <QrCode className="w-12 h-12 text-neutral-400 mx-auto" />
                    <div>
                      <button className="btn-secondary">
                        رفع شعار
                      </button>
                      <p className="text-xs text-neutral-500 mt-2">
                        PNG أو SVG بحد أقصى 1MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* QR Size */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                حجم رمز QR
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {qrSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleQRUpdate('size', size.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-200 text-center",
                      data.qrCode?.size === size.id
                        ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20 bg-blue-50 dark:bg-blue-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      {size.name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {size.size}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Correction */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                مستوى تصحيح الأخطاء
              </h3>
              <select
                value={data.qrCode?.errorCorrection || 'M'}
                onChange={(e) => handleQRUpdate('errorCorrection', e.target.value)}
                className="input max-w-xs"
              >
                <option value="L">منخفض (~7%)</option>
                <option value="M">متوسط (~15%)</option>
                <option value="Q">عالي (~25%)</option>
                <option value="H">عالي جداً (~30%)</option>
              </select>
              <p className="text-xs text-neutral-500 mt-2">
                مستوى أعلى يعني قابلية أكبر للقراءة حتى لو تضرر الرمز جزئياً
              </p>
            </div>

            {/* Format */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                صيغة التصدير
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['PNG', 'SVG', 'PDF'].map((format) => (
                  <button
                    key={format}
                    onClick={() => handleQRUpdate('format', format)}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-colors text-center font-medium",
                      data.qrCode?.format === format
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-64 h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-neutral-400" />
                </div>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                معاينة رمز QR مع الإعدادات الحالية
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 space-x-reverse">
              <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
                <Eye className="w-4 h-4" />
                <span>اختبار المسح</span>
              </button>
              <button className="btn-primary flex items-center space-x-2 space-x-reverse">
                <Download className="w-4 h-4" />
                <span>تحميل QR</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeStage;
