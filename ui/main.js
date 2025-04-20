// ScoutMind Main UI Controller
// Central UI initialization and coordination

import { initSplitPane } from './components/split-pane.js';
import { initUrlBar } from './components/url-bar.js';
import { initStatusIndicator, updateStatus } from './components/status-indicator.js';
import { checkOllamaStatus, getAvailableModels } from '../llm/ollama-connector.js';
import { getSettings, saveSettings } from '../utils/storage.js';
import { initLogger, info, error } from '../utils/logger.js';

// Initialize the UI
async function initializeUI() {
  try {
    // Initialize logger
    initLogger();
    info('Initializing ScoutMind UI');
    
    // Initialize components
    initSplitPane();
    initUrlBar();
    initStatusIndicator();
    
    // Check Ollama status
    const ollamaStatus = await checkOllamaStatus();
    if (ollamaStatus.running) {
      info('Ollama is running');
      updateStatus('ready', 'Ollama is ready');
      
      // Get available models
      const modelsResult = await getAvailableModels();
      if (modelsResult.success) {
        info(`Found ${modelsResult.models.length} Ollama models`);
      } else {
        warn('Failed to get Ollama models:', modelsResult.error);
      }
    } else {
      warn('Ollama is not running:', ollamaStatus.error);
      updateStatus('error', 'Ollama is not running');
    }
    
    // Set up extract button
    const extractBtn = document.getElementById('extract-btn');
    if (extractBtn) {
      extractBtn.addEventListener('click', handleExtract);
    }
    
    // Load settings
    const settings = await getSettings();
    info('Settings loaded', settings);
    
    // Set up message listener
    chrome.runtime.onMessage.addListener(handleMessage);
    
    info('ScoutMind UI initialized successfully');
  } catch (e) {
    error('Error initializing ScoutMind UI:', e);
    updateStatus('error', 'Failed to initialize ScoutMind');
  }
}

// Handle extract button click
async function handleExtract() {
  try {
    const instructionInput = document.getElementById('instruction-input');
    const urlInput = document.getElementById('url-input');
    
    if (!instructionInput || !urlInput) {
      throw new Error('Form elements not found');
    }
    
    const instruction = instructionInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!instruction) {
      updateStatus('error', 'Please enter an instruction');
      return;
    }
    
    if (!url) {
      updateStatus('error', 'Please enter a URL');
      return;
    }
    
    // Update status
    updateStatus('loading', 'Generating extraction plan...');
    
    // This will be expanded in later phases
    // For now, just simulate a delay and update status
    setTimeout(() => {
      updateStatus('ready', 'Extraction plan ready');
    }, 2000);
  } catch (e) {
    error('Error handling extract:', e);
    updateStatus('error', `Error: ${e.message}`);
  }
}

// Handle messages from background script
function handleMessage(message, sender, sendResponse) {
  info('Received message:', message);
  
  switch (message.action) {
    case 'statusUpdate':
      updateStatus(message.statusType, message.statusMessage);
      break;
      
    // Add more message handlers as needed
  }
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeUI);
