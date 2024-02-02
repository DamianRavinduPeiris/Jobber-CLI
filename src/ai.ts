import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function getBody(company:string,jobTitle:string){
    const options = {
      method: 'POST',
      url: process.env.URL,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST
      },
      data: {
        messages: [
          {
            role: 'user',
            content: `Generate an email body for ${jobTitle} at ${company} only using 100 words.`
          }
        ],
        system_prompt: `Generate an email body for ${jobTitle} at ${company} only using 100 words.`,
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data.result);
        return response.data.result;
    } catch (error) {
        console.error(error);
    }
    
    
    

}