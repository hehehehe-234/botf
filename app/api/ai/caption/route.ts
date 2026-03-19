import { generateCaption } from "@/lib/openai";

export async function POST(req: Request) {
  const body = await req.json();
  const caption = await generateCaption({
    title: body.title,
    category: body.category,
    notes: body.notes
  });
  return Response.json({ caption });
}
