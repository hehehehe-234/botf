"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Đăng nhập thất bại");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main style={{ maxWidth: 420, margin: "70px auto", background: "#fff", padding: 24, borderRadius: 12 }}>
      <h2>Đăng nhập admin</h2>
      <div style={{ display: "grid", gap: 12 }}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tên đăng nhập" style={{ padding: 10 }} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" style={{ padding: 10 }} />
        <button onClick={submit} style={{ padding: 12, cursor: "pointer" }}>Đăng nhập</button>
        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      </div>
    </main>
  );
}
