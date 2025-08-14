import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Crown, Check, Star } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  previewComponent?: React.ComponentType<any>;
  isPro?: boolean;
  isPopular?: boolean;
  category?: string;
}

interface TemplateCarouselProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  solutionType: string;
}

const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
  solutionType
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [templates]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="w-5 h-5 text-purple-500">🎨</div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            قالب الصفحة
          </h3>
          <span className="text-sm text-neutral-500">(اضغط على القالب الذي تريده)</span>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-neutral-600">
          <span>{templates.length} قالب متاح</span>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center transition-all duration-200",
            canScrollLeft
              ? "hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center transition-all duration-200",
            canScrollRight
              ? "hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </button>

        {/* Templates Scroll Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 space-x-reverse overflow-x-auto scrollbar-hide py-4 px-12"
          onScroll={checkScrollButtons}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex-shrink-0 w-72"
            >
              <button
                onClick={() => onTemplateSelect(template.id)}
                className={cn(
                  "w-full p-4 border-2 rounded-xl transition-all duration-200 hover:scale-105 relative group",
                  selectedTemplate === template.id
                    ? "border-blue-500 ring-4 ring-blue-500 ring-opacity-20 bg-blue-50 dark:bg-blue-900/20"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg"
                )}
              >
                {/* Template Preview */}
                <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-4 overflow-hidden">
                  {/* Render Custom Preview Component */}
                  {template.previewComponent ? (
                    <template.previewComponent solutionType={solutionType} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-neutral-300 dark:bg-neutral-600 rounded-lg mx-auto" />
                        <div className="space-y-1">
                          <div className="w-24 h-2 bg-neutral-300 dark:bg-neutral-600 rounded mx-auto" />
                          <div className="w-16 h-2 bg-neutral-300 dark:bg-neutral-600 rounded mx-auto" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Pro Badge */}
                  {template.isPro && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <Crown className="w-3 h-3" />
                        <span>PRO</span>
                      </div>
                    </div>
                  )}

                  {/* Popular Badge */}
                  {template.isPopular && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>شائع</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Selected Overlay */}
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                </div>

                {/* Template Info */}
                <div className="text-right space-y-2">
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">
                    {template.name}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {template.description}
                  </p>
                  
                  {template.category && (
                    <div className="pt-2">
                      <span className="inline-block px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 rounded-full">
                        {template.category}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Template Indicator */}
      {selectedTemplate && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-800 dark:text-green-200">
              تم اختيار القالب: {templates.find(t => t.id === selectedTemplate)?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCarousel;
