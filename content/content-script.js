// ScoutMind Content Script
// Injected into web pages to handle DOM interactions and highlighting

import { initWebviewController } from './webview-controller.js';
import { initHighlighter } from './basic-highlighter.js';

// ScoutMind Content Script
// Injected into web pages to handle DOM interactions and highlighting

// Initialize the content script
function initialize() {
    console.log('ScoutMind content script initialized');
    
    // Set up message listener
    chrome.runtime.onMessage.addListener(handleMessage);
  }
  
  // Handle messages from other parts of the extension
  function handleMessage(message, sender, sendResponse) {
    console.log('Content script received message:', message.action);
    
    switch (message.action) {
      case 'highlightElements':
        handleHighlightElements(message.selectors, sendResponse);
        return true; // Indicates async response
        
      case 'getPageContent':
        sendResponse({
          success: true,
          content: document.documentElement.outerHTML
        });
        return false; // Indicates synchronous response
    }
  }
  
  // Handle highlighting elements
  function handleHighlightElements(selectors, sendResponse) {
    try {
      console.log('Highlighting elements with selectors:', selectors);
      
      // Create overlay if needed
      let overlay = document.getElementById('highlight-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'highlight-overlay';
        overlay.className = 'highlight-overlay';
        document.body.appendChild(overlay);
      }
      
      // Clear existing highlights
      overlay.innerHTML = '';
      
      // Process each selector
      selectors.forEach((selector, index) => {
        try {
          // Find elements matching the selector
          const elements = document.querySelectorAll(selector);
          
          elements.forEach(element => {
            // Get element position
            const rect = element.getBoundingClientRect();
            
            // Create highlight rectangle
            const highlight = document.createElement('div');
            highlight.className = 'highlight';
            highlight.style.left = `${rect.left + window.scrollX}px`;
            highlight.style.top = `${rect.top + window.scrollY}px`;
            highlight.style.width = `${rect.width}px`;
            highlight.style.height = `${rect.height}px`;
            highlight.style.borderColor = getColorForIndex(index);
            
            // Add to overlay
            overlay.appendChild(highlight);
          });
        } catch (error) {
          console.error(`Error processing selector "${selector}":`, error);
        }
      });
      
      sendResponse({ success: true, count: overlay.children.length });
    } catch (error) {
      console.error('Error highlighting elements:', error);
      sendResponse({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // Get a color based on index
  function getColorForIndex(index) {
    const colors = [
      '#4285F4', // Google Blue
      '#EA4335', // Google Red
      '#FBBC05', // Google Yellow
      '#34A853', // Google Green
      '#9C27B0', // Purple
      '#FF5722'  // Deep Orange
    ];
    
    return colors[index % colors.length];
  }
  
  // Initialize the content script
  initialize();
  