// ScoutMind Ollama Connector
// Handles communication with locally installed Ollama LLMs

// Default Ollama settings
const OLLAMA_HOST = 'http://localhost:11434';
const DEFAULT_MODEL = 'llama2';

// Check if Ollama is running
export async function checkOllamaStatus() {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return { running: response.ok };
  } catch (error) {
    console.error('Error checking Ollama status:', error);
    return { running: false, error: error.message };
  }
}

// Get available Ollama models
export async function getAvailableModels() {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }
    
    const data = await response.json();
    return { success: true, models: data.models || [] };
  } catch (error) {
    console.error('Error getting Ollama models:', error);
    return { success: false, error: error.message };
  }
}

// Generate text using Ollama
export async function generateText(model, prompt, options = {}) {
  try {
    console.log(`Generating text with model: ${model}`);
    
    // Default options
    const defaultOptions = {
      temperature: 0.7,
      top_p: 0.9,
      max_tokens: 2048
    };
    
    // Merge with user options
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Request body
    const body = {
      model: model || DEFAULT_MODEL,
      prompt: prompt,
      options: mergedOptions
    };
    
    // Make the request
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      text: data.response,
      modelName: model,
      metadata: {
        promptTokens: data.prompt_eval_count,
        completionTokens: data.eval_count,
        totalTokens: data.prompt_eval_count + data.eval_count
      }
    };
  } catch (error) {
    console.error('Error generating text with Ollama:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
