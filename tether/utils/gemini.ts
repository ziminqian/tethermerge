import axios, { AxiosResponse } from "axios";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("Warning: Gemini API key not found. Please set EXPO_PUBLIC_GEMINI_API_KEY in your environment.");
}

// Use v1 API endpoint - more stable than v1beta
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1";

async function draftMessageViaREST(
  friendName: string,
  userInput: string,
  conversationHistory: Array<{ text: string; isAI: boolean }> = []
): Promise<string> {
  // Build conversation context
  let conversationContext = '';
  if (conversationHistory.length > 0) {
    conversationContext = '\n\nPrevious conversation:\n';
    conversationHistory.forEach((msg) => {
      conversationContext += `${msg.isAI ? 'AI' : 'User'}: ${msg.text}\n`;
    });
  }

  const prompt = `You are Tether AI, a helpful assistant that helps people navigate difficult conversations with friends and loved ones.

Your task is to draft a short, warm, and authentic message that the user can send to ${friendName} to invite them to have a conversation on Tether.

Context: ${userInput}${conversationContext}

Guidelines for the message:

- Keep it brief and personal (2-4 sentences)

- Be warm, genuine, and non-confrontational

- Focus on connection and understanding

- Avoid being overly formal or clinical

- Make it feel like a real message from a friend

- Include an invitation to talk on Tether

Draft the message as if the user is writing it directly to ${friendName}. Return ONLY the message text itself - no explanations, no quotes, no additional text. Just the message that can be sent directly.`;

  // First, try to list available models to see what's actually available
  let availableModels: string[] = [];
  try {
    const listUrl = `${GEMINI_API_BASE}/models?key=${API_KEY}`;
    const listResponse: AxiosResponse<{ models?: Array<{ name?: string }> }> = await axios.get(listUrl);
    availableModels = (listResponse.data.models || [])
      .map(model => {
        const fullName = model.name || "";
        // Extract model name from full path like "models/gemini-pro" or just "gemini-pro"
        return fullName.split("/").pop() || "";
      })
      .filter(name => name && name.includes("gemini") && name.includes("generateContent") === false);

    console.log("[REST] Available Gemini models:", availableModels);
  } catch (listError) {
    console.log("[REST] Could not list models, using defaults", listError);
  }

  // Try different model names in order of preference
  // Start with models that were listed, then fall back to common names
  const defaultModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
  const modelNames = availableModels.length > 0 ? availableModels : defaultModels;

  let lastError: Error | null = null;

  for (const modelName of modelNames) {
    try {
      const url = `${GEMINI_API_BASE}/models/${modelName}:generateContent?key=${API_KEY}`;
      
      console.log(`[REST] Attempting to call ${modelName}...`);
      
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };

      const response: AxiosResponse<{
        candidates?: Array<{
          content?: {
            parts?: Array<{
              text?: string;
            }>;
          };
        }>;
      }> = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error("No response text from Gemini API");
      }

      // Extract just the message if it's wrapped in quotes
      let message = text.trim();
      if (message.startsWith('"') && message.endsWith('"')) {
        message = message.slice(1, -1);
      }
      if (message.startsWith("'") && message.endsWith("'")) {
        message = message.slice(1, -1);
      }

      console.log(`[REST] Successfully generated message using ${modelName}`);
      return message;

    } catch (modelError) {
      // Handle axios errors
      if (axios.isAxiosError(modelError)) {
        const errorMsg = modelError.response?.data?.error?.message || modelError.message;
        lastError = new Error(errorMsg);
        console.log(`[REST] Model ${modelName} failed, trying next...`, errorMsg);
      } else {
        lastError = modelError instanceof Error ? modelError : new Error(String(modelError));
        console.log(`[REST] Model ${modelName} failed, trying next...`, lastError.message);
      }

      // Continue to next model
      continue;
    }
  }

  // If all models failed, throw the last error with a helpful message
  if (lastError) {
    throw new Error(
      `Failed to connect to Gemini API with any available model. Last error: ${lastError.message}. ` +
      `Please check your API key and ensure it has access to Gemini models.`
    );
  }

  throw new Error("Unable to connect to Gemini API. No models available.");
}

/**
 * Drafts a message to send to a friend using Gemini AI
 * @param friendName - The name of the friend to send the message to
 * @param userInput - What the user wants to talk about
 * @param conversationHistory - Previous messages in the conversation (optional)
 * @returns The drafted message text
 */
export async function draftMessage(
  friendName: string,
  userInput: string,
  conversationHistory: Array<{ text: string; isAI: boolean }> = []
): Promise<string> {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY environment variable.');
  }

  // Build conversation context
  let conversationContext = '';
  if (conversationHistory.length > 0) {
    conversationContext = '\n\nPrevious conversation:\n';
    conversationHistory.forEach((msg) => {
      conversationContext += `${msg.isAI ? 'AI' : 'User'}: ${msg.text}\n`;
    });
  }

  // Create the prompt for drafting a message
  const prompt = `You are Tether AI, a helpful assistant that helps people navigate difficult conversations with friends and loved ones.

Your task is to draft a short, warm, and authentic message that the user can send to ${friendName} to invite them to have a conversation on Tether.

Context: ${userInput}${conversationContext}

Guidelines for the message:

- Keep it brief and personal (2-4 sentences)

- Be warm, genuine, and non-confrontational

- Focus on connection and understanding

- Avoid being overly formal or clinical

- Make it feel like a real message from a friend

- Include an invitation to talk on Tether

Draft the message as if the user is writing it directly to ${friendName}. Return ONLY the message text itself - no explanations, no quotes, no additional text. Just the message that can be sent directly.`;

  // Use REST API approach directly (more reliable in React Native)
  // Skip SDK for now as it may have compatibility issues
  try {
    console.log('[REST] Attempting to generate message via REST API...');
    return await draftMessageViaREST(friendName, userInput, conversationHistory);
  } catch (error) {
    console.error('[REST] Error calling Gemini API:', error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes("404") || error.message.includes("not found")) {
        throw new Error(
          `Model not found. Please verify your API key has access to Gemini models. ` +
          `Error: ${error.message}`
        );
      }

      if (error.message.includes("403") || error.message.includes("permission")) {
        throw new Error(
          `API key permission denied. Please check your API key is valid and has the correct permissions. ` +
          `Error: ${error.message}`
        );
      }

      if (error.message.includes("401") || error.message.includes("unauthorized")) {
        throw new Error(
          `Invalid API key. Please check your EXPO_PUBLIC_GEMINI_API_KEY. ` +
          `Error: ${error.message}`
        );
      }

      if (error.message.includes("quota") || error.message.includes("rate limit") || error.message.includes("429")) {
        throw new Error('API quota exceeded. Please try again later.');
      }
    }
    
    throw error;
  }
}

/**
 * Gets an AI response for expectations conversations
 * @param userMessage - The user's message/question
 * @param conversationHistory - Previous messages in the conversation (optional)
 * @returns The AI response text
 */
export async function getExpectationsAIResponse(
  userMessage: string,
  conversationHistory: Array<{ text: string; isAI: boolean }> = []
): Promise<string> {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Please set EXPO_PUBLIC_GEMINI_API_KEY environment variable.');
  }

  // Build conversation context
  let conversationContext = '';
  if (conversationHistory.length > 0) {
    conversationContext = '\n\nPrevious conversation:\n';
    conversationHistory.forEach((msg) => {
      conversationContext += `${msg.isAI ? 'AI' : 'User'}: ${msg.text}\n`;
    });
  }

  const prompt = `You are Tether AI, a helpful assistant that helps people set clear expectations for difficult conversations with friends and loved ones.

Your role is to help users:

• Stay grounded in what they can control

• Prepare for different outcomes

• Communicate with clarity and intention

• Protect their emotional well-being

${conversationContext}User: ${userMessage}

AI:`;

  // First, try to list available models to see what's actually available
  let availableModels: string[] = [];
  try {
    const listUrl = `${GEMINI_API_BASE}/models?key=${API_KEY}`;
    const listResponse: AxiosResponse<{ models?: Array<{ name?: string }> }> = await axios.get(listUrl);
    availableModels = (listResponse.data.models || [])
      .map(model => {
        const fullName = model.name || "";
        return fullName.split("/").pop() || "";
      })
      .filter(name => name && name.includes("gemini") && name.includes("generateContent") === false);

    console.log("[REST] Available Gemini models for expectations:", availableModels);
  } catch (listError) {
    console.log("[REST] Could not list models, using defaults", listError);
  }

  // Try different model names in order of preference
  const defaultModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
  const modelNames = availableModels.length > 0 ? availableModels : defaultModels;

  let lastError: Error | null = null;

  for (const modelName of modelNames) {
    try {
      const url = `${GEMINI_API_BASE}/models/${modelName}:generateContent?key=${API_KEY}`;
      
      console.log(`[REST] Attempting to call ${modelName} for expectations...`);
      
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };

      const response: AxiosResponse<{
        candidates?: Array<{
          content?: {
            parts?: Array<{
              text?: string;
            }>;
          };
        }>;
      }> = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error("No response text from Gemini API");
      }

      console.log(`[REST] Successfully generated expectations response using ${modelName}`);
      return text.trim();

    } catch (modelError) {
      // Handle axios errors
      if (axios.isAxiosError(modelError)) {
        const errorMsg = modelError.response?.data?.error?.message || modelError.message;
        lastError = new Error(errorMsg);
        console.log(`[REST] Model ${modelName} failed for expectations, trying next...`, errorMsg);
      } else {
        lastError = modelError instanceof Error ? modelError : new Error(String(modelError));
        console.log(`[REST] Model ${modelName} failed for expectations, trying next...`, lastError.message);
      }

      // Continue to next model
      continue;
    }
  }

  // If all models failed, throw the last error with a helpful message
  if (lastError) {
    throw new Error(
      `Failed to connect to Gemini API with any available model. Last error: ${lastError.message}. ` +
      `Please check your API key and ensure it has access to Gemini models.`
    );
  }

  throw new Error("Unable to connect to Gemini API. No models available.");
}
