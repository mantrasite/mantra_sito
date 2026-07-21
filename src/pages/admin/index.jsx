import { useEffect, useState } from "react";

const GROUP_OPTIONS = [
  { value: "menuPranzo", label: "Menu Pranzo" },
  { value: "menu",       label: "Menu Cena"   },
  { value: "bevande",    label: "Vini"        },
  { value: "piscina",    label: "Piscina"     },
];

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [authOk, setAuthOk] = useState(false);
  const [data, setData] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    allergens: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [newSection, setNewSection] = useState({ id: "", title: "", group: "piscina" });
  const [sectionIdEdited, setSectionIdEdited] = useState(false);

  const authHeader = () => "Basic " + btoa(`${user}:${pass}`);

  async function load() {
    try {
      const res = await fetch("/api/admin/menu", {
        headers: { Authorization: authHeader() }
      });

      if (res.status === 401) {
        setAuthOk(false);
        setData(null);
        return;
      }

      const json = await res.json();
      setData(json);
      setAuthOk(true);

      if (!selectedSection && json.menuSections?.length) {
        setSelectedSection(json.menuSections[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (authOk) load();
  }, [authOk]);

  const tryLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/menu", {
        headers: { Authorization: authHeader() }
      });

      if (res.status === 200) {
        const json = await res.json();
        setData(json);
        setAuthOk(true);

        if (!selectedSection && json.menuSections?.length) {
          setSelectedSection(json.menuSections[0].id);
        }
      } else {
        alert("Credenziali non valideeee");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const currentSection = data?.menuSections?.find(
    (s) => s.id === selectedSection
  );

  const items = currentSection?.items || [];

  const onSelectSection = (id) => {
    setSelectedSection(id);
    setEditIndex(null);
    setForm({ name: "", description: "", price: "", allergens: "" });
  };

  const onNewSectionTitleChange = (title) => {
    setNewSection((prev) => ({
      ...prev,
      title,
      id: sectionIdEdited ? prev.id : slugify(title),
    }));
  };

  const onNewSectionIdChange = (id) => {
    setSectionIdEdited(true);
    setNewSection((prev) => ({ ...prev, id }));
  };

  const createSection = async (e) => {
    e.preventDefault();

    if (!newSection.title || !newSection.id) return;

    try {
      const res = await fetch("/api/admin/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader()
        },
        body: JSON.stringify({ section: newSection })
      });

      if (res.ok) {
        setData((prev) => {
          const updated = structuredClone(prev);
          updated.menuSections.push({ ...newSection, items: [] });
          return updated;
        });

        setSelectedSection(newSection.id);
        setNewSection({ id: "", title: "", group: "piscina" });
        setSectionIdEdited(false);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Errore nella creazione della sezione");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCurrentSection = async () => {
    if (!selectedSection) return;
    if (!confirm(`Eliminare l'intera sezione "${currentSection?.title}" e tutte le sue voci?`)) return;

    try {
      const res = await fetch("/api/admin/menu", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader()
        },
        body: JSON.stringify({ sectionId: selectedSection, deleteSection: true })
      });

      if (res.ok) {
        setData((prev) => {
          const updated = structuredClone(prev);
          updated.menuSections = updated.menuSections.filter(
            (s) => s.id !== selectedSection
          );
          setSelectedSection(updated.menuSections[0]?.id || "");
          return updated;
        });

        setEditIndex(null);
        setForm({ name: "", description: "", price: "", allergens: "" });
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Errore nell'eliminazione della sezione");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (index) => {
    const item = items[index];

    setForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      allergens: (item.allergens || []).join(",")
    });

    setEditIndex(index);
  };

  const submit = async (e) => {
    e.preventDefault();

    const item = {
      name: form.name,
      description: form.description,
      price: form.price,
      allergens: form.allergens
        ? form.allergens
            .split(",")
            .map((x) => Number(x.trim()))
            .filter(Boolean)
        : []
    };

    try {
      if (editIndex === null) {
        const res = await fetch("/api/admin/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader()
          },
          body: JSON.stringify({
            sectionId: selectedSection,
            item
          })
        });

        if (res.ok) {
          setData((prev) => {
            const updated = structuredClone(prev);
            const section = updated.menuSections.find(
              (s) => s.id === selectedSection
            );
            section.items.push(item);
            return updated;
          });

          setForm({ name: "", description: "", price: "", allergens: "" });
        }
      } else {
        const res = await fetch("/api/admin/menu", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader()
          },
          body: JSON.stringify({
            sectionId: selectedSection,
            index: editIndex,
            item
          })
        });

        if (res.ok) {
          setData((prev) => {
            const updated = structuredClone(prev);
            const section = updated.menuSections.find(
              (s) => s.id === selectedSection
            );
            section.items[editIndex] = item;
            return updated;
          });

          setEditIndex(null);
          setForm({ name: "", description: "", price: "", allergens: "" });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const moveItem = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];

    try {
      const res = await fetch("/api/admin/menu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader()
        },
        body: JSON.stringify({
          sectionId: selectedSection,
          items: reordered
        })
      });

      if (res.ok) {
        setData((prev) => {
          const updated = structuredClone(prev);
          const section = updated.menuSections.find(
            (s) => s.id === selectedSection
          );
          section.items = reordered;
          return updated;
        });

        setEditIndex(null);
        setForm({ name: "", description: "", price: "", allergens: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (index) => {
    if (!confirm("Eliminare questa voce?")) return;

    try {
      const res = await fetch("/api/admin/menu", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader()
        },
        body: JSON.stringify({
          sectionId: selectedSection,
          index
        })
      });

      if (res.ok) {
  setData(prev => {
    const updated = structuredClone(prev);

    const section = updated.menuSections.find(
      (s) => s.id === selectedSection
    );

    section.items = section.items.filter((_, i) => i !== index);

    return updated;
  });
}
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-4 px-4">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-display uppercase" style={{ color: "var(--color-gold)" }}>
            Admin menu
          </h1>
        </div>

        <div className="grid grid-cols-1">
          <div className="col-span-1 mb-3">
            <div className="bg-white/3 rounded-lg p-6 shadow-md">
              {!authOk ? (
                <form onSubmit={tryLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Utente</label>
                    <input
                      className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white outline-none"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white outline-none"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
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
                <div className="space-y-3">
                  <label className="block text-lg mb-3">Sezione</label>

                  <select
                    className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10"
                    value={selectedSection}
                    onChange={(e) => onSelectSection(e.target.value)}
                  >
                    {data?.menuSections?.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} — {s.group}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={deleteCurrentSection}
                    disabled={!selectedSection}
                    className="w-full py-2 cursor-pointer rounded-md text-sm text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    Elimina sezione
                  </button>

                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm" style={{ color: "var(--color-gold)" }}>
                      + Crea nuova sezione
                    </summary>

                    <form onSubmit={createSection} className="mt-3 space-y-3">
                      <input
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white"
                        value={newSection.title}
                        onChange={(e) => onNewSectionTitleChange(e.target.value)}
                        placeholder="Titolo sezione (es. Piscina)"
                        required
                      />

                      <input
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white"
                        value={newSection.id}
                        onChange={(e) => onNewSectionIdChange(e.target.value)}
                        placeholder="ID sezione (es. piscina)"
                        required
                      />

                      <select
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10"
                        value={newSection.group}
                        onChange={(e) => setNewSection((prev) => ({ ...prev, group: e.target.value }))}
                      >
                        {GROUP_OPTIONS.map((g) => (
                          <option key={g.value} value={g.value}>
                            {g.label}
                          </option>
                        ))}
                      </select>

                      <button
                        type="submit"
                        className="w-full py-2 cursor-pointer rounded-md"
                        style={{ background: "var(--color-gold)", color: "var(--color-ink)" }}
                      >
                        Crea sezione
                      </button>
                    </form>
                  </details>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2">
            {authOk ? (
              <div className="bg-white/3 rounded-lg p-6 shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="mb-3 font-semibold">Voci esistenti</h3>

                    <div className="divide-y divide-white/5 max-h-[60vh] overflow-auto">
                      {items.map((item, i) => (
                        <div key={i} className="py-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium">
                                {item.name} <span className="text-white/60">— {item.price}</span>
                              </div>
                              <div className="text-sm text-white/60">
                                {item.description}
                              </div>
                              {item.allergens?.length ? (
                                <div className="text-xs text-white/50 mt-1">
                                  Allergeni: {item.allergens.join(", ")}
                                </div>
                              ) : null}
                            </div>

                            <div className="flex flex-col gap-2 ml-4">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => moveItem(i, "up")}
                                  disabled={i === 0}
                                  className="px-2 py-1 cursor-pointer rounded-md text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                                  style={{ background: "rgba(255,255,255,0.04)" }}
                                  aria-label="Sposta su"
                                >
                                  ▲
                                </button>
                                <button
                                  onClick={() => moveItem(i, "down")}
                                  disabled={i === items.length - 1}
                                  className="px-2 py-1 cursor-pointer rounded-md text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                                  style={{ background: "rgba(255,255,255,0.04)" }}
                                  aria-label="Sposta giù"
                                >
                                  ▼
                                </button>
                              </div>
                              <button onClick={() => startEdit(i)} className="px-3 py-1 cursor-pointer rounded-md text-sm" style={{ background: "rgba(255,255,255,0.04)" }}>
                                Modifica
                              </button>
                              <button onClick={() => removeItem(i)} className="px-3 py-1 cursor-pointer rounded-md text-sm text-red-400">
                                Elimina
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-semibold">
                      {editIndex === null ? "Aggiungi voce" : "Modifica voce"}
                    </h3>

                    <form onSubmit={submit} className="space-y-3">
                      <input
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Titolo"
                        required
                      />

                      <textarea
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                        placeholder="Descrizione"
                      />

                      <input
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        placeholder="Prezzo"
                      />

                      <input
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white"
                        value={form.allergens}
                        onChange={(e) =>
                          setForm({ ...form, allergens: e.target.value })
                        }
                        placeholder="Allergeni"
                      />

                      <button
                        type="submit"
                        className="px-4 py-2 cursor-pointer rounded-md"
                        style={{ background: "var(--color-gold)", color: "var(--color-ink)" }}
                      >
                        {editIndex === null ? "Aggiungi" : "Salva"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/3 rounded-lg p-6 shadow-md text-white/60">
                Accedi per modificare il menu.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
