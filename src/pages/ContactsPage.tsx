import Icon from '@/components/ui/icon';

const faqs = [
  { q: 'Как долго длится доставка?', a: 'Среднее время доставки — 25–35 минут. Точное время зависит от загруженности ресторана и вашего адреса.' },
  { q: 'Можно ли отследить курьера?', a: 'Да! После подтверждения заказа доступен трекер курьера в реальном времени с картой и оценкой времени прибытия.' },
  { q: 'Какой минимальный заказ?', a: 'Минимальная сумма заказа зависит от ресторана — от 350 до 800 ₽. Информация указана на странице каждого заведения.' },
  { q: 'Как применить промокод?', a: 'Введите промокод в поле при оформлении заказа. Скидка применяется автоматически. Попробуй ВКУСНО25 — 25% на первый заказ!' },
  { q: 'Как получать уведомления о заказе?', a: 'При оформлении заказа вы можете включить SMS и Push-уведомления. Мы сообщим о каждом этапе — принят, готовится, в пути, доставлен.' },
];

export default function ContactsPage() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-16 max-w-5xl mx-auto">
      <div className="mb-10 animate-fade-in">
        <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-2">
          СВЯЗАТЬСЯ <span className="text-gradient">С НАМИ</span>
        </h1>
        <p className="text-gray-400">Поможем с заказом 24/7</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {[
          { icon: 'Phone', title: 'Телефон', value: '8 800 123-45-67', desc: 'Бесплатно, 24/7', color: '#FF6B00' },
          { icon: 'MessageCircle', title: 'Telegram / WhatsApp', value: '@vkusno_support', desc: 'Ответим за 5 минут', color: '#FF1E64' },
          { icon: 'Mail', title: 'Email', value: 'help@vkusno.ru', desc: 'Ответ в течение часа', color: '#FFDC00' },
          { icon: 'MapPin', title: 'Офис', value: 'ул. Ленина, 1', desc: 'Пн–Пт 9:00–18:00', color: '#00FF87' },
        ].map((c, i) => (
          <div
            key={c.title}
            className="p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
            style={{
              background: 'rgba(22,22,30,0.8)',
              border: `1px solid ${c.color}25`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.color}15` }}
            >
              <Icon name={c.icon} size={24} style={{ color: c.color }} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{c.title}</p>
              <p className="font-semibold text-white text-lg">{c.value}</p>
              <p className="text-xs mt-0.5" style={{ color: c.color }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Write to us */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div
          className="rounded-2xl p-6 animate-fade-in delay-300"
          style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="font-oswald text-2xl font-bold text-white mb-5">Написать нам</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Ваше имя</label>
              <input
                type="text"
                placeholder="Иван"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition focus:border-neon-orange"
                style={{ background: 'rgba(40,40,55,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Телефон или email</label>
              <input
                type="text"
                placeholder="+7 (999) 000-00-00"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none"
                style={{ background: 'rgba(40,40,55,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
            <div>
              <label className="text-gray-500 text-sm mb-1.5 block">Сообщение</label>
              <textarea
                rows={4}
                placeholder="Опишите ваш вопрос..."
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none resize-none"
                style={{ background: 'rgba(40,40,55,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
            </div>
            <button className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              Отправить <Icon name="Send" size={16} />
            </button>
          </div>
        </div>

        {/* Delivery info */}
        <div
          className="rounded-2xl p-6 animate-fade-in delay-400"
          style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="font-oswald text-2xl font-bold text-white mb-5">Условия доставки</h2>
          <div className="space-y-4">
            {[
              { icon: 'Clock', title: 'Время работы', value: 'Круглосуточно, 24/7', color: '#FF6B00' },
              { icon: 'Truck', title: 'Зона доставки', value: 'В радиусе 15 км от центра', color: '#FF1E64' },
              { icon: 'Package', title: 'Стоимость доставки', value: 'от 0 до 149 ₽', color: '#FFDC00' },
              { icon: 'Zap', title: 'Экспресс-доставка', value: 'За 20 минут +99 ₽', color: '#00FF87' },
              { icon: 'Star', title: 'Бесплатная доставка', value: 'При заказе от 1500 ₽', color: '#FF6B00' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15` }}
                >
                  <Icon name={item.icon} size={16} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{item.title}</p>
                  <p className="font-medium text-white text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="animate-fade-in delay-500">
        <h2 className="font-oswald text-3xl font-bold text-white mb-6">
          ЧАСТЫЕ <span className="text-gradient">ВОПРОСЫ</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl overflow-hidden"
              style={{ background: 'rgba(22,22,30,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
                <span className="font-semibold text-white">{faq.q}</span>
                <Icon name="ChevronDown" size={18} className="text-gray-500 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
