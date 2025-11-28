import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ChatMessage, StudyPlanResponse } from "../types";

const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

// System instructions based on language
const getSystemInstruction = (lang: 'en' | 'ar') => {
  if (lang === 'ar') {
    return "You are an expert academic tutor for students in the Arab world. You speak fluent Arabic (Modern Standard) and understand the educational curriculum context in the MENA region. Be encouraging, precise, and culturally relevant.";
  }
  return "You are an expert academic study planner and tutor. Be concise, actionable, and encouraging.";
};

export const generateStudyPlan = async (subject: string, hours: number, lang: 'en' | 'ar' = 'en'): Promise<StudyPlanResponse | null> => {
  if (!ai) return null;

  const prompt = lang === 'ar' 
    ? `قم بإنشاء خطة دراسية منظمة لمدة ${hours} ساعة لموضوع: ${subject}.`
    : `Create a structured ${hours}-hour study plan for ${subject}.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            overview: { type: Type.STRING },
            tasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  task: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["To Do", "In Progress", "Done"] }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as StudyPlanResponse;
    }
    return null;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const sendChatMessage = async (
  history: ChatMessage[],
  newMessage: string,
  lang: 'en' | 'ar' = 'en'
): Promise<string> => {
  if (!ai) return lang === 'ar' ? "مفتاح API مفقود." : "API Key missing.";

  try {
    const context = history.map(h => `${h.role === 'user' ? 'Student' : 'Tutor'}: ${h.text}`).join('\n');
    const prompt = `
    Previous conversation:
    ${context}
    
    Student: ${newMessage}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang)
      }
    });

    return response.text || (lang === 'ar' ? "لم أفهم ذلك." : "I didn't catch that.");
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return lang === 'ar' ? "أواجه مشكلة في الاتصال حالياً." : "I'm having trouble connecting right now.";
  }
};

export const generatePersonaResponse = async (
  name: string,
  roleDescription: string,
  recentHistory: { sender: 'me' | 'other'; text: string }[],
  lastMessage: string,
  lang: 'en' | 'ar'
): Promise<string> => {
  if (!ai) return lang === 'ar' ? "غير متصل" : "Offline";

  const conversationHistory = recentHistory
    .map(msg => `${msg.sender === 'me' ? 'User' : name}: ${msg.text}`)
    .join('\n');

  const systemPrompt = lang === 'ar'
    ? `أنت تلعب دور ${name}، وهي ${roleDescription}. تحدث بالعربية. كن مفيدًا وواقعيًا في سياق محادثة تطبيق تعليمي. اجعل ردودك قصيرة وطبيعية.`
    : `You are roleplaying as ${name}, a ${roleDescription}. Be helpful, realistic in an educational app context. Keep responses concise and natural (like a chat message).`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
      Conversation History:
      ${conversationHistory}
      
      User: ${lastMessage}
      
      ${name}:`,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "...";
  } catch (error) {
    console.error("Persona Chat Error:", error);
    return "...";
  }
};
