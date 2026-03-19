import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCaption(input: {
  category: string;
  notes?: string;
  title?: string;
}) {
  const prompt = `
Viết caption Facebook bằng tiếng Việt cho 1 page doanh nghiệp.
Category: ${input.category}
Tiêu đề: ${input.title || ""}
Ghi chú: ${input.notes || ""}

Yêu cầu:
- Tự nhiên, rõ ý, dễ đăng
- 1 đoạn chính + 1 CTA ngắn
- 3 đến 5 hashtag phù hợp
- Không dùng emoji quá dày
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8
  });

  return res.choices[0]?.message?.content?.trim() || "";
}
