import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
getBody("META","Software Engineer")
export default async function getBody(company:string,jobTitle:string){
    const options = {
      method: 'POST',
      url: process.env.URL,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b189440816mshcf25427c3e251b2p12b09ajsn0311b1f58c16',
        'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: 'hello'
          }
        ],
        system_prompt: `Generate an email body for ${jobTitle} at ${company}`,
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
    } catch (error) {
        console.error(error);
    }
    
    
    

}