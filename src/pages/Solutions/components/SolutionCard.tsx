import React from 'react';
import { ArrowRight, Star, Sparkles, Info } from 'lucide-react';
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

interface SolutionCardProps {
  solution: Solution;
  onClick: () => void; // للتحويل لصفحة الإنشاء
  onDetails?: () => void; // لفتح المودال (اختياري)
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onClick, onDetails }) => {
  const Icon = solution.icon;

  return (
    <div className="group card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
      {/* Popular Badge */}
      {solution.isPopular && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 space-x-reverse">
            <Star className="w-3 h-3" />
            <span>الأكثر شعبية</span>
          </div>
        </div>
      )}

      {/* New Badge */}
      {solution.isNew && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 space-x-reverse">
            <Sparkles className="w-3 h-3" />
            <span>جديد</span>
          </div>
        </div>
      )}

      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br",
        solution.gradient
      )} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
          solution.gradient
        )}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {solution.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {solution.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              الميزات الرئيسية:
            </h4>
            <ul className="space-y-1">
              {solution.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start space-x-2 space-x-reverse">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700 space-x-3 space-x-reverse">
            {/* Create Button */}
            <button
              onClick={onClick}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse"
            >
              <span>إنشاء الآن</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            {/* Details Button */}
            {onDetails && (
              <button
                onClick={onDetails}
                className="p-2 text-neutral-500 hover:text-blue-500 transition-colors"
                title="عرض التفاصيل"
              >
                <Info className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;