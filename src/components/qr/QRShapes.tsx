// src/components/qr/QRShapes.tsx (محسن ومصحح)
import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const QR_SHAPES = {
  square: { name: 'مربع', path: 'M3 3h18v18H3z' },
  circle: { name: 'دائرة', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
  heart: { name: 'قلب', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
  star: { name: 'نجمة', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  diamond: { name: 'معين', path: 'M6 2l2 4h8l2-4h4l-4 7 4 7h-4l-2-4H8l-2 4H2l4-7L2 2h4z' },
  hexagon: { name: 'سداسي', path: 'M17.5 3.5L22 12l-4.5 8.5h-9L4 12l4.5-8.5h9z' },
  apple: { name: 'تفاحة', path: 'M12 2c3.31 0 6 2.69 6 6 0 2.97-2.16 5.43-5 5.92V16h2v2h-6v-2h2v-2.08c-2.84-.49-5-2.95-5-5.92 0-3.31 2.69-6 6-6z' },
  guitar: { name: 'جيتار', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72v-1.57c0-.55-.45-1-1-1h-1c-2.76 0-5-2.24-5-5s2.24-5 5-5h1c.55 0 1-.45 1-1V6.32c0-.32-.19-.61-.49-.72C14.34 2.21 13.19 2 12 2z' },
  car: { name: 'سيارة', path: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z' },
  camera: { name: 'كاميرا', path: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' },
  laptop: { name: 'لابتوب', path: 'M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H1v2h22v-2h-3zM4 6h16v10H4V6z' },
  phone: { name: 'هاتف', path: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z' },
  house: { name: 'منزل', path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  pizza: { name: 'بيتزا', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  coffee: { name: 'قهوة', path: 'M18.5 3H6c-.83 0-1.5.67-1.5 1.5v3C4.5 8.33 5.17 9 6 9h.5v8c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2V9h.5c.83 0 1.5-.67 1.5-1.5v-3C19 3.67 18.33 3 17.5 3h-1z' },
  crown: { name: 'تاج', path: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z' },
  lightning: { name: 'برق', path: 'M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1.05L13 10h3.5c.49 0 .56.75.48.78l-5.98 10.22z' }
};

interface QRShapesProps {
  selectedShape: string;
  onShapeSelect: (shapeId: string) => void;
  className?: string;
}

const QRShapes: React.FC<QRShapesProps> = ({ selectedShape, onShapeSelect, className }) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-64 overflow-y-auto">
        {Object.entries(QR_SHAPES).map(([id, shape]) => (
          <button
            key={id}
            onClick={() => onShapeSelect(id)}
            className={cn(
              "aspect-square p-2 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500",
              selectedShape === id
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
              <path d={shape.path} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QRShapes;
