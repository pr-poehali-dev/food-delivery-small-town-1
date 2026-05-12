import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/1505e039-8398-414d-b8cd-867c8be89aa4/files/cd2d78fe-1a7d-4d42-8860-63eee7c8bd04.jpg';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const categories = [
  { emoji: '🍔', label: 'Бургеры', count: 24 },
  { emoji: '🍕', label: 'Пицца', count: 18 },
  { emoji: '🍣', label: 'Суши', count: 32 },
  { emoji: '🍜', label: 'Лапша', count: 15 },
  { emoji: '🥗', label: 'Салаты', count: 20 },
  { emoji: '🍰', label: 'Десерты', count: 12 },
];

const stats = [
  { value: '25+', label: 'Ресторанов', icon: 'Store' },
  { value: '30 мин', label: 'Среднее время', icon: 'Clock' },
  { value: '4.9★', label: 'Рейтинг', icon: 'Star' },
  { value: '50К+', label: 'Заказов', icon: 'Package' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen pt-20">

      {/* HERO */}
      <section className="relative px-4 pt-8 pb-16 max-w-7xl mx-auto">
        {/* Background glow orbs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF6B00, transparent)' }}
        />
        <div
          className="absolute top-20 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF1E64, transparent)' }}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in"
              style={{
                background: 'rgba(255, 107, 0, 0.15)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                color: '#FF6B00',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse" />
              Доставка за 30 минут
            </div>

            <h1
              className="font-oswald text-5xl md:text-7xl font-bold leading-none mb-6 animate-fade-in delay-100"
              style={{ lineHeight: 1.05 }}
            >
              <span className="text-white">ЛУЧШАЯ</span>
              <br />
              <span className="text-gradient">ЕДА</span>
              <br />
              <span className="text-white">У ДВЕРИ</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-md animate-fade-in delay-200">
              Рестораны города в одном приложении. Горячая еда, быстрая доставка,
              удобное отслеживание курьера в реальном времени.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 animate-fade-in delay-300">
              <button
                onClick={() => onNavigate('catalog')}
                className="btn-primary px-8 py-4 rounded-2xl font-semibold text-lg flex items-center gap-2"
              >
                Заказать сейчас
                <Icon name="ArrowRight" size={20} />
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="px-8 py-4 rounded-2xl font-semibold text-lg flex items-center gap-2 transition-all duration-200 hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              >
                Смотреть меню
              </button>
            </div>

            {/* Notification badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl animate-fade-in delay-400"
              style={{ background: 'rgba(30, 30, 40, 0.8)', border: '1px solid rgba(255,220,0,0.2)' }}
            >
              <div className="flex -space-x-2">
                {['🍕', '🍔', '🍣'].map((e, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'rgba(255,107,0,0.2)', border: '2px solid #0F0F14' }}
                  >
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-gray-400">Уже заказали сегодня</p>
                <p className="text-sm font-semibold text-white">1 234 человека</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative animate-float">
            <div
              className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)' }}
            />
            <img
              src={HERO_IMG}
              alt="Вкусная еда"
              className="relative z-10 w-full rounded-3xl object-cover"
              style={{ height: '440px', boxShadow: '0 32px 80px rgba(255,107,0,0.3)' }}
            />
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 z-20 px-4 py-3 rounded-2xl animate-scale-in delay-500"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', boxShadow: '0 8px 32px rgba(255,107,0,0.5)' }}
            >
              <p className="text-xs text-white/80">Промокод</p>
              <p className="text-xl font-oswald font-bold text-white">ВКУСНО25</p>
              <p className="text-xs text-white/80">−25% на первый заказ</p>
            </div>
            <div
              className="absolute -top-4 -right-4 z-20 w-16 h-16 rounded-2xl flex flex-col items-center justify-center animate-pulse-glow"
              style={{ background: 'rgba(22,22,30,0.95)', border: '1px solid rgba(255,220,0,0.4)' }}
            >
              <span className="text-xl">⚡</span>
              <span className="text-xs font-bold text-neon-yellow">FAST</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in delay-500">
          {stats.map((s) => (
            <div
              key={s.label}
              className="neon-border rounded-2xl p-5 text-center transition-all duration-300 hover:scale-105 cursor-default"
              style={{ background: 'rgba(22,22,30,0.6)' }}
            >
              <Icon name={s.icon} size={24} className="mx-auto mb-2 text-neon-orange" />
              <p className="font-oswald text-3xl font-bold text-gradient mb-1">{s.value}</p>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white">
            БЫСТРЫЙ <span className="text-gradient">ДОСТУП</span>
          </h2>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-neon-orange text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Все категории <Icon name="ArrowRight" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => onNavigate('catalog')}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(22,22,30,0.8)',
                border: '1px solid rgba(255,107,0,0.1)',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(255,107,0,0.1)' }}
              >
                {cat.emoji}
              </div>
              <div className="text-center">
                <p className="font-semibold text-white text-sm">{cat.label}</p>
                <p className="text-gray-500 text-xs">{cat.count} блюд</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <h2 className="font-oswald text-3xl md:text-4xl font-bold text-center mb-12">
          КАК ЭТО <span className="text-gradient">РАБОТАЕТ</span>
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', icon: 'Search', title: 'Выбери блюда', desc: 'Открой каталог и добавь любимые блюда в корзину' },
            { step: '02', icon: 'MapPin', title: 'Укажи адрес', desc: 'Введи адрес доставки или выбери из сохранённых' },
            { step: '03', icon: 'CreditCard', title: 'Оплати заказ', desc: 'Онлайн картой, наличными или бонусами' },
            { step: '04', icon: 'Truck', title: 'Жди курьера', desc: 'Отслеживай доставку в реальном времени' },
          ].map((item, i) => (
            <div
              key={item.step}
              className="relative p-6 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-oswald font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)' }}
              >
                {item.step}
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(255,107,0,0.1)' }}
              >
                <Icon name={item.icon} size={22} className="text-neon-orange" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                  <Icon name="ChevronRight" size={20} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NOTIFICATIONS BANNER */}
      <section className="px-4 py-8 max-w-7xl mx-auto mb-8">
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-12"
          style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.2), rgba(255,30,100,0.2))', border: '1px solid rgba(255,107,0,0.3)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: '#FF6B00', transform: 'translate(30%, -30%)' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white mb-3">
                🔔 СЛЕДИ ЗА ЗАКАЗОМ
              </h2>
              <p className="text-gray-300 text-lg max-w-md">
                Push-уведомления и SMS о каждом этапе: принят, готовится, в пути, доставлен.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('tracking')}
                className="btn-primary px-7 py-4 rounded-2xl font-semibold flex items-center gap-2 whitespace-nowrap"
              >
                <Icon name="Bell" size={18} />
                Включить уведомления
              </button>
              <button
                onClick={() => onNavigate('tracking')}
                className="px-7 py-4 rounded-2xl font-semibold flex items-center gap-2 whitespace-nowrap transition hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
              >
                <Icon name="MapPin" size={18} />
                Смотреть трекер
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
