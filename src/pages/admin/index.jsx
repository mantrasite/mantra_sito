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
    allergens: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const authHeader = () => "Basic " + btoa(`${user}:${pass}`);

  // --------------------
  // LOAD MENU (FIXED)
  // --------------------
  async function load() {
    try {
      const res = await fetch("/api/admin/menu", {
        cache: "no-store",
        headers: {
          Authorization: authHeader(),
        },
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

  // --------------------
  // AUTO LOAD WHEN AUTH OK
  // --------------------
  useEffect(() => {
    if (authOk) load();
  }, [authOk]);

  // --------------------
  // LOGIN
  // --------------------
  const tryLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/menu", {
      headers: {
        Authorization: authHeader(),
      },
    });

    if (res.status === 200) {
      const json = await res.json();
      setAuthOk(true);
      setData(json);

      if (!selectedSection && json.menuSections?.length) {
        setSelectedSection(json.menuSections[0].id);
      }
    } else {
      setAuthOk(false);
      alert("Credenziali non valide");
    }
  };

  // --------------------
  // SECTION SELECT
  // --------------------
  const onSelectSection = (id) => {
    setSelectedSection(id);
    setEditIndex(null);
    setForm({ name: "", description: "", price: "", allergens: "" });
  };

  // --------------------
  // START EDIT
  // --------------------
  const startEdit = (index) => {
    const section = data.menuSections.find(
      (s) => s.id === selectedSection
    );

    const item = section.items[index];

    setForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      allergens: (item.allergens || []).join(","),
    });

    setEditIndex(index);
  };

  // --------------------
  // SUBMIT (IMPORTANT FIX HERE)
  // --------------------
  const submit = async (e) => {
    e.preventDefault();

    const item = {
      name: form.name,
      description: form.description,
      price: form.price,
    };

    if (form.allergens) {
      item.allergens = form.allergens
        .split(",")
        .map((x) => Number(x.trim()))
        .filter(Boolean);
    }

    const url = "/api/admin/menu";

    const baseOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({
        sectionId: selectedSection,
        item,
      }),
    };

    try {
      if (editIndex === null) {
        await fetch(url, { method: "POST", ...baseOptions });
      } else {
        await fetch(url, {
          method: "PUT",
          ...baseOptions,
          body: JSON.stringify({
            sectionId: selectedSection,
            index: editIndex,
            item,
          }),
        });
      }

      // 🔥 QUESTO È IL FIX FONDAMENTALE
      await load();

      setForm({ name: "", description: "", price: "", allergens: "" });
      setEditIndex(null);
    } catch (err) {
      console.error(err);
    }
  };

  // --------------------
  // DELETE
  // --------------------
  const removeItem = async (index) => {
    if (!confirm("Eliminare questa voce?")) return;

    await fetch("/api/admin/menu", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({
        sectionId: selectedSection,
        index,
      }),
    });

    // 🔥 FIX IMPORTANTE
    await load();
  };

  // --------------------
  // UI (INVARIATA)
  // --------------------
  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-4 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-display uppercase">Admin menu</h1>

        {!authOk ? (
          <form onSubmit={tryLogin}>
            <input value={user} onChange={(e) => setUser(e.target.value)} />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button>Login</button>
          </form>
        ) : (
          <div>
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

            <form onSubmit={submit}>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <button>{editIndex === null ? "Aggiungi" : "Salva"}</button>
            </form>

            <div>
              {data?.menuSections
                ?.find((s) => s.id === selectedSection)
                ?.items?.map((item, i) => (
                  <div key={i}>
                    {item.name}
                    <button onClick={() => startEdit(i)}>Edit</button>
                    <button onClick={() => removeItem(i)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
