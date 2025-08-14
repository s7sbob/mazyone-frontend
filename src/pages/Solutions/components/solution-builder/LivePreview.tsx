import React from 'react';
import { getTemplatesForSolution } from '../../config/templateConfigs';

interface LivePreviewProps {
  solutionType: string;
  data: any;
  config: any;
}

const LivePreview: React.FC<LivePreviewProps> = ({ solutionType, data, config }) => {
  const selectedTemplate = data.selectedTemplate;
  const templates = getTemplatesForSolution(solutionType);
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const renderPreview = () => {
    if (currentTemplate && currentTemplate.previewComponent) {
      const TemplateComponent = currentTemplate.previewComponent;
      return <TemplateComponent solutionType={solutionType} data={data} />;
    }

    // Fallback to default preview
    return (
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-neutral-900">
            {data.title || config.title}
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            {data.description || config.description}
          </p>
        </div>
        
        <div className="text-center text-neutral-500">
          اختر قالباً لرؤية المعاينة
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Device Frame */}
      <div className="mx-auto" style={{ width: '280px' }}>
        <div className="bg-neutral-900 rounded-[2rem] p-2 shadow-2xl">
          <div className="bg-white rounded-[1.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
            <div className="h-full overflow-y-auto">
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Info */}
      {currentTemplate && (
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {currentTemplate.name}
          </p>
          <p className="text-xs text-neutral-500">
            معاينة مباشرة
          </p>
        </div>
      )}
      
      {/* QR Code Preview */}
      <div className="text-center">
        <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
          <div className="w-32 h-32 bg-neutral-200 rounded-lg flex items-center justify-center">
            <span className="text-xs text-neutral-500">QR Code</span>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          امسح للمعاينة
        </p>
      </div>
    </div>
  );
};

export default LivePreview;
