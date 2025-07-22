import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CreditCard, 
  Shield, 
  Check, 
  ArrowRight, 
  Lock,
  Calendar,
  User,
  Building,
  Crown,
  Star,
  Gift,
  Users
} from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useStore();
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get('plan') || 'pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'wallet'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'SA'
  });

  const plans = {
    pro: {
      name: 'مزيون برو',
      description: 'للمحترفين والأفراد',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        '5 بطاقات رقمية',
        'QR مخصص مع شعار',
        'تحليلات متقدمة',
        'صفحات هبوط',
        'دعم فني',
        'تكامل وسائل التواصل'
      ],
      color: 'blue',
      popular: true
    },
    'pro-plus': {
      name: 'مزيون برو بلس',
      description: 'للمحترفين المتقدمين',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        'بطاقات غير محدودة',
        'منشئ السيرة الذاتية',
        'إزالة العلامة المائية',
        'تحليلات شاملة',
        'دعم أولوية',
        'تصدير متقدم'
      ],
      color: 'purple',
      popular: false
    },
    business: {
      name: 'مزيون المؤسسي',
      description: 'للشركات والفرق',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        'فرق متعددة',
        'إدارة الصلاحيات',
        'العلامة البيضاء',
        'تكاملات API',
        'دعم مخصص',
        'تقارير مفصلة'
      ],
      color: 'gold',
      popular: false
    }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans];
  const finalPrice = billingCycle === 'yearly' 
    ? currentPlan.yearlyPrice 
    : currentPlan.monthlyPrice;
  const savings = billingCycle === 'yearly' 
    ? (currentPlan.monthlyPrice * 12) - currentPlan.yearlyPrice 
    : 0;

  const paymentMethods = [
    {
      id: 'card',
      name: 'بطاقة ائتمانية',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'bank',
      name: 'تحويل بنكي',
      icon: Building,
      description: 'تحويل مباشر من البنك'
    },
    {
      id: 'wallet',
      name: 'محفظة رقمية',
      icon: Shield,
      description: 'Apple Pay, STC Pay, مدى'
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // محاكاة عملية الدفع
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('تم الدفع بنجاح! مرحباً بك في خطة ' + currentPlan.name + ' 🎉');
      navigate('/dashboard?welcome=true');
    } catch (error) {
      toast.error('حدث خطأ أثناء معالجة الدفع');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            إتمام الاشتراك
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            خطوة واحدة فقط للانضمام إلى مزيون {currentPlan.name}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Plan Selection */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                اختيار الخطة
              </h2>
              
              <div className="space-y-3">
                {Object.entries(plans).map(([key, plan]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 transition-colors text-right",
                      selectedPlan === key
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
                            {plan.name}
                          </h3>
                          {plan.popular && (
                            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                              الأكثر شعبية
                            </span>
                          )}
                          {key === 'business' && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {plan.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                          {billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice} ريال
                        </span>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          /{billingCycle === 'yearly' ? 'سنة' : 'شهر'}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Billing Cycle */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                دورة الفوترة
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-colors",
                    billingCycle === 'monthly'
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                  )}
                >
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100">شهري</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {currentPlan.monthlyPrice} ريال/شهر
                  </p>
                </button>

                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-colors relative",
                    billingCycle === 'yearly'
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                  )}
                >
                  {savings > 0 && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      وفر {savings} ريال
                    </div>
                  )}
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100">سنوي</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {currentPlan.yearlyPrice} ريال/سنة
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    شهرين مجاناً!
                  </p>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                طريقة الدفع
              </h2>
              
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 transition-colors text-right",
                      paymentMethod === method.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                    )}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <method.icon className="w-5 h-5 text-blue-500" />
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                          {method.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      رقم البطاقة
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          cardNumber: formatCardNumber(e.target.value) 
                        })}
                        className="input-field pr-10"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        تاريخ الانتهاء
                      </label>
                      <div className="relative">
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            expiryDate: formatExpiryDate(e.target.value) 
                          })}
                          className="input-field pr-10"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 4) 
                          })}
                          className="input-field pr-10"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      اسم حامل البطاقة
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="input-field pr-10"
                        placeholder="أحمد محمد السعيد"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse",
                      "hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      "disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>جاري المعالجة...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        <span>دفع آمن - {finalPrice} ريال</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {paymentMethod === 'bank' && (
                <div className="text-center py-8">
                  <Building className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    التحويل البنكي
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    سيتم توجيهك لإتمام التحويل البنكي
                  </p>
                  <button
                    onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
                    disabled={isLoading}
                    className="btn-primary"
                  >
                    متابعة التحويل
                  </button>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="text-center py-8">
                  <Shield className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    المحفظة الرقمية
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    اختر محفظتك الرقمية المفضلة
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-blue-300 transition-colors">
                      <img src="/apple-pay.png" alt="Apple Pay" className="h-8 mx-auto" />
                    </button>
                    <button className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-blue-300 transition-colors">
                      <img src="/stc-pay.png" alt="STC Pay" className="h-8 mx-auto" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-200 dark:border-neutral-700 sticky top-8">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                ملخص الطلب
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">الخطة</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {currentPlan.name}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">دورة الفوترة</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {billingCycle === 'yearly' ? 'سنوي' : 'شهري'}
                  </span>
                </div>

                {billingCycle === 'yearly' && savings > 0 && (
                  <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                    <span>الخصم السنوي</span>
                    <span className="font-medium">-{savings} ريال</span>
                  </div>
                )}

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">الإجمالي</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">
                      {finalPrice} ريال
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    شامل ضريبة القيمة المضافة
                  </p>
                </div>
              </div>

              {/* Plan Features */}
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  ما ستحصل عليه:
                </h3>
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 space-x-reverse">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Security Badge */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-200">
                    دفع آمن ومحمي
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  معاملاتك محمية بتشفير SSL 256-bit ومعايير الأمان الدولية
                </p>
              </div>

              {/* Money Back Guarantee */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">
                    ضمان استرداد الأموال
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  30 يوم ضمان كامل لاسترداد الأموال إذا لم تكن راضياً
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                دفع آمن 100%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-500 mb-2" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                تقييم 4.9/5
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                +10,000 عميل
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Gift className="w-8 h-8 text-purple-500 mb-2" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                ضمان 30 يوم
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
