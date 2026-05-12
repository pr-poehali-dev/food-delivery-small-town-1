import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import OrderPage from '@/pages/OrderPage';
import TrackingPage from '@/pages/TrackingPage';
import AccountPage from '@/pages/AccountPage';
import ContactsPage from '@/pages/ContactsPage';

type Page = 'home' | 'catalog' | 'order' | 'tracking' | 'account' | 'contacts';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen noise-bg" style={{ background: '#0F0F14' }}>
      {/* Global gradient blobs */}
      <div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF6B00, transparent)', transform: 'translate(-30%, -30%)' }}
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF1E64, transparent)', transform: 'translate(30%, 30%)' }}
      />

      <Navbar activePage={page} onNavigate={navigate} />

      <main className="relative z-10">
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'catalog' && <CatalogPage onNavigate={navigate} />}
        {page === 'order' && <OrderPage onNavigate={navigate} />}
        {page === 'tracking' && <TrackingPage />}
        {page === 'account' && <AccountPage />}
        {page === 'contacts' && <ContactsPage />}
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 px-4 py-8 mt-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)' }}
            >
              В
            </div>
            <span className="font-oswald text-lg font-bold text-gradient">ЗАПРАВКА ВКУСА</span>
          </div>
          <p className="text-gray-600 text-sm">© 2026 ЗАПРАВКА ВКУСА. Быстрая доставка еды.</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <button onClick={() => navigate('contacts')} className="hover:text-gray-400 transition">Контакты</button>
            <button className="hover:text-gray-400 transition">Политика</button>
            <button className="hover:text-gray-400 transition">Оферта</button>
          </div>
        </div>
      </footer>
    </div>
  );
}