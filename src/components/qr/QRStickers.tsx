// src/components/qr/QRStickers.tsx (محسن ومصحح)
import React from 'react';
import { cn } from '../../utils/cn';

const STICKER_CONFIGS = {
  'hiring-1': { name: 'نوظف الآن', color: 'green', icon: '💼' },
  'hiring-2': { name: 'باحث عن وظيفة', color: 'blue', icon: '🔍' },
  'hiring-3': { name: 'متاح للعمل', color: 'purple', icon: '💻' },
  'support-1': { name: 'دعم فلسطين', color: 'red', icon: '🇵🇸' },
  'support-2': { name: 'التوعية البيئية', color: 'green', icon: '🌱' },
  'celebration-1': { name: 'عيد مبارك', color: 'yellow', icon: '🎉' },
  'celebration-2': { name: 'تخرج', color: 'indigo', icon: '🎓' },
  'business-1': { name: 'شركة ناشئة', color: 'teal', icon: '🚀' },
  'social-1': { name: 'متابعوني', color: 'cyan', icon: '👥' },
  'seasonal-1': { name: 'رمضان كريم', color: 'emerald', icon: '🌙' }
};

const COLOR_CLASSES = {
  green: 'border-green-500 bg-green-50 text-green-700',
  blue: 'border-blue-500 bg-blue-50 text-blue-700',
  purple: 'border-purple-500 bg-purple-50 text-purple-700',
  red: 'border-red-500 bg-red-50 text-red-700',
  yellow: 'border-yellow-500 bg-yellow-50 text-yellow-700',
  indigo: 'border-indigo-500 bg-indigo-50 text-indigo-700',
  teal: 'border-teal-500 bg-teal-50 text-teal-700',
  cyan: 'border-cyan-500 bg-cyan-50 text-cyan-700',
  emerald: 'border-emerald-500 bg-emerald-50 text-emerald-700'
};

interface QRStickersProps {
  selectedSticker: string;
  onStickerSelect: (stickerId: string) => void;
  className?: string;
}

const QRStickers: React.FC<QRStickersProps> = ({ selectedSticker, onStickerSelect, className }) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
        {Object.entries(STICKER_CONFIGS).map(([id, sticker]) => (
          <button
            key={id}
            onClick={() => onStickerSelect(id)}
            className={cn(
              "relative aspect-square p-3 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500",
              selectedSticker === id
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-neutral-200 dark:border-neutral-700 hover:border-primary-300"
            )}
            title={sticker.name}
          >
            <div className={cn(
              "w-full h-full rounded-lg flex flex-col items-center justify-center text-center border-4",
              COLOR_CLASSES[sticker.color as keyof typeof COLOR_CLASSES]
            )}>
              <div className="text-2xl mb-1">{sticker.icon}</div>
              <div className="text-xs font-bold leading-tight">
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
