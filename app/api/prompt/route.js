import { connectToDB } from "@utils/datrabase";
import Prompt from "@models/prompt";


export const GET = async(req)=>{
    try{
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts),{status:200});
    }catch(e){
        return new Response("Error: " + e.message,{status:500});
    }
}