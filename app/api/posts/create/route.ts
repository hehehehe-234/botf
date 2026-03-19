import { createServerSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { title, imageUrl, category, notes, caption, scheduledAt } = await req.json();

  if (!imageUrl || !category || !scheduledAt) {
    return Response.json({ error: "Thiếu dữ liệu bắt buộc" }, { status: 400 });
  }

  const supabase = createServerSupabase();
  const { error } = await supabase.from("posts").insert({
    title,
    image_url: imageUrl,
    category,
    notes,
    caption,
    scheduled_at: new Date(scheduledAt).toISOString(),
    status: "pending"
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
