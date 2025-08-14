import React from 'react';
import { ShoppingCart, Star, Tag, Package, ExternalLink, Play } from 'lucide-react';

interface ProductPreviewProps {
  data: any;
  config: any;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ data, config }) => {
  const design = data.design || {};
  const primaryColor = design.primaryColor || '#10B981';
  const layout = design.layout || 'showcase';

  const formatPrice = (price: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      'SAR': 'ر.س',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    
    return `${price} ${currencySymbols[currency] || currency}`;
  };

  const renderShowcaseLayout = () => (
    <div className="h-full bg-white overflow-y-auto">
      {/* Product Hero */}
      <div className="relative">
        {data.productImages ? (
          <img 
            src={data.productImages}
            alt={data.productName}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Discount Badge */}
        {data.discountPrice && data.price && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            خصم {Math.round(((data.price - data.discountPrice) / data.price) * 100)}%
          </div>
        )}
        
        {/* Play Button for Video */}
        {data.productVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white mr-1" />
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-lg font-bold text-gray-900 flex-1">
              {data.productName || 'اسم المنتج'}
            </h1>
            {data.sku && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {data.sku}
              </span>
            )}
          </div>
          
          {data.brand && (
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              {data.brand}
            </p>
          )}
          
          {data.category && (
            <div className="flex items-center space-x-2 space-x-reverse mt-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{data.category}</span>
            </div>
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
          <span className="text-sm text-gray-600">(4.5)</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {data.discountPrice ? (
            <>
              <span className="text-2xl font-bold" style={{ color: primaryColor }}>
                {formatPrice(data.discountPrice, data.currency || 'SAR')}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(data.price, data.currency || 'SAR')}
              </span>
            </>
          ) : data.price ? (
            <span className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatPrice(data.price, data.currency || 'SAR')}
            </span>
          ) : (
            <span className="text-lg text-gray-600">السعر غير محدد</span>
          )}
        </div>

        {/* Description */}
        {data.productDescription && (
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.productDescription}
            </p>
          </div>
        )}

        {/* Features */}
        {data.features && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">الميزات الرئيسية:</h3>
            <div className="space-y-2">
              {data.features.split('\n').filter(Boolean).map((feature: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 space-x-reverse">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                  <span className="text-sm text-gray-700">{feature.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specifications */}
        {data.specifications && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">المواصفات:</h3>
            <div className="space-y-1">
              {data.specifications.split('\n').filter(Boolean).map((spec: string, index: number) => {
                const [key, value] = spec.split(':').map(s => s.trim());
                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          {data.buyLink && (
            <button 
              className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 space-x-reverse"
              style={{ backgroundColor: primaryColor }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>اشتري الآن</span>
            </button>
          )}
          
          {data.moreInfoLink && (
            <button className="w-full py-3 rounded-lg border-2 font-semibold flex items-center justify-center space-x-2 space-x-reverse"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              <ExternalLink className="w-5 h-5" />
              <span>المزيد من المعلومات</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full" style={{ fontFamily: design.fontFamily || 'Tajawal, sans-serif' }}>
      {renderShowcaseLayout()}
    </div>
  );
};

export default ProductPreview;
