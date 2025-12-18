import axios from "axios";

export async function generateAIScript(prompt, language) {
  console.log("🔑 API KEY loaded?", process.env.GROQ_API_KEY ? "YES" : "NO");
  console.log("🚀 Sending request to Groq API...");

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",


        messages: [
          {
            role: "user",
            content: `Write a cinematic storytelling script in ${language}. Prompt: ${prompt}`
          }
        ],
        temperature: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log("❌ Groq API Error:", error.response?.data || error.message);
    throw new Error("Groq API Request Failed");
  }
}
