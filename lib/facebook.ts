export async function publishPhotoPost(input: {
  imageUrl: string;
  caption: string;
}) {
  const pageId = process.env.FACEBOOK_PAGE_ID!;
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN!;

  const form = new URLSearchParams();
  form.set("url", input.imageUrl);
  form.set("caption", input.caption);
  form.set("access_token", token);

  const res = await fetch(`https://graph.facebook.com/${pageId}/photos`, {
    method: "POST",
    body: form
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data?.error?.message || "Facebook publish failed");
  }

  return data as { post_id?: string; id?: string };
}
