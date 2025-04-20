// ScoutMind Logger
// Unified logging functionality

let debugMode = false;

// Initialize the logger
export function initLogger(options = {}) {
  debugMode = options.debug ?? false;
  
  // Log initialization
  info('Logger initialized', options);
}

// Set debug mode
export function setDebugMode(debug) {
  debugMode = debug;
  info(`Debug mode set to ${debug}`);
}

// Log info message
export function info(message, ...data) {
  console.log(`[ScoutMind] ${message}`, ...data);
}

// Log warning message
export function warn(message, ...data) {
  console.warn(`[ScoutMind] ⚠️ ${message}`, ...data);
}

// Log error message
export function error(message, ...data) {
  console.error(`[ScoutMind] 🛑 ${message}`, ...data);
}

// Log debug message (only in debug mode)
export function debug(message, ...data) {
  if (debugMode) {
    console.debug(`[ScoutMind] 🔍 ${message}`, ...data);
  }
}

// Create a group with a label
export function group(label) {
  console.group(`[ScoutMind] ${label}`);
}

// End the current group
export function groupEnd() {
  console.groupEnd();
}

// Log a table
export function table(data, columns) {
  console.table(data, columns);
}

// Track performance
export function trackPerformance(label, callback) {
  if (!debugMode) {
    return callback();
  }
  
  console.time(`[ScoutMind] ${label}`);
  const result = callback();
  console.timeEnd(`[ScoutMind] ${label}`);
  
  return result;
}
