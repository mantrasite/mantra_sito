"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [menu, setMenu] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  const authHeader = () =>
    "Basic " + btoa(username + ":" + password);

  // ------------------------
  // LOAD MENU
  // ------------------------
  const loadMenu = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/menu", {
        headers: {
          Authorization: authHeader(),
        },
      });

      if (!res.ok) throw new Error("Auth error");

      const data = await res.json();
      setMenu(data);
      setLogged(true);
    } catch (e) {
      console.error(e);
      alert("Credenziali errate");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // ADD ITEM
  // ------------------------
  const addItem = async (sectionId) => {
    const name = prompt("Nome piatto:");
    if (!name) return;

    const newItem = {
      name,
      description: "",
      price: "",
      allergens: [],
      badges: [],
    };

    await fetch("/api/admin/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({ sectionId, item: newItem }),
    });

    await loadMenu(); // 🔥 refresh automatico
  };

  // ------------------------
  // DELETE ITEM
  // ------------------------
  const deleteItem = async (sectionId, index) => {
    if (!confirm("Eliminare?")) return;

    await fetch("/api/admin/menu", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({ sectionId, index }),
    });

    await loadMenu(); // 🔥 refresh automatico
  };

  // ------------------------
  // UPDATE ITEM
  // ------------------------
  const updateItem = async (sectionId, index, item) => {
    const newName = prompt("Nuovo nome:", item.name);
    if (!newName) return;

    const updated = { ...item, name: newName };

    await fetch("/api/admin/menu", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({ sectionId, index, item: updated }),
    });

    await loadMenu(); // 🔥 refresh automatico
  };

  // ------------------------
  // LOGIN UI
  // ------------------------
  if (!logged) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Admin Login</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button onClick={loadMenu} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    );
  }

  // ------------------------
  // ADMIN UI
  // ------------------------
  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Menu</h1>

      {!menu && <p>Loading...</p>}

      {menu?.menuSections?.map((section) => (
        <div key={section.id} style={{ marginBottom: 30 }}>
          <h2>
            {section.title}{" "}
            <button onClick={() => addItem(section.id)}>
              Aggiungi
            </button>
          </h2>

          {section.items.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginTop: 5,
              }}
            >
              <b>{item.name}</b>

              <div style={{ marginTop: 5 }}>
                <button
                  onClick={() =>
                    updateItem(section.id, index, item)
                  }
                >
                  Modifica
                </button>

                <button
                  onClick={() =>
                    deleteItem(section.id, index)
                  }
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
