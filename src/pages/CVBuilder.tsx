import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Code,
  Save
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockCV } from '../utils/mockData';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const CVBuilder = () => {
  const { user } = useStore();
  const [cvs] = useState([mockCV]);
  const [selectedCV, setSelectedCV] = useState(mockCV);
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', name: 'المعلومات الشخصية', icon: User },
    { id: 'summary', name: 'الملخص المهني', icon: FileText },
    { id: 'experience', name: 'الخبرات العملية', icon: Briefcase },
    { id: 'education', name: 'التعليم', icon: GraduationCap },
    { id: 'skills', name: 'المهارات', icon: Code },
    { id: 'languages', name: 'اللغات', icon: Languages },
    { id: 'certifications', name: 'الشهادات', icon: Award },
  ];

  const handleDownloadPDF = () => {
    toast.success('جاري تحضير ملف PDF...');
    // هنا سيتم تطبيق تحويل السيرة إلى PDF
  };

  const handlePreview = () => {
    toast('فتح معاينة السيرة الذاتية', {
  icon: 'ℹ️',
  style: {
    background: '#3B82F6',
    color: '#FFFFFF',
  },
}); 
    // هنا سيتم فتح معاينة في نافذة جديدة
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            منشئ السيرة الذاتية
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            أنشئ سيرة ذاتية احترافية بتصاميم حديثة
          </p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={handlePreview}
            className="btn-secondary flex items-center space-x-2 space-x-reverse"
          >
            <Eye className="w-4 h-4" />
            <span>معاينة</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="btn-secondary flex items-center space-x-2 space-x-reverse"
          >
            <Download className="w-4 h-4" />
            <span>تحميل PDF</span>
          </button>
          <button className="btn-primary flex items-center space-x-2 space-x-reverse">
            <Plus className="w-4 h-4" />
            <span>سيرة جديدة</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              أقسام السيرة الذاتية
            </h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeSection === section.id
                      ? "bg-primary-500 text-white"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* CV List */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              سيرتي الذاتية
            </h3>
            <div className="space-y-3">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-colors",
                    selectedCV?.id === cv.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                  )}
                  onClick={() => setSelectedCV(cv)}
                >
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                    {cv.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    آخر تحديث: {new Date(cv.updatedAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {activeSection === 'personal' && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  المعلومات الشخصية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCV?.personalInfo.firstName}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCV?.personalInfo.lastName}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedCV?.personalInfo.email}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedCV?.personalInfo.phone}
                      className="input-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      العنوان
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCV?.personalInfo.address}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'summary' && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  الملخص المهني
                </h3>
                <textarea
                  rows={6}
                  defaultValue={selectedCV?.summary}
                  className="input-field"
                  placeholder="اكتب ملخصاً مهنياً يبرز خبراتك ومهاراتك..."
                />
              </div>
            )}

            {activeSection === 'experience' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    الخبرات العملية
                  </h3>
                  <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
                    <Plus className="w-4 h-4" />
                    <span>إضافة خبرة</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {selectedCV?.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            المسمى الوظيفي
                          </label>
                          <input
                            type="text"
                            defaultValue={exp.position}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            اسم الشركة
                          </label>
                          <input
                            type="text"
                            defaultValue={exp.company}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            تاريخ البداية
                          </label>
                          <input
                            type="date"
                            defaultValue={exp.startDate}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            تاريخ النهاية
                          </label>
                          <input
                            type="date"
                            defaultValue={exp.endDate}
                            className="input-field"
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="flex items-center space-x-2 space-x-reverse">
                          <input
                            type="checkbox"
                            defaultChecked={exp.current}
                            className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            أعمل حالياً في هذا المنصب
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          وصف المهام والإنجازات
                        </label>
                        <textarea
                          rows={3}
                          defaultValue={exp.description}
                          className="input-field"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    المهارات
                  </h3>
                  <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
                    <Plus className="w-4 h-4" />
                    <span>إضافة مهارة</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCV?.skills.map((skill, index) => (
                    <div key={skill.id} className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <input
                          type="text"
                          defaultValue={skill.name}
                          className="input-field flex-1 mr-2"
                          placeholder="اسم المهارة"
                        />
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          مستوى الإتقان
                        </label>
                        <select
                          defaultValue={skill.level}
                          className="input-field"
                        >
                          <option value="beginner">مبتدئ</option>
                          <option value="intermediate">متوسط</option>
                          <option value="advanced">متقدم</option>
                          <option value="expert">خبير</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => toast.success('تم حفظ التغييرات')}
                className="btn-primary flex items-center space-x-2 space-x-reverse"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التغييرات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
