import { useEffect, useState } from "react";

const MACRO_GROUPS = [
  { group: "menuPranzo", label: "Menu Pranzo" },
  { group: "menu",      label: "Menu Cena"  },
  { group: "bevande",   label: "Vini"       },
];

export default function AdminPage() {
  const [user, setUser]               = useState("danilo");
  const [pass, setPass]               = useState("danilo");
  const [authOk, setAuthOk]           = useState(false);
  const [data, setData]               = useState(null);
  const [selectedSection, setSelectedSection] = useState("");
  const [form, setForm]               = useState({ name: "", description: "", price: "", allergens: "" });
  const [editIndex, setEditIndex]     = useState(null);

  const authHeader = () => "Basic " + btoa(`${user}:${pass}`);

  async function load() {
    try {
      const res  = await fetch("/api/admin/menu", { headers: { Authorization: authHeader() } });
      if (res.status === 401) { setAuthOk(false); setData(null); return; }
      const json = await res.json();
      setData(json);
      setAuthOk(true);
      if (!selectedSection && json.menuSections?.length)
        setSelectedSection(json.menuSections[0].id);
    } catch (e) { console.error(e); }
  }

  useEffect(() => { if (authOk) load(); }, [authOk]);

  const tryLogin = async (e) => {
    e.preventDefault();
    try {
      const res  = await fetch("/api/admin/menu", { headers: { Authorization: authHeader() } });
      if (res.status === 200) {
        const json = await res.json();
        setData(json);
        setAuthOk(true);
        if (!selectedSection && json.menuSections?.length)
          setSelectedSection(json.menuSections[0].id);
      } else {
        setAuthOk(false);
        alert("Credenziali non valide");
      }
    } catch (err) { console.error(err); }
  };

  const onSelectSection = (id) => {
    setSelectedSection(id);
    setEditIndex(null);
    setForm({ name: "", description: "", price: "", allergens: "" });
  };

  const startEdit = (index) => {
    const section = data.menuSections.find((s) => s.id === selectedSection);
    const item    = section.items[index];
    setForm({
      name:        item.name        || "",
      description: item.description || "",
      price:       item.price       || "",
      allergens:   (item.allergens  || []).join(","),
    });
    setEditIndex(index);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!selectedSection) return alert("Seleziona una sottocategoria");

    const item = { name: form.name, description: form.description, price: form.price };
    if (form.allergens)
      item.allergens = form.allergens.split(",").map((x) => Number(x.trim())).filter(Boolean);

    try {
      const method = editIndex === null ? "POST" : "PUT";
      const body   = editIndex === null
        ? { sectionId: selectedSection, item }
        : { sectionId: selectedSection, index: editIndex, item };

      const res = await fetch("/api/admin/menu", {
        method,
        headers: { "Content-Type": "application/json", Authorization: authHeader() },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await load();
        setForm({ name: "", description: "", price: "", allergens: "" });
        setEditIndex(null);
      }
    } catch (err) { console.error(err); }
  };

  const removeItem = async (index) => {
    if (!confirm("Eliminare questa voce?")) return;
    try {
      const res = await fetch("/api/admin/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: authHeader() },
        body: JSON.stringify({ sectionId: selectedSection, index }),
      });
      if (res.ok) await load();
    } catch (e) { console.error(e); }
  };

  const currentItems = data?.menuSections?.find((s) => s.id === selectedSection)?.items ?? [];

  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-4 px-4">
      <div className="w-full max-w-5xl">

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-display uppercase" style={{ color: "var(--color-gold)" }}>
            Admin menu
          </h1>
        </div>

        <div className="grid grid-cols-1">
          {/* ── Login / Select sezione ── */}
          <div className="col-span-1 mb-3">
            <div className="bg-white/3 rounded-lg p-6 shadow-md">
              {!authOk ? (
                <form onSubmit={tryLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Utente</label>
                    <input
                      className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white outline-none"
                      value={user} onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white outline-none"
                      value={pass} onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 cursor-pointer rounded-md"
                    style={{ background: "var(--color-gold)", color: "var(--color-ink)" }}
                  >
                    Accedi
                  </button>
                </form>
              ) : (
                <div>
                  <label className="block text-lg mb-3">Sezione</label>
                  <select
                    className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10"
                    value={selectedSection}
                    onChange={(e) => onSelectSection(e.target.value)}
                  >
                    {MACRO_GROUPS.map(({ group, label }) => {
                      const sections = data?.menuSections?.filter((s) => s.group === group) ?? [];
                      if (!sections.length) return null;
                      return (
                        <optgroup key={group} label={label}>
                          {sections.map((s) => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* ── Voci + form ── */}
          <div className="col-span-2">
            {authOk ? (
              <div className="bg-white/3 rounded-lg p-6 shadow-md">
                <div class
