// Import the required modules from the openai package
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

// Create a new Configuration object with the API key passed in as an environment variable
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a new OpenAIApi object with the Configuration object
const openai = new OpenAIApi(configuration);

export async function askOpenAI({ prompt, spinner }) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "The following is a transscript of a youtube video. Give a quick summary" },
        { "role": "user", "content": prompt }
      ]
    });
    spinner.success()
    console.log(`\n${completion.data.choices[0].message.content}\n`)

  } catch (error) {
    spinner.success()
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}