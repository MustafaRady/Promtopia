import { connectToDB } from "@utils/datrabase";
import Prompt from "@models/prompt";
export const POST = async (req)=>{
    const { prompt, userId, tag } = await req.json();
    
    try{
        await connectToDB();
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201});
    }catch(e){
        return new Response("Error: " + e.message,{status:500});
    }
}