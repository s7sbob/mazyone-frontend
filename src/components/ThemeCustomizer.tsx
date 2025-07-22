import React, { useEffect, useState } from 'react';
import { Palette, Star, Undo2 } from 'lucide-react';
import { useStore } from '../store/useStore';

/* جميع المتغيّرات القابلة للتخصيص */
const VARS = [
  'btn-primary', 'btn-primary-hover',
  'btn-secondary', 'btn-secondary-hover',
  'alert-warning', 'alert-warning-hover',
  'bg-primary', 'bg-secondary',
  'text-primary', 'text-secondary',
];

/* ➊ - ثلاث ثيمات جاهزة */
const PRESETS: Record<string, Record<string, string>> = {
  classic: {
    'btn-primary': '#006BE3',
    'btn-primary-hover': '#0056be',
    'btn-secondary': '#7EDDB9',
    'btn-secondary-hover': '#65c4a1',
    'alert-warning': '#FACC15',
    'alert-warning-hover': '#e0b900',
    'bg-primary': '#FFFFFF',
    'bg-secondary': '#EDEDED',
    'text-primary': '#2D2D2D',
    'text-secondary': '#444444',
  },
  emerald: {
    'btn-primary': '#059669',
    'btn-primary-hover': '#047857',
    'btn-secondary': '#10B981',
    'btn-secondary-hover': '#0e9f6e',
    'alert-warning': '#FBBF24',
    'alert-warning-hover': '#f59e0b',
    'bg-primary': '#FFFFFF',
    'bg-secondary': '#ECFDF5',
    'text-primary': '#064E3B',
    'text-secondary': '#065F46',
  },
  sunset: {
    'btn-primary': '#EA580C',
    'btn-primary-hover': '#c2410c',
    'btn-secondary': '#FDBA74',
    'btn-secondary-hover': '#fb923c',
    'alert-warning': '#F97316',
    'alert-warning-hover': '#ea580c',
    'bg-primary': '#FFFFFF',
    'bg-secondary': '#FFEFE6',
    'text-primary': '#7C2D12',
    'text-secondary': '#9A3412',
  },
};

const ThemeCustomizer: React.FC = () => {
  const { userColors, setUserColors } = useStore();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<Record<string, string>>(userColors);

  /* ➋ - تطبيق الألوان فور التعديل */
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
  }, [colors]);

  /* ➌ - حفظ إلى التخزين */
  const saveColors = () => {
    setUserColors(colors);       // يحفظ فى store + localStorage
    setOpen(false);
  };

  /*➍ - استرجاع الافتراضى */
  const resetColors = () => setColors(useStore.getState().defaultColors);

  /*➎ - تغيير ثيم جاهز */
  const applyPreset = (name: string) => setColors(PRESETS[name]);

  return (
    <>
      {/* زر عائم */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full shadow-lg bg-primary-500 text-white hover:scale-110 transition-transform"
        title="تخصيص الألوان"
      >
        <Palette />
      </button>

      {/* اللوحة */}
      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-80 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-2xl border">
          <h3 className="font-bold mb-4 flex items-center space-x-2 space-x-reverse">
            <Star className="w-4 h-4 text-yellow-400" /> <span>اختَر ثيماً أو خصِّصه</span>
          </h3>

          {/* الثيمات الجاهزة */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {Object.keys(PRESETS).map((preset) => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                className="h-10 rounded-lg border-2 border-transparent hover:border-primary-500 transition-all"
                style={{ background: PRESETS[preset]['btn-primary'] }}
                title={preset}
              />
            ))}
          </div>

          {/* محرّر يدوى */}
          <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
            {VARS.map((varName) => (
              <div key={varName}>
                <label className="text-xs font-medium block mb-1">{varName}</label>
                <input
                  type="color"
                  value={colors[varName]}
                  onChange={(e) => setColors({ ...colors, [varName]: e.target.value })}
                  className="w-full h-8 rounded border cursor-pointer"
                  style={{ background: colors[varName] }}
                />
              </div>
            ))}
          </div>

          {/* أزرار الحفظ / إعادة الضبط */}
          <div className="mt-6 flex items-center space-x-2 space-x-reverse">
            <button
              onClick={resetColors}
              className="flex-1 flex items-center justify-center space-x-1 space-x-reverse px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            >
              <Undo2 className="w-4 h-4" /> <span className="text-sm">إعادة الضبط</span>
            </button>
            <button
              onClick={saveColors}
              className="flex-1 btn-primary py-2"
            >
              حفظ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeCustomizer;
