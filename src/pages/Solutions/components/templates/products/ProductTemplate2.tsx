import React from 'react';
import { Package, Star, Info, ShoppingCart, Award } from 'lucide-react';

interface ProductTemplate2Props {
  solutionType: string;
  data?: any;
}

const ProductTemplate2: React.FC<ProductTemplate2Props> = ({ data = {} }) => {
  const formatPrice = (price: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      'ر.س': 'ر.س', 'SAR': 'ر.س', 'USD': '$', '$': '$', 'EUR': '€', '€': '€', 'GBP': '£', '£': '£'
    };
    return `${price} ${currencySymbols[currency] || currency}`;
  };

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-bold text-gray-900 text-center">
          كتالوج المنتجات
        </h1>
      </div>

      {/* Product Card */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Product Image */}
          <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
            {data.productImages ? (
              <img 
                src={data.productImages}
                alt={data.productName || 'المنتج'}
                className="max-w-24 max-h-24 object-contain"
              />
            ) : (
              <Package className="w-16 h-16 text-gray-400" />
            )}
            
            {/* Availability Badge */}
            {data.availability && (
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  data.availability === 'متوفر' 
                    ? 'bg-green-100 text-green-800' 
                    : data.availability === 'غير متوفر'
                    ? 'bg-red-100 text-red-800'
                    : data.availability === 'قريباً'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {data.availability}
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-bold text-gray-900 text-base">
                  {data.productName || 'لابتوب Dell XPS 13'}
                </h2>
                {data.productCode && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded ml-2">
                    {data.productCode}
                  </span>
                )}
              </div>
              
              {(data.category || 'حاسوب محمول') && (
                <p className="text-sm text-gray-600 mb-2">{data.category || 'حاسوب محمول'}</p>
              )}
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">(4.8)</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {data.productDescription?.slice(0, 100) || 'لابتوب عالي الأداء مناسب للعمل والدراسة بمواصفات ممتازة...'}
              {data.productDescription && data.productDescription.length > 100 && '...'}
            </p>

            {/* Specifications Table */}
            {data.specifications && (
              <div className="border-t pt-3">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">المواصفات:</h4>
                <div className="space-y-1 text-xs">
                  {data.specifications.split('\n').filter((spec: string) => spec.trim()).slice(0, 4).map((spec: string, index: number) => {
                    const [key, ...valueParts] = spec.split(':');
                    const value = valueParts.join(':').trim();
                    if (key && value) {
                      return (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{key.trim()}</span>
                          <span className="text-gray-900 font-medium">{value}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
              {data.dimensions && (
                <div>
                  <span className="font-medium">الأبعاد:</span> {data.dimensions}
                </div>
              )}
              {data.weight && (
                <div>
                  <span className="font-medium">الوزن:</span> {data.weight}
                </div>
              )}
              {data.material && (
                <div>
                  <span className="font-medium">المادة:</span> {data.material}
                </div>
              )}
            </div>

            {/* Warranty */}
            {data.warranty && (
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <Award className="w-4 h-4 text-blue-500" />
                <span className="text-blue-600 font-medium">{data.warranty}</span>
              </div>
            )}

            {/* Price and Action */}
            <div className="border-t pt-3 flex items-center justify-between">
              <div>
                {data.price && (
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(data.price, data.currency || 'ر.س')}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2 space-x-reverse">
                <button className="p-2 bg-gray-100 rounded-lg">
                  <Info className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-blue-500 text-white rounded-lg">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-xs text-gray-500">
        للطلب والاستفسار اتصل بنا
      </div>
    </div>
  );
};

export default ProductTemplate2;
