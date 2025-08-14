import React from 'react';
import { ShoppingCart, Star, Tag, Package, Heart, Share2 } from 'lucide-react';

interface ProductTemplate1Props {
  solutionType: string;
  data?: any;
}

const ProductTemplate1: React.FC<ProductTemplate1Props> = ({ data = {} }) => {
  const formatPrice = (price: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      'ر.س': 'ر.س',
      'SAR': 'ر.س', 
      'USD': '$',
      '$': '$',
      'EUR': '€',
      '€': '€',
      'GBP': '£',
      '£': '£'
    };
    
    return `${price} ${currencySymbols[currency] || currency}`;
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      {/* Product Hero */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 h-48">
        <div className="absolute top-4 right-4 z-10 flex space-x-2 space-x-reverse">
          <button className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          {data.productImages ? (
            <img 
              src={data.productImages}
              alt={data.productName || 'المنتج'}
              className="max-w-32 max-h-32 object-contain"
            />
          ) : (
            <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-300" />
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {data.discountPrice && data.price && data.discountPrice < data.price && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            خصم {Math.round(((data.price - data.discountPrice) / data.price) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-lg font-bold text-gray-900 flex-1 leading-tight">
              {data.productName || 'iPhone 15 Pro Max'}
            </h1>
            {data.sku && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">
                {data.sku}
              </span>
            )}
          </div>
          
          {(data.brand || 'Apple') && (
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">{data.brand || 'Apple'}</span>
            </div>
          )}

          {(data.category || 'إلكترونيات') && (
            <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
              {data.category || 'إلكترونيات'}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className="w-4 h-4 fill-yellow-400 text-yellow-400" 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">(4.8)</span>
          <span className="text-xs text-gray-500">1,234 تقييم</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {data.discountPrice && data.price && data.discountPrice < data.price ? (
            <>
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(data.discountPrice, data.currency || 'ر.س')}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(data.price, data.currency || 'ر.س')}
              </span>
            </>
          ) : data.price ? (
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(data.price, data.currency || 'ر.س')}
            </span>
          ) : (
            <span className="text-2xl font-bold text-gray-900">2,999 ر.س</span>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.productDescription || 'أحدث هواتف آيفون بتقنيات متقدمة وكاميرا احترافية لتجربة استثنائية في التصوير والأداء.'}
          </p>
        </div>

        {/* Features */}
        {(data.features && Array.isArray(data.features) && data.features.length > 0) && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">المميزات الرئيسية:</h3>
            <div className="space-y-2">
              {data.features.map((feature: string, index: number) => (
                feature.trim() && (
                  <div key={index} className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature.trim()}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Specifications */}
        {data.specifications && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">المواصفات:</h3>
            <div className="space-y-1">
              {data.specifications.split('\n').filter((spec: string) => spec.trim()).map((spec: string, index: number) => {
                const [key, ...valueParts] = spec.split(':');
                const value = valueParts.join(':').trim();
                if (key && value) {
                  return (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key.trim()}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          {data.buyLink && (
            <a 
              href={data.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 space-x-reverse shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>اشتري الآن</span>
            </a>
          )}
          
          {data.moreInfoLink && (
            <a
              href={data.moreInfoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
            >
              المزيد من المعلومات
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate1;
