import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/314ddd35-f56e-4174-94ca-7b36b091abe5/files/d0bd42d6-45bf-4780-981a-212a6b7ddf5c.jpg";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "catalog", label: "Каталог" },
  { id: "portfolio", label: "Портфолио" },
  { id: "conditions", label: "Условия" },
  { id: "documents", label: "Документы" },
  { id: "contacts", label: "Контакты" },
];

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

function NavBar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/85 backdrop-blur-xl border-b border-white/10" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => handleNav("home")} className="font-oswald text-2xl font-bold tracking-wider text-white">
          STOCK<span style={{ color: "#FF5C1A" }}>PRO</span>
        </button>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className={`font-ibm text-sm font-medium transition-colors hover:text-white ${active === l.id ? "text-white" : "text-white/55"}`}
              style={active === l.id ? { color: "#FF5C1A" } : {}}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("contacts")}
            className="ml-2 px-5 py-2 font-oswald font-semibold text-sm rounded tracking-wide transition-colors text-white"
            style={{ backgroundColor: "#FF5C1A" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e04d12")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF5C1A")}
          >
            Получить прайс
          </button>
        </div>
        <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => handleNav(l.id)} className="text-left font-ibm text-sm text-white/80 hover:text-white py-1 transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={() => handleNav("contacts")} className="mt-2 px-5 py-2.5 font-oswald font-semibold text-sm rounded tracking-wide text-white" style={{ backgroundColor: "#FF5C1A" }}>
            Получить прайс
          </button>
        </div>
      )}
    </nav>
  );
}

function Ticker() {
  const items = ["СТОК", "СЕКОНД ХЭН", "ОПТОВЫЕ ПОСТАВКИ", "ЕВРОПЕЙСКИЕ БРЕНДЫ", "ГАРАНТИЯ КАЧЕСТВА", "БЫСТРАЯ ОТГРУЗКА", "ОТ 50 КГ"];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="py-2.5 ticker-wrapper" style={{ backgroundColor: "#FF5C1A" }}>
      <div className="ticker-inner">
        {repeated.map((item, i) => (
          <span key={i} className="font-oswald font-semibold text-white text-sm tracking-[0.2em] mx-8">
            {item} <span className="opacity-60 mx-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

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

function HeroSection() {
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

function AboutSection() {
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

function CatalogSection() {
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

function PortfolioSection() {
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

function ConditionsSection() {
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

function DocumentsSection() {
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

function ContactsSection() {
  const [form, setForm] = useState({ name: "", phone: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacts" className="py-24" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-0.5" style={{ backgroundColor: "#FF5C1A" }} />
          <span className="font-ibm text-xs uppercase tracking-widest font-medium" style={{ color: "#FF5C1A" }}>Контакты</span>
        </div>
        <h2 className="font-oswald text-5xl font-bold mb-12 leading-tight text-white">
          СВЯЖИТЕСЬ<br />
          <span style={{ color: "#FF5C1A" }}>С НАМИ</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(0,230,118,0.2)" }}>
                  <Icon name="CheckCircle" size={32} style={{ color: "#00E676" }} />
                </div>
                <h3 className="font-oswald text-2xl font-bold mb-2 text-white">Заявка отправлена!</h3>
                <p className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Наш менеджер свяжется с вами в течение 1 рабочего дня</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm font-ibm underline" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-oswald text-xl font-semibold mb-6 text-white">Оставить заявку</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Имя *", placeholder: "Иван Петров", required: true },
                    { key: "phone", label: "Телефон *", placeholder: "+7 (999) 123-45-67", required: true },
                    { key: "company", label: "Компания", placeholder: "ООО «Название»", required: false },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="font-ibm text-xs mb-1.5 block uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{field.label}</label>
                      <input
                        required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg px-4 py-3 font-ibm text-sm text-white outline-none transition-colors"
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(255,92,26,0.5)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-ibm text-xs mb-1.5 block uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>Сообщение</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Расскажите, что вас интересует..."
                      className="w-full rounded-lg px-4 py-3 font-ibm text-sm text-white outline-none transition-colors resize-none"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(255,92,26,0.5)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 font-oswald font-semibold text-base tracking-wide rounded-lg text-white transition-all"
                    style={{ backgroundColor: "#FF5C1A" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e04d12")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF5C1A")}
                  >
                    Отправить заявку
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-oswald text-xl font-semibold mb-5 text-white">Контактная информация</h3>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "info@stockpro.ru" },
                  { icon: "MapPin", label: "Адрес склада", value: "Москва, Рязанский проспект, 75" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00–18:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,92,26,0.1)" }}>
                      <Icon name={c.icon} size={18} style={{ color: "#FF5C1A" }} />
                    </div>
                    <div>
                      <div className="font-ibm text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</div>
                      <div className="font-ibm text-sm font-medium text-white">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="font-oswald text-lg font-semibold mb-4 text-white">Мессенджеры</h3>
              <div className="flex gap-3">
                {[
                  { name: "WhatsApp", bg: "rgba(34,197,94,0.2)", border: "rgba(34,197,94,0.3)", color: "#4ade80" },
                  { name: "Telegram", bg: "rgba(59,130,246,0.2)", border: "rgba(59,130,246,0.3)", color: "#60a5fa" },
                  { name: "Viber", bg: "rgba(168,85,247,0.2)", border: "rgba(168,85,247,0.3)", color: "#c084fc" },
                ].map((m) => (
                  <button key={m.name} className="flex-1 py-3 rounded-lg font-ibm font-semibold text-sm transition-all hover:scale-105" style={{ backgroundColor: m.bg, border: `1px solid ${m.border}`, color: m.color }}>
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,214,0,0.2)" }}>
              <div className="flex gap-3">
                <Icon name="Zap" size={22} className="flex-shrink-0 mt-0.5" style={{ color: "#FFD600" }} />
                <div>
                  <h4 className="font-oswald font-semibold text-base mb-1" style={{ color: "#FFD600" }}>Быстрый ответ</h4>
                  <p className="font-ibm text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>Среднее время ответа — 30 минут в рабочее время. Срочные вопросы — по телефону.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <footer className="py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-oswald text-2xl font-bold tracking-wider mb-1 text-white">
              STOCK<span style={{ color: "#FF5C1A" }}>PRO</span>
            </div>
            <p className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Оптовые поставки сток и секонд хэнд</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => { onNavigate(l.id); document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className="font-ibm text-xs transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="font-ibm text-xs text-center md:text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2025 StockPro<br />Все права защищены
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-ibm">
      <NavBar active={activeSection} onNavigate={setActiveSection} />
      <HeroSection />
      <Ticker />
      <AboutSection />
      <CatalogSection />
      <PortfolioSection />
      <ConditionsSection />
      <DocumentsSection />
      <ContactsSection />
      <Footer onNavigate={setActiveSection} />
    </div>
  );
}
