import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";
import { NextApiRequest } from "next";

//get 

export const GET = async (req:Request,{params}:{params:{id:string}}) => {
    try{
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt)
        {
            return new Response("Prompt not found", {status: 404});
        }
        return new Response(JSON.stringify(prompt), {status: 200});
    }
    catch(err)
    {
        return new Response("Failed to fetch response", {status: 500});
        }
};

//patch

export const PATCH = async (req:Request,{params}:{params:{id:string}}) => {
    const {prompt ,tag} = await req.json();

    try{
        await connectDB();

        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            new Response("Prompt not found", {status: 404});
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});

    }
    catch(err)
    {
        return new Response("Failed to fetch response", {status: 500});
    }
}

//delete

export const DELETE = async (req:Request,{params}:{params:{id:string}}) => {

    try{
        await connectDB();
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted", {status: 200});
    }
    catch(err)
    {
        return new Response("Failed to fetch response", {status: 500});
    }
};