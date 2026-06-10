import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "catalog", label: "Каталог" },
  { id: "portfolio", label: "Портфолио" },
  { id: "conditions", label: "Условия" },
  { id: "documents", label: "Документы" },
  { id: "contacts", label: "Контакты" },
];

export function NavBar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
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

export function Ticker() {
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
