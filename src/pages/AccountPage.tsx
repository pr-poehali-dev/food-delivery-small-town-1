import { useState } from 'react';
import Icon from '@/components/ui/icon';

const orders = [
  { id: '#8421', date: '12 мая, 14:32', items: ['🍔 Классический Бургер', '🍕 Маргарита XL'], total: 1580, status: 'В пути', statusColor: '#FF6B00' },
  { id: '#8390', date: '10 мая, 19:15', items: ['🍣 Сет Токио 32 шт', '🥗 Цезарь Классик'], total: 1670, status: 'Доставлен', statusColor: '#00FF87' },
  { id: '#8344', date: '7 мая, 12:50', items: ['🍜 Рамен с курицей', '🍰 Чизкейк Нью-Йорк'], total: 810, status: 'Доставлен', statusColor: '#00FF87' },
  { id: '#8301', date: '3 мая, 20:00', items: ['🍔 Дабл Смэш Бургер'], total: 590, status: 'Отменён', statusColor: '#EF4444' },
];

const addresses = [
  { id: 1, label: 'Дом', address: 'ул. Ленина, 25, кв. 48', icon: '🏠', default: true },
  { id: 2, label: 'Работа', address: 'пр. Мира, 14, офис 302', icon: '🏢', default: false },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Иван Петров');
  const [phone, setPhone] = useState('+7 (999) 123-45-67');
  const [email, setEmail] = useState('ivan@mail.ru');

  return (
    <div className="min-h-screen pt-24 px-4 pb-16 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 mb-6 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,30,100,0.1))', border: '1px solid rgba(255,107,0,0.2)' }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: '#FF6B00', transform: 'translate(30%,-30%)' }} />
        <div className="flex items-center gap-5 relative z-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', boxShadow: '0 8px 24px rgba(255,107,0,0.4)' }}
          >
            И
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-oswald text-2xl font-bold text-white">{name}</h2>
            <p className="text-gray-400 text-sm">{phone}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(255,220,0,0.15)', color: '#FFDC00' }}>
                ⭐ Gold участник
              </span>
              <span className="text-gray-500 text-xs">1 234 бонусных баллов</span>
            </div>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2.5 rounded-xl transition hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Icon name={editMode ? 'Check' : 'Pencil'} size={18} className="text-gray-300" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 animate-fade-in delay-100">
        {([
          { id: 'orders', label: '📦 Заказы' },
          { id: 'addresses', label: '📍 Адреса' },
          { id: 'settings', label: '⚙️ Настройки' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200"
            style={activeTab === tab.id
              ? { background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', color: 'white' }
              : { background: 'rgba(22,22,30,0.8)', color: '#A0A0B4', border: '1px solid rgba(255,255,255,0.06)' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-3 animate-fade-in">
          {orders.map((order, i) => (
            <div
              key={order.id}
              className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: 'rgba(22,22,30,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-oswald text-lg font-bold text-white">{order.id}</span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: `${order.statusColor}20`, color: order.statusColor }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{order.date}</p>
                </div>
                <span className="font-bold text-lg text-gradient">{order.total} ₽</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-sm text-gray-400 flex-wrap">
                  {order.items.map(item => (
                    <span key={item} className="px-2 py-0.5 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {order.status === 'В пути' && (
                <button
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium transition hover:gap-2"
                  style={{ color: '#FF6B00' }}
                >
                  <Icon name="MapPin" size={14} /> Отследить заказ
                </button>
              )}
              {order.status === 'Доставлен' && (
                <button
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: '#A0A0B4' }}
                >
                  <Icon name="RotateCcw" size={14} /> Повторить заказ
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-3 animate-fade-in">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: 'rgba(22,22,30,0.8)', border: `1px solid ${addr.default ? 'rgba(255,107,0,0.3)' : 'rgba(255,255,255,0.06)'}` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: addr.default ? 'rgba(255,107,0,0.1)' : 'rgba(255,255,255,0.04)' }}
              >
                {addr.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">{addr.label}</p>
                  {addr.default && (
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255,107,0,0.15)', color: '#FF6B00' }}>
                      Основной
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{addr.address}</p>
              </div>
              <button className="p-2 rounded-lg transition hover:bg-white/5">
                <Icon name="Pencil" size={16} className="text-gray-500" />
              </button>
            </div>
          ))}
          <button
            className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 font-medium text-gray-400 transition hover:text-white hover:border-neon-orange"
            style={{ border: '2px dashed rgba(255,255,255,0.1)' }}
          >
            <Icon name="Plus" size={18} /> Добавить адрес
          </button>
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-2xl p-6" style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-oswald text-lg font-bold text-white mb-5">Личные данные</h3>
            <div className="space-y-4">
              {[
                { label: 'Имя', value: name, setter: setName },
                { label: 'Телефон', value: phone, setter: setPhone },
                { label: 'Email', value: email, setter: setEmail },
              ].map(field => (
                <div key={field.label}>
                  <label className="text-gray-500 text-sm mb-1.5 block">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={e => editMode && field.setter(e.target.value)}
                    readOnly={!editMode}
                    className="w-full px-4 py-3 rounded-xl text-white outline-none transition"
                    style={{
                      background: editMode ? 'rgba(40,40,55,0.8)' : 'rgba(22,22,30,0.5)',
                      border: `1px solid ${editMode ? 'rgba(255,107,0,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  />
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="btn-primary w-full py-3 rounded-xl font-semibold mt-4"
              >
                Сохранить изменения
              </button>
            )}
          </div>

          <div className="rounded-2xl p-6" style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-oswald text-lg font-bold text-white mb-4">Уведомления</h3>
            {[
              { label: 'SMS о статусе заказа', desc: 'Получать сообщения на телефон' },
              { label: 'Push-уведомления', desc: 'Уведомления в браузере' },
              { label: 'Акции и скидки', desc: 'Специальные предложения' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div>
                  <p className="font-medium text-white text-sm">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <div
                  className="w-12 h-6 rounded-full relative cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)' }}
                >
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full py-3 rounded-xl font-medium transition hover:bg-red-500/10"
            style={{ border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}
          >
            Выйти из аккаунта
          </button>
        </div>
      )}
    </div>
  );
}
