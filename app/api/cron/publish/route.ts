import { createServerSupabase } from "@/lib/supabase";
import { publishPhotoPost } from "@/lib/facebook";

export async function GET(req: Request) {
  const auth = new URL(req.url).searchParams.get("secret");
  if (auth !== process.env.CRON_SECRET) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = createServerSupabase();
  const now = new Date().toISOString();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "pending")
    .lte("scheduled_at", now)
    .order("scheduled_at", { ascending: true })
    .limit(10);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const results = [];

  for (const post of posts || []) {
    try {
      const fb = await publishPhotoPost({
        imageUrl: post.image_url,
        caption: post.caption || ""
      });

      await supabase.from("posts").update({
        status: "posted",
        published_at: new Date().toISOString(),
        facebook_post_id: fb.post_id || fb.id || null
      }).eq("id", post.id);

      results.push({ id: post.id, ok: true });
    } catch (e: any) {
      results.push({ id: post.id, ok: false, error: e.message || "failed" });
    }
  }

  return Response.json({ ok: true, results });
}
