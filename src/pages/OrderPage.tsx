import { useState } from 'react';
import Icon from '@/components/ui/icon';

const cartItems = [
  { id: 1, name: 'Классический Бургер', price: 450, emoji: '🍔', qty: 2 },
  { id: 2, name: 'Маргарита XL', price: 680, emoji: '🍕', qty: 1 },
  { id: 3, name: 'Чизкейк Нью-Йорк', price: 320, emoji: '🍰', qty: 1 },
];

interface OrderPageProps {
  onNavigate: (page: string) => void;
}

export default function OrderPage({ onNavigate }: OrderPageProps) {
  const [items, setItems] = useState(cartItems);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [payMethod, setPayMethod] = useState<'card' | 'cash' | 'online'>('card');
  const [address, setAddress] = useState('');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [notifSms, setNotifSms] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [step, setStep] = useState(1);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = deliveryType === 'delivery' ? 149 : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.25) : 0;
  const total = subtotal + delivery - discount;

  const changeQty = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    );
  };

  const applyPromo = () => {
    if (promo.toUpperCase() === 'ВКУСНО25') setPromoApplied(true);
  };

  const handleOrder = () => {
    onNavigate('tracking');
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-16 max-w-5xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-2">
          ОФОРМЛЕНИЕ <span className="text-gradient">ЗАКАЗА</span>
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mt-4">
          {['Корзина', 'Доставка', 'Оплата'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => setStep(i + 1)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                style={step === i + 1
                  ? { background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', color: 'white' }
                  : step > i + 1
                    ? { background: 'rgba(0,255,135,0.1)', color: '#00FF87', border: '1px solid rgba(0,255,135,0.3)' }
                    : { background: 'rgba(22,22,30,0.8)', color: '#A0A0B4', border: '1px solid rgba(255,255,255,0.06)' }
                }
              >
                {step > i + 1 ? <Icon name="Check" size={14} /> : <span>{i + 1}</span>}
                {s}
              </button>
              {i < 2 && <Icon name="ChevronRight" size={16} className="text-gray-600" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Main content */}
        <div className="lg:col-span-2 space-y-4">

          {/* Step 1: Cart */}
          {step === 1 && (
            <div className="rounded-2xl p-6 animate-fade-in" style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-oswald text-xl font-bold text-white mb-5 flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} className="text-neon-orange" /> Ваша корзина
              </h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-3xl">{item.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-neon-orange font-semibold">{item.price} ₽</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition hover:bg-white/10"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                      >
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="w-6 text-center font-bold text-white">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition"
                        style={{ background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', color: 'white' }}
                      >
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Promo */}
              <div className="mt-5 flex gap-2">
                <input
                  type="text"
                  placeholder="Промокод (попробуй ВКУСНО25)"
                  value={promo}
                  onChange={e => setPromo(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none transition"
                  style={{ background: 'rgba(40,40,55,0.8)', border: `1px solid ${promoApplied ? '#00FF87' : 'rgba(255,255,255,0.08)'}` }}
                />
                <button
                  onClick={applyPromo}
                  disabled={promoApplied}
                  className="px-5 py-3 rounded-xl font-semibold transition"
                  style={promoApplied
                    ? { background: 'rgba(0,255,135,0.15)', color: '#00FF87', border: '1px solid rgba(0,255,135,0.3)' }
                    : { background: 'linear-gradient(135deg, #FF6B00, #FF1E64)', color: 'white' }
                  }
                >
                  {promoApplied ? '✓ Применён' : 'Применить'}
                </button>
              </div>
              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full py-4 rounded-2xl font-semibold text-lg mt-5 flex items-center justify-center gap-2"
              >
                Далее — Доставка <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          )}

          {/* Step 2: Delivery */}
          {step === 2 && (
            <div className="rounded-2xl p-6 animate-fade-in" style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-oswald text-xl font-bold text-white mb-5 flex items-center gap-2">
                <Icon name="Truck" size={20} className="text-neon-orange" /> Способ получения
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {(['delivery', 'pickup'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setDeliveryType(type)}
                    className="p-4 rounded-xl flex flex-col items-center gap-2 transition-all"
                    style={deliveryType === type
                      ? { background: 'rgba(255,107,0,0.15)', border: '2px solid #FF6B00' }
                      : { background: 'rgba(40,40,55,0.5)', border: '2px solid rgba(255,255,255,0.06)' }
                    }
                  >
                    <Icon name={type === 'delivery' ? 'Truck' : 'Store'} size={24} className={deliveryType === type ? 'text-neon-orange' : 'text-gray-400'} />
                    <span className={`font-semibold ${deliveryType === type ? 'text-white' : 'text-gray-400'}`}>
                      {type === 'delivery' ? 'Доставка' : 'Самовывоз'}
                    </span>
                    <span className="text-sm" style={{ color: deliveryType === type ? '#FF6B00' : '#A0A0B4' }}>
                      {type === 'delivery' ? '149 ₽' : 'Бесплатно'}
                    </span>
                  </button>
                ))}
              </div>

              {deliveryType === 'delivery' && (
                <div className="mb-5">
                  <label className="text-gray-400 text-sm mb-2 block">Адрес доставки</label>
                  <input
                    type="text"
                    placeholder="Улица, дом, квартира..."
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                    style={{ background: 'rgba(40,40,55,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>
              )}

              {/* Notifications */}
              <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,107,0,0.05)', border: '1px solid rgba(255,107,0,0.15)' }}>
                <p className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Icon name="Bell" size={18} className="text-neon-orange" /> Уведомления о заказе
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'SMS-уведомления', value: notifSms, setter: setNotifSms },
                    { label: 'Push-уведомления', value: notifPush, setter: setNotifPush },
                  ].map(({ label, value, setter }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{label}</span>
                      <button
                        onClick={() => setter(!value)}
                        className="w-12 h-6 rounded-full transition-all duration-300 relative"
                        style={{ background: value ? 'linear-gradient(135deg, #FF6B00, #FF1E64)' : 'rgba(40,40,55,0.8)' }}
                      >
                        <div
                          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
                          style={{ left: value ? '26px' : '2px' }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="btn-primary w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
              >
                Далее — Оплата <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="rounded-2xl p-6 animate-fade-in" style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-oswald text-xl font-bold text-white mb-5 flex items-center gap-2">
                <Icon name="CreditCard" size={20} className="text-neon-orange" /> Способ оплаты
              </h2>

              <div className="space-y-3 mb-6">
                {[
                  { id: 'card', label: 'Картой онлайн', icon: 'CreditCard', desc: 'Visa, Mastercard, МИР' },
                  { id: 'cash', label: 'Наличными', icon: 'Banknote', desc: 'При получении' },
                  { id: 'online', label: 'СБП / Т-Банк', icon: 'Smartphone', desc: 'Быстрая оплата по QR' },
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPayMethod(method.id as typeof payMethod)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl transition-all"
                    style={payMethod === method.id
                      ? { background: 'rgba(255,107,0,0.15)', border: '2px solid #FF6B00' }
                      : { background: 'rgba(40,40,55,0.5)', border: '2px solid rgba(255,255,255,0.06)' }
                    }
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: payMethod === method.id ? 'rgba(255,107,0,0.2)' : 'rgba(255,255,255,0.05)' }}
                    >
                      <Icon name={method.icon} size={18} className={payMethod === method.id ? 'text-neon-orange' : 'text-gray-400'} />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold ${payMethod === method.id ? 'text-white' : 'text-gray-300'}`}>{method.label}</p>
                      <p className="text-sm text-gray-500">{method.desc}</p>
                    </div>
                    {payMethod === method.id && (
                      <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#FF6B00' }}>
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={handleOrder}
                className="btn-primary w-full py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 animate-pulse-glow"
              >
                Оформить заказ — {total} ₽
                <Icon name="ArrowRight" size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5 sticky top-24 animate-fade-in delay-200" style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-oswald text-lg font-bold text-white mb-4">Итого</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-400">
                <span>Блюда ({items.reduce((s, i) => s + i.qty, 0)} шт.)</span>
                <span className="text-white">{subtotal} ₽</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Доставка</span>
                <span className={delivery === 0 ? 'text-neon-green' : 'text-white'}>
                  {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between" style={{ color: '#00FF87' }}>
                  <span>Промокод −25%</span>
                  <span>−{discount} ₽</span>
                </div>
              )}
            </div>
            <div className="border-t pt-3 mb-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white text-lg">Итого</span>
                <span className="font-bold text-2xl text-gradient">{total} ₽</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Icon name="Clock" size={14} /> Доставка: 25–35 минут
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
