"use client";

import { useEffect, useState } from "react";

type PostItem = {
  id: number;
  title?: string;
  image_url: string;
  category: string;
  notes?: string;
  caption?: string;
  status: string;
  scheduled_at: string;
};

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("san-pham");
  const [notes, setNotes] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [caption, setCaption] = useState("");
  const [items, setItems] = useState<PostItem[]>([]);
  const [message, setMessage] = useState("");

  const loadPosts = async () => {
    const res = await fetch("/api/posts/list");
    const data = await res.json();
    setItems(data.items || []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const makeCaption = async () => {
    setMessage("Đang tạo caption...");
    const res = await fetch("/api/ai/caption", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, notes })
    });
    const data = await res.json();
    setCaption(data.caption || "");
    setMessage("");
  };

  const createPost = async () => {
    setMessage("Đang lưu...");
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, imageUrl, category, notes, caption, scheduledAt })
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Lưu thất bại");
      return;
    }
    setMessage("Đã lưu bài");
    setTitle("");
    setImageUrl("");
    setNotes("");
    setCaption("");
    setScheduledAt("");
    await loadPosts();
  };

  const publishNow = async (id: number) => {
    const res = await fetch("/api/facebook/publish-now", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    setMessage(res.ok ? "Đã đăng bài" : data.error || "Đăng thất bại");
    await loadPosts();
  };

  return (
    <main style={{ maxWidth: 1100, margin: "24px auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
      <section style={{ background: "#fff", padding: 20, borderRadius: 12 }}>
        <h2>Tạo bài đăng</h2>
        <div style={{ display: "grid", gap: 10 }}>
          <input placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: 10 }} />
          <input placeholder="Image URL public" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ padding: 10 }} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 10 }}>
            <option value="san-pham">Sản phẩm</option>
            <option value="khuyen-mai">Khuyến mãi</option>
            <option value="truyen-thong">Truyền thông</option>
            <option value="tin-tuc">Tin tức</option>
          </select>
          <textarea placeholder="Ghi chú cho AI" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} style={{ padding: 10 }} />
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={makeCaption} style={{ padding: 10 }}>AI viết caption</button>
            <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} style={{ padding: 10, flex: 1 }} />
          </div>
          <textarea placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} rows={8} style={{ padding: 10 }} />
          <button onClick={createPost} style={{ padding: 12 }}>Lưu bài hẹn giờ</button>
          {message ? <p>{message}</p> : null}
        </div>
      </section>

      <section style={{ background: "#fff", padding: 20, borderRadius: 12 }}>
        <h2>Danh sách bài</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((item) => (
            <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
              <strong>{item.title || "Không có tiêu đề"}</strong>
              <p><b>Category:</b> {item.category}</p>
              <p><b>Trạng thái:</b> {item.status}</p>
              <p><b>Lịch đăng:</b> {new Date(item.scheduled_at).toLocaleString("vi-VN")}</p>
              <p style={{ whiteSpace: "pre-wrap" }}>{item.caption}</p>
              <button onClick={() => publishNow(item.id)} style={{ padding: 8 }}>Đăng ngay</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
