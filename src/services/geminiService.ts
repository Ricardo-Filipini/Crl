import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not set in environment variables. Please add it to your .env file or Netlify environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateNickname = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Gere um apelido extremamente cafona e engraçado para um amigo chamado Carlos. Ele se acha o rei da balada, adora uma festa no barco, tem um molejo único com os ombros e mamilos que parecem calabresas. Ele também virou diretor na empresa Odilon de forma misteriosa. Use adjetivos inesperados e combine esses elementos. Seja criativo e zueiro. Retorne apenas o apelido, sem aspas, sem texto adicional, só o apelido puro.",
    });
    const text = response.text;
    if (text) {
      return text.trim();
    }
    throw new Error("A IA não retornou texto.");
  } catch (error) {
    console.error("Error generating nickname:", error);
    return "O Gerador de Apelidos quebrou. Culpa do CRL.";
  }
};

export const generateFunnyImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });
    
    const candidate = response.candidates?.[0];
    if (candidate && candidate.content && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    console.error("Image generation failed, no image data in response:", JSON.stringify(response, null, 2));
    if (response.candidates?.[0]?.finishReason === 'SAFETY') {
        throw new Error("A IA se recusou a criar essa atrocidade por motivos de segurança. O CRL é perigoso demais!");
    }
    
    throw new Error("Não foi possível encontrar uma imagem na resposta da IA. Talvez ela esteja com vergonha.");

  } catch (error) {
    console.error("Error generating funny image:", error);
    if (error instanceof Error) {
      if (error.message.includes("segurança") || error.message.includes("vergonha")) {
          throw error;
      }
    }
    throw new Error("A IA se recusou a criar essa atrocidade. Tente de novo.");
  }
};
