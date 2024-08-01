import { connectDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import Prompt from "@models/prompt";

export const POST = async (req:any,res:any) =>{

    const {userId, prompt, tag} = await req.json();

    try{
        await connectDB();

        const newPrompt  = new Prompt ({
            creator: userId,
            prompt,
            tag
        })
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    }
    catch(err)
    {
       return new Response (JSON.stringify(err), {status: 500})
    }
}