// ScoutMind Background Service Worker
// Handles communication with Ollama and other background tasks

import { setupMessaging } from './messaging.js';

// Initialize the extension
function initialize() {
  console.log('ScoutMind background service worker initialized');
  setupMessaging();
}

// Check if Ollama is running on localhost
async function checkOllamaStatus() {
  try {
    const response = await fetch('http://localhost:11434/api/tags', {
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
async function getOllamaModels() {
  try {
    const response = await fetch('http://localhost:11434/api/tags', {
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

// Initialize extension when service worker loads
initialize();
