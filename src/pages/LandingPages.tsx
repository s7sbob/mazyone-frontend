import React, { useState } from 'react';
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Share2,
  Globe,
  BarChart3,
  Settings,
  Copy,
  ExternalLink,
  FileText,
  Image,
  Video,
  MapPin
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockLandingPages } from '../utils/mockData';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const LandingPages = () => {
  const { user } = useStore();
  const [landingPages] = useState(mockLandingPages);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const handleCreatePage = () => {
    setShowCreateModal(true);
  };

  const handleDeletePage = (pageId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      toast.success('تم حذف الصفحة بنجاح');
    }
  };

  const handleCopyLink = (slug: string) => {
    const link = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(link);
    toast.success('تم نسخ الرابط بنجاح!');
  };

  const getStatusColor = (isPublished: boolean) => {
    return isPublished 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            صفحات الهبوط
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            أنشئ صفحات هبوط احترافية لبطاقاتك وخدماتك
          </p>
        </div>
        
        <button 
          onClick={handleCreatePage}
          className="btn-primary flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء صفحة جديدة</span>
        </button>
      </div>

      {/* Landing Pages Grid */}
      {landingPages.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            لا توجد صفحات هبوط حتى الآن
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            ابدأ بإنشاء صفحة هبوط احترافية لعرض خدماتك
          </p>
          <button 
            onClick={handleCreatePage}
            className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء صفحة جديدة</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landingPages.map((page) => (
            <div key={page.id} className="card group hover:shadow-lg transition-shadow">
              {/* Page Preview */}
              <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-neutral-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className={cn("px-2 py-1 text-xs rounded-full", getStatusColor(page.isPublished))}>
                    {page.isPublished ? 'منشورة' : 'مسودة'}
                  </span>
                </div>
              </div>

              {/* Page Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {page.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                    /{page.slug}
                  </p>
                </div>

                {/* Analytics */}
                <div className="flex items-center space-x-4 space-x-reverse text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Eye className="w-4 h-4" />
                    <span>{page.analytics.views}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <BarChart3 className="w-4 h-4" />
                    <span>{page.analytics.clicks}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button 
                    onClick={() => window.open(`/${page.slug}`, '_blank')}
                    className="flex-1 bg-primary-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
                  >
                    <Eye className="w-4 h-4" />
                    <span>معاينة</span>
                  </button>
                  
                  <button className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                    <Edit className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                  
                  <button 
                    onClick={() => handleCopyLink(page.slug)}
                    className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                  
                  <button 
                    onClick={() => handleDeletePage(page.id)}
                    className="p-2 bg-red-100 dark:bg-red-900 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Page Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              إنشاء صفحة هبوط جديدة
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  عنوان الصفحة
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="أدخل عنوان الصفحة"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  الرابط المخصص
                </label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    mazyone.com/
                  </span>
                  <input
                    type="text"
                    className="input-field flex-1"
                    placeholder="my-page"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  القالب
                </label>
                <select className="input-field">
                  <option>قالب احترافي</option>
                  <option>قالب إبداعي</option>
                  <option>قالب بسيط</option>
                  <option>قالب شخصي</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  toast.success('تم إنشاء الصفحة بنجاح!');
                }}
                className="flex-1 btn-primary"
              >
                إنشاء الصفحة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPages;
