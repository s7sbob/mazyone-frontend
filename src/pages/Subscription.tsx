import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Crown, 
  Zap, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  CreditCard,
  Gift,
  TrendingUp,
  Globe,
  Smartphone,
  BarChart3,
  Settings,
  Headphones,
  Award,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const Subscription = () => {
  const { user } = useStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'core',
      name: 'مزيون الأصيل',
      nameEn: 'Mazyone Core',
      description: 'مثالي للمبتدئين والاستخدام الشخصي',
      price: { monthly: 0, yearly: 0 },
      color: 'from-gray-500 to-gray-600',
      icon: Smartphone,
      popular: false,
      features: [
        { name: 'بطاقة رقمية واحدة', included: true },
        { name: 'رمز QR أساسي', included: true },
        { name: 'مشاركة عبر الرابط', included: true },
        { name: 'تحليلات أساسية', included: true },
        { name: 'دعم عبر البريد الإلكتروني', included: true },
        { name: 'قوالب محدودة (3)', included: true },
        { name: 'تخصيص الألوان', included: false },
        { name: 'إزالة العلامة المائية', included: false },
        { name: 'صفحات الهبوط', included: false },
        { name: 'منشئ السيرة الذاتية', included: false },
        { name: 'تحليلات متقدمة', included: false },
        { name: 'دعم أولوية', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'مزيون برو',
      nameEn: 'Mazyone Pro',
      description: 'للمحترفين والأعمال الصغيرة',
      price: { monthly: 29, yearly: 290 },
      color: 'from-blue-500 to-blue-600',
      icon: Zap,
      popular: true,
      features: [
        { name: '5 بطاقات رقمية', included: true },
        { name: 'رموز QR مخصصة مع شعار', included: true },
        { name: 'تخصيص كامل للألوان والخطوط', included: true },
        { name: 'تحليلات متقدمة', included: true },
        { name: 'صفحات هبوط (3)', included: true },
        { name: 'منشئ السيرة الذاتية', included: true },
        { name: 'إزالة العلامة المائية', included: true },
        { name: 'دعم عبر الدردشة', included: true },
        { name: 'جميع القوالب', included: true },
        { name: 'تصدير البيانات', included: true },
        { name: 'تكاملات أساسية', included: true },
        { name: 'العلامة البيضاء', included: false }
      ]
    },
    {
      id: 'pro-plus',
      name: 'مزيون برو بلس',
      nameEn: 'Mazyone Pro Plus',
      description: 'للشركات المتوسطة والمحترفين المتقدمين',
      price: { monthly: 59, yearly: 590 },
      color: 'from-purple-500 to-purple-600',
      icon: Crown,
      popular: false,
      features: [
        { name: 'بطاقات غير محدودة', included: true },
        { name: 'جميع ميزات برو', included: true },
        { name: 'صفحات هبوط غير محدودة', included: true },
        { name: 'تحليلات احترافية مع تقارير', included: true },
        { name: 'API مخصص', included: true },
        { name: 'تكاملات متقدمة', included: true },
        { name: 'دعم أولوية 24/7', included: true },
        { name: 'تدريب شخصي', included: true },
        { name: 'نطاق فرعي مخصص', included: true },
        { name: 'نسخ احتياطية تلقائية', included: true },
        { name: 'إدارة الفرق (5 أعضاء)', included: true },
        { name: 'العلامة البيضاء الأساسية', included: true }
      ]
    },
    {
      id: 'business',
      name: 'مزيون المؤسسي',
      nameEn: 'Mazyone Business',
      description: 'للشركات الكبيرة والمؤسسات',
      price: { monthly: 149, yearly: 1490 },
      color: 'from-orange-500 to-red-500',
      icon: Users,
      popular: false,
      features: [
        { name: 'جميع ميزات برو بلس', included: true },
        { name: 'فرق غير محدودة', included: true },
        { name: 'إدارة صلاحيات متقدمة', included: true },
        { name: 'العلامة البيضاء الكاملة', included: true },
        { name: 'نطاق مخصص', included: true },
        { name: 'SSO وتكامل LDAP', included: true },
        { name: 'مدير حساب مخصص', included: true },
        { name: 'SLA مضمون', included: true },
        { name: 'تدريب للفريق', included: true },
        { name: 'تقارير مخصصة', included: true },
        { name: 'أمان متقدم', included: true },
        { name: 'دعم هاتفي مباشر', included: true }
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      toast.success(`تم اختيار باقة ${plan.name}`);
    }
  };

  const handleUpgrade = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      toast.success(`جاري التوجيه لصفحة الدفع لباقة ${plan.name}...`);
      // هنا سيتم التوجيه لصفحة الدفع
    }
  };

  const getCurrentPlan = () => {
    return plans.find(plan => plan.id === user?.subscription) || plans[0];
  };

  const currentPlan = getCurrentPlan();
  const yearlyDiscount = 20; // خصم 20% على الباقة السنوية

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          اختر الباقة المناسبة لك
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          ارتقِ بتجربتك الرقمية مع باقاتنا المتنوعة. من البداية البسيطة إلى الحلول المؤسسية المتقدمة
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <currentPlan.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                باقتك الحالية: {currentPlan.name}
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                {currentPlan.description}
              </p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {currentPlan.price.monthly === 0 ? 'مجاني' : `${currentPlan.price.monthly} ريال/شهر`}
            </p>
            {currentPlan.price.monthly > 0 && (
              <p className="text-sm text-blue-600 dark:text-blue-400">
                التجديد التالي: 15 أغسطس 2024
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <div className="flex items-center space-x-1 space-x-reverse">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                billingCycle === 'monthly'
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              )}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all relative",
                billingCycle === 'yearly'
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              )}
            >
              سنوي
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                وفر {yearlyDiscount}%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = plan.id === user?.subscription;
          const price = billingCycle === 'yearly' 
            ? Math.round(plan.price.yearly / 12) 
            : plan.price.monthly;
          const yearlyPrice = plan.price.yearly;
          const monthlySavings = billingCycle === 'yearly' && plan.price.monthly > 0
            ? plan.price.monthly - price
            : 0;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border-2 transition-all duration-300 hover:shadow-xl",
                plan.popular 
                  ? "border-blue-500 shadow-lg scale-105" 
                  : "border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-600",
                isCurrentPlan && "ring-2 ring-blue-500 ring-opacity-50"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4" />
                    <span>الأكثر شعبية</span>
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    باقتك الحالية
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-r",
                    plan.color
                  )}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  {price === 0 ? (
                    <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                      مجاني
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center space-x-1 space-x-reverse">
                        <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                          {price}
                        </span>
                        <div className="text-right">
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">ريال</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-500">
                            /{billingCycle === 'yearly' ? 'شهر' : 'شهر'}
                          </div>
                        </div>
                      </div>
                      
                      {billingCycle === 'yearly' && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                            وفر {monthlySavings} ريال شهرياً
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">
                            ({yearlyPrice} ريال سنوياً)
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included 
                          ? "text-neutral-700 dark:text-neutral-300" 
                          : "text-neutral-400 dark:text-neutral-600"
                      )}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                  
                  {plan.features.length > 6 && (
                    <div className="text-center pt-2">
                      <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        عرض جميع الميزات ({plan.features.length})
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="space-y-3">
                  {isCurrentPlan ? (
                    <button className="w-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 py-3 rounded-lg font-medium border border-green-200 dark:border-green-800">
                      باقتك الحالية
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan.id)}
                      className={cn(
                        "w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse",
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
                          : "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                      )}
                    >
                      <span>{price === 0 ? 'ابدأ مجاناً' : 'ترقية الآن'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  
                  {!isCurrentPlan && price > 0 && (
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className="w-full border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 py-2 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      تجربة مجانية 14 يوم
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Comparison */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
          مقارنة شاملة للباقات
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="text-right py-4 px-4 font-medium text-neutral-900 dark:text-neutral-100">
                  الميزة
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} className="text-center py-4 px-4">
                    <div className="flex flex-col items-center">
                      <plan.icon className="w-6 h-6 text-neutral-600 dark:text-neutral-400 mb-2" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                        {plan.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                'عدد البطاقات',
                'رموز QR مخصصة',
                'تخصيص التصميم',
                'صفحات الهبوط',
                'منشئ السيرة الذاتية',
                'التحليلات',
                'الدعم الفني',
                'العلامة البيضاء',
                'إدارة الفرق',
                'API مخصص'
              ].map((feature, index) => (
                <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-4 px-4 font-medium text-neutral-700 dark:text-neutral-300">
                    {feature}
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {index === 0 && (
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {plan.id === 'core' ? '1' : 
                           plan.id === 'pro' ? '5' : 
                           plan.id === 'pro-plus' ? '∞' : '∞'}
                        </span>
                      )}
                      {index === 1 && (
                        plan.id === 'core' ? 
                          <X className="w-5 h-5 text-neutral-400 mx-auto" /> :
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                      )}
                      {index === 2 && (
                        plan.id === 'core' ? 
                          <X className="w-5 h-5 text-neutral-400 mx-auto" /> :
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                      )}
                      {index === 3 && (
                        plan.id === 'core' ? 
                          <X className="w-5 h-5 text-neutral-400 mx-auto" /> :
                          plan.id === 'pro' ?
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">3</span> :
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">∞</span>
                      )}
                      {index === 4 && (
                        plan.id === 'core' ? 
                          <X className="w-5 h-5 text-neutral-400 mx-auto" /> :
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                      )}
                      {index === 5 && (
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {plan.id === 'core' ? 'أساسية' : 
                           plan.id === 'pro' ? 'متقدمة' : 
                           plan.id === 'pro-plus' ? 'احترافية' : 'مؤسسية'}
                        </span>
                      )}
                      {index === 6 && (
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {plan.id === 'core' ? 'إيميل' : 
                           plan.id === 'pro' ? 'دردشة' : 
                           plan.id === 'pro-plus' ? '24/7' : 'مخصص'}
                        </span>
                      )}
                      {index === 7 && (
                        ['pro-plus', 'business'].includes(plan.id) ? 
                          <Check className="w-5 h-5 text-green-500 mx-auto" /> :
                          <X className="w-5 h-5 text-neutral-400 mx-auto" />
                      )}
                      {index === 8 && (
                        plan.id === 'business' ? 
                          <Check className="w-5 h-5 text-green-500 mx-auto" /> :
                          plan.id === 'pro-plus' ?
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">5</span> :
                            <X className="w-5 h-5 text-neutral-400 mx-auto" />
                      )}
                      {index === 9 && (
                        ['pro-plus', 'business'].includes(plan.id) ? 
                          <Check className="w-5 h-5 text-green-500 mx-auto" /> :
                          <X className="w-5 h-5 text-neutral-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
          الأسئلة الشائعة حول الباقات
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: 'هل يمكنني تغيير باقتي لاحقاً؟',
              answer: 'نعم، يمكنك ترقية أو تخفيض باقتك في أي وقت. التغييرات تسري فوراً مع احتساب تناسبي للتكلفة.'
            },
            {
              question: 'ما هي مدة التجربة المجانية؟',
              answer: 'نوفر تجربة مجانية لمدة 14 يوماً لجميع الباقات المدفوعة مع إمكانية الوصول لجميع الميزات.'
            },
            {
              question: 'هل هناك رسوم إضافية خفية؟',
              answer: 'لا، جميع الأسعار شاملة ولا توجد رسوم إضافية. ما تراه هو ما تدفعه بالضبط.'
            },
            {
              question: 'كيف يعمل الخصم السنوي؟',
              answer: 'عند اختيار الدفع السنوي، تحصل على خصم 20% مقارنة بالدفع الشهري مع توفير كبير.'
            },
            {
              question: 'هل يمكنني إلغاء اشتراكي؟',
              answer: 'نعم، يمكنك إلغاء اشتراكك في أي وقت. ستحتفظ بالوصول حتى نهاية فترة الفوترة الحالية.'
            },
            {
              question: 'ما هي وسائل الدفع المقبولة؟',
              answer: 'نقبل جميع البطاقات الائتمانية الرئيسية، Apple Pay، Google Pay، والتحويل البنكي.'
            }
          ].map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {faq.question}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            جاهز لترقية تجربتك؟
          </h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            انضم إلى آلاف المحترفين الذين يستخدمون مزيون لبناء هويتهم الرقمية وتوسيع شبكة اتصالاتهم
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2 space-x-reverse">
              <span>ابدأ التجربة المجانية</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center space-x-2 space-x-reverse">
              <Headphones className="w-4 h-4" />
              <span>تحدث مع المبيعات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
