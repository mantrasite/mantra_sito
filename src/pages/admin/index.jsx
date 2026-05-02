import { useEffect, useState } from "react";

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

  const authHeader = () => "Basic " + btoa(`${user}:${pass}`);

  // -------------------
  // LOAD DATA
  // -------------------
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

  // -------------------
  // LOGIN
  // -------------------
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
        alert("Credenziali non valide");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------
  // SECTION SELECT
  // -------------------
  const currentSection = data?.menuSections?.find(
    (s) => s.id === selectedSection
  );

  const items = currentSection?.items || [];

  const onSelectSection = (id) => {
    setSelectedSection(id);
    setEditIndex(null);
    setForm({ name: "", description: "", price: "", allergens: "" });
  };

  // -------------------
  // EDIT START
  // -------------------
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

  // -------------------
  // SUBMIT (ADD / EDIT)
  // -------------------
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
      // ADD
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
      }

      // EDIT
      else {
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

  // -------------------
  // DELETE
  // -------------------
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
        setData((prev) => {
          const updated = structuredClone(prev);

          const section = updated.menuSections.find(
            (s) => s.id === selectedSection
          );

          section.items.splice(index, 1);

          return updated;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // -------------------
  // UI
  // -------------------
  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-4 px-4">
      <div className="w-full max-w-5xl">

        <h1 className="text-2xl mb-4" style={{ color: "var(--color-gold)" }}>
          Admin menu
        </h1>

        {/* LOGIN */}
        {!authOk ? (
          <form onSubmit={tryLogin} className="space-y-3">
            <input
              placeholder="utente"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">Accedi</button>
          </form>
        ) : (
          <>
            {/* SELECT SECTION */}
            <select
              value={selectedSection}
              onChange={(e) => onSelectSection(e.target.value)}
            >
              {data?.menuSections?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>

            {/* LIST */}
            <div>
              {items.map((item, i) => (
                <div key={i}>
                  <b>{item.name}</b> - {item.price}

                  <button onClick={() => startEdit(i)}>Edit</button>
                  <button onClick={() => removeItem(i)}>Delete</button>
                </div>
              ))}
            </div>

            {/* FORM */}
            <form onSubmit={submit}>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="nome"
              />

              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="descrizione"
              />

              <input
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                placeholder="prezzo"
              />

              <input
                value={form.allergens}
                onChange={(e) =>
                  setForm({ ...form, allergens: e.target.value })
                }
                placeholder="allergeni"
              />

              <button type="submit">
                {editIndex === null ? "Aggiungi" : "Salva"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
