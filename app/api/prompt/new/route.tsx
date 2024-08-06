// api/prompt/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const { userId, prompt, tag } = await req.json();

    const newPrompt = await prisma.prompt.create({
      data: {
        creatorId: parseInt(userId, 10),
        prompt,
        tag,
      },
    });

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
