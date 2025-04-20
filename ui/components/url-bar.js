// ScoutMind URL Bar Component
// Handles URL input and loading functionality

// Initialize the URL bar component
export function initUrlBar() {
    console.log('Initializing URL bar');
    
    const urlInput = document.getElementById('url-input');
    const loadUrlBtn = document.getElementById('load-url-btn');
    const extractBtn = document.getElementById('extract-btn');
    
    if (!urlInput || !loadUrlBtn) {
      console.error('URL bar elements not found');
      return;
    }
    
    // Set up event listeners
    loadUrlBtn.addEventListener('click', () => handleLoadUrl());
    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleLoadUrl();
      }
    });
    
    // Enable extract button when URL is entered
    urlInput.addEventListener('input', () => {
      const hasUrl = urlInput.value.trim() !== '';
      extractBtn.disabled = !hasUrl;
    });
    
    // Handle URL loading
    function handleLoadUrl() {
      const url = urlInput.value.trim();
      if (!url) {
        console.warn('No URL entered');
        return;
      }
      
      // Validate URL format
      let validatedUrl;
      try {
        validatedUrl = new URL(url);
        // If user enters a domain without protocol, add https
        if (!url.startsWith('http')) {
          validatedUrl = new URL('https://' + url);
          urlInput.value = validatedUrl.href;
        }
      } catch (error) {
        try {
          validatedUrl = new URL('https://' + url);
          urlInput.value = validatedUrl.href;
        } catch (e) {
          console.error('Invalid URL:', url, e);
          return;
        }
      }
      
      // Load the URL in the webview
      loadUrlInWebview(validatedUrl.href);
    }
    
    // Load URL in webview
    function loadUrlInWebview(url) {
      console.log('Loading URL in webview:', url);
      
      const webview = document.getElementById('webview');
      if (webview) {
        webview.src = url;
      } else {
        console.error('Webview element not found');
      }
    }
  }
  