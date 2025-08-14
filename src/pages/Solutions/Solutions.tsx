import React, { useState } from 'react';
import { 
  QrCode, 
  Smartphone, 
  Users, 
  Building, 
  Globe, 
  FileText,
  Utensils,
  ShoppingCart,
  Calendar,
  MapPin,
  Music,
  Camera,
  Briefcase,
  Heart,
  Car,
  Home,
  ArrowRight,
  Check,
  Star,
  Zap,
  Target,
  TrendingUp,
  CreditCard,
  MessageSquare,
  Video,
  Mail,
  Wifi,
  Download,
  Shield,
  FormInput,
  Eye,
  Clock,
  ImageIcon,
  Phone,
  Search,
  Youtube,
  Facebook
} from 'lucide-react';
import { cn } from '../../utils/cn';
import SolutionCard from './components/SolutionCard';
import SolutionModal from './components/SolutionModal';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom'; // إضافة useNavigate

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  features: string[];
  useCases: string[];
  benefits: string[];
  color: string;
  gradient: string;
  isPopular?: boolean;
  isNew?: boolean;
}

const Solutions = () => {
  const { user } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // إضافة navigate

  const categories = [
    { id: 'all', name: 'جميع الحلول', count: 40 },
    { id: 'business', name: 'الأعمال', count: 18 },
    { id: 'social', name: 'التواصل الاجتماعي', count: 8 },
    { id: 'forms', name: 'النماذج والاستطلاعات', count: 6 },
    { id: 'media', name: 'الوسائط والملفات', count: 8 }
  ];

  const solutions: Solution[] = [
    {
      id: 'digital-business-cards',
      title: 'البطاقات التجارية الرقمية',
      description: 'أنشئ بطاقات أعمال رقمية احترافية في دقائق باستخدام قوالب جاهزة. تواصل بسهولة، واترك انطباعاً دائماً وروابط هادفة.',
      icon: Briefcase,
      category: 'business',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      isPopular: true,
      features: [
        'قوالب احترافية جاهزة للاستخدام',
        'تخصيص كامل للتصميم والألوان',
        'مشاركة فورية عبر QR أو NFC',
        'إضافة مباشرة إلى دفتر الهاتف',
        'تحليلات مفصلة للتفاعل'
      ],
      useCases: [
        'المؤتمرات والمعارض التجارية',
        'اللقاءات المهنية والشبكات',
        'فرق المبيعات والتسويق',
        'المستقلين ورجال الأعمال'
      ],
      benefits: [
        'توفير تكلفة الطباعة بنسبة 80%',
        'زيادة معدل حفظ المعلومات',
        'تحديث فوري للبيانات',
        'صداقة للبيئة ومستدامة'
      ]
    },
    {
      id: 'product-qr-code',
      title: 'رمز QR للمنتجات',
      description: 'اعرض منتجك بقوالب مذهلة قابلة للتخصيص. تفاعل مع عملائك، شارك قصة علامتك التجارية، وعزز المبيعات بسهولة.',
      icon: ShoppingCart,
      category: 'business',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      features: [
        'صفحات منتج تفاعلية مخصصة',
        'معرض صور عالي الجودة',
        'معلومات تفصيلية عن المنتج',
        'روابط شراء مباشرة',
        'مراجعات وتقييمات العملاء'
      ],
      useCases: [
        'المتاجر الإلكترونية والتقليدية',
        'المعارض التجارية والكتالوجات',
        'الشركات المصنعة',
        'المسوقين بالعمولة'
      ],
      benefits: [
        'زيادة المبيعات والتحويلات',
        'تحسين تجربة العملاء',
        'تقليل تكلفة التسويق',
        'تتبع أداء المنتجات'
      ]
    },
    {
      id: 'form-qr-code',
      title: 'رمز QR للنماذج',
      description: 'أنشئ نماذج احترافية برموز QR باستخدام قوالب جذابة. اجمع بيانات الطرف الأول بسرعة مثل الآراء والملاحظات والتسجيلات وأكثر.',
      icon: FormInput,
      category: 'forms',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      isNew: true,
      features: [
        'بناء نماذج سهل وسريع',
        'قوالب متنوعة ومخصصة',
        'جمع البيانات في الوقت الفعلي',
        'تصدير البيانات متعدد الأشكال',
        'حماية وأمان البيانات'
      ],
      useCases: [
        'استطلاعات رضا العملاء',
        'تسجيل الفعاليات والدورات',
        'نماذج الاتصال والاستفسارات',
        'جمع البيانات التسويقية'
      ],
      benefits: [
        'زيادة معدل الاستجابة بنسبة 300%',
        'توفير الوقت والجهد',
        'دقة وجودة البيانات',
        'سهولة التحليل والمتابعة'
      ]
    },
    {
      id: 'vcard-plus',
      title: 'vCard Plus',
      description: 'vCard Plus يساعدك على إنشاء صفحات ملف شخصي مذهلة لبطاقات العمل. يجعل من السهل جداً على الآخرين إضافتك إلى دفتر جهات الاتصال وضبط تذكيرات المتابعة.',
      icon: Users,
      category: 'business',
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600',
      features: [
        'ملفات شخصية احترافية شاملة',
        'إضافة مباشرة لدفتر الأسماء',
        'تذكيرات متابعة ذكية',
        'تكامل مع تطبيقات CRM',
        'مشاركة عبر منصات متعددة'
      ],
      useCases: [
        'المدراء التنفيذيون',
        'فرق المبيعات',
        'المستشارين والخبراء',
        'رجال الأعمال والمستثمرين'
      ],
      benefits: [
        'بناء شبكة مهنية قوية',
        'متابعة فعالة للعلاقات',
        'إدارة احترافية للجهات',
        'تحسين فرص الأعمال'
      ]
    },
    {
      id: 'pdf-to-qr',
      title: 'PDF إلى رمز QR',
      description: 'أنشئ رمز QR للسماح لعملائك بالمسح وتحميل ملفات PDF والوثائق الأخرى/الدليل حول منتجاتك وخدماتك وأعمالك.',
      icon: FileText,
      category: 'media',
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      features: [
        'رفع وربط ملفات PDF بسهولة',
        'معاينة سريعة قبل التحميل',
        'حماية بكلمة مرور اختيارية',
        'تتبع التحميلات والوصولات',
        'ضغط وتحسين الملفات'
      ],
      useCases: [
        'كتالوجات المنتجات والخدمات',
        'الكتيبات والبروشورات',
        'التقارير والدراسات',
        'دليل المستخدم والتعليمات'
      ],
      benefits: [
        'وصول سريع وسهل للمعلومات',
        'توفير تكلفة الطباعة',
        'تحديث المحتوى في أي وقت',
        'تتبع مستوى الاهتمام'
      ]
    },
    {
      id: 'pet-id-tag',
      title: 'بطاقة تعريف الحيوانات الأليفة',
      description: 'أنشئ رمز QR لبطاقة تعريف الحيوان الأليف لطوق حيوانك الأليف لمشاركة معلومات الاتصال ومعلومات الحيوان الأليف. يساعد الناس على الاتصال بك بسرعة حول حيوانك الأليف المفقود. احصل على إشعارات المسح.',
      icon: Heart,
      category: 'personal',
      color: 'pink',
      gradient: 'from-pink-500 to-pink-600',
      features: [
        'معلومات شاملة عن الحيوان الأليف',
        'معلومات الاتصال الطارئة',
        'سجل التطعيمات والحساسية',
        'إشعارات فورية عند المسح',
        'خدمة الطوارئ البيطرية'
      ],
      useCases: [
        'الكلاب والقطط الأليفة',
        'الحيوانات في المناطق العامة',
        'رحلات السفر مع الحيوانات',
        'الحيوانات كبيرة العمر أو المريضة'
      ],
      benefits: [
        'إعادة سريعة للحيوانات المفقودة',
        'راحة بال لأصحاب الحيوانات',
        'رعاية طبية فورية عند الحاجة',
        'تواصل مباشر مع المالك'
      ]
    },
    {
      id: 'pdf-gallery',
      title: 'معرض PDF',
      description: 'أنشئ رمز QR لمعرض PDF للسماح لعملائك بالمسح وعرض ملفات PDF وأدلة متعددة لمنتجاتك وخدماتك.',
      icon: ImageIcon,
      category: 'media',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      features: [
        'عرض متعدد لملفات PDF',
        'تصنيف وتنظيم الملفات',
        'معاينة سريعة ومرنة',
        'تحميل اختياري أو عرض فقط',
        'بحث داخل المعرض'
      ],
      useCases: [
        'مكتبات المنتجات والخدمات',
        'المعارض والمؤسسات التعليمية',
        'الشركات الاستشارية',
        'المطاعم وقوائم الطعام'
      ],
      benefits: [
        'تنظيم أفضل للمحتوى',
        'تجربة تصفح محسنة',
        'وصول سهل لمعلومات شاملة',
        'إدارة مركزية للوثائق'
      ]
    },
    {
      id: 'medical-alert',
      title: 'تنبيه طبي',
      description: 'أنشئ بطاقة تنبيه طبي برمز QR للمساعدة في حالات الطوارئ. شارك التفاصيل الطبية الحرجة فوراً عبر المسح. قم بالتحديث والوصول في أي وقت، في أي مكان.',
      icon: Shield,
      category: 'personal',
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      features: [
        'معلومات طبية حرجة مفصلة',
        'قائمة الأدوية والحساسية',
        'معلومات الاتصال بالطوارئ',
        'وصول سريع للطوارئ الطبية',
        'تحديث مستمر للمعلومات'
      ],
      useCases: [
        'المرضى بحالات مزمنة',
        'كبار السن والأطفال',
        'الرياضيين والمسافرين',
        'العاملين في بيئات خطرة'
      ],
      benefits: [
        'إنقاذ الأرواح في الطوارئ',
        'تسريع الإسعافات الأولية',
        'تجنب المضاعفات الطبية',
        'راحة بال للعائلة'
      ]
    },
    {
      id: 'multi-url',
      title: 'روابط متعددة',
      description: 'أنشئ بديلاً فائقاً لـ Linktree يدمج روابط وسائل التواصل الاجتماعي ومواقع الأعمال والمزيد في صفحة موحدة، متوافقة مع رموز QR و NFC.',
      icon: Globe,
      category: 'social',
      color: 'teal',
      gradient: 'from-teal-500 to-teal-600',
      features: [
        'صفحة روابط موحدة وأنيقة',
        'تكامل مع جميع منصات التواصل',
        'تخصيص كامل للتصميم',
        'تحليلات مفصلة للنقرات',
        'إدارة سهلة للروابط'
      ],
      useCases: [
        'المؤثرين ومنشئي المحتوى',
        'الفنانين والموسيقيين',
        'رجال الأعمال والمسوقين',
        'الشركات والعلامات التجارية'
      ],
      benefits: [
        'زيادة المتابعين والتفاعل',
        'إدارة مركزية للحضور الرقمي',
        'تحسين تجربة الجمهور',
        'تتبع أداء كل رابط'
      ]
    },
    {
      id: 'event-ticket',
      title: 'تذكرة الفعالية',
      description: 'أنشئ رمز QR لتذكرة الفعالية واجعل تذاكرك ومداخلك أكثر سلاسة. تحكم في التذاكر بسلاسة ومكّن الحضور من تسجيل دخول سهل.',
      icon: Calendar,
      category: 'business',
      color: 'violet',
      gradient: 'from-violet-500 to-violet-600',
      features: [
        'تذاكر رقمية آمنة ومشفرة',
        'تسجيل دخول سريع ودقيق',
        'تتبع الحضور في الوقت الفعلي',
        'منع التزوير والتلاعب',
        'إدارة شاملة للفعاليات'
      ],
      useCases: [
        'المؤتمرات والندوات',
        'الحفلات والعروض',
        'المعارض التجارية',
        'ورش العمل والدورات'
      ],
      benefits: [
        'تقليل الانتظار في الدخول',
        'منع التذاكر المزيفة',
        'إحصائيات دقيقة للحضور',
        'تحسين تجربة الضيوف'
      ]
    },
    {
      id: 'event',
      title: 'فعالية',
      description: 'قم بإنشاء صفحات هبوط مثالية لفعالياتك. يزيد التسجيلات والمشاركة. دع الناس يتابعونك على وسائل التواصل الاجتماعي. احصل على تحليلات مفصلة ومتعمقة.',
      icon: Star,
      category: 'business',
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-600',
      features: [
        'صفحات هبوط جذابة للفعاليات',
        'نموذج تسجيل مدمج',
        'تكامل مع وسائل التواصل',
        'تحليلات شاملة للأداء',
        'إدارة قائمة المشاركين'
      ],
      useCases: [
        'المؤتمرات المهنية',
        'ورش العمل والدورات',
        'الفعاليات الاجتماعية',
        'إطلاق المنتجات'
      ],
      benefits: [
        'زيادة معدل التسجيل بنسبة 40%',
        'تحسين الوعي بالعلامة التجارية',
        'بناء قائمة عملاء مهتمين',
        'قياس نجاح الفعالية'
      ]
    },
    {
      id: 'coupon',
      title: 'قسيمة خصم',
      description: 'أنشئ صفحات قسائم لحملات الخصم الخاصة بك. زيادة مشاركة زوارك غير المتصلين بالإنترنت. قم بإنشاء الصفحة الرائعة المظهر في دقائق قليلة فقط.',
      icon: CreditCard,
      category: 'business',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      features: [
        'تصميم قسائم جذاب ومميز',
        'كوبونات محدودة الوقت',
        'تتبع الاستخدام والفعالية',
        'منع الاستخدام المتعدد',
        'تخصيص قيم وشروط الخصم'
      ],
      useCases: [
        'حملات التسويق والترويج',
        'المطاعم والمقاهي',
        'المتاجر والمراكز التجارية',
        'الخدمات المهنية'
      ],
      benefits: [
        'زيادة المبيعات والإيرادات',
        'جذب عملاء جدد',
        'تحسين ولاء العملاء',
        'قياس ROI للحملات'
      ]
    },
    {
      id: 'business',
      title: 'صفحة الأعمال',
      description: 'أنشئ صفحات أعمال مذهلة في دقائق قليلة فقط. دع زوارك غير المتصلين بالإنترنت يضيفونك إلى قائمة الاتصال الخاصة بهم بسهولة. اجعلهم يتابعون صفحاتك الاجتماعية بمسح بسيط.',
      icon: Building,
      category: 'business',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'صفحة أعمال شاملة ومهنية',
        'معلومات الاتصال والموقع',
        'ساعات العمل والخدمات',
        'روابط وسائل التواصل',
        'معرض صور المشاريع'
      ],
      useCases: [
        'الشركات الصغيرة والمتوسطة',
        'المهنيين والمستقلين',
        'المطاعم والمحلات',
        'مقدمي الخدمات'
      ],
      benefits: [
        'زيادة الوعي بالعلامة التجارية',
        'تحسين التواجد الرقمي',
        'سهولة الوصول للمعلومات',
        'بناء الثقة مع العملاء'
      ]
    },
    {
      id: 'feedback-qr',
      title: 'رمز QR للملاحظات',
      description: 'أنشئ رموز QR للملاحظات بسرعة مع تصميمات احترافية. احصل على مزيد من المراجعات، قم بتبسيط عملية الملاحظات، واعمل على تحقيق سمعة أفضل على الإنترنت.',
      icon: MessageSquare,
      category: 'forms',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      features: [
        'نماذج ملاحظات مخصصة',
        'تقييم بالنجوم والتعليقات',
        'تحليل المشاعر والاتجاهات',
        'ردود تلقائية للعملاء',
        'تصدير التقييمات والمراجعات'
      ],
      useCases: [
        'المطاعم وخدمات الضيافة',
        'المتاجر والخدمات',
        'الفعاليات والمؤتمرات',
        'الخدمات الطبية والتعليمية'
      ],
      benefits: [
        'تحسين جودة الخدمة',
        'زيادة المراجعات الإيجابية',
        'فهم أفضل لرضا العملاء',
        'تحسين السمعة الرقمية'
      ]
    },
    {
      id: 'social-media',
      title: 'وسائل التواصل الاجتماعي',
      description: 'يستخدم من قبل بعض العلامات التجارية الأولى في العالم. أنشئ صفحة هبوط مثالية لوسائل التواصل الاجتماعي الخاصة بك. حوّل زوارك غير المتصلين إلى معجبين ومتابعين.',
      icon: Users,
      category: 'social',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      features: [
        'صفحة هبوط متعددة المنصات',
        'تكامل مع جميع الشبكات الاجتماعية',
        'أزرار متابعة ومشاركة',
        'عداد المتابعين المباشر',
        'تحليلات النمو والتفاعل'
      ],
      useCases: [
        'المؤثرين ومنشئي المحتوى',
        'الشركات والعلامات التجارية',
        'الفنانين والمشاهير',
        'المسوقين الرقميين'
      ],
      benefits: [
        'زيادة المتابعين بسرعة',
        'تحسين معدل التفاعل',
        'بناء مجتمع رقمي قوي',
        'توحيد الحضور عبر المنصات'
      ]
    },
    {
      id: 'google-forms',
      title: 'نماذج جوجل',
      description: 'اصنع رموز QR لنماذج جوجل لجمع استجابات المستهلكين من العالم غير المتصل. تحليلات وإدارة كاملة في متناول يديك.',
      icon: FormInput,
      category: 'forms',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      features: [
        'ربط مباشر بنماذج جوجل',
        'جمع البيانات بسهولة',
        'تحليل الاستجابات في الوقت الفعلي',
        'تصدير النتائج لاكسل',
        'مشاركة سهلة للنماذج'
      ],
      useCases: [
        'استطلاعات الرأي',
        'تسجيل الفعاليات',
        'جمع البيانات التسويقية',
        'نماذج التقييم'
      ],
      benefits: [
        'سهولة الوصول للنماذج',
        'زيادة معدل الاستجابة',
        'تنظيم أفضل للبيانات',
        'توفير الوقت والجهد'
      ]
    },
    {
      id: 'facebook',
      title: 'فيسبوك',
      description: 'قم بإنشاء رموز QR جميلة لصفحات الهبوط لأعمال فيسبوك الخاصة بك، واحصل على المزيد من الزيارات والإعجابات! يحول زوارك غير المتصلين إلى متابعين عبر الإنترنت.',
      icon: Facebook,
      category: 'social',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'صفحة هبوط مخصصة لفيسبوك',
        'زر إعجاب ومتابعة مدمج',
        'عرض آخر المنشورات',
        'إحصائيات الصفحة والتفاعل',
        'دعوة الأصدقاء للإعجاب'
      ],
      useCases: [
        'الشركات المحلية',
        'صفحات الأعمال',
        'الفعاليات والمجتمعات',
        'المؤثرين والشخصيات العامة'
      ],
      benefits: [
        'زيادة معجبي الصفحة',
        'تحسين الوصول العضوي',
        'بناء مجتمع متفاعل',
        'زيادة الوعي بالعلامة التجارية'
      ]
    },
    {
      id: 'google-maps',
      title: 'خرائط جوجل',
      description: 'اصنع رموز QR لخرائط جوجل لتوجيه المستهلكين إلى موقعك بسهولة. مكّنهم من تقييمك لجعلك مشهوراً في مجتمعك المحلي.',
      icon: MapPin,
      category: 'business',
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      features: [
        'موقع دقيق على الخريطة',
        'تعليمات الوصول التفصيلية',
        'معلومات العمل الأساسية',
        'رابط للتقييم على جوجل',
        'تكامل مع تطبيقات الخرائط'
      ],
      useCases: [
        'المتاجر والمطاعم',
        'المكاتب والعيادات',
        'الفعاليات والمناسبات',
        'مواقع الخدمات'
      ],
      benefits: [
        'وصول أسهل للعملاء',
        'زيادة الزيارات المحلية',
        'تحسين تقييمات جوجل',
        'تقليل الاتصالات للاستفسار عن الموقع'
      ]
    },
    {
      id: 'vcard',
      title: 'vCard',
      description: 'أنشئ رمز QR لـ vCard للسماح للآخرين بالمسح البسيط وإضافتك إلى دفتر الاتصال في الهاتف. اختر النوع الديناميكي إذا كنت بحاجة إلى التحليلات.',
      icon: Phone,
      category: 'business',
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600',
      features: [
        'معلومات اتصال شاملة',
        'إضافة فورية لدفتر الأسماء',
        'صورة شخصية وشعار',
        'روابط الشبكات الاجتماعية',
        'معلومات الشركة والمنصب'
      ],
      useCases: [
        'رجال الأعمال والمدراء',
        'فرق المبيعات',
        'المهنيين والاستشاريين',
        'موظفي خدمة العملاء'
      ],
      benefits: [
        'تبادل سريع للمعلومات',
        'تقليل الأخطاء في النقل',
        'احتراف في التعامل',
        'سهولة المتابعة والتواصل'
      ]
    },
    {
      id: 'app-download',
      title: 'تحميل التطبيق',
      description: 'زيد تحميلات تطبيقك مع صفحة تطبيق QR الحاصلة على أفضل التقييمات. تستخدمها بعض أفضل شركات الـ Fortune 100. تأتي مع تحليلات وتخصيص عميق.',
      icon: Download,
      category: 'media',
      color: 'cyan',
      gradient: 'from-cyan-500 to-cyan-600',
      features: [
        'صفحة هبوط مخصصة للتطبيق',
        'روابط تحميل متعددة المنصات',
        'عرض تقييمات ومراجعات',
        'لقطات شاشة وفيديوهات',
        'تتبع التحميلات والتثبيت'
      ],
      useCases: [
        'مطوري التطبيقات',
        'شركات التكنولوجيا',
        'حملات التسويق للتطبيقات',
        'منصات الألعاب'
      ],
      benefits: [
        'زيادة معدل التحميل بنسبة 50%',
        'تحسين معدل التحويل',
        'تتبع فعالية الحملات',
        'وصول أوسع للجمهور'
      ]
    },
    {
      id: 'image-gallery',
      title: 'معرض الصور',
      description: 'أنشئ مجموعة التصوير الفوتوغرافي أو الصور الخاصة بك مع رمز QR للصورة هذا. اجعل من السهل على العملاء المحتملين رؤية معرض أعمالك بمسح بسيط.',
      icon: ImageIcon,
      category: 'media',
      color: 'pink',
      gradient: 'from-pink-500 to-pink-600',
      features: [
        'معرض صور عالي الجودة',
        'تنظيم بالفئات والألبومات',
        'عرض شرائح تفاعلي',
        'إمكانية التحميل والمشاركة',
        'حماية بكلمة مرور اختيارية'
      ],
      useCases: [
        'المصورين والفنانين',
        'مصممي الجرافيك',
        'شركات التصميم',
        'معارض الفن'
      ],
      benefits: [
        'عرض احترافي للأعمال',
        'سهولة مشاركة المحفظة',
        'تحسين فرص الحصول على عملاء',
        'بناء سمعة مهنية قوية'
      ]
    }
  ];
 const filteredSolutions = selectedCategory === 'all' 
    ? solutions 
    : solutions.filter(solution => solution.category === selectedCategory);

  // تعديل دالة التعامل مع الكليك لتحويل للصفحة الجديدة
  const handleSolutionClick = (solution: Solution) => {
    // التحويل لصفحة إنشاء الحل
    navigate(`/solutions/${solution.id}/create`);
  };

  // إضافة دالة لفتح المودال (للتفاصيل فقط)
  const handleSolutionDetails = (solution: Solution) => {
    setSelectedSolution(solution);
    setShowModal(true);
  };

  const stats = [
    { label: 'حل متكامل', value: '40+', icon: Target },
    { label: 'عميل راضٍ', value: '100K+', icon: Users },
    { label: 'معدل الرضا', value: '99%', icon: Star },
    { label: 'نمو سنوي', value: '500%', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
          حلول <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">QR ذكية</span>
          <br />
          لكل احتياجاتك الرقمية
        </h1>
        
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          اكتشف مجموعة شاملة من حلول رموز QR المتقدمة لتحويل أعمالك وحياتك الشخصية إلى تجربة رقمية استثنائية ومتطورة
        </p>
      </div>


      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "px-6 py-3 rounded-full font-medium transition-all duration-200",
              selectedCategory === category.id
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            )}
          >
            {category.name}
            <span className="mr-2 text-xs opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSolutions.map((solution) => (
          <SolutionCard
            key={solution.id}
            solution={solution}
            onClick={() => handleSolutionClick(solution)} // التحويل لصفحة الإنشاء
            onDetails={() => handleSolutionDetails(solution)} // فتح المودال للتفاصيل
          />
        ))}
      </div>

      {/* Solution Modal */}
      {showModal && selectedSolution && (
        <SolutionModal
          solution={selectedSolution}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Solutions;
