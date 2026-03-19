import { createServerSupabase } from "@/lib/supabase";
import { publishPhotoPost } from "@/lib/facebook";

export async function POST(req: Request) {
  const { id } = await req.json();
  const supabase = createServerSupabase();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    return Response.json({ error: "Không tìm thấy bài" }, { status: 404 });
  }

  try {
    const fb = await publishPhotoPost({
      imageUrl: post.image_url,
      caption: post.caption || ""
    });

    await supabase.from("posts").update({
      status: "posted",
      published_at: new Date().toISOString(),
      facebook_post_id: fb.post_id || fb.id || null
    }).eq("id", id);

    return Response.json({ ok: true, facebook: fb });
  } catch (e: any) {
    return Response.json({ error: e.message || "Publish failed" }, { status: 500 });
  }
}
