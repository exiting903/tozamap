
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, PollutionCategory, Language } from "../types";

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const analyzeReportWithGemini = async (
  category: PollutionCategory,
  description: string,
  language: Language
): Promise<AnalysisResult | null> => {
  try {
    // Check if API key is missing
    if (!apiKey || apiKey.includes("your_api_key")) {
        console.error("Gemini API Key is missing or invalid.");
        throw new Error("Invalid API Key");
    }

    const modelId = 'gemini-2.5-flash';
    
    const langName = language === 'ru' ? 'Russian' : language === 'uz' ? 'Uzbek' : 'English';

    const prompt = `
      Analyze this pollution report.
      Category: ${category}
      Description: ${description}
      
      Respond in ${langName}.
      Return strictly valid JSON with:
      - severity (integer 1-10)
      - healthImpact (string, max 15 words)
      - recommendation (string, max 15 words)
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        severity: { type: Type.INTEGER },
        healthImpact: { type: Type.STRING },
        recommendation: { type: Type.STRING }
      },
      required: ["severity", "healthImpact", "recommendation"]
    };

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    let text = response.text;
    if (!text) throw new Error("Empty response from AI");

    // Clean up potential markdown formatting if model adds it despite JSON mime type
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const data = JSON.parse(text) as AnalysisResult;
    return data;

  } catch (error) {
    console.error("Gemini analysis error details:", error);
    
    // Fallback mock response
    const fallbacks = {
        ru: { health: "Требуется оценка.", rec: "Сообщите властям." },
        uz: { health: "Baholash kerak.", rec: "Rasmiylarga xabar bering." },
        en: { health: "Assessment needed.", rec: "Report to authorities." }
    };
    
    // Return a fallback result so the UI doesn't break, but log the error
    return {
      severity: 5,
      healthImpact: fallbacks[language].health,
      recommendation: fallbacks[language].rec
    };
  }
};
