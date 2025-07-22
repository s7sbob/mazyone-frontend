import { create } from 'zustand';
import type { User, Card, Contact, Job, Notification } from '../types';
import {
  mockUser,
  mockCards,
  mockContacts,
  mockJobs,
  mockNotifications,
} from '../utils/mockData';

/* ------------------------------------------------------------------ */
/* 🖌️  ألوان النظام الافتراضيّة                                       */
/* ------------------------------------------------------------------ */
type UserColors = Record<string, string>;

const defaultColors: UserColors = {
  'btn-primary': '#006BE3',
  'btn-primary-hover': '#005BB5',
  'btn-secondary': '#7EDDB9',
  'btn-secondary-hover': '#6BC7A8',
  'alert-warning': '#FACC15',
  'alert-warning-hover': '#E0B203',
  'bg-primary': '#FFFFFF',
  'bg-secondary': '#EDEDED',
  'text-primary': '#2D2D2D',
  'text-secondary': '#444444',
};

const applyColors = (colors: UserColors) => {
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, val]) =>
    root.style.setProperty(`--${key}`, val)
  );
};

/* ------------------------------------------------------------------ */
/* 📦  حالة التطبيق (Zustand)                                          */
/* ------------------------------------------------------------------ */
interface AppState {
  /* بيانات المستخدم */
  user: User | null;
  isAuthenticated: boolean;

  /* الكيانات */
  cards: Card[];
  contacts: Contact[];
  jobs: Job[];
  notifications: Notification[];

  /* واجهة المستخدم */
  darkMode: boolean;
  sidebarOpen: boolean;

  /* 🎨  تخصيص الألوان */
  defaultColors: UserColors;
  userColors: UserColors;
  setUserColors: (c: UserColors) => void;

  /* ⚙️  إجراءات المصادقة */
  login: (email: string, password: string) => Promise<void>;
  registerUser: (data: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;

  /* ⚙️  إجراءات الواجهة */
  toggleDarkMode: () => void;
  toggleSidebar: () => void;

  /* ⚙️  بطاقات */
  addCard: (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;

  /* ⚙️  جهات الاتصال */
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;

  /* ⚙️  الإشعارات */
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

/* ------------------------------------------------------------------ */
/* 🏗️  إنشاء المتجر                                                   */
/* ------------------------------------------------------------------ */
export const useStore = create<AppState>((set, get) => ({
  /* الحالة الابتدائية */
  user: null,
  isAuthenticated: false,
  cards: [],
  contacts: [],
  jobs: [],
  notifications: [],
  darkMode: false,
  sidebarOpen: true,

  /* الألوان */
  defaultColors,
  userColors: (() => {
    const saved = localStorage.getItem('mazyone-colors');
    const colors = saved ? (JSON.parse(saved) as UserColors) : defaultColors;
    applyColors(colors); // تطبيقها فور التحميل
    return colors;
  })(),
  setUserColors: (colors) => {
    applyColors(colors);
    localStorage.setItem('mazyone-colors', JSON.stringify(colors));
    set({ userColors: colors });
  },

  /* ------------------ مصادقة ------------------ */
  login: async (email, password) => {
    await new Promise((res) => setTimeout(res, 1000)); // محاكاة API
    if (email === 'ahmed@example.com' && password === 'password') {
      set({
        user: mockUser,
        isAuthenticated: true,
        cards: mockCards,
        contacts: mockContacts,
        jobs: mockJobs,
        notifications: mockNotifications,
      });
    } else {
      throw new Error('بيانات تسجيل الدخول غير صحيحة');
    }
  },

  registerUser: async (data) => {
    await new Promise((res) => setTimeout(res, 1000)); // محاكاة API
    const newUser: User = {
      ...mockUser,
      id: Date.now().toString(),
      name: data.name || 'مستخدم جديد',
      email: data.email || 'user@example.com',
    };
    set({
      user: newUser,
      isAuthenticated: true,
      cards: mockCards,
      contacts: mockContacts,
      jobs: mockJobs,
      notifications: mockNotifications,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      cards: [],
      contacts: [],
      jobs: [],
      notifications: [],
    });
  },

  /* ------------------ واجهة المستخدم ------------------ */
  toggleDarkMode: () => {
    const newDark = !get().darkMode;
    set({ darkMode: newDark });
    if (newDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  },

  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

  /* ------------------ البطاقات ------------------ */
  addCard: (cardData) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      shares: 0,
      socialLinks: cardData.socialLinks || [],
      customFields: cardData.customFields || [],
    };
    set({ cards: [...get().cards, newCard] });
  },

  updateCard: (id, updates) => {
    set({
      cards: get().cards.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      ),
    });
  },

  deleteCard: (id) => {
    set({ cards: get().cards.filter((c) => c.id !== id) });
  },

  /* ------------------ جهات الاتصال ------------------ */
  addContact: (contactData) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    set({ contacts: [...get().contacts, newContact] });
  },

  updateContact: (id, updates) => {
    set({
      contacts: get().contacts.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  },

  deleteContact: (id) => {
    set({ contacts: get().contacts.filter((c) => c.id !== id) });
  },

  /* ------------------ الإشعارات ------------------ */
  markNotificationAsRead: (id) => {
    set({
      notifications: get().notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    });
  },

  markAllNotificationsAsRead: () => {
    set({
      notifications: get().notifications.map((n) => ({ ...n, isRead: true })),
    });
  },
}));
