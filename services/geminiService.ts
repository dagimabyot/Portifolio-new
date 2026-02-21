
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  generateProjectDescription: async (title: string, skills: string[]) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a professional 2-sentence description for a portfolio project titled "${title}" using these technologies: ${skills.join(', ')}. Keep it impactful and results-oriented.`,
      });
      return response.text || "Failed to generate description.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Error generating description with AI.";
    }
  },

  improveBio: async (currentBio: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Improve this professional portfolio bio to be more engaging and authoritative: "${currentBio}". Use a modern, professional tone. Keep it under 100 words.`,
      });
      return response.text || currentBio;
    } catch (error) {
      console.error("Gemini Error:", error);
      return currentBio;
    }
  }
};
