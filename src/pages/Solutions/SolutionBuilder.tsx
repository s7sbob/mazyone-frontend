import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Download, Share2, Eye } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';

// Import stage components
import ContentStage from './components/solution-builder/ContentStage';
import DesignStage from './components/solution-builder/DesignStage';
import QRCodeStage from './components/solution-builder/QRCodeStage';
import LivePreview from './components/solution-builder/LivePreview';

// Import solution configs
import { getSolutionConfig } from './config/solutionConfigs';

interface SolutionBuilderProps {}

const SolutionBuilder: React.FC<SolutionBuilderProps> = () => {
  const { solutionId } = useParams<{ solutionId: string }>();
  const navigate = useNavigate();
  const { user } = useStore();

  const [currentStage, setCurrentStage] = useState(0);
  const [solutionData, setSolutionData] = useState<any>({});
  const [previewData, setPreviewData] = useState<any>({});

  const solutionConfig = getSolutionConfig(solutionId || '');

  const stages = [
    {
      id: 'content',
      name: 'المحتوى',
      description: 'أضف وعدّل محتوى حلك',
      component: ContentStage
    },
    {
      id: 'design', 
      name: 'التصميم',
      description: 'خصص الشكل والألوان',
      component: DesignStage
    },
    {
      id: 'qrcode',
      name: 'رمز QR',
      description: 'أنشئ وخصص رمز QR',
      component: QRCodeStage
    }
  ];

  if (!solutionConfig) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            الحل غير موجود
          </h2>
          <button
            onClick={() => navigate('/solutions')}
            className="btn-primary"
          >
            العودة للحلول
          </button>
        </div>
      </div>
    );
  }

  const CurrentStageComponent = stages[currentStage].component;

  const handleStageChange = (stageIndex: number) => {
    setCurrentStage(stageIndex);
  };

  const handleDataUpdate = (newData: any) => {
    setSolutionData((prev: any) => ({
      ...prev,
      ...newData
    }));
    setPreviewData((prev: any) => ({
      ...prev,
      ...newData
    }));
  };

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrev = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleFinish = () => {
    // Save solution and redirect
    console.log('Saving solution:', solutionData);
    // Implement save logic here
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => navigate('/solutions')}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {solutionConfig.title}
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {solutionConfig.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
                <Eye className="w-4 h-4" />
                <span>معاينة</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
                <Share2 className="w-4 h-4" />
                <span>مشاركة</span>
              </button>
              <button className="btn-primary flex items-center space-x-2 space-x-reverse">
                <Download className="w-4 h-4" />
                <span>تحميل</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6 min-h-[calc(100vh-120px)]">
          {/* Left Panel - 70% */}
          <div className="flex-1" style={{ flex: '0 0 70%' }}>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 h-full">
              {/* Stage Navigation */}
              <div className="border-b border-neutral-200 dark:border-neutral-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    إنشاء {solutionConfig.title}
                  </h2>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    مرحلة {currentStage + 1} من {stages.length}
                  </div>
                </div>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-4 space-x-reverse">
                  {stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center">
                      <button
                        onClick={() => handleStageChange(index)}
                        className={cn(
                          "flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200",
                          index === currentStage
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : index < currentStage
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          index === currentStage
                            ? "bg-blue-500 text-white"
                            : index < currentStage
                            ? "bg-green-500 text-white"
                            : "bg-neutral-300 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300"
                        )}>
                          {index < currentStage ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{stage.name}</div>
                          <div className="text-xs opacity-75">{stage.description}</div>
                        </div>
                      </button>
                      {index < stages.length - 1 && (
                        <div className="w-8 h-px bg-neutral-300 dark:bg-neutral-600 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Content */}
              <div className="p-6 flex-1 overflow-y-auto">
                <CurrentStageComponent
                  solutionConfig={solutionConfig}
                  data={solutionData}
                  onDataUpdate={handleDataUpdate}
                />
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrev}
                    disabled={currentStage === 0}
                    className={cn(
                      "flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg font-medium transition-colors",
                      currentStage === 0
                        ? "text-neutral-400 cursor-not-allowed"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-700"
                    )}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>السابق</span>
                  </button>

                  {currentStage === stages.length - 1 ? (
                    <button
                      onClick={handleFinish}
                      className="btn-primary flex items-center space-x-2 space-x-reverse"
                    >
                      <Check className="w-4 h-4" />
                      <span>إنهاء</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="btn-primary flex items-center space-x-2 space-x-reverse"
                    >
                      <span>التالي</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - 30% Live Preview */}
          <div className="w-[30%] flex-shrink-0">
            <div className="sticky top-4">
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-center">
                    معاينة مباشرة
                  </h3>
                </div>
                <div className="p-4">
                  <LivePreview
                    solutionType={solutionId || ''}
                    data={previewData}
                    config={solutionConfig}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionBuilder;
