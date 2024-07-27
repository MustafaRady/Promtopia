import { connectToDB } from "@utils/datrabase";
import Prompt from "@models/prompt";
import { request } from "express";


export const GET = async(req , {params})=>{
    try{
        console.log("hello")
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator')
        
        if(!prompt){
            return new Response("Error: Prompt not found",{status:404});    
        }

        return new Response(JSON.stringify(prompt),{status:200});
    }catch(e){
        return new Response("Error: " + e.message,{status:500});
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        console.log(params.id)
        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500});
    }
};