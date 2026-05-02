import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { sanitizeInput, validateInput, checkRateLimit } from "../utils/security";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Safety settings to prevent harmful content generation
const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const SYSTEM_INSTRUCTION = `You are VoteWise AI, a strictly neutral and factual educational assistant specializing in Indian Elections and the democratic process.

Your ONLY topic of expertise is:
- Indian electoral process (ECI, EVMs, VVPAT, NOTA)
- Indian Constitution (especially Articles 324-329, 80-81, 84, 173)
- Representation of the People Act, 1951
- Election laws, Model Code of Conduct
- Voter registration and rights

STRICT RULES:
1. Be completely politically neutral. Never favor any political party, leader, or ideology.
2. If asked about non-election topics, politely redirect to election-related content.
3. Cite relevant constitutional articles or laws when answering.
4. Keep answers concise and accurate.`;

/**
 * Gets a response from Google Gemini AI for Indian election queries.
 * @param {string} rawPrompt - User's raw input
 * @param {string} mode - Learning mode (Simple, Student, Exam, First Voter)
 * @param {string} language - Response language
 * @returns {Promise<string>} AI response text
 */
export const getGeminiResponse = async (rawPrompt, mode = "Simple", language = "English") => {
  // 1. Rate limiting check
  const rateCheck = checkRateLimit();
  if (!rateCheck.allowed) {
    return `Please wait ${rateCheck.waitTime} second(s) before sending another message.`;
  }

  // 2. Validate input
  const validation = validateInput(rawPrompt);
  if (!validation.valid) {
    return `Input error: ${validation.error}`;
  }

  // 3. Sanitize input
  const prompt = sanitizeInput(rawPrompt);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: SAFETY_SETTINGS,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const modeInstructions = {
      Simple: "Use very simple, friendly language suitable for the general public.",
      Student: "Provide educational and explanatory answers, like a classroom teacher.",
      Exam: "Focus on key facts: article numbers, act names (RP Act 1951), dates, and exam-relevant details for UPSC/SSC.",
      "First Voter": "Be encouraging and provide practical, step-by-step guidance for someone voting for the first time.",
    };

    const fullPrompt = `
[Mode: ${mode}] [Language: ${language}]
${modeInstructions[mode] || modeInstructions.Simple}
${language !== "English" ? `Respond in ${language}.` : ""}

User Question: ${prompt}
    `;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API_KEY_INVALID")) {
      return "Configuration error: Invalid API key. Please contact support.";
    }
    if (error.message?.includes("QUOTA_EXCEEDED")) {
      return "The AI service is currently busy. Please try again in a moment!";
    }
    return "I'm having trouble connecting right now. Please try again in a moment!";
  }
};
