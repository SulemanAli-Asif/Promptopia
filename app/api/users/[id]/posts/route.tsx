import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        creatorId: parseInt(params.id, 10),
      },
      include: {
        creator: true,
      },
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch response", { status: 500 });
  }
};
