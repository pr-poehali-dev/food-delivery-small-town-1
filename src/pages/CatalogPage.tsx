import { useState } from 'react';
import Icon from '@/components/ui/icon';

const dishes = [
  { id: 1, name: 'Классический Бургер', restaurant: 'Burger House', price: 450, rating: 4.8, time: '20 мин', emoji: '🍔', category: 'Бургеры', popular: true },
  { id: 2, name: 'Маргарита XL', restaurant: 'Pizza Roma', price: 680, rating: 4.9, time: '25 мин', emoji: '🍕', category: 'Пицца', popular: true },
  { id: 3, name: 'Сет Токио 32 шт', restaurant: 'Sushi World', price: 1290, rating: 4.7, time: '35 мин', emoji: '🍣', category: 'Суши', popular: false },
  { id: 4, name: 'Рамен с курицей', restaurant: 'Tokyo Ramen', price: 490, rating: 4.6, time: '20 мин', emoji: '🍜', category: 'Лапша', popular: false },
  { id: 5, name: 'Цезарь Классик', restaurant: 'Green Bowl', price: 380, rating: 4.5, time: '15 мин', emoji: '🥗', category: 'Салаты', popular: false },
  { id: 6, name: 'Чизкейк Нью-Йорк', restaurant: 'Sweet Time', price: 320, rating: 4.9, time: '10 мин', emoji: '🍰', category: 'Десерты', popular: true },
  { id: 7, name: 'Дабл Смэш Бургер', restaurant: 'Burger House', price: 590, rating: 4.7, time: '22 мин', emoji: '🍔', category: 'Бургеры', popular: false },
  { id: 8, name: 'Пепперони', restaurant: 'Pizza Roma', price: 720, rating: 4.8, time: '28 мин', emoji: '🍕', category: 'Пицца', popular: false },
  { id: 9, name: 'Филадельфия 8 шт', restaurant: 'Sushi World', price: 540, rating: 4.8, time: '30 мин', emoji: '🍣', category: 'Суши', popular: true },
  { id: 10, name: 'НЛО-бургер с сыром', restaurant: 'Burger House', price: 650, rating: 4.9, time: '22 мин', emoji: '🛸', category: 'НЛО-бургеры', popular: true },
  { id: 11, name: 'НЛО-бургер Огненный', restaurant: 'Burger House', price: 720, rating: 4.8, time: '25 мин', emoji: '🛸', category: 'НЛО-бургеры', popular: false },
  { id: 12, name: 'Картофель фри', restaurant: 'Burger House', price: 180, rating: 4.6, time: '10 мин', emoji: '🍟', category: 'Закуски', popular: true },
  { id: 13, name: 'Луковые кольца', restaurant: 'Burger House', price: 210, rating: 4.5, time: '10 мин', emoji: '🧅', category: 'Закуски', popular: false },
  { id: 14, name: 'Наггетсы 10 шт', restaurant: 'Burger House', price: 290, rating: 4.7, time: '15 мин', emoji: '🍗', category: 'Закуски', popular: false },
  { id: 15, name: 'Кола 0.5 л', restaurant: 'Burger House', price: 120, rating: 4.4, time: '5 мин', emoji: '🥤', category: 'Напитки', popular: false },
  { id: 16, name: 'Лимонад Манго', restaurant: 'Green Bowl', price: 180, rating: 4.8, time: '5 мин', emoji: '🍹', category: 'Напитки', popular: true },
  { id: 17, name: 'Кофе латте', restaurant: 'Sweet Time', price: 220, rating: 4.7, time: '5 мин', emoji: '☕', category: 'Напитки', popular: false },
  { id: 18, name: 'Соус острый', restaurant: 'Burger House', price: 60, rating: 4.3, time: '5 мин', emoji: '🫙', category: 'Прочее', popular: false },
  { id: 19, name: 'Влажные салфетки', restaurant: 'Burger House', price: 30, rating: 4.2, time: '5 мин', emoji: '🧻', category: 'Прочее', popular: false },
];

const categories = ['Все', 'Бургеры', 'НЛО-бургеры', 'Пицца', 'Суши', 'Лапша', 'Салаты', 'Десерты', 'Закуски', 'Напитки', 'Прочее'];

const restaurants = [
  { name: 'Burger House', emoji: '🍔', rating: 4.8, time: '20-30 мин', minOrder: 400 },
  { name: 'Pizza Roma', emoji: '🍕', rating: 4.9, time: '25-35 мин', minOrder: 500 },
  { name: 'Sushi World', emoji: '🍣', rating: 4.7, time: '30-45 мин', minOrder: 800 },
  { name: 'Tokyo Ramen', emoji: '🍜', rating: 4.6, time: '20-30 мин', minOrder: 350 },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
  qty: number;
}

interface CatalogPageProps {
  onNavigate: (page: string) => void;
}

export default function CatalogPage({ onNavigate }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tab, setTab] = useState<'dishes' | 'restaurants'>('dishes');
  const [sortBy, setSortBy] = useState<'popular' | 'price' | 'rating'>('popular');

  const filtered = dishes
    .filter(d => activeCategory === 'Все' || d.category === activeCategory)
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.restaurant.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });

  const addToCart = (dish: typeof dishes[0]) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === dish.id);
      if (exists) return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, emoji: dish.emoji, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen pt-24 px-4 pb-32 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-2">
          КАТАЛОГ <span className="text-gradient">БЛЮД</span>
        </h1>
        <p className="text-gray-400">Выбирай из сотен позиций лучших ресторанов</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 animate-fade-in delay-100">
        {(['dishes', 'restaurants'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            style={tab === t
              ? { background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', color: 'white' }
              : { background: 'rgba(22,22,30,0.8)', color: '#A0A0B4', border: '1px solid rgba(255,255,255,0.06)' }
            }
          >
            {t === 'dishes' ? '🍽 Блюда' : '🏪 Рестораны'}
          </button>
        ))}
      </div>

      {tab === 'dishes' && (
        <>
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in delay-200">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Поиск блюд или ресторанов..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none focus:border-neon-orange transition"
                style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 rounded-xl text-white outline-none cursor-pointer"
              style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <option value="popular">Популярные</option>
              <option value="price">По цене</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 animate-fade-in delay-300" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200"
                style={activeCategory === cat
                  ? { background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', color: 'white' }
                  : { background: 'rgba(22,22,30,0.8)', color: '#A0A0B4', border: '1px solid rgba(255,255,255,0.06)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dishes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((dish, i) => (
              <div
                key={dish.id}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                style={{
                  background: 'rgba(22,22,30,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {/* Image area */}
                <div
                  className="relative h-40 flex items-center justify-center text-7xl"
                  style={{ background: 'rgba(255,107,0,0.05)' }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">{dish.emoji}</span>
                  {dish.popular && (
                    <span
                      className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)' }}
                    >
                      ХИТ
                    </span>
                  )}
                  <span
                    className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium"
                    style={{ background: 'rgba(22,22,30,0.9)', color: '#A0A0B4' }}
                  >
                    <Icon name="Clock" size={12} className="inline mr-1" />{dish.time}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-white">{dish.name}</h3>
                    <div className="flex items-center gap-1 text-neon-yellow text-sm font-medium ml-2">
                      ★ {dish.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{dish.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gradient">{dish.price} ₽</span>
                    <button
                      onClick={() => addToCart(dish)}
                      className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1"
                    >
                      <Icon name="Plus" size={15} />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'restaurants' && (
        <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
          {restaurants.map((r, i) => (
            <div
              key={r.name}
              className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'rgba(22,22,30,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(255,107,0,0.1)' }}
                >
                  {r.emoji}
                </div>
                <div>
                  <h3 className="font-oswald text-xl font-bold text-white">{r.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-neon-yellow">★ {r.rating}</span>
                    <span>•</span>
                    <span>{r.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Мин. заказ: {r.minOrder} ₽</span>
                <button className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold">
                  Открыть меню
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-scale-in">
          <button
            onClick={() => onNavigate('order')}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #FF6B00, #FF1E64)',
              boxShadow: '0 16px 50px rgba(255,107,0,0.5)',
            }}
          >
            <div className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={20} className="text-white" />
              <span className="font-bold text-white">{cartCount} блюда</span>
            </div>
            <div className="w-px h-5 bg-white/30" />
            <span className="font-bold text-white text-lg">{cartTotal} ₽</span>
            <Icon name="ArrowRight" size={20} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}