import React, { useState } from 'react';
import { Star, Crown, Utensils, Clock, Phone, MapPin } from 'lucide-react';

interface MenuTemplate1Props {
  solutionType: string;
  data?: any;
}

const MenuTemplate1: React.FC<MenuTemplate1Props> = ({ data = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    data.menuCategories?.[0] || 'المقبلات'
  );

  const categories: string[] = data.menuCategories || ['المقبلات', 'الأطباق الرئيسية', 'الحلويات', 'المشروبات'];

  // Sample menu items - في التطبيق الحقيقي ستأتي من البيانات
  const menuItems: Record<string, any[]> = {
    'المقبلات': [
      { 
        name: 'حمص بالطحينة الخاص', 
        price: 45, 
        description: 'حمص مميز مع طحينة منزلية وزيت زيتون عضوي', 
        signature: true,
        isSpecial: data.specialDishes?.includes('حمص بالطحينة الخاص')
      },
      { 
        name: 'فتوش الشيف', 
        price: 55, 
        description: 'سلطة مشكلة مع خبز مقرمش وصلصة السماق الخاصة',
        isSpecial: data.specialDishes?.includes('فتوش الشيف')
      },
      { 
        name: 'كبة محشوة بالصنوبر', 
        price: 65, 
        description: 'كبة مقلية محشوة باللحم والصنوبر المحمص',
        isSpecial: data.specialDishes?.includes('كبة محشوة بالصنوبر')
      }
    ],
    'الأطباق الرئيسية': [
      { 
        name: data.todaysSpecial || 'مندي الغنم الملكي', 
        price: 185, 
        description: 'قطع غنم طرية مع أرز البسمتي المعطر بالزعفران', 
        signature: true, 
        crown: true,
        isSpecial: true
      },
      { 
        name: 'برياني الجمبري الفاخر', 
        price: 165, 
        description: 'جمبري طازج مع أرز برياني بالتوابل الهندية الأصلية' 
      },
      { 
        name: 'سمك السلمون المشوي', 
        price: 145, 
        description: 'قطعة سلمون نرويجي مشوية مع صلصة الليمون والأعشاب' 
      }
    ],
    'الحلويات': [
      { 
        name: 'أم علي الذهبية', 
        price: 35, 
        description: 'حلوى أم علي مع المكسرات المذهبة والقشطة الطازجة', 
        signature: true 
      },
      { 
        name: 'تيراميسو عربي', 
        price: 40, 
        description: 'تيراميسو إيطالي بنكهة القهوة العربية والهيل' 
      },
      { 
        name: 'كنافة نابلسية فاخرة', 
        price: 45, 
        description: 'كنافة طازجة بالجبن النابلسي والقطر الطبيعي' 
      }
    ],
    'المشروبات': [
      { 
        name: 'قهوة عربية مميزة', 
        price: 25, 
        description: 'قهوة عربية أصيلة محمصة خصيصاً للمطعم' 
      },
      { 
        name: 'شاي الكرك الملكي', 
        price: 20, 
        description: 'شاي كرك بالحليب والهيل والزعفران' 
      },
      { 
        name: 'عصير التمر والحليب', 
        price: 30, 
        description: 'مشروب طبيعي من التمر المجدول والحليب الطازج' 
      }
    ]
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      'ر.س': 'ر.س', 'SAR': 'ر.س', 'USD': '$', '$': '$', 'EUR': '€', '€': '€', 'GBP': '£', '£': '£'
    };
    return symbols[currency] || 'ر.س';
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 overflow-y-auto">
      {/* Elegant Header */}
      <div className="relative bg-gradient-to-r from-amber-800 to-orange-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-4 border-gold-400 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-gold-400 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
        
        <div className="relative p-6 text-center">
          <Crown className="w-8 h-8 text-gold-400 mx-auto mb-3" />
          <h1 className="text-2xl font-serif font-bold mb-2">
            {data.restaurantName || 'مطعم الأصالة الملكي'}
          </h1>
          <p className="text-sm opacity-90 mb-2">
            {data.restaurantType || 'تجربة طعام فاخرة مع نكهات أصيلة'}
          </p>
          {data.cuisine && (
            <p className="text-xs opacity-75">المطبخ {data.cuisine}</p>
          )}
          {data.chefName && (
            <p className="text-xs opacity-75 mt-1">تحت إشراف {data.chefName}</p>
          )}
          
          <div className="flex items-center justify-center space-x-2 space-x-reverse mt-3">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sm">4.9 (500+ تقييم)</span>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="p-4 bg-white border-b">
        <div className="flex space-x-2 space-x-reverse overflow-x-auto">
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-4">
        {menuItems[selectedCategory]?.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-amber-200 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 space-x-reverse mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    {item.signature && (
                      <span className="bg-gradient-to-r from-gold-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                        طبق الشيف
                      </span>
                    )}
                    {item.crown && (
                      <Crown className="w-4 h-4 text-gold-500" />
                    )}
                    {item.isSpecial && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        مميز
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 space-x-reverse text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">15-20 دقيقة</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right mr-4">
                  <div className="text-xl font-bold text-amber-700">
                    {item.price} {getCurrencySymbol(data.currency || 'ر.س')}
                  </div>
                  <button className="mt-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-shadow">
                    طلب
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Restaurant Info Footer */}
      <div className="bg-amber-800 text-white p-6 mt-8">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 space-x-reverse">
            <Utensils className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold text-lg">{data.restaurantName || 'مطعم الأصالة الملكي'}</h3>
          </div>
          
          <div className="space-y-2 text-sm opacity-90">
            {data.businessHours ? (
              <div className="whitespace-pre-line">{data.businessHours}</div>
            ) : (
              <p>ساعات العمل: يومياً من 12:00 ظهراً إلى 12:00 منتصف الليل</p>
            )}
            
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              {data.contactPhone && (
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Phone className="w-4 h-4" />
                  <span>{data.contactPhone}</span>
                </div>
              )}
              {data.whatsappNumber && data.whatsappNumber !== data.contactPhone && (
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>واتساب: {data.whatsappNumber}</span>
                </div>
              )}
            </div>
            
            {data.location && (
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
              </div>
            )}
            
            <div className="space-y-1">
              {data.deliveryAvailable && <p>• خدمة التوصيل متاحة</p>}
              {data.takeAwayAvailable && <p>• خدمة الطلب الخارجي</p>}
              {data.reservationRequired && <p>• يفضل الحجز المسبق</p>}
              {data.privateRooms && <p>• قاعات خاصة متاحة</p>}
            </div>
            
            {data.website && (
              <p>الموقع الإلكتروني: {data.website.replace('https://', '')}</p>
            )}
            
            {data.socialMedia && (
              <div className="whitespace-pre-line text-xs">{data.socialMedia}</div>
            )}
          </div>
          
          <div className="flex justify-center items-center space-x-4 space-x-reverse pt-3 border-t border-amber-700">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              <span className="text-sm">4.9 تقييم ممتاز</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <Clock className="w-4 h-4 text-gold-400" />
              <span className="text-sm">توصيل في 30 دقيقة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTemplate1;
