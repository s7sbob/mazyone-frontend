import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign,
  Building,
  Users,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Send,
  Bookmark,
  ExternalLink,
  X,
  Briefcase
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Job } from '../types';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const Jobs = () => {
  const { user } = useStore();
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'مطور React Frontend محترف',
      company: 'شركة التقنية الحديثة',
      location: 'الرياض، السعودية',
      type: 'full-time',
      description: 'نبحث عن مطور React محترف للانضمام لفريقنا المتنامي وتطوير تطبيقات ويب حديثة ومبتكرة.',
      requirements: [
        'خبرة 3+ سنوات في React وTypeScript',
        'معرفة قوية بـ Redux أو Zustand',
        'خبرة في Git وأدوات CI/CD',
        'فهم عميق لمبادئ UX/UI',
        'إجادة اللغة الإنجليزية'
      ],
      responsibilities: [
        'تطوير واجهات مستخدم تفاعلية',
        'التعاون مع فريق التصميم والباك إند',
        'كتابة كود نظيف وقابل للصيانة',
        'إجراء مراجعات الكود',
        'تحسين أداء التطبيقات'
      ],
      salary: {
        min: 8000,
        max: 15000,
        currency: 'SAR'
      },
      benefits: [
        'تأمين صحي شامل',
        'إجازة سنوية مدفوعة',
        'فرص تطوير مهني',
        'بيئة عمل مرنة'
      ],
      status: 'open',
      postedBy: '1',
      createdAt: '2024-07-01T09:00:00Z',
      updatedAt: '2024-07-08T12:00:00Z',
      applications: [],
      tags: ['react', 'frontend', 'typescript', 'remote-friendly'],
      expiresAt: '2024-08-01T23:59:59Z'
    },
    {
      id: '2',
      title: 'مصمم UI/UX إبداعي',
      company: 'استوديو الإبداع الرقمي',
      location: 'جدة، السعودية',
      type: 'part-time',
      description: 'مطلوب مصمم واجهات مستخدم مبدع لتصميم تجارب رقمية استثنائية.',
      requirements: [
        'خبرة في Figma وAdobe XD',
        'معرفة بمبادئ UX Research',
        'portfolio قوي ومتنوع',
        'فهم للتصميم المتجاوب',
        'مهارات تواصل ممتازة'
      ],
      responsibilities: [
        'تصميم واجهات مستخدم جذابة',
        'إجراء بحوث المستخدمين',
        'إنشاء النماذج الأولية',
        'التعاون مع فريق التطوير'
      ],
      salary: {
        min: 4000,
        max: 8000,
        currency: 'SAR'
      },
      status: 'open',
      postedBy: '1',
      createdAt: '2024-06-25T11:00:00Z',
      updatedAt: '2024-07-05T16:30:00Z',
      applications: [],
      tags: ['design', 'ui', 'ux', 'figma', 'part-time']
    },
    {
      id: '3',
      title: 'مطور Full Stack (Node.js + React)',
      company: 'شركة الحلول التقنية المتكاملة',
      location: 'الدمام، السعودية',
      type: 'full-time',
      description: 'فرصة ممتازة للمطورين الشاملين للعمل على مشاريع متنوعة ومثيرة.',
      requirements: [
        'خبرة 4+ سنوات في Node.js و React',
        'معرفة بقواعد البيانات (MongoDB, PostgreSQL)',
        'خبرة في AWS أو Azure',
        'فهم لمبادئ الأمان السيبراني',
        'خبرة في Docker وKubernetes'
      ],
      responsibilities: [
        'تطوير APIs متكاملة',
        'بناء واجهات مستخدم حديثة',
        'إدارة قواعد البيانات',
        'تطبيق أفضل ممارسات الأمان'
      ],
      salary: {
        min: 12000,
        max: 20000,
        currency: 'SAR'
      },
      status: 'closed',
      postedBy: '1',
      createdAt: '2024-06-30T08:00:00Z',
      updatedAt: '2024-07-07T14:15:00Z',
      applications: [],
      tags: ['fullstack', 'nodejs', 'react', 'aws', 'senior']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getJobTypeText = (type: string) => {
    switch (type) {
      case 'full-time': return 'دوام كامل';
      case 'part-time': return 'دوام جزئي';
      case 'contract': return 'تعاقد';
      case 'internship': return 'تدريب';
      case 'remote': return 'عن بُعد';
      default: return type;
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'contract': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'internship': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'remote': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleApplyJob = (jobId: string) => {
    toast.success('تم إرسال طلب التقديم بنجاح!');
    setShowJobModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            الوظائف المتاحة
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            اكتشف الفرص الوظيفية المناسبة لك ({filteredJobs.length} وظيفة)
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <button className="btn-primary flex items-center space-x-2 space-x-reverse">
            <Plus className="w-4 h-4" />
            <span>إضافة وظيفة جديدة</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="البحث في الوظائف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pr-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field w-full sm:w-auto"
          >
            <option value="all">جميع الأنواع</option>
            <option value="full-time">دوام كامل</option>
            <option value="part-time">دوام جزئي</option>
            <option value="contract">تعاقد</option>
            <option value="internship">تدريب</option>
            <option value="remote">عن بُعد</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-full sm:w-auto"
          >
            <option value="all">جميع الحالات</option>
            <option value="open">مفتوحة</option>
            <option value="closed">مغلقة</option>
            <option value="draft">مسودة</option>
            <option value="paused">متوقفة</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            لا توجد وظائف متاحة
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            جرب تغيير معايير البحث أو تحقق لاحقاً
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleJobClick(job)}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 hover:text-primary-500">
                        {job.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 flex items-center space-x-2 space-x-reverse">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className={cn("px-2 py-1 text-xs rounded-full", getJobTypeColor(job.type))}>
                        {getJobTypeText(job.type)}
                      </span>
                      <span className={cn("px-2 py-1 text-xs rounded-full", getStatusColor(job.status))}>
                        {job.status === 'open' && 'مفتوحة'}
                        {job.status === 'closed' && 'مغلقة'}
                        {job.status === 'draft' && 'مسودة'}
                        {job.status === 'paused' && 'متوقفة'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(job.createdAt).toLocaleDateString('ar-SA')}</span>
                    </div>
                    {job.applications && (
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Users className="w-4 h-4" />
                        <span>{job.applications.length} متقدم</span>
                      </div>
                    )}
                  </div>

                  <p className="text-neutral-700 dark:text-neutral-300 line-clamp-2 mb-3">
                    {job.description}
                  </p>

                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                          +{job.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 space-x-reverse lg:flex-col lg:space-x-0 lg:space-y-2">
                  {job.status === 'open' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyJob(job.id);
                      }}
                      className="btn-primary flex items-center space-x-2 space-x-reverse"
                    >
                      <Send className="w-4 h-4" />
                      <span>تقدم الآن</span>
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success('تم حفظ الوظيفة');
                    }}
                    className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedJob.title}
                </h3>
                <button
                  onClick={() => setShowJobModal(false)}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Job Info */}
                <div>
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <Building className="w-5 h-5 text-neutral-400" />
                    <span className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                      {selectedJob.company}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="w-4 h-4" />
                      <span>{getJobTypeText(selectedJob.type)}</span>
                    </div>
                    {selectedJob.salary && (
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <DollarSign className="w-4 h-4" />
                        <span>{selectedJob.salary.min.toLocaleString()} - {selectedJob.salary.max.toLocaleString()} {selectedJob.salary.currency}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>نُشر في {new Date(selectedJob.createdAt).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    وصف الوظيفة
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      المتطلبات
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 dark:text-neutral-300">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities */}
                {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      المسؤوليات
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 dark:text-neutral-300">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      المزايا
                    </h4>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700 dark:text-neutral-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {selectedJob.tags && selectedJob.tags.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      المهارات المطلوبة
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  {selectedJob.status === 'open' ? (
                    <>
                      <button
                        onClick={() => handleApplyJob(selectedJob.id)}
                        className="btn-primary flex items-center justify-center space-x-2 space-x-reverse flex-1"
                      >
                        <Send className="w-4 h-4" />
                        <span>تقدم للوظيفة الآن</span>
                      </button>
                      <button
                        onClick={() => {
                          toast.success('تم حفظ الوظيفة');
                          setShowJobModal(false);
                        }}
                        className="btn-secondary flex items-center justify-center space-x-2 space-x-reverse"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>حفظ</span>
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        هذه الوظيفة غير متاحة للتقديم حالياً
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
