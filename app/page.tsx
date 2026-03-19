import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 820, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 12 }}>
      <h1>FB Page Bot Final</h1>
      <p>Web nội bộ cho 1 admin, 1 Facebook Page, dữ liệu lưu trên Supabase.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/login">Đăng nhập</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
