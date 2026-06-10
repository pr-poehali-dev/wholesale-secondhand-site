import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "@/components/sections/NavBar";

export function ContactsSection() {
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

export function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
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
