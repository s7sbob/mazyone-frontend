import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Share2, 
  Edit, 
  Trash2,
  QrCode,
  MoreVertical,
  Grid,
  List,
  Copy,
  ExternalLink,
  TrendingUp,
  Users,
  Calendar,
  Star
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

const Cards = () => {
  const { cards, deleteCard } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'views' | 'created'>('created');

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && card.isActive) ||
                         (filterStatus === 'inactive' && !card.isActive);
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'views':
        return b.views - a.views;
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const handleDeleteCard = (cardId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه البطاقة؟ سيتم حذف جميع البيانات المرتبطة بها.')) {
      deleteCard(cardId);
      toast.success('تم حذف البطاقة بنجاح');
    }
  };

  const handleCopyLink = (cardId: string) => {
    const link = `${window.location.origin}/card/${cardId}`;
    navigator.clipboard.writeText(link);
    toast.success('تم نسخ رابط البطاقة بنجاح!');
  };

  const handleShareCard = async (card: any) => {
    const shareData = {
      title: `بطاقة ${card.name}`,
      text: `تعرف على ${card.name} - ${card.title}`,
      url: `${window.location.origin}/card/${card.id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        handleCopyLink(card.id);
      }
    } else {
      handleCopyLink(card.id);
    }
  };

  const totalViews = cards.reduce((sum, card) => sum + card.views, 0);
  const totalShares = cards.reduce((sum, card) => sum + card.shares, 0);
  const activeCards = cards.filter(card => card.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            بطاقاتي الرقمية
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            إدارة وتتبع جميع بطاقاتك الرقمية في مكان واحد
          </p>
        </div>
        
        <Link 
          to="/cards/new"
          className="btn-primary flex items-center space-x-2 space-x-reverse shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span>إنشاء بطاقة جديدة</span>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Grid className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">إجمالي البطاقات</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cards.length}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">إجمالي المشاهدات</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">إجمالي المشاركات</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{totalShares.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400">البطاقات النشطة</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{activeCards}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="البحث في البطاقات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pr-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="input-field w-full sm:w-auto"
            >
              <option value="all">جميع البطاقات</option>
              <option value="active">نشطة</option>
              <option value="inactive">غير نشطة</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field w-full sm:w-auto"
            >
              <option value="created">الأحدث</option>
              <option value="name">الاسم</option>
              <option value="views">الأكثر مشاهدة</option>
            </select>

            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === 'grid' 
                    ? "bg-blue-500 text-white" 
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
                    ? "bg-blue-500 text-white" 
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Display */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-12 h-12 text-neutral-400" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            {searchTerm || filterStatus !== 'all' ? 'لا توجد نتائج مطابقة' : 'لا توجد بطاقات حتى الآن'}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'جرب تغيير معايير البحث أو الفلترة للعثور على البطاقات التي تبحث عنها'
              : 'ابدأ رحلتك الرقمية بإنشاء بطاقتك الأولى الآن'}
          </p>
          <Link 
            to="/cards/new"
            className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
          >
            <Plus className="w-5 h-5" />
            <span>إنشاء بطاقة جديدة</span>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div key={card.id} className="card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse flex-1">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: card.colors.primary }}
                  >
                    {card.avatar ? (
                      <img 
                        src={card.avatar} 
                        alt={card.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {card.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 truncate text-lg">
                      {card.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 truncate">
                      {card.title}
                    </p>
                    {card.company && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-500 truncate">
                        {card.company}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    card.isActive ? "bg-green-500" : "bg-neutral-400"
                  )} />
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {card.isActive ? 'نشطة' : 'غير نشطة'}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 space-x-reverse text-blue-500 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="font-bold">{card.views}</span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">مشاهدة</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 space-x-reverse text-green-500 mb-1">
                    <Share2 className="w-4 h-4" />
                    <span className="font-bold">{card.shares}</span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">مشاركة</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 space-x-reverse text-purple-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="font-bold">{card.clicks}</span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">نقرة</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link
                  to={`/cards/${card.id}`}
                  className="flex-1 bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors text-center"
                >
                  عرض البطاقة
                </Link>
                
                <button
                  onClick={() => handleShareCard(card)}
                  className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  title="مشاركة"
                >
                  <Share2 className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                
                <Link
                  to={`/cards/${card.id}/edit`}
                  className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  title="تعديل"
                >
                  <Edit className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </Link>
                
                <button 
                  onClick={() => handleDeleteCard(card.id)}
                  className="p-2.5 bg-red-100 dark:bg-red-900 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>

              {/* Created Date */}
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span>تم الإنشاء: {new Date(card.createdAt).toLocaleDateString('ar-SA')}</span>
                  <span>آخر تحديث: {new Date(card.updatedAt).toLocaleDateString('ar-SA')}</span>
                </div>
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
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    البطاقة
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الشركة
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    المشاهدات
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    المشاركات
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700">
                {filteredCards.map((card) => (
                  <tr key={card.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: card.colors.primary }}
                        >
                          {card.avatar ? (
                            <img 
                              src={card.avatar} 
                              alt={card.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {card.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {card.name}
                          </div>
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            {card.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-100">
                      {card.company || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 space-x-reverse text-blue-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">{card.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 space-x-reverse text-green-500">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm font-medium">{card.shares}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full",
                        card.isActive 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                      )}>
                        {card.isActive ? 'نشطة' : 'غير نشطة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Link
                          to={`/cards/${card.id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleShareCard(card)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/cards/${card.id}/edit`}
                          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteCard(card.id)}
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
    </div>
  );
};

export default Cards;
