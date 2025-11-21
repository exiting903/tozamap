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
    const modelId = 'gemini-2.5-flash';
    
    const langName = language === 'ru' ? 'Russian' : language === 'uz' ? 'Uzbek' : 'English';

    const prompt = `
      Analyze the following environmental issue report from Uzbekistan.
      Category: ${category}
      Description: ${description}
      
      Provide the output in ${langName} language.
      
      Provide:
      1. Severity score from 1 (minor) to 10 (critical).
      2. Short health impact description (max 15 words).
      3. Recommended action for a local resident (max 15 words).
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        severity: { type: Type.INTEGER, description: "Severity from 1 to 10" },
        healthImpact: { type: Type.STRING, description: `Health impact summary in ${langName}` },
        recommendation: { type: Type.STRING, description: `Actionable advice in ${langName}` }
      },
      required: ["severity", "healthImpact", "recommendation"]
    };

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: `You are an environmental expert assisting the TozaMap community in Uzbekistan. Provide concise, helpful analysis in ${langName}.`
      }
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text) as AnalysisResult;
    return data;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Fallback mock response (Localized basics)
    const fallbacks = {
        ru: { health: "Требуется оценка.", rec: "Сообщите властям." },
        uz: { health: "Baholash kerak.", rec: "Rasmiylarga xabar bering." },
        en: { health: "Assessment needed.", rec: "Report to authorities." }
    };
    return {
      severity: 5,
      healthImpact: fallbacks[language].health,
      recommendation: fallbacks[language].rec
    };
  }
};