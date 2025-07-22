import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';

// Layout
import Layout from './components/Layout/Layout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';

// Protected Pages
import Dashboard from './pages/Dashboard';
import Cards from './pages/Cards';
import CreateCard from './pages/CreateCard';
import CardView from './pages/CardView';
import Contacts from './pages/Contacts';
import Jobs from './pages/Jobs';
import QRGenerator from './pages/QRGenerator';
import Analytics from './pages/Analytics';
import Scan from './pages/Scan';
import CVBuilder from './pages/CVBuilder';
import LandingPages from './pages/LandingPages';
import Referrals from './pages/Referrals';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Subscription from './pages/Subscription';
import ThemeCustomizer from './components/ThemeCustomizer';

function App() {
  const { isAuthenticated, darkMode } = useStore();

  useEffect(() => {
    // Apply dark mode on initial load
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              style: {
                background: '#10B981',
                color: '#FFFFFF',
              },
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
                color: '#FFFFFF',
              },
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#EF4444',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
            } 
          />
          <Route 
            path="/payment" 
            element={
              isAuthenticated ? <Payment /> : <Navigate to="/login" replace />
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/cards" 
            element={
              isAuthenticated ? <Layout><Cards /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/cards/new" 
            element={
              isAuthenticated ? <Layout><CreateCard /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/cards/:id" 
            element={
              isAuthenticated ? <Layout><CardView /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/cards/:id/edit" 
            element={
              isAuthenticated ? <Layout><CreateCard /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/contacts" 
            element={
              isAuthenticated ? <Layout><Contacts /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/jobs" 
            element={
              isAuthenticated ? <Layout><Jobs /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/qr-generator" 
            element={
              isAuthenticated ? <Layout><QRGenerator /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/landing-pages" 
            element={
              isAuthenticated ? <Layout><LandingPages /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/cv-builder" 
            element={
              isAuthenticated ? <Layout><CVBuilder /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/scan" 
            element={
              isAuthenticated ? <Layout><Scan /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/analytics" 
            element={
              isAuthenticated ? <Layout><Analytics /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/referrals" 
            element={
              isAuthenticated ? <Layout><Referrals /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/subscription" 
            element={
              isAuthenticated ? <Layout><Subscription /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? <Layout><Settings /></Layout> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/support" 
            element={
              isAuthenticated ? <Layout><Support /></Layout> : <Navigate to="/login" replace />
            }
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
            <ThemeCustomizer />   {/* أضف المكوّن داخل الـ Router */}

    </Router>
  );
}

export default App;
