import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  Building,
  Tag,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  Grid,
  List,
  FileText,
  MessageCircle,
  X
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Contact } from '../types';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const Contacts = () => {
  const { contacts, deleteContact } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm);
    
    const matchesSource = filterSource === 'all' || contact.source === filterSource;
    const matchesTag = filterTag === 'all' || contact.tags.includes(filterTag);
    
    return matchesSearch && matchesSource && matchesTag;
  });

  const allTags = Array.from(new Set(contacts.flatMap(contact => contact.tags)));

  const handleDeleteContact = (contactId: string) => {
    if (window.confirm('هل أنت متأكد من حذف جهة الاتصال هذه؟')) {
      deleteContact(contactId);
      toast.success('تم حذف جهة الاتصال بنجاح');
    }
  };

  const handleBulkDelete = () => {
    if (selectedContacts.length === 0) return;
    
    if (window.confirm(`هل أنت متأكد من حذف ${selectedContacts.length} جهة اتصال؟`)) {
      selectedContacts.forEach(id => deleteContact(id));
      setSelectedContacts([]);
      toast.success('تم حذف جهات الاتصال المحددة');
    }
  };

  const handleExportContacts = () => {
    const csvContent = [
      ['الاسم', 'البريد الإلكتروني', 'الهاتف', 'الشركة', 'المنصب', 'المصدر', 'التاغات', 'تاريخ الإضافة'],
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email || '',
        contact.phone || '',
        contact.company || '',
        contact.position || '',
        contact.source,
        contact.tags.join(', '),
        new Date(contact.createdAt).toLocaleDateString('ar-SA')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success('تم تصدير جهات الاتصال بنجاح');
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllContacts = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id));
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'card': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'qr': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'nfc': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'manual': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'import': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'scan': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400';
      default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/20 dark:text-neutral-400';
    }
  };

  const getSourceText = (source: string) => {
    switch (source) {
      case 'card': return 'من البطاقة';
      case 'qr': return 'من QR';
      case 'nfc': return 'من NFC';
      case 'manual': return 'يدوي';
      case 'import': return 'مستورد';
      case 'scan': return 'مسح ضوئي';
      default: return source;
    }
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            جهات الاتصال
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            إدارة جميع جهات الاتصال المحفوظة ({filteredContacts.length} من {contacts.length})
          </p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
            <Upload className="w-4 h-4" />
            <span>استيراد</span>
          </button>
          <button 
            onClick={handleExportContacts}
            className="btn-secondary flex items-center space-x-2 space-x-reverse"
          >
            <Download className="w-4 h-4" />
            <span>تصدير</span>
          </button>
          <button className="btn-primary flex items-center space-x-2 space-x-reverse">
            <Plus className="w-4 h-4" />
            <span>إضافة جهة اتصال</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="البحث في جهات الاتصال..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pr-10"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="input-field w-full sm:w-auto"
          >
            <option value="all">جميع المصادر</option>
            <option value="card">من البطاقة</option>
            <option value="qr">من QR</option>
            <option value="nfc">من NFC</option>
            <option value="manual">يدوي</option>
            <option value="import">مستورد</option>
            <option value="scan">مسح ضوئي</option>
          </select>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="input-field w-full sm:w-auto"
          >
            <option value="all">جميع التاغات</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'grid' 
                  ? "bg-primary-500 text-white" 
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'list' 
                  ? "bg-primary-500 text-white" 
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-primary-700 dark:text-primary-300">
              تم تحديد {selectedContacts.length} جهة اتصال
            </span>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={handleBulkDelete}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
              >
                حذف المحدد
              </button>
              <button
                onClick={() => setSelectedContacts([])}
                className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 px-3 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                إلغاء التحديد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Display */}
      {filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
            {searchTerm || filterSource !== 'all' || filterTag !== 'all' 
              ? 'لا توجد نتائج مطابقة' 
              : 'لا توجد جهات اتصال'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {searchTerm || filterSource !== 'all' || filterTag !== 'all'
              ? 'جرب تغيير معايير البحث أو الفلترة'
              : 'ابدأ بإضافة جهات اتصال أو استيرادها من ملف'}
          </p>
          <button className="btn-primary inline-flex items-center space-x-2 space-x-reverse">
            <Plus className="w-4 h-4" />
            <span>إضافة جهة اتصال جديدة</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="card group hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse flex-1">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleContactSelection(contact.id)}
                    className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <div 
                    className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => handleContactClick(contact)}
                  >
                    {contact.avatar ? (
                      <img 
                        src={contact.avatar} 
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold">
                        {contact.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-neutral-900 dark:text-neutral-100 truncate cursor-pointer hover:text-primary-500"
                      onClick={() => handleContactClick(contact)}
                    >
                      {contact.name}
                    </h3>
                    {contact.position && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                        {contact.position}
                      </p>
                    )}
                    {contact.company && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate">
                        {contact.company}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <button className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <MoreVertical className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {contact.email && (
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400 truncate">
                      {contact.email}
                    </span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Phone className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {contact.phone}
                    </span>
                  </div>
                )}
                {contact.company && !contact.position && (
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Building className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400 truncate">
                      {contact.company}
                    </span>
                  </div>
                )}
              </div>
              
              {contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {contact.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {contact.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                      +{contact.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                <span className={cn("px-2 py-1 rounded-full text-xs", getSourceBadgeColor(contact.source))}>
                  {getSourceText(contact.source)}
                </span>
                <span>{new Date(contact.createdAt).toLocaleDateString('ar-SA')}</span>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  onClick={() => handleContactClick(contact)}
                  className="flex-1 bg-primary-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  عرض
                </button>
                <button className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <Edit className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <MessageCircle className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <button 
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 bg-red-100 dark:bg-red-900 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onChange={selectAllContacts}
                      className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الاسم
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    البريد الإلكتروني
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الهاتف
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الشركة
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    المصدر
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    التاغات
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                        className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                          {contact.avatar ? (
                            <img 
                              src={contact.avatar} 
                              alt={contact.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-xs font-bold">
                              {contact.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div 
                            className="text-sm font-medium text-neutral-900 dark:text-neutral-100 cursor-pointer hover:text-primary-500"
                            onClick={() => handleContactClick(contact)}
                          >
                            {contact.name}
                          </div>
                          {contact.position && (
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              {contact.position}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {contact.email || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {contact.phone || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {contact.company || '-'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={cn("px-2 py-1 text-xs rounded-full", getSourceBadgeColor(contact.source))}>
                        {getSourceText(contact.source)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {contact.tags.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                            +{contact.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button 
                          onClick={() => handleContactClick(contact)}
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                تفاصيل جهة الاتصال
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Avatar and Name */}
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  {selectedContact.avatar ? (
                    <img 
                      src={selectedContact.avatar} 
                      alt={selectedContact.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {selectedContact.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {selectedContact.name}
                </h4>
                {selectedContact.position && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {selectedContact.position}
                  </p>
                )}
                {selectedContact.company && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {selectedContact.company}
                  </p>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                {selectedContact.email && (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {selectedContact.email}
                    </span>
                  </div>
                )}
                {selectedContact.phone && (
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {selectedContact.phone}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {selectedContact.tags.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    التاغات
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedContact.notes && (
                <div>
                  <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    ملاحظات
                  </h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                    {selectedContact.notes}
                  </p>
                </div>
              )}

              {/* Source and Date */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">المصدر:</span>
                  <span className={cn("px-2 py-1 rounded-full text-xs", getSourceBadgeColor(selectedContact.source))}>
                    {getSourceText(selectedContact.source)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-neutral-500 dark:text-neutral-400">تاريخ الإضافة:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    {new Date(selectedContact.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                {selectedContact.interactionCount > 0 && (
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-neutral-500 dark:text-neutral-400">عدد التفاعلات:</span>
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {selectedContact.interactionCount}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 space-x-reverse pt-4">
                <button className="flex-1 btn-primary">
                  تعديل
                </button>
                <button className="flex-1 btn-secondary">
                  مراسلة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
