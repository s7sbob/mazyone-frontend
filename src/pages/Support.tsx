import React, { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronDown,
  ChevronUp,
  Send,
  FileText,
  Video,
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: '1',
      question: 'كيف أنشئ بطاقة رقمية جديدة؟',
      answer: 'يمكنك إنشاء بطاقة رقمية جديدة بالذهاب إلى قسم "بطاقاتي" والضغط على زر "أنشئ بطاقة جديدة". املأ المعلومات المطلوبة واختر التصميم المناسب.'
    },
    {
      id: '2',
      question: 'كيف أشارك بطاقتي مع الآخرين؟',
      answer: 'يمكنك مشاركة بطاقتك عبر رمز QR، رابط مباشر، أو تقنية NFC. كل بطاقة تحتوي على خيارات مشاركة متعددة.'
    },
    {
      id: '3',
      question: 'هل يمكنني تخصيص تصميم بطاقتي؟',
      answer: 'نعم، يمكنك تخصيص الألوان، الخطوط، إضافة شعارك، وترتيب العناصر حسب تفضيلك.'
    },
    {
      id: '4',
      question: 'كيف أتتبع من شاهد بطاقتي؟',
      answer: 'في قسم التحليلات، يمكنك مشاهدة عدد المشاهدات، المشاركات، والنقرات على بطاقتك.'
    },
    {
      id: '5',
      question: 'هل بياناتي آمنة؟',
      answer: 'نعم، نستخدم أحدث تقنيات التشفير لحماية بياناتك. يمكنك أيضاً التحكم في خصوصية بطاقتك.'
    }
  ];

  const helpVideos = [
    {
      id: '1',
      title: 'كيفية إنشاء بطاقة رقمية',
      duration: '3:45',
      thumbnail: '/videos/create-card.jpg'
    },
    {
      id: '2',
      title: 'مشاركة البطاقة عبر QR',
      duration: '2:30',
      thumbnail: '/videos/share-qr.jpg'
    },
    {
      id: '3',
      title: 'تخصيص تصميم البطاقة',
      duration: '4:15',
      thumbnail: '/videos/customize.jpg'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('تم إرسال رسالتك بنجاح! سنرد عليك قريباً.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          مرحباً! كيف يمكننا مساعدتك؟
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          ابحث في الأسئلة الشائعة أو تواصل معنا مباشرة
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="ابحث في الأسئلة الشائعة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pr-10 text-center"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              الأسئلة الشائعة
            </h2>
            
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-right hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-500" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400">
                  لم نجد أسئلة مطابقة لبحثك
                </p>
              </div>
            )}
          </div>

          {/* Help Videos */}
          <div className="card mt-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              فيديوهات المساعدة
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {helpVideos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                      <Video className="w-12 h-12 text-neutral-400" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              تواصل معنا
            </h2>
            
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  الاسم
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  الموضوع
                </label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">اختر الموضوع</option>
                  <option value="technical">مشكلة تقنية</option>
                  <option value="billing">الفوترة والاشتراك</option>
                  <option value="feature">طلب ميزة جديدة</option>
                  <option value="general">استفسار عام</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  الرسالة
                </label>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="input-field"
                  placeholder="اكتب رسالتك هنا..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              طرق التواصل الأخرى
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    البريد الإلكتروني
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    support@mazyone.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-secondary-500" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    الدردشة المباشرة
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    متاح 24/7
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    الهاتف
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    +966 11 234 5678
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <button className="btn-primary w-full">
                  بدء محادثة مباشرة
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              روابط سريعة
            </h2>
            
            <div className="space-y-2">
              <a href="#" className="block text-primary-500 hover:text-primary-600 text-sm">
                دليل البدء السريع
              </a>
              <a href="#" className="block text-primary-500 hover:text-primary-600 text-sm">
                وثائق API
              </a>
              <a href="#" className="block text-primary-500 hover:text-primary-600 text-sm">
                حالة الخدمة
              </a>
              <a href="#" className="block text-primary-500 hover:text-primary-600 text-sm">
                تحديثات المنصة
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
