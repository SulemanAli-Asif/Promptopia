import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: parseInt(params.id) },
      include: { creator: true },
    });

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch response", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();

  try {
    const existingPrompt = await prisma.prompt.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!existingPrompt) {
      new Response("Prompt not found", { status: 404 });
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id: parseInt(params.id) },
      data: { prompt, tag },
    });

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch response", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await prisma.prompt.delete({
      where: { id: parseInt(params.id) },
    });

    return new Response("Prompt deleted", { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch response", { status: 500 });
  }
};
