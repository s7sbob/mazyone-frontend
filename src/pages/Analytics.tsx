import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Share2, 
  Users, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Globe
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockAnalytics } from '../utils/mockData';
import { cn } from '../utils/cn';

const Analytics = () => {
  const { cards } = useStore();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCard, setSelectedCard] = useState('all');

  const timeRanges = [
    { value: '7d', label: 'آخر 7 أيام' },
    { value: '30d', label: 'آخر 30 يوم' },
    { value: '90d', label: 'آخر 3 أشهر' },
    { value: '1y', label: 'آخر سنة' }
  ];

  const stats = [
    {
      name: 'إجمالي المشاهدات',
      value: mockAnalytics.cardViews.reduce((sum, item) => sum + item.value, 0),
      change: '+12.5%',
      changeType: 'positive',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      name: 'إجمالي المشاركات',
      value: mockAnalytics.cardShares.reduce((sum, item) => sum + item.value, 0),
      change: '+8.2%',
      changeType: 'positive',
      icon: Share2,
      color: 'bg-green-500'
    },
    {
      name: 'مسح QR',
      value: mockAnalytics.qrScans.reduce((sum, item) => sum + item.value, 0),
      change: '+15.3%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      name: 'جهات اتصال جديدة',
      value: mockAnalytics.contactAdds.reduce((sum, item) => sum + item.value, 0),
      change: '+5.7%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            التحليلات والإحصائيات
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            تتبع أداء بطاقاتك وتفاعل المستخدمين
          </p>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">جميع البطاقات</option>
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-auto"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>

          <button className="btn-secondary flex items-center space-x-2 space-x-reverse">
            <Download className="w-4 h-4" />
            <span>تصدير</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {stat.value.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className={cn(
                    "text-sm font-medium",
                    stat.changeType === 'positive' ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={cn("p-3 rounded-lg", stat.color)}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              مشاهدات البطاقات
            </h2>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">المشاهدات</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2 space-x-reverse">
            {mockAnalytics.cardViews.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-primary-500 rounded-t-sm"
                  style={{ 
                    height: `${(item.value / Math.max(...mockAnalytics.cardViews.map(i => i.value))) * 200}px`,
                    minHeight: '4px'
                  }}
                ></div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                  {new Date(item.date).getDate()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cards */}
        <div className="card">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            أفضل البطاقات أداءً
          </h2>
          
          <div className="space-y-3">
            {mockAnalytics.topCards.map((card, index) => (
              <div key={card.cardId} className="flex items-center space-x-3 space-x-reverse p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {card.cardName}
                  </h3>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-neutral-600 dark:text-neutral-400">
                    <span>{card.views} مشاهدة</span>
                    <span>{card.shares} مشاركة</span>
                    <span>{card.clicks} نقرة</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {((card.views / stats[0].value) * 100).toFixed(1)}%
                  </div>
                  <div className="w-20 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mt-1">
                    <div 
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${(card.views / stats[0].value) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demographics */}
        <div className="card">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            التوزيع الجغرافي
          </h2>
          
          <div className="space-y-3">
            {Object.entries(mockAnalytics.demographics.countries).map(([country, percentage]) => (
              <div key={country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Globe className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-900 dark:text-neutral-100">{country}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {percentage}%
                  </span>
                  <div className="w-16 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                    <div 
                      className="h-full bg-secondary-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Types */}
        <div className="card">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            أنواع الأجهزة
          </h2>
          
          <div className="space-y-4">
            {Object.entries(mockAnalytics.demographics.devices).map(([device, percentage]) => (
              <div key={device} className="flex items-center justify-between">
                <span className="text-neutral-900 dark:text-neutral-100">{device}</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {percentage}%
                  </span>
                  <div className="w-20 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
                    <div 
                      className="h-full bg-accent-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              المتصفحات الأكثر استخداماً
            </h3>
            <div className="space-y-2">
              {Object.entries(mockAnalytics.demographics.browsers).slice(0, 3).map(([browser, percentage]) => (
                <div key={browser} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">{browser}</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          النشاط الأخير
        </h2>
        
        <div className="space-y-3">
          {[
            { action: 'مشاهدة بطاقة', card: 'أحمد محمد السعيد', time: 'منذ دقيقتين', location: 'الرياض، السعودية' },
            { action: 'مسح QR', card: 'بطاقة الشركة', time: 'منذ 5 دقائق', location: 'جدة، السعودية' },
            { action: 'مشاركة بطاقة', card: 'أحمد محمد السعيد', time: 'منذ 10 دقائق', location: 'دبي، الإمارات' },
            { action: 'حفظ جهة اتصال', card: 'بطاقة المؤتمرات', time: 'منذ 15 دقيقة', location: 'الكويت، الكويت' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {activity.action}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    • {activity.card}
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-neutral-500 dark:text-neutral-400">
                  <span>{activity.time}</span>
                  <span>•</span>
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
