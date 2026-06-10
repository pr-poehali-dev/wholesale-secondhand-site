import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_ITEMS = [
  { id: 1, name: "Партия №А-2241", weight: "2 тонны", items: "Женская одежда сток, Германия", date: "Март 2025", color: "from-orange-900/40 to-orange-950/20" },
  { id: 2, name: "Партия №В-1892", weight: "5 тонн", items: "Смешанный секонд хэнд, Нидерланды", date: "Февраль 2025", color: "from-yellow-900/40 to-yellow-950/20" },
  { id: 3, name: "Партия №С-3310", weight: "1.5 тонны", items: "Детская одежда сток, Польша", date: "Январь 2025", color: "from-green-900/30 to-green-950/20" },
  { id: 4, name: "Партия №D-4450", weight: "3 тонны", items: "Обувь и аксессуары mix, UK", date: "Декабрь 2024", color: "from-blue-900/30 to-blue-950/20" },
];

const DISCOUNT_TIERS = [
  { volume: "50–200 кг", discount: "базовая цена", highlight: false },
  { volume: "200–500 кг", discount: "−5%", highlight: false },
  { volume: "500 кг – 1 т", discount: "−10%", highlight: false },
  { volume: "1–3 тонны", discount: "−15%", highlight: true },
  { volume: "от 3 тонн", discount: "−20% + бонусы", highlight: true },
];

const DOCUMENTS = [
  { icon: "FileCheck", name: "Сертификат соответствия ГОСТ", desc: "Подтверждает соответствие товара российским стандартам качества" },
  { icon: "Award", name: "Декларация о происхождении", desc: "Официальный документ о стране производства и поставщике" },
  { icon: "ClipboardList", name: "Акт сортировки и оценки", desc: "Подробный акт по каждой партии: состав, категории, кондиция" },
  { icon: "Scale", name: "Ветеринарные свидетельства", desc: "Обязательные документы для товаров животного происхождения" },
  { icon: "BookOpen", name: "Паспорт партии", desc: "Полная история партии: откуда, сколько, каким транспортом" },
  { icon: "Star", name: "Отзывы и рекомендации", desc: "Письма от постоянных клиентов и партнёров о качестве работы" },
];

function CounterNumber({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { setVal(target); clearInterval(timer); }
          else setVal(Math.floor(current));
        }, 20);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-6">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-8 h-0.5" style={{ backgroundColor: "#FF5C1A" }} />
        <span className="font-ibm text-xs uppercase tracking-widest font-medium" style={{ color: "#FF5C1A" }}>Портфолио</span>
      </div>
      <h2 className="font-oswald text-5xl font-bold mb-4 leading-tight text-white">
        ПРИМЕРЫ<br />
        <span style={{ color: "#FF5C1A" }}>ПАРТИЙ</span>
      </h2>
      <p className="font-ibm text-base max-w-xl mb-12" style={{ color: "rgba(255,255,255,0.5)" }}>
        Реальные партии, которые мы поставили нашим клиентам. Каждая партия — с документами и актом приёмки.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PORTFOLIO_ITEMS.map((item) => (
          <div key={item.id} className="relative rounded-xl overflow-hidden group cursor-pointer" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className={`bg-gradient-to-br ${item.color} p-6 min-h-[220px] flex flex-col justify-between`}>
              <div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <Icon name="Boxes" size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
                </div>
                <h3 className="font-oswald font-bold text-lg mb-1 text-white">{item.name}</h3>
                <p className="font-ibm text-sm leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>{item.items}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-oswald text-2xl font-bold" style={{ color: "#FF5C1A" }}>{item.weight}</span>
                  <span className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.date}</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: "rgba(255,92,26,0.05)" }}>
              <span className="font-oswald font-bold text-sm px-4 py-2 rounded text-white" style={{ border: "1px solid rgba(255,255,255,0.3)" }}>Подробнее</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { target: 150, suffix: "+", label: "партий отгружено" },
          { target: 500, suffix: " т", label: "общий вес поставок" },
          { target: 98, suffix: "%", label: "довольных клиентов" },
          { target: 1200, suffix: "+", label: "партнёров" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="font-oswald text-4xl font-bold" style={{ color: "#FF5C1A" }}>
              <CounterNumber target={s.target} suffix={s.suffix} />
            </div>
            <div className="font-ibm text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ConditionsSection() {
  return (
    <section id="conditions" className="py-24" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-0.5" style={{ backgroundColor: "#FF5C1A" }} />
          <span className="font-ibm text-xs uppercase tracking-widest font-medium" style={{ color: "#FF5C1A" }}>Условия работы</span>
        </div>
        <h2 className="font-oswald text-5xl font-bold mb-4 leading-tight text-white">
          ОПТОВЫЕ ЗАКУПКИ<br />
          <span style={{ color: "#FF5C1A" }}>И СКИДКИ</span>
        </h2>
        <p className="font-ibm mb-12 max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
          Чем больше заказ — тем ниже цена. Накопительная система лояльности для постоянных клиентов.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-oswald text-2xl font-semibold mb-6 text-white">Таблица скидок по объёму</h3>
            <div className="space-y-3">
              {DISCOUNT_TIERS.map((tier, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4 rounded-xl transition-all"
                  style={{
                    border: tier.highlight ? "1px solid rgba(255,92,26,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: tier.highlight ? "rgba(255,92,26,0.1)" : "rgba(255,255,255,0.03)"
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.highlight ? "#FF5C1A" : "rgba(255,255,255,0.2)" }} />
                    <span className="font-ibm text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{tier.volume}</span>
                  </div>
                  <span className="font-oswald font-bold text-lg" style={{ color: tier.highlight ? "#FF5C1A" : "rgba(255,255,255,0.6)" }}>
                    {tier.discount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-oswald text-2xl font-semibold mb-6 text-white">Условия оформления</h3>
            <div className="space-y-4">
              {[
                { icon: "CreditCard", title: "Оплата", desc: "100% предоплата или рассрочка для постоянных клиентов (от 3-х покупок)" },
                { icon: "FileText", title: "Договор", desc: "Заключаем официальный договор поставки. Работаем с ИП и ООО, предоставляем все закрывающие документы" },
                { icon: "Truck", title: "Доставка", desc: "Самовывоз с нашего склада или доставка ТК: СДЭК, ПЭК, Деловые линии, Энергия" },
                { icon: "RefreshCw", title: "Возврат", desc: "Замена товара ненадлежащего качества в течение 7 дней после получения партии" },
                { icon: "PackageCheck", title: "Минимальный заказ", desc: "Одежда и обувь — от 50 кг, аксессуары — от 50 единиц" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(255,92,26,0.15)" }}>
                    <Icon name={item.icon} size={18} style={{ color: "#FF5C1A" }} />
                  </div>
                  <div>
                    <h4 className="font-ibm font-semibold text-sm mb-1 text-white">{item.title}</h4>
                    <p className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DocumentsSection() {
  return (
    <section id="documents" className="py-24 max-w-7xl mx-auto px-6">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-8 h-0.5" style={{ backgroundColor: "#FF5C1A" }} />
        <span className="font-ibm text-xs uppercase tracking-widest font-medium" style={{ color: "#FF5C1A" }}>Документы</span>
      </div>
      <h2 className="font-oswald text-5xl font-bold mb-4 leading-tight text-white">
        КАЧЕСТВО<br />
        <span style={{ color: "#FF5C1A" }}>И ПОДЛИННОСТЬ</span>
      </h2>
      <p className="font-ibm mb-12 max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
        Мы предоставляем полный пакет документов для каждой партии. Прозрачность — наш главный принцип.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {DOCUMENTS.map((doc, i) => (
          <div key={i} className="rounded-xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,92,26,0.1)" }}>
                <Icon name={doc.icon} size={22} style={{ color: "#FF5C1A" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-ibm font-semibold text-sm leading-tight text-white">{doc.name}</h3>
                  <span className="text-xs font-oswald font-semibold px-1.5 rounded flex-shrink-0" style={{ color: "rgba(255,92,26,0.7)", border: "1px solid rgba(255,92,26,0.2)" }}>PDF</span>
                </div>
                <p className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{doc.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,92,26,0.2)" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,92,26,0.2)", boxShadow: "0 0 20px rgba(255,92,26,0.3)" }}>
          <Icon name="ShieldCheck" size={32} style={{ color: "#FF5C1A" }} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-oswald text-2xl font-bold mb-2 text-white">Запросить документы по партии</h3>
          <p className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Вышлем полный пакет документов по любой партии в течение 1 рабочего дня</p>
        </div>
        <button
          onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
          className="px-6 py-3 font-oswald font-semibold tracking-wide rounded flex-shrink-0 text-white transition-all"
          style={{ backgroundColor: "#FF5C1A" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e04d12")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF5C1A")}
        >
          Запросить
        </button>
      </div>
    </section>
  );
}
