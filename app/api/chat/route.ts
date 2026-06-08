import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { chat, toServerSentEventsResponse } from "@tanstack/ai";
// import { geminiText } from "@tanstack/ai-gemini";
import { groqText } from "@tanstack/ai-groq";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// const emailSchema = z.object({
//     subject: z.string().describe("The subject of the email"),
//     body: z.string().describe("The body of the email"),
// });

const sysPrompt = `
You are an email-writing assistant.

Your only task is to write emails.

The user will provide:
- The email request
- A tone: Casual, Formal, or Business

VALID REQUESTS:
- Write an email...
- Draft an email...
- Compose an email...
- Create an email...

INVALID REQUESTS:
- Questions unrelated to email writing
- Code generation
- General conversation
- Social media posts
- Messages that are not explicitly emails

IF THE REQUEST IS INVALID:
Respond exactly with:

INVALID_REQUEST

IF THE REQUEST IS VALID:

Use the tone specified by the user:

CASUAL:
- Friendly
- Natural
- Warm
- Conversational

FORMAL:
- Professional
- Polite
- Respectful
- Traditional business writing

BUSINESS:
- Direct
- Professional
- Efficient
- Executive-style communication

Output ONLY the email in the following format:

Subject: <subject line>

<email body>

Do not use markdown.
Do not wrap the response in JSON.
Do not explain your reasoning.
Do not include anything before or after the email.
`;

// export async function POST(request: Request) {
//   const { messages } = await request.json();

//   const stream = chat({
//     adapter: geminiText("gemini-3.5-flash"),
//     systemPrompts: [sysPrompt],
//     messages,
//     stream: true,
//   });

//   return toServerSentEventsResponse(stream);
// }
export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  const session = request.cookies.get("session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userEmail, sessionId } = JSON.parse(session.value);
  // const [user] = await db.selectDistinct().from(usersTable).where(and(eq(usersTable.email, userEmail), eq(usersTable.sessionId, sessionId)));
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, userEmail));
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!user.sessionId || user.sessionId !== sessionId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stream = chat({
    adapter: groqText("llama-3.1-8b-instant"),
    systemPrompts: [sysPrompt],
    messages,
    stream: true,
  });

  return toServerSentEventsResponse(stream);

  // const sseResponse = toServerSentEventsResponse(stream);

  // // Force Next.js / edge infra not to buffer
  // const headers = new Headers(sseResponse.headers);
  // headers.set("Cache-Control", "no-cache, no-transform");
  // headers.set("X-Accel-Buffering", "no"); // disables nginx buffering too

  // return new NextResponse(sseResponse.body, {
  //   status: sseResponse.status,
  //   headers,
  // });
}