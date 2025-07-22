// src/components/qr/QRStickers.tsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface Sticker {
  id: string;
  name: string;
  category: 'hiring' | 'social' | 'celebration' | 'support' | 'business' | 'seasonal';
  borderStyle: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
}

const stickers: Sticker[] = [
  // Hiring & Professional
  {
    id: 'hiring-1',
    name: 'نوظف الآن',
    category: 'hiring',
    borderStyle: 'border-4 border-green-500',
    backgroundColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: '💼'
  },
  {
    id: 'hiring-2',
    name: 'باحث عن وظيفة',
    category: 'hiring',
    borderStyle: 'border-4 border-blue-500',
    backgroundColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    icon: '🔍'
  },
  {
    id: 'hiring-3',
    name: 'متاح للعمل',
    category: 'hiring',
    borderStyle: 'border-4 border-purple-500',
    backgroundColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    icon: '💻'
  },
  {
    id: 'hiring-4',
    name: 'فريلانسر',
    category: 'hiring',
    borderStyle: 'border-4 border-orange-500',
    backgroundColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    icon: '🚀'
  },

  // Social Causes
  {
    id: 'support-1',
    name: 'دعم فلسطين',
    category: 'support',
    borderStyle: 'border-4 border-red-600',
    backgroundColor: 'bg-red-100',
    textColor: 'text-red-800',
    icon: '🇵🇸'
  },
  {
    id: 'support-2',
    name: 'التوعية البيئية',
    category: 'support',
    borderStyle: 'border-4 border-green-600',
    backgroundColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: '🌱'
  },
  {
    id: 'support-3',
    name: 'مكافحة السرطان',
    category: 'support',
    borderStyle: 'border-4 border-pink-500',
    backgroundColor: 'bg-pink-100',
    textColor: 'text-pink-800',
    icon: '🎗️'
  },

  // Celebrations
  {
    id: 'celebration-1',
    name: 'عيد مبارك',
    category: 'celebration',
    borderStyle: 'border-4 border-yellow-500',
    backgroundColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: '🎉'
  },
  {
    id: 'celebration-2',
    name: 'تخرج',
    category: 'celebration',
    borderStyle: 'border-4 border-indigo-500',
    backgroundColor: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    icon: '🎓'
  },
  {
    id: 'celebration-3',
    name: 'زواج',
    category: 'celebration',
    borderStyle: 'border-4 border-rose-500',
    backgroundColor: 'bg-rose-100',
    textColor: 'text-rose-800',
    icon: '💒'
  },

  // Business
  {
    id: 'business-1',
    name: 'شركة ناشئة',
    category: 'business',
    borderStyle: 'border-4 border-teal-500',
    backgroundColor: 'bg-teal-100',
    textColor: 'text-teal-800',
    icon: '🚀'
  },
  {
    id: 'business-2',
    name: 'مؤتمر',
    category: 'business',
    borderStyle: 'border-4 border-slate-500',
    backgroundColor: 'bg-slate-100',
    textColor: 'text-slate-800',
    icon: '🎤'
  },
  {
    id: 'business-3',
    name: 'ورشة عمل',
    category: 'business',
    borderStyle: 'border-4 border-amber-500',
    backgroundColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    icon: '🛠️'
  },

  // Seasonal
  {
    id: 'seasonal-1',
    name: 'رمضان كريم',
    category: 'seasonal',
    borderStyle: 'border-4 border-emerald-600',
    backgroundColor: 'bg-emerald-100',
    textColor: 'text-emerald-800',
    icon: '🌙'
  },
  {
    id: 'seasonal-2',
    name: 'عام جديد',
    category: 'seasonal',
    borderStyle: 'border-4 border-violet-500',
    backgroundColor: 'bg-violet-100',
    textColor: 'text-violet-800',
    icon: '✨'
  },

  // Social Media
  {
    id: 'social-1',
    name: 'متابعوني',
    category: 'social',
    borderStyle: 'border-4 border-cyan-500',
    backgroundColor: 'bg-cyan-100',
    textColor: 'text-cyan-800',
    icon: '👥'
  },
  {
    id: 'social-2',
    name: 'مؤثر',
    category: 'social',
    borderStyle: 'border-4 border-fuchsia-500',
    backgroundColor: 'bg-fuchsia-100',
    textColor: 'text-fuchsia-800',
    icon: '⭐'
  }
];

interface QRStickersProps {
  selectedSticker: string;
  onStickerSelect: (stickerId: string) => void;
  className?: string;
}

const QRStickers: React.FC<QRStickersProps> = ({ selectedSticker, onStickerSelect, className }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'جميع الستيكرز' },
    { id: 'hiring', name: 'وظائف' },
    { id: 'social', name: 'اجتماعي' },
    { id: 'celebration', name: 'مناسبات' },
    { id: 'support', name: 'دعم القضايا' },
    { id: 'business', name: 'أعمال' },
    { id: 'seasonal', name: 'مواسم' }
  ];

  const filteredStickers = selectedCategory === 'all' 
    ? stickers 
    : stickers.filter(sticker => sticker.category === selectedCategory);

  return (
    <div className={className}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
              selectedCategory === category.id
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
        {filteredStickers.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onStickerSelect(sticker.id)}
            className={cn(
              "relative aspect-square p-4 rounded-lg border-2 transition-all hover:scale-105",
              selectedSticker === sticker.id
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-neutral-200 dark:border-neutral-700 hover:border-primary-300"
            )}
            title={sticker.name}
          >
            {/* Sticker Preview */}
            <div className={cn(
              "w-full h-full rounded-lg flex flex-col items-center justify-center text-center",
              sticker.borderStyle,
              sticker.backgroundColor
            )}>
              <div className="text-2xl mb-1">{sticker.icon}</div>
              <div className={cn("text-xs font-bold", sticker.textColor)}>
                {sticker.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QRStickers;
