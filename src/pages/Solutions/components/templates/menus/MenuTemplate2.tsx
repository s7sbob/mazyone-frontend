import React, { useState } from 'react';
import { Coffee, Wifi, Music, Heart, Star } from 'lucide-react';

interface MenuTemplate2Props {
  solutionType: string;
  data?: any;
}

interface MenuItem {
  name: string;
  price: number;
  description: string;
  popular?: boolean;
  specialty?: boolean;
}

const MenuTemplate2: React.FC<MenuTemplate2Props> = ({ data = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('القهوة المختصة');

  const categories = ['القهوة المختصة', 'المشروبات الباردة', 'المعجنات والحلى', 'الوجبات الخفيفة'];

  const menuItems: { [key: string]: MenuItem[] } = {
    'القهوة المختصة': [
      { name: 'كابتشينو كلاسيك', price: 18, description: 'إسبريسو مع حليب مبخر ورغوة ناعمة', popular: true },
      { name: 'لاتيه بالفانيلا', price: 20, description: 'إسبريسو مع حليب مبخر وشراب الفانيلا الطبيعي' },
      { name: 'موكا بالشوكولاتة', price: 22, description: 'إسبريسو مع شوكولاتة بلجيكية وحليب مبخر' },
      { name: 'قهوة مقطرة V60', price: 25, description: 'قهوة أثيوبية مقطرة بطريقة V60 التقليدية', specialty: true }
    ],
    'المشروبات الباردة': [
      { name: 'آيس لاتيه', price: 20, description: 'لاتيه بارد مع مكعبات الثلج وحليب بارد', popular: true },
      { name: 'فرابيه الكراميل', price: 24, description: 'مشروب بارد مخفوق مع صلصة الكراميل' },
      { name: 'عصير البرتقال الطازج', price: 15, description: 'عصير برتقال طبيعي 100% بدون إضافات' },
      { name: 'سموذي التوت المشكل', price: 22, description: 'خليط التوت الطازج مع الزبادي والعسل' }
    ],
    'المعجنات والحلى': [
      { name: 'كروسان بالزبدة', price: 12, description: 'كروسان فرنسي طازج مخبوز يومياً', popular: true },
      { name: 'مافن التوت الأزرق', price: 14, description: 'مافن منزلي بالتوت الأزرق الطازج' },
      { name: 'كيك الجزر بالقرفة', price: 18, description: 'قطعة كيك الجزر مع كريمة الجبن والقرفة' },
      { name: 'ماكرون ملون', price: 16, description: 'ماكرون فرنسي بنكهات متنوعة' }
    ],
    'الوجبات الخفيفة': [
      { name: 'ساندويش الأفوكادو', price: 28, description: 'توست أسمر مع أفوكادو وبيض مسلوق وطماطم كرزية' },
      { name: 'سلطة الكينوا', price: 32, description: 'سلطة صحية بالكينوا والخضار الطازجة' },
      { name: 'بان كيك صغير', price: 24, description: 'فطائر صغيرة مع شراب القيقب والتوت' },
      { name: 'تشيز كيك بالفراولة', price: 26, description: 'قطعة تشيز كيك كريمية مع الفراولة الطازجة' }
    ]
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 overflow-y-auto">
      {/* Modern Cafe Header */}
      <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-6 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-4 left-6 w-12 h-12 bg-white bg-opacity-15 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
        
        <div className="relative p-6 text-center">
          <div className="mb-4">
            <Coffee className="w-10 h-10 mx-auto mb-3 text-white" />
            <h1 className="text-2xl font-bold mb-2">
              {data.restaurantName || 'كافيه الصباح'}
            </h1>
            <p className="text-sm opacity-90">
              {data.restaurantType || 'قهوة مختصة ووجبات طازجة يومياً'}
            </p>
          </div>
          
          {/* Cafe Features */}
          <div className="flex items-center justify-center space-x-6 space-x-reverse text-sm">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Wifi className="w-4 h-4" />
              <span>واي فاي مجاني</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <Music className="w-4 h-4" />
              <span>موسيقى هادئة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="p-4 bg-white border-b border-orange-200">
        <div className="flex space-x-2 space-x-reverse overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-3">
        {menuItems[selectedCategory as keyof typeof menuItems]?.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    {item.popular && (
                      <span className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>الأكثر طلباً</span>
                      </span>
                    )}
                    {item.specialty && (
                      <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                        مختص
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">(4.7)</span>
                  </div>
                </div>
                
                <div className="text-right mr-4">
                  <div className="text-lg font-bold text-orange-600">
                    {item.price} ر.س
                  </div>
                  <button className="mt-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all">
                    أضف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cafe Info Footer */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 mt-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Coffee className="w-6 h-6" />
            <h3 className="font-bold text-lg">{data.restaurantName || 'كافيه الصباح'}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">ساعات العمل:</p>
              <p className="opacity-90">السبت - الخميس: 7:00 ص - 11:00 م</p>
              <p className="opacity-90">الجمعة: 2:00 م - 11:00 م</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">خدماتنا:</p>
              <p className="opacity-90">• واي فاي عالي السرعة</p>
              <p className="opacity-90">• مساحة عمل مريحة</p>
              <p className="opacity-90">• توصيل للمنطقة</p>
            </div>
          </div>
          
          <div className="pt-3 border-t border-orange-500 border-opacity-30">
            <p className="text-sm opacity-90">للطلب والحجز: +966 50 123 4567</p>
            <p className="text-xs opacity-75 mt-1">نحن نحب أن نبدأ يومك بكوب قهوة مثالي ☕</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTemplate2;
