"use server";

import axios from "axios";

export const senPromptToGemini = async ({ prompt }: { prompt: string }) => {
  const req = axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    }
  );

  try {
    let response: string = (await req).data.candidates[0].contents.parts[0]
      .text;

    // format response.
    response = response.replace("```json", "").replace("```", "");

    return JSON.parse(response);
  } catch (error) {
    return { error: "Resposta indisponível" };
  }
};
