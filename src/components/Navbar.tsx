import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Меню', icon: 'UtensilsCrossed' },
    { id: 'order', label: 'Заказ', icon: 'ShoppingCart' },
    { id: 'tracking', label: 'Трекер', icon: 'MapPin' },
    { id: 'account', label: 'Кабинет', icon: 'User' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between px-5 py-3 rounded-2xl"
          style={{
            background: 'rgba(22, 22, 30, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 107, 0, 0.2)',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)' }}
            >
              В
            </div>
            <span className="font-oswald text-xl font-bold tracking-wide text-gradient">
              ВКУСНАЯ ЗАПРАВКА
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activePage === link.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={
                  activePage === link.id
                    ? { background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', color: 'white' }
                    : {}
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('order')}
              className="relative p-2.5 rounded-xl transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)' }}
            >
              <Icon name="ShoppingCart" size={20} className="text-neon-orange" />
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                style={{ background: 'var(--neon-pink)' }}
              >
                3
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden mt-2 rounded-2xl p-3 animate-fade-in"
            style={{
              background: 'rgba(22, 22, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 107, 0, 0.2)',
            }}
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 mb-1 ${
                  activePage === link.id ? 'text-white' : 'text-gray-400'
                }`}
                style={activePage === link.id ? { background: 'linear-gradient(135deg, rgba(255,107,0,0.2), rgba(255,30,100,0.2))' } : {}}
              >
                <Icon name={link.icon} size={18} />
                <span className="font-medium">{link.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}