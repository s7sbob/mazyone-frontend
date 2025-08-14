import React from 'react';
import { Crown, Star, Shield, Award, ShoppingCart } from 'lucide-react';

interface ProductTemplate3Props {
  solutionType: string;
  data?: any;
}

const ProductTemplate3: React.FC<ProductTemplate3Props> = ({ data = {} }) => {
  const formatPrice = (price: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      'ر.س': 'ر.س', 'SAR': 'ر.س', 'USD': '$', '$': '$', 'EUR': '€', '€': '€', 'GBP': '£', '£': '£'
    };
    return `${price} ${currencySymbols[currency] || currency}`;
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black text-white overflow-y-auto">
      {/* Premium Header */}
      <div className="relative h-48 bg-gradient-to-br from-gold-400 via-yellow-500 to-gold-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute top-4 right-4 flex items-center space-x-2 space-x-reverse">
          <Crown className="w-5 h-5 text-yellow-300" />
          <span className="text-xs font-bold bg-black bg-opacity-50 px-2 py-1 rounded-full">PREMIUM</span>
        </div>
        
        {/* Limited Edition Badge */}
        {data.limitedEdition && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            إصدار محدود
          </div>
        )}
        
        <div className="relative h-full flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-black bg-opacity-30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              {data.productImages ? (
                <img 
                  src={data.productImages}
                  alt={data.productName || 'المنتج الفاخر'}
                  className="w-20 h-20 object-contain"
                />
              ) : (
                <div className="text-4xl">💎</div>
              )}
            </div>
            <h1 className="text-xl font-bold mb-1">
              {data.productName || 'ساعة رولكس ديتونا الذهبية'}
            </h1>
            {data.exclusiveFeature && (
              <p className="text-sm opacity-90">{data.exclusiveFeature}</p>
            )}
            {data.serialNumber && (
              <p className="text-xs opacity-75 mt-1">رقم المنتج: {data.serialNumber}</p>
            )}
            <div className="flex items-center justify-center space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Price Section */}
        <div className="text-center">
          {data.vipPrice && data.price && data.vipPrice < data.price ? (
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                سعر VIP: {formatPrice(data.vipPrice, data.currency || 'ر.س')}
              </div>
              <div className="text-lg text-gray-400 line-through">
                السعر العادي: {formatPrice(data.price, data.currency || 'ر.س')}
              </div>
            </div>
          ) : data.price ? (
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {formatPrice(data.price, data.currency || 'ر.س')}
            </div>
          ) : (
            <div className="text-3xl font-bold text-yellow-400 mb-2">89,999 ر.س</div>
          )}
          
          {data.paymentOptions && (
            <p className="text-sm text-gray-400">{data.paymentOptions}</p>
          )}
        </div>

        {/* Product Description */}
        {data.productDescription && (
          <div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {data.productDescription}
            </p>
          </div>
        )}

        {/* Premium Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-yellow-400 flex items-center space-x-2 space-x-reverse">
            <Award className="w-5 h-5" />
            <span>المميزات الحصرية</span>
          </h3>
          
          <div className="space-y-3">
            {data.premiumFeatures && Array.isArray(data.premiumFeatures) ? (
              data.premiumFeatures.map((feature: string, index: number) => (
                feature.trim() && (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                    <span className="text-sm text-gray-300 leading-relaxed">{feature.trim()}</span>
                  </div>
                )
              ))
            ) : (
              [
                'ضمان شامل مدى الحياة',
                'خدمة عملاء مخصصة 24/7',
                'شحن مجاني وتوصيل VIP',
                'حماية كاملة ضد الكسر',
                'استبدال فوري في حالة العطل'
              ].map((feature: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Craftsmanship */}
        {data.craftsmanship && (
          <div className="border-t border-gray-700 pt-4">
            <h4 className="font-bold text-yellow-400 mb-2">تفاصيل الصناعة</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{data.craftsmanship}</p>
          </div>
        )}

        {/* Premium Services */}
        {data.premiumService && (
          <div>
            <h4 className="font-bold text-yellow-400 mb-2">الخدمات الحصرية</h4>
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
              {data.premiumService}
            </div>
          </div>
        )}

        {/* Guarantee */}
        <div className="bg-gradient-to-r from-yellow-400 to-gold-500 text-black p-4 rounded-lg">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <Shield className="w-5 h-5" />
            <span className="font-bold">
              {data.warranty || 'ضمان الجودة المطلقة'}
            </span>
          </div>
          <p className="text-sm">استرداد كامل للمبلغ خلال 30 يوماً إذا لم تكن راضياً تماماً</p>
          {data.conciergeService && (
            <p className="text-sm mt-1">+ خدمة كونسيرج مخصصة لراحتك</p>
          )}
        </div>

        {/* CTA */}
        <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-gold-500 text-black font-bold rounded-lg flex items-center justify-center space-x-2 space-x-reverse shadow-lg text-lg">
          <Crown className="w-5 h-5" />
          <span>اطلب النسخة الحصرية</span>
        </button>

        {/* Contact Info */}
        <div className="text-center text-sm text-gray-400">
          <p>للطلبات الخاصة والاستفسارات</p>
          <p className="font-medium text-yellow-400">+966 50 123 4567</p>
          <p className="text-xs mt-1">خدمة العملاء المميزين متاحة على مدار الساعة</p>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate3;
