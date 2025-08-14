import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

interface FormTemplate2Props {
  solutionType: string;
  data?: any;
}

const FormTemplate2: React.FC<FormTemplate2Props> = ({ data = {} }) => {
  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      {/* Progress Header */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold text-gray-900">
            {data.formTitle || 'استطلاع رضا العملاء'}
          </h1>
          <span className="text-sm text-gray-500">1 من 3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: '33%' }} />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            كيف كانت تجربتك معنا؟
          </h2>
          <p className="text-gray-600">
            نود معرفة رأيك لتحسين خدماتنا
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {[
            { emoji: '😍', text: 'ممتاز جداً', color: 'green' },
            { emoji: '😊', text: 'جيد', color: 'blue' },
            { emoji: '😐', text: 'مقبول', color: 'yellow' },
            { emoji: '😞', text: 'ضعيف', color: 'orange' },
            { emoji: '😠', text: 'سيء جداً', color: 'red' }
          ].map((option, index) => (
            <button
              key={index}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center space-x-4 space-x-reverse group"
            >
              <div className="text-2xl">{option.emoji}</div>
              <span className="flex-1 text-right font-medium text-gray-700 group-hover:text-blue-700">
                {option.text}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            السابق
          </button>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 space-x-reverse">
            <span>التالي</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Indicator */}
      <div className="bg-gray-50 p-4 text-center">
        <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>متوسط وقت الإكمال: دقيقتان</span>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate2;
