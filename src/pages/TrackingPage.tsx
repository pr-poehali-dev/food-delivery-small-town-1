import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Status {
  id: string;
  label: string;
  icon: string;
  time: string;
  done: boolean;
  desc: string;
  active?: boolean;
}

const STATUSES: Status[] = [
  { id: 'accepted', label: 'Заказ принят', icon: 'CheckCircle', time: '14:32', done: true, desc: 'Ресторан подтвердил заказ' },
  { id: 'cooking', label: 'Готовится', icon: 'ChefHat', time: '14:35', done: true, desc: 'Повар уже колдует над блюдами' },
  { id: 'ready', label: 'Готов к выдаче', icon: 'Package', time: '14:52', done: true, desc: 'Заказ упакован и ждёт курьера' },
  { id: 'courier', label: 'Курьер в пути', icon: 'Bike', time: '14:55', done: false, desc: 'Андрей едет к вам', active: true },
  { id: 'delivered', label: 'Доставлен', icon: 'Home', time: '~15:10', done: false, desc: 'Ожидаемое время прибытия' },
];

const NOTIFICATIONS = [
  { id: 1, type: 'sms', text: 'Ваш заказ #8421 принят! Время доставки ~35 мин', time: '14:32', icon: 'MessageSquare' },
  { id: 2, type: 'push', text: 'Ресторан начал готовить ваш заказ', time: '14:35', icon: 'Bell' },
  { id: 3, type: 'push', text: 'Заказ готов! Курьер Андрей скоро заберёт его', time: '14:52', icon: 'Bell' },
  { id: 4, type: 'sms', text: 'Курьер Андрей уже едет к вам. Оценка 4.9★', time: '14:55', icon: 'MessageSquare' },
];

export default function TrackingPage() {
  const [eta, setEta] = useState(18);
  const [notifVisible, setNotifVisible] = useState(true);
  const [courierPos, setCourierPos] = useState(30);

  useEffect(() => {
    const t = setInterval(() => {
      setEta(p => Math.max(0, p - 1));
      setCourierPos(p => Math.min(85, p + 1));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4 pb-16 max-w-6xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
          style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)', color: '#FF6B00' }}
        >
          <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse" />
          Заказ #8421 в пути
        </div>
        <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-2">
          ТРЕКЕР <span className="text-gradient">КУРЬЕРА</span>
        </h1>
        <p className="text-gray-400">Наблюдай за заказом в реальном времени</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Map mock + ETA */}
        <div className="lg:col-span-2 space-y-4">
          {/* ETA Card */}
          <div
            className="relative overflow-hidden rounded-2xl p-6 animate-fade-in"
            style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,30,100,0.1))', border: '1px solid rgba(255,107,0,0.3)' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-2xl" style={{ background: '#FF6B00', transform: 'translate(30%,-30%)' }} />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">До вашего адреса</p>
                <p className="font-oswald text-6xl font-bold text-white">
                  {eta} <span className="text-3xl text-gray-400">мин</span>
                </p>
                <p className="text-gray-400 mt-1">Ул. Ленина, 25, кв. 48</p>
              </div>
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mb-2 animate-pulse-glow"
                  style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,107,0,0.3)' }}
                >
                  <span className="text-3xl">🛵</span>
                </div>
                <p className="text-sm text-gray-400">Курьер</p>
                <p className="font-semibold text-white">Андрей</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-neon-yellow text-sm">★ 4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map simulation */}
          <div
            className="relative rounded-2xl overflow-hidden animate-fade-in delay-100"
            style={{ height: '280px', background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Fake map grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,107,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

            {/* Roads */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 280">
              <path d="M50,140 Q200,60 350,140 Q450,190 550,140" stroke="rgba(255,107,0,0.2)" strokeWidth="12" fill="none" />
              <path d="M50,140 Q200,60 350,140 Q450,190 550,140" stroke="rgba(255,107,0,0.1)" strokeWidth="18" fill="none" />
              <path d="M100,280 L100,0" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
              <path d="M300,280 L300,0" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
              <path d="M500,280 L500,0" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
              <path d="M0,80 L600,80" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
              <path d="M0,200 L600,200" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
            </svg>

            {/* Courier dot */}
            <div
              className="absolute transition-all duration-[3000ms] ease-linear"
              style={{ left: `${courierPos}%`, top: '45%', transform: 'translate(-50%,-50%)' }}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full opacity-30 animate-ping" style={{ background: '#FF6B00' }} />
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', boxShadow: '0 0 20px rgba(255,107,0,0.6)' }}>
                  🛵
                </div>
              </div>
            </div>

            {/* Restaurant pin */}
            <div className="absolute left-[8%] top-[40%] -translate-y-1/2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(22,22,30,0.9)', border: '2px solid #FF6B00' }}>🍔</div>
              <p className="text-xs text-gray-400 mt-1 text-center whitespace-nowrap">Ресторан</p>
            </div>

            {/* Home pin */}
            <div className="absolute right-[8%] top-[40%] -translate-y-1/2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg animate-pulse" style={{ background: 'rgba(22,22,30,0.9)', border: '2px solid #00FF87' }}>🏠</div>
              <p className="text-xs text-gray-400 mt-1 text-center whitespace-nowrap">Вы здесь</p>
            </div>

            {/* Map label */}
            <div className="absolute bottom-3 left-3 text-xs text-gray-600">Интерактивная карта</div>
          </div>

          {/* Courier contacts */}
          <div
            className="rounded-2xl p-5 flex items-center justify-between animate-fade-in delay-200"
            style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(255,107,0,0.1)' }}>
                👨
              </div>
              <div>
                <p className="font-semibold text-white">Андрей К.</p>
                <p className="text-sm text-gray-400">Курьер • ★ 4.9 • 847 доставок</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="w-11 h-11 rounded-xl flex items-center justify-center transition hover:scale-110"
                style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)' }}
              >
                <Icon name="Phone" size={18} className="text-neon-orange" />
              </button>
              <button
                className="w-11 h-11 rounded-xl flex items-center justify-center transition hover:scale-110"
                style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)' }}
              >
                <Icon name="MessageCircle" size={18} className="text-neon-orange" />
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Status timeline */}
          <div
            className="rounded-2xl p-5 animate-fade-in delay-100"
            style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h3 className="font-oswald text-lg font-bold text-white mb-5">Статус заказа</h3>
            <div className="space-y-1">
              {STATUSES.map((s, i) => (
                <div key={s.id} className="flex gap-3">
                  {/* Line + icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
                      style={
                        s.done
                          ? { background: 'linear-gradient(135deg, #FF6B00, #FF1E64)' }
                          : s.active
                            ? { background: 'rgba(255,107,0,0.2)', border: '2px solid #FF6B00' }
                            : { background: 'rgba(40,40,55,0.8)', border: '1px solid rgba(255,255,255,0.08)' }
                      }
                    >
                      <Icon
                        name={s.done ? 'Check' : s.icon}
                        size={14}
                        className={s.done ? 'text-white' : s.active ? 'text-neon-orange' : 'text-gray-600'}
                      />
                    </div>
                    {i < STATUSES.length - 1 && (
                      <div
                        className="w-0.5 h-8 mt-1"
                        style={{ background: s.done ? 'linear-gradient(#FF6B00, rgba(255,107,0,0.3))' : 'rgba(255,255,255,0.06)' }}
                      />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pb-3">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium text-sm ${s.done || s.active ? 'text-white' : 'text-gray-500'}`}>{s.label}</p>
                      <span className="text-xs text-gray-600">{s.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications log */}
          {notifVisible && (
            <div
              className="rounded-2xl p-5 animate-fade-in delay-200"
              style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-oswald text-lg font-bold text-white flex items-center gap-2">
                  <Icon name="Bell" size={18} className="text-neon-orange" /> Уведомления
                </h3>
                <button onClick={() => setNotifVisible(false)} className="text-gray-600 hover:text-gray-400 transition">
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="space-y-2">
                {NOTIFICATIONS.map(n => (
                  <div
                    key={n.id}
                    className="flex gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: n.type === 'sms' ? 'rgba(0,255,135,0.1)' : 'rgba(255,107,0,0.1)' }}
                    >
                      <Icon name={n.icon} size={13} className={n.type === 'sms' ? 'text-green-400' : 'text-neon-orange'} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5 uppercase font-medium">{n.type === 'sms' ? 'SMS' : 'Push'} • {n.time}</p>
                      <p className="text-sm text-gray-300">{n.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}