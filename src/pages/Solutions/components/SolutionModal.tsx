import React from 'react';
import { X, Check, ArrowRight, Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  features: string[];
  useCases: string[];
  benefits: string[];
  color: string;
  gradient: string;
  isPopular?: boolean;
  isNew?: boolean;
}

interface SolutionModalProps {
  solution: Solution;
  onClose: () => void;
}

const SolutionModal: React.FC<SolutionModalProps> = ({ solution, onClose }) => {
  const Icon = solution.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
              solution.gradient
            )}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {solution.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {solution.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Features Section */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              الميزات الشاملة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              حالات الاستخدام
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.useCases.map((useCase, index) => (
                <div key={index} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Star className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {useCase}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              الفوائد والمزايا
            </h3>
            <div className="space-y-3">
              {solution.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className={cn(
            "p-6 rounded-2xl text-white bg-gradient-to-r",
            solution.gradient
          )}>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">
                جاهز لتجربة {solution.title}؟
              </h3>
              <p className="opacity-90">
                ابدأ مجاناً اليوم واستكشف إمكانيات لا محدودة
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-white text-neutral-900 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors flex items-center space-x-2 space-x-reverse">
                  <span>ابدأ الآن</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  عرض توضيحي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;
