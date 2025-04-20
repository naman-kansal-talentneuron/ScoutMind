// ScoutMind Basic Highlighter
// Simple element highlighting system

// Map to store highlighted elements and their original styles
const highlightedElements = new Map();

// Initialize the highlighter
export function initHighlighter() {
  console.log('Initializing basic highlighter');
  
  // Create highlight overlay if it doesn't exist
  ensureHighlightOverlay();
}

// Ensure the highlight overlay exists
function ensureHighlightOverlay() {
  let overlay = document.getElementById('highlight-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'highlight-overlay';
    overlay.className = 'highlight-overlay';
    document.body.appendChild(overlay);
  }
  
  return overlay;
}

// Highlight elements based on CSS selectors
export function highlightElements(selectors) {
  console.log('Highlighting elements with selectors:', selectors);
  
  // Clear previous highlights
  clearHighlights();
  
  // Get the overlay
  const overlay = ensureHighlightOverlay();
  
  // Process each selector
  selectors.forEach((selector, index) => {
    try {
      // Find elements matching the selector
      const elements = document.querySelectorAll(selector);
      
      elements.forEach(element => {
        highlightElement(element, overlay, index);
      });
      
    } catch (error) {
      console.error(`Error processing selector "${selector}":`, error);
    }
  });
}

// Highlight a single element
function highlightElement(element, overlay, index) {
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
  
  // Store reference to the element and the highlight
  highlightedElements.set(element, highlight);
}

// Clear all highlights
export function clearHighlights() {
  const overlay = document.getElementById('highlight-overlay');
  if (overlay) {
    overlay.innerHTML = '';
  }
  highlightedElements.clear();
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
