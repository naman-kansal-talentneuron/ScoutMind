// ScoutMind Messaging System
// Handles communication between different parts of the extension

// Set up message handlers
export function setupMessaging() {
    chrome.runtime.onMessage.addListener(handleMessage);
  }
  
  // Process incoming messages
  function handleMessage(message, sender, sendResponse) {
    console.log('Received message:', message.action);
    
    switch (message.action) {
      case 'checkOllama':
        checkOllamaStatus().then(result => sendResponse(result));
        return true; // Indicates async response
        
      case 'getModels':
        getOllamaModels().then(result => sendResponse(result));
        return true; // Indicates async response
        
      case 'loadUrl':
        // Forward URL loading request to active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'loadUrl',
              url: message.url
            }).then(response => sendResponse(response));
          } else {
            sendResponse({success: false, error: 'No active tab found'});
          }
        });
        return true; // Indicates async response
        
      case 'generatePlan':
        // This will be expanded in later phases
        sendResponse({success: false, error: 'Not implemented yet'});
        return false;
    }
  }
  
  // Check if Ollama is running
  async function checkOllamaStatus() {
    try {
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
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
        headers: {'Content-Type': 'application/json'}
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
  