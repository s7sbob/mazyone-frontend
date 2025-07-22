// src/components/qr/QRShapes.tsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface QRShape {
  id: string;
  name: string;
  svg: string;
  category: 'nature' | 'objects' | 'symbols' | 'food' | 'tech';
}

const qrShapes: QRShape[] = [
  // Nature
  { id: 'apple', name: 'تفاحة', svg: 'M12 2c3.31 0 6 2.69 6 6 0 2.97-2.16 5.43-5 5.92V16h2v2h-6v-2h2v-2.08c-2.84-.49-5-2.95-5-5.92 0-3.31 2.69-6 6-6z', category: 'nature' },
  { id: 'heart', name: 'قلب', svg: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', category: 'nature' },
  { id: 'leaf', name: 'ورقة', svg: 'M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-15 5z', category: 'nature' },
  { id: 'flower', name: 'زهرة', svg: 'M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8-8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM6 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z', category: 'nature' },
  
  // Objects
  { id: 'guitar', name: 'جيتار', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72v-1.57c0-.55-.45-1-1-1h-1c-2.76 0-5-2.24-5-5s2.24-5 5-5h1c.55 0 1-.45 1-1V6.32c0-.32-.19-.61-.49-.72C14.34 2.21 13.19 2 12 2z', category: 'objects' },
  { id: 'tshirt', name: 'تيشيرت', svg: 'M16 4l.94-2.06L19 1l-.94 2.06L16 4zM4 7l-.94-2.06L1 4l1.06-.94L4 1l1.06.94L6 4 4.94 5.06 4 7zm12 1c0-3.07-3.13-4-6-4s-6 .93-6 4v2l2 12h8l2-12V8z', category: 'objects' },
  { id: 'car', name: 'سيارة', svg: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z', category: 'objects' },
  { id: 'camera', name: 'كاميرا', svg: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z', category: 'objects' },

  // Food
  { id: 'pizza', name: 'بيتزا', svg: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', category: 'food' },
  { id: 'coffee', name: 'قهوة', svg: 'M18.5 3H6c-.83 0-1.5.67-1.5 1.5v3C4.5 8.33 5.17 9 6 9h.5v8c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2V9h.5c.83 0 1.5-.67 1.5-1.5v-3C19 3.67 18.33 3 17.5 3h-1zm-1 5.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z', category: 'food' },

  // Tech
  { id: 'laptop', name: 'لابتوب', svg: 'M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H1v2h22v-2h-3zM4 6h16v10H4V6z', category: 'tech' },
  { id: 'phone', name: 'هاتف', svg: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z', category: 'tech' },

  // Symbols
  { id: 'star', name: 'نجمة', svg: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', category: 'symbols' },
  { id: 'diamond', name: 'الماس', svg: 'M6 2l2 4h8l2-4h4l-4 7 4 7h-4l-2-4H8l-2 4H2l4-7L2 2h4z', category: 'symbols' },
  { id: 'circle', name: 'دائرة', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', category: 'symbols' },
  { id: 'hexagon', name: 'سداسي', svg: 'M17.5 3.5L22 12l-4.5 8.5h-9L4 12l4.5-8.5h9z', category: 'symbols' },
  { id: 'triangle', name: 'مثلث', svg: 'M12 2l10 18H2L12 2z', category: 'symbols' },
  { id: 'square', name: 'مربع', svg: 'M4 4h16v16H4V4z', category: 'symbols' },

  // Additional Nature
  { id: 'tree', name: 'شجرة', svg: 'M12 2L8 8h8l-4-6zm0 14c-1.1 0-2 .9-2 2v4h4v-4c0-1.1-.9-2-2-2z', category: 'nature' },
  { id: 'sun', name: 'شمس', svg: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1z', category: 'nature' },
  { id: 'moon', name: 'قمر', svg: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z', category: 'nature' },

  // Additional Objects
  { id: 'house', name: 'منزل', svg: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', category: 'objects' },
  { id: 'plane', name: 'طائرة', svg: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z', category: 'objects' },
  { id: 'rocket', name: 'صاروخ', svg: 'M9 7c0-5 3-7 3-7s3 2 3 7c0 5.25-3 9-3 9s-3-3.75-3-9zM7 12H4l4-6 2 6h-3zm10 0h3l-4-6-2 6h3z', category: 'objects' },
  { id: 'bike', name: 'دراجة', svg: 'M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z', category: 'objects' },

  // Additional Food
  { id: 'burger', name: 'برجر', svg: 'M1 21h15.01L18 18c0-3.31-2.69-6-6-6s-6 2.69-6 6v3zM12 2C8.69 2 6 4.69 6 8h12c0-3.31-2.69-6-6-6z', category: 'food' },
  { id: 'donut', name: 'دونت', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z', category: 'food' },
  { id: 'icecream', name: 'آيس كريم', svg: 'M8.79 12.4l3.26 6.22 3.17-6.21c-.68-.16-1.48-.2-2.26-.27-.68-.06-1.57-.14-2.13-.14s-1.45.08-2.04.4z', category: 'food' },

  // Additional Tech
  { id: 'headphones', name: 'سماعات', svg: 'M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h4c1.66 0 3-1.34 3-3V10c0-4.97-4.03-9-9-9z', category: 'tech' },
  { id: 'gamepad', name: 'يد تحكم', svg: 'M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z', category: 'tech' },
  { id: 'watch', name: 'ساعة', svg: 'M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.95 5.73C5.19 7.19 4 9.46 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12z', category: 'tech' },

  // Additional Symbols
  { id: 'crown', name: 'تاج', svg: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4-2.1 1.9L12 8l-3.1 2.5-2.1-1.9L7.7 14z', category: 'symbols' },
  { id: 'lightning', name: 'برق', svg: 'M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1.05L13 10h3.5c.49 0 .56.75.48.78l-5.98 10.22z', category: 'symbols' },
  { id: 'infinity', name: 'لانهاية', svg: 'M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12l1.83 1.83c.97.97 2.33 1.53 3.77 1.53 1.44 0 2.8-.56 3.77-1.53.97-.97 1.53-2.33 1.53-3.77s-.56-2.8-1.53-3.77c-.97-.97-2.33-1.53-3.77-1.53z', category: 'symbols' },
  { id: 'peace', name: 'سلام', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20z', category: 'symbols' },
  { id: 'yin-yang', name: 'ين يانغ', svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.85 0 5.44-1.19 7.29-3.11C17.44 20.81 14.85 22 12 22c-5.52 0-10-4.48-10-10S6.48 2 12 2z', category: 'symbols' },

  // Professional/Business
  { id: 'briefcase', name: 'حقيبة', svg: 'M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h6V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h6z', category: 'objects' },
  { id: 'medal', name: 'ميدالية', svg: 'M12 4l1.41 1.41L16 3.83V8c0 2.21-1.79 4-4 4s-4-1.79-4-4V3.83l2.59 1.58L12 4zm0 8c-3.31 0-6-2.69-6-6V2l6 3.5L18 2v4c0 3.31-2.69 6-6 6z', category: 'symbols' },
  { id: 'trophy', name: 'كأس', svg: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z', category: 'symbols' }
];

interface QRShapesProps {
  selectedShape: string;
  onShapeSelect: (shapeId: string) => void;
  className?: string;
}

const QRShapes: React.FC<QRShapesProps> = ({ selectedShape, onShapeSelect, className }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'جميع الأشكال' },
    { id: 'nature', name: 'طبيعة' },
    { id: 'objects', name: 'أشياء' },
    { id: 'symbols', name: 'رموز' },
    { id: 'food', name: 'طعام' },
    { id: 'tech', name: 'تقنية' }
  ];

  const filteredShapes = selectedCategory === 'all' 
    ? qrShapes 
    : qrShapes.filter(shape => shape.category === selectedCategory);

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

      {/* Shapes Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-64 overflow-y-auto">
        {filteredShapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => onShapeSelect(shape.id)}
            className={cn(
              "aspect-square p-2 rounded-lg border-2 transition-all hover:scale-105",
              selectedShape === shape.id
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-neutral-200 dark:border-neutral-700 hover:border-primary-300"
            )}
            title={shape.name}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full text-neutral-600 dark:text-neutral-400"
            >
              <path d={shape.svg} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QRShapes;
