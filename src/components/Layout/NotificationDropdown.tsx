import React, { useState } from 'react';
import { Bell, X, Check, Eye, Trash2, Settings } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

const NotificationDropdown = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const recentNotifications = notifications.slice(0, 5);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'card_view': return Eye;
      case 'card_share': return '🔗';
      case 'contact_add': return '👤';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'card_view': return 'text-blue-500';
      case 'card_share': return 'text-green-500';
      case 'contact_add': return 'text-purple-500';
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-neutral-500';
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      markNotificationAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        {unreadNotifications.length > 0 && (
          <span 
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: '#FACC15', color: '#2D2D2D' }}
          >
            {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                الإشعارات
              </h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                  >
                    تحديد الكل كمقروء
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {recentNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-500 dark:text-neutral-400">
                    لا توجد إشعارات جديدة
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {recentNotifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={cn(
                          "p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors",
                          !notification.isRead && "bg-blue-50 dark:bg-blue-900/10"
                        )}
                      >
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            !notification.isRead ? "bg-blue-100 dark:bg-blue-900/20" : "bg-neutral-100 dark:bg-neutral-800"
                          )}>
                            {typeof Icon === 'string' ? (
                              <span className="text-sm">{Icon}</span>
                            ) : (
                              <Icon className={cn("w-4 h-4", getNotificationColor(notification.type))} />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={cn(
                                "text-sm font-medium truncate",
                                !notification.isRead 
                                  ? "text-neutral-900 dark:text-neutral-100" 
                                  : "text-neutral-700 dark:text-neutral-300"
                              )}>
                                {notification.title}
                              </h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-neutral-500 dark:text-neutral-500">
                                {formatDistanceToNow(new Date(notification.createdAt), { 
                                  addSuffix: true, 
                                  locale: ar 
                                })}
                              </span>
                              {notification.actionText && (
                                <span className="text-xs text-blue-500 font-medium">
                                  {notification.actionText}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 5 && (
              <div className="p-3 border-t border-neutral-200 dark:border-neutral-700">
                <button className="w-full text-center text-sm text-blue-500 hover:text-blue-600 font-medium py-2">
                  عرض جميع الإشعارات
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
