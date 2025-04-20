// ScoutMind Status Indicator Component
// Manages status messages and visual indicators

let statusTimeout = null;

// Initialize the status indicator
export function initStatusIndicator() {
  console.log('Initializing status indicator');
  
  const statusContainer = document.getElementById('status-container');
  const statusIndicator = document.getElementById('status-indicator');
  const statusMessage = document.getElementById('status-message');
  
  if (!statusContainer || !statusIndicator || !statusMessage) {
    console.error('Status indicator elements not found');
    return;
  }
  
  // Set initial status
  updateStatus('ready', 'Ready');
}

// Update status indicator and message
export function updateStatus(statusType, message, duration = 0) {
  const statusContainer = document.getElementById('status-container');
  const statusIndicator = document.getElementById('status-indicator');
  const statusMessage = document.getElementById('status-message');
  
  if (!statusContainer || !statusIndicator || !statusMessage) {
    console.error('Status indicator elements not found');
    return;
  }
  
  // Clear any existing timeout
  if (statusTimeout) {
    clearTimeout(statusTimeout);
    statusTimeout = null;
  }
  
  // Remove all status classes
  statusIndicator.classList.remove('ready', 'loading', 'error');
  
  // Set the appropriate status class
  statusIndicator.classList.add(statusType);
  
  // Update the message
  statusMessage.textContent = message;
  
  // Show the status container
  statusContainer.classList.remove('hidden', 'fading');
  
  // If duration is specified, hide after duration
  if (duration > 0) {
    statusTimeout = setTimeout(() => {
      statusContainer.classList.add('fading');
      
      // After the fade transition completes, hide the container
      setTimeout(() => {
        statusContainer.classList.add('hidden');
      }, 500);
    }, duration);
  }
}
