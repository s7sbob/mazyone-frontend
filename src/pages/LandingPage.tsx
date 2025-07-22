import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Check, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone,
  QrCode,
  BarChart3,
  Award,
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Palette,
  Share2
} from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '../utils/cn';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: Zap,
      title: 'إنشاء سريع',
      description: 'أنشئ بطاقتك الرقمية في أقل من 5 دقائق',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: QrCode,
      title: 'مشاركة ذكية',
      description: 'شارك بطاقتك عبر QR Code أو NFC أو رابط مباشر',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: BarChart3,
      title: 'تحليلات متقدمة',
      description: 'تتبع من شاهد بطاقتك ومن تفاعل معها',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: Shield,
      title: 'أمان عالي',
      description: 'حماية بياناتك بأعلى معايير الأمان',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Globe,
      title: 'وصول عالمي',
      description: 'بطاقتك متاحة في أي مكان وأي وقت',
      color: 'from-indigo-400 to-blue-500'
    },
    {
      icon: Smartphone,
      title: 'متوافق مع الجوال',
      description: 'تصميم متجاوب يعمل على جميع الأجهزة',
      color: 'from-purple-400 to-indigo-500'
    }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      position: 'مدير تسويق',
      company: 'شركة التقنية الحديثة',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'مزيون غيّر طريقة تواصلي مع العملاء. الآن أستطيع مشاركة معلوماتي بسهولة ومتابعة التفاعل.',
      rating: 5
    },
    {
      name: 'سارة أحمد',
      position: 'مصممة جرافيك',
      company: 'استوديو الإبداع',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'التصميم رائع والميزات متقدمة. أصبحت أكثر احترافية في التعامل مع العملاء.',
      rating: 5
    },
    {
      name: 'محمد علي',
      position: 'رائد أعمال',
      company: 'شركة الابتكار',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'منصة ممتازة ساعدتني في توسيع شبكة علاقاتي المهنية بشكل كبير.',
      rating: 5
    }
  ];

  const plans = [
    {
      name: 'مزيون الأصيل',
      nameEn: 'Mazyone Core',
      price: 'مجاني',
      description: 'للأفراد والمستخدمين الجدد',
      features: [
        'بطاقة واحدة',
        'QR Code أساسي',
        'تحليلات محدودة',
        'دعم أساسي'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'مزيون برو',
      nameEn: 'Mazyone Pro',
      price: '29 ريال/شهر',
      description: 'للمحترفين والأعمال الصغيرة',
      features: [
        '5 بطاقات',
        'QR مخصص مع شعار',
        'تحليلات متقدمة',
        'صفحات هبوط',
        'دعم أولوية'
      ],
      popular: true,
      color: 'border-blue-500'
    },
    {
      name: 'مزيون المؤسسي',
      nameEn: 'Mazyone Business',
      price: '99 ريال/شهر',
      description: 'للشركات والمؤسسات',
      features: [
        'بطاقات غير محدودة',
        'فرق متعددة',
        'العلامة البيضاء',
        'تكاملات API',
        'دعم مخصص'
      ],
      popular: false,
      color: 'border-purple-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'مستخدم نشط' },
    { number: '50,000+', label: 'بطاقة تم إنشاؤها' },
    { number: '1M+', label: 'مشاهدة شهرياً' },
    { number: '99.9%', label: 'وقت التشغيل' }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 space-x-reverse"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                مزيون
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#features" className="text-neutral-700 dark:text-neutral-300 hover:text-blue-500 transition-colors">
                الميزات
              </a>
              <a href="#pricing" className="text-neutral-700 dark:text-neutral-300 hover:text-blue-500 transition-colors">
                الأسعار
              </a>
              <a href="#testimonials" className="text-neutral-700 dark:text-neutral-300 hover:text-blue-500 transition-colors">
                آراء العملاء
              </a>
              <a href="#contact" className="text-neutral-700 dark:text-neutral-300 hover:text-blue-500 transition-colors">
                تواصل معنا
              </a>
              <Link to="/login" className="btn-primary">
                تسجيل الدخول
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-700"
            >
              <div className="space-y-4">
                <a href="#features" className="block text-neutral-700 dark:text-neutral-300">الميزات</a>
                <a href="#pricing" className="block text-neutral-700 dark:text-neutral-300">الأسعار</a>
                <a href="#testimonials" className="block text-neutral-700 dark:text-neutral-300">آراء العملاء</a>
                <a href="#contact" className="block text-neutral-700 dark:text-neutral-300">تواصل معنا</a>
                <Link to="/login" className="btn-primary w-full text-center">
                  تسجيل الدخول
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-green-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-right"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight"
              >
                بطاقتك الرقمية
                <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                  {' '}الاحترافية
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed"
              >
                أنشئ بطاقة عمل رقمية احترافية في دقائق. شاركها بسهولة وتتبع تفاعل العملاء معها.
                <strong className="text-blue-500"> تواصل ذكي، نتائج أفضل.</strong>
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link 
                  to="/login"
                  className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  ابدأ مجاناً الآن
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Link>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 space-x-reverse px-8 py-4 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-500 transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>شاهد العرض التوضيحي</span>
                </motion.button>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="mt-8 flex items-center justify-center lg:justify-start space-x-6 space-x-reverse text-sm text-neutral-500 dark:text-neutral-400"
              >
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>مجاني للبدء</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>لا يتطلب بطاقة ائتمان</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>إعداد في دقائق</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="relative"
            >
              <div className="relative z-10">
                {/* Main Card */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 max-w-sm mx-auto"
                  style={{ borderTop: '4px solid #1D4ED8' }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">أ</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                      أحمد محمد
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                      مطور تطبيقات
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-4">
                      شركة التقنية المتقدمة
                    </p>
                    
                    <div className="flex justify-center space-x-3 space-x-reverse mb-4">
                      {['linkedin', 'twitter', 'github'].map((platform, index) => (
                        <motion.div
                          key={platform}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            delay: index * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-8 h-8 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center"
                        >
                          <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium">
                      حفظ جهة الاتصال
                    </button>
                  </div>
                </motion.div>

                {/* Floating QR Code */}
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-2"
                >
                  <QrCode className="w-full h-full text-neutral-400" />
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-lg px-3 py-2 text-sm font-medium shadow-lg"
                >
                  +127 مشاهدة اليوم
                </motion.div>
              </div>

              {/* Background Elements */}
              <div className="absolute inset-0 -z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-8 right-8 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{
                    scale: [1.05, 1, 1.05],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-8 left-8 w-24 h-24 bg-teal-200 dark:bg-teal-800 rounded-full blur-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-16 bg-neutral-50 dark:bg-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-3xl lg:text-4xl font-bold text-blue-500 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              ميزات تجعلك متميزاً
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              اكتشف كيف يمكن لمزيون أن يحول طريقة تواصلك المهني ويجعلك أكثر احترافية
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group relative p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
                  feature.color
                )}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              كيف يعمل مزيون؟
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              ثلاث خطوات بسيطة لبطاقة رقمية احترافية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'أنشئ بطاقتك',
                description: 'أضف معلوماتك الشخصية والمهنية بسهولة',
                icon: Users
              },
              {
                step: '02',
                title: 'خصص التصميم',
                description: 'اختر من القوالب الجاهزة أو صمم بطاقتك بنفسك',
                icon: Palette
              },
              {
                step: '03',
                title: 'شارك وتتبع',
                description: 'شارك بطاقتك وتتبع من شاهدها وتفاعل معها',
                icon: Share2
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      delay: index * 0.2,
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }
                }}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="relative mb-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </motion.div>
                  
                  {/* Connecting Line */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transform -translate-y-1/2" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              آراء حقيقية من مستخدمين راضين عن الخدمة
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 lg:p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    {testimonials[activeTestimonial].position}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-500">
                    {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === activeTestimonial
                      ? "bg-blue-500 w-8"
                      : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              خطط تناسب احتياجاتك
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              اختر الخطة المناسبة لك وابدأ رحلتك الرقمية
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className={cn(
                  "relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border-2 transition-all duration-300",
                  plan.popular 
                    ? "border-blue-500 shadow-blue-500/20 shadow-2xl" 
                    : plan.color
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      الأكثر شعبية
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {plan.description}
                  </p>
                  <div className="text-4xl font-bold text-blue-500 mb-2">
                    {plan.price}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3 space-x-reverse">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full py-3 rounded-lg font-medium transition-all duration-300",
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-lg transform hover:scale-105"
                      : "border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-500"
                  )}
                >
                  {plan.price === 'مجاني' ? 'ابدأ مجاناً' : 'اختر هذه الخطة'}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-teal-500 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              جاهز لتطوير هويتك الرقمية؟
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              انضم إلى آلاف المحترفين الذين يستخدمون مزيون لتطوير أعمالهم
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/login"
                className="inline-flex items-center space-x-3 space-x-reverse bg-white text-blue-500 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>ابدأ رحلتك الآن</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>

            <p className="text-blue-100 mt-4 text-sm">
              مجاني للبدء • لا يتطلب بطاقة ائتمان • إعداد في دقائق
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold">مزيون</span>
              </div>
              
              <p className="text-neutral-400 mb-6 leading-relaxed max-w-md">
                منصة البطاقات الرقمية الاحترافية التي تمكن المحترفين من إنشاء هوية رقمية متميزة ومشاركتها بسهولة.
              </p>
              
              <div className="flex space-x-4 space-x-reverse">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                  <motion.a
                    key={platform}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <div className="w-5 h-5 bg-current rounded-sm" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">روابط سريعة</h3>
              <ul className="space-y-3">
                {['الميزات', 'الأسعار', 'آراء العملاء', 'المدونة', 'الدعم'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6">تواصل معنا</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-neutral-400">support@mazyone.com</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-neutral-400">+966 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-neutral-400">الرياض، السعودية</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2024 مزيون. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                شروط الاستخدام
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
