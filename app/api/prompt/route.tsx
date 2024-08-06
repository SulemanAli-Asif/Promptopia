import Prompt from "@models/prompt";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

export const GET = async (req: Request) => {
  try {
    const prisma = new PrismaClient();

    const prompts = await prisma.prompt.findMany({
      include: {
        creator: true,
      },
    });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch response", { status: 500 });
  }
};
