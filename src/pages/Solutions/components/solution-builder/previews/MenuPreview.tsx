import React, { useState } from 'react';
import { Search, Star, Clock, Flame, Leaf, Award } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

interface MenuPreviewProps {
  data: any;
  config: any;
}

// تعريف نوع العنصر في القائمة
interface MenuItem {
  name: string;
  price: number;
  description: string;
  isVegan: boolean;
  isSpicy: boolean;
  rating: number;
  isSpecial?: boolean; // اختياري
}

const MenuPreview: React.FC<MenuPreviewProps> = ({ data, config }) => {
  const design = data.design || {};
  const primaryColor = design.primaryColor || '#10B981';
  const [selectedCategory, setSelectedCategory] = useState('الأطباق الرئيسية');

  const categories = [
    'المقبلات',
    'الأطباق الرئيسية', 
    'الحلويات',
    'المشروبات',
    'السلطات'
  ];

  // تحديد نوع البيانات لكل فئة
  const menuItems: Record<string, MenuItem[]> = {
    'المقبلات': [
      { 
        name: 'حمص بالطحينة', 
        price: 15, 
        description: 'حمص طازج مع الطحينة وزيت الزيتون', 
        isVegan: true, 
        isSpicy: false, 
        rating: 4.8 
      },
      { 
        name: 'فتوش لبناني', 
        price: 18, 
        description: 'سلطة مشكلة مع الخبز المحمص والسماق', 
        isVegan: true, 
        isSpicy: false, 
        rating: 4.9 
      },
      { 
        name: 'كبة مقلية', 
        price: 22, 
        description: 'كبة مقلية محشوة باللحم والبصل', 
        isVegan: false, 
        isSpicy: true, 
        rating: 4.7 
      }
    ],
    'الأطباق الرئيسية': [
      { 
        name: 'مندي لحم', 
        price: 45, 
        description: 'أرز مندي مع لحم الغنم الطري', 
        isVegan: false, 
        isSpicy: true, 
        rating: 4.9, 
        isSpecial: true 
      },
      { 
        name: 'كبسة دجاج', 
        price: 38, 
        description: 'أرز كبسة مع دجاج مشوي وخضار', 
        isVegan: false, 
        isSpicy: false, 
        rating: 4.8 
      },
      { 
        name: 'برياني جمبري', 
        price: 52, 
        description: 'أرز برياني بالجمبري والتوابل الهندية', 
        isVegan: false, 
        isSpicy: true, 
        rating: 4.6 
      }
    ],
    'الحلويات': [
      { 
        name: 'كنافة نابلسية', 
        price: 25, 
        description: 'كنافة طازجة بالجبن والقطر', 
        isVegan: false, 
        isSpicy: false, 
        rating: 4.9,
        isSpecial: true 
      },
      { 
        name: 'مهلبية', 
        price: 18, 
        description: 'مهلبية بالحليب والورد مع الفستق', 
        isVegan: false, 
        isSpicy: false, 
        rating: 4.7 
      },
      { 
        name: 'تيراميسو', 
        price: 28, 
        description: 'تيراميسو إيطالي أصلي', 
        isVegan: false, 
        isSpicy: false, 
        rating: 4.8 
      }
    ],
    'المشروبات': [
      { 
        name: 'شاي أحمر', 
        price: 8, 
        description: 'شاي أحمر عادي أو بالحليب', 
        isVegan: true, 
        isSpicy: false, 
        rating: 4.5 
      },
      { 
        name: 'عصير برتقال طازج', 
        price: 12, 
        description: 'عصير برتقال طبيعي 100%', 
        isVegan: true, 
        isSpicy: false, 
        rating: 4.7 
      },
      { 
        name: 'موكا بارد', 
        price: 22, 
        description: 'قهوة موكا باردة مع الآيس كريم', 
        isVegan: false, 
        isSpicy: false, 
        rating: 4.8,
        isSpecial: true 
      }
    ],
    'السلطات': [
      { 
        name: 'تبولة', 
        price: 16, 
        description: 'تبولة بالبقدونس والطماطم والبرغل', 
        isVegan: true, 
        isSpicy: false, 
        rating: 4.8 
      },
      { 
        name: 'سلطة سيزر', 
        price: 24, 
        description: 'خس مع دجاج مشوي وجبن البارميزان', 
        isVegan: false, 
        isSpicy: false, 
        rating: 4.7 
      }
    ]
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto" style={{ fontFamily: design.fontFamily || 'Tajawal, sans-serif' }}>
      {/* Header */}
      <div className="relative">
        <div 
          className="h-32 bg-gradient-to-br flex items-end p-4"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)` }}
        >
          <div>
            <h1 className="text-xl font-bold text-white mb-1">
              {data.restaurantName || 'مطعم الأصالة'}
            </h1>
            <p className="text-sm text-white opacity-90">
              {data.restaurantType || 'مطعم عربي أصيل'}
            </p>
          </div>
        </div>
        
        {/* Restaurant Rating */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center space-x-1 space-x-reverse text-white">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">4.8</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في القائمة..."
            className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{ '--tw-ring-color': primaryColor } as any}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-4">
        <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                selectedCategory === category
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              style={selectedCategory === category ? { backgroundColor: primaryColor } : {}}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-4">
        {menuItems[selectedCategory]?.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 relative">
            {/* Special Badge */}
            {item.isSpecial && (
              <div className="absolute top-2 left-2">
                <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Award className="w-3 h-3" />
                  <span>مميز</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 space-x-reverse mb-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  {item.isVegan && (
                    <Leaf className="w-4 h-4 text-green-500" />
                  )}
                  {item.isSpicy && (
                    <span title="حار">
                      <Flame className="w-4 h-4 text-red-500" />
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 space-x-reverse text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">15-20 دقيقة</span>
                  </div>
                </div>
              </div>
              
              <div className="text-left mr-4">
                <div className="text-lg font-bold" style={{ color: primaryColor }}>
                  {item.price} ر.س
                </div>
                <button 
                  className="mt-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: primaryColor }}
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-4 mt-6 bg-gray-50">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-gray-900">
            {data.restaurantName || 'مطعم الأصالة'}
          </p>
          <p className="text-xs text-gray-600">
            ساعات العمل: من الساعة 10 صباحاً إلى 12 منتصف الليل
          </p>
          <p className="text-xs text-gray-600">
            للطلب والاستفسار: +966 50 123 4567
          </p>
          
          <div className="flex justify-center items-center space-x-4 space-x-reverse pt-2">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.8 (245 تقييم)</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">متوسط التحضير: 20 دقيقة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPreview;
