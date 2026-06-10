import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/314ddd35-f56e-4174-94ca-7b36b091abe5/files/d0bd42d6-45bf-4780-981a-212a6b7ddf5c.jpg";

const STATS = [
  { value: "8+", label: "лет на рынке" },
  { value: "1200+", label: "партнёров" },
  { value: "50 кг", label: "мин. заказ" },
  { value: "48 ч", label: "отгрузка" },
];

const ADVANTAGES = [
  { icon: "Package", title: "Крупный склад", desc: "Более 500 тонн товара в наличии — одежда, обувь, аксессуары. Постоянные поступления из Европы и Азии." },
  { icon: "ShieldCheck", title: "Гарантия качества", desc: "Каждая партия проходит сортировку и проверку. Предоставляем сертификаты и акты качества." },
  { icon: "Truck", title: "Быстрая доставка", desc: "Отгрузка в течение 48 часов после оплаты. Работаем со всеми транспортными компаниями РФ." },
  { icon: "Percent", title: "Гибкие скидки", desc: "Система скидок от объёма закупки. Постоянным клиентам — персональные условия и приоритет." },
  { icon: "Globe", title: "Международные поставки", desc: "Сертифицированный импорт из Германии, Нидерландов, Польши и Великобритании." },
  { icon: "Users", title: "Личный менеджер", desc: "Каждому клиенту — персональный менеджер. Помогаем с выбором, оформлением и отгрузкой." },
];

const CATALOG_CATEGORIES = ["Все", "Сток", "Секонд хэнд", "Одежда", "Обувь", "Аксессуары", "Детское"];

const CATALOG_ITEMS = [
  { id: 1, name: "Мужские куртки — Сток", category: "Сток", type: "Одежда", minWeight: "50 кг", price: "от 180 ₽/кг", badge: "Хит", badgeColor: "bg-neon-orange text-white" },
  { id: 2, name: "Женские платья — Секонд", category: "Секонд хэнд", type: "Одежда", minWeight: "30 кг", price: "от 90 ₽/кг", badge: "Новое", badgeColor: "bg-neon-yellow text-black" },
  { id: 3, name: "Детская одежда mix", category: "Детское", type: "Одежда", minWeight: "25 кг", price: "от 120 ₽/кг", badge: null, badgeColor: "" },
  { id: 4, name: "Кроссовки Европа — Сток", category: "Сток", type: "Обувь", minWeight: "100 пар", price: "от 350 ₽/пара", badge: "Хит", badgeColor: "bg-neon-orange text-white" },
  { id: 5, name: "Джинсы — Секонд", category: "Секонд хэнд", type: "Одежда", minWeight: "50 кг", price: "от 110 ₽/кг", badge: null, badgeColor: "" },
  { id: 6, name: "Сумки и рюкзаки mix", category: "Аксессуары", type: "Аксессуары", minWeight: "50 шт", price: "от 200 ₽/шт", badge: "Новое", badgeColor: "bg-neon-yellow text-black" },
  { id: 7, name: "Зимняя одежда — Сток", category: "Сток", type: "Одежда", minWeight: "100 кг", price: "от 220 ₽/кг", badge: null, badgeColor: "" },
  { id: 8, name: "Обувь mix — Секонд", category: "Секонд хэнд", type: "Обувь", minWeight: "50 пар", price: "от 150 ₽/пара", badge: null, badgeColor: "" },
];

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(15,13,11,0.5) 50%, rgb(15,13,11) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgb(15,13,11) 0%, transparent 40%, rgba(15,13,11,0.7) 100%)" }} />
      </div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255,92,26,0.06)" }} />
      <div className="absolute bottom-1/3 left-20 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255,214,0,0.05)", animationDelay: "2s" }} />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 animate-fade-in" style={{ border: "1px solid rgba(255,92,26,0.4)", backgroundColor: "rgba(255,92,26,0.1)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#FF5C1A" }} />
            <span className="font-ibm text-xs font-medium tracking-widest uppercase" style={{ color: "#FF5C1A" }}>Оптовые поставки</span>
          </div>
          <h1 className="font-oswald text-6xl md:text-8xl font-bold leading-none mb-6 animate-fade-in animate-delay-100 text-white">
            СТОК &<br />
            <span style={{ color: "#FF5C1A" }}>СЕКОНД</span><br />
            ХЭН
          </h1>
          <p className="font-ibm text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-fade-in animate-delay-200" style={{ color: "rgba(255,255,255,0.6)" }}>
            Оптовые партии европейской одежды, обуви и аксессуаров. Прямые поставки без посредников — от 50 кг.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-300">
            <button
              onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 text-white font-oswald font-semibold text-base tracking-wide rounded transition-all hover:scale-105"
              style={{ backgroundColor: "#FF5C1A", boxShadow: "0 0 30px rgba(255,92,26,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e04d12")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF5C1A")}
            >
              Смотреть каталог
            </button>
            <button
              onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 font-oswald font-semibold text-base tracking-wide rounded transition-all text-white"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              Получить прайс
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 animate-fade-in animate-delay-500">
          {STATS.map((s, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-oswald text-3xl md:text-4xl font-bold" style={{ color: "#FF5C1A" }}>{s.value}</div>
              <div className="font-ibm text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5" style={{ backgroundColor: "#FF5C1A" }} />
            <span className="font-ibm text-xs uppercase tracking-widest font-medium" style={{ color: "#FF5C1A" }}>О компании</span>
          </div>
          <h2 className="font-oswald text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            8 ЛЕТ НА<br />
            <span style={{ color: "#FF5C1A" }}>РЫНКЕ</span> СТОК
          </h2>
          <p className="font-ibm text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Мы — крупный оптовый поставщик сток и секонд хэнд товаров с прямыми контрактами с европейскими сортировочными центрами. Работаем с розничными магазинами, маркетплейсами и оптовыми базами по всей России.
          </p>
          <p className="font-ibm text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            Наш склад площадью 5000 м² расположен в Москве. Мы контролируем качество каждой партии и предоставляем полный пакет документов для вашего бизнеса.
          </p>
          <div className="flex flex-col gap-3">
            {["Прямые поставки из Европы без посредников", "Полный пакет документов для любой партии", "Индивидуальные условия для постоянных клиентов"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,92,26,0.2)" }}>
                  <Icon name="Check" size={12} style={{ color: "#FF5C1A" }} />
                </div>
                <span className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {ADVANTAGES.map((a, i) => (
            <div key={i} className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(255,92,26,0.15)" }}>
                <Icon name={a.icon} size={20} style={{ color: "#FF5C1A" }} />
              </div>
              <h3 className="font-oswald font-semibold text-base mb-1.5 text-white">{a.title}</h3>
              <p className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState("Все");

  const filtered = activeFilter === "Все"
    ? CATALOG_ITEMS
    : CATALOG_ITEMS.filter(item => item.category === activeFilter || item.type === activeFilter);

  return (
    <section id="catalog" className="py-24" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5" style={{ backgroundColor: "#FF5C1A" }} />
              <span className="font-ibm text-xs uppercase tracking-widest font-medium" style={{ color: "#FF5C1A" }}>Каталог товаров</span>
            </div>
            <h2 className="font-oswald text-5xl font-bold leading-tight text-white">
              ВСЕ КАТЕГОРИИ<br />
              <span style={{ color: "#FF5C1A" }}>ТОВАРОВ</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATALOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-ibm font-medium transition-all text-white"
                style={activeFilter === cat
                  ? { backgroundColor: "#FF5C1A" }
                  : { border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-xl p-5 relative group cursor-pointer transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {item.badge && (
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-oswald font-semibold ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(255,92,26,0.1)" }}>
                <Icon name="Archive" size={22} style={{ color: "#FF5C1A" }} />
              </div>
              <h3 className="font-oswald font-semibold text-base mb-3 leading-tight text-white">{item.name}</h3>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="Scale" size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                  <span className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>от {item.minWeight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Tag" size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                  <span className="font-ibm text-xs font-semibold" style={{ color: "#FFD600" }}>{item.price}</span>
                </div>
              </div>
              <button
                className="w-full py-2 font-oswald text-sm font-semibold rounded transition-all"
                style={{ border: "1px solid rgba(255,92,26,0.3)", color: "#FF5C1A" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FF5C1A"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#FF5C1A"; }}
              >
                Запросить цену
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
