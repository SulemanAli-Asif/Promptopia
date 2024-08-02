import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";
import { NextApiRequest } from "next";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch response", { status: 500 });
  }
};
