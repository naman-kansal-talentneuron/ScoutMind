// ScoutMind Storage Utility
// Chrome storage wrapper for settings and data persistence

// Get data from Chrome storage
export async function getData(key, storageArea = 'sync') {
    return new Promise((resolve) => {
      const storage = storageArea === 'local' ? chrome.storage.local : chrome.storage.sync;
      
      storage.get(key, (result) => {
        resolve(key ? result[key] : result);
      });
    });
  }
  
  // Save data to Chrome storage
  export async function saveData(key, value, storageArea = 'sync') {
    return new Promise((resolve) => {
      const storage = storageArea === 'local' ? chrome.storage.local : chrome.storage.sync;
      
      const data = {};
      data[key] = value;
      
      storage.set(data, () => {
        resolve();
      });
    });
  }
  
  // Remove data from Chrome storage
  export async function removeData(key, storageArea = 'sync') {
    return new Promise((resolve) => {
      const storage = storageArea === 'local' ? chrome.storage.local : chrome.storage.sync;
      
      storage.remove(key, () => {
        resolve();
      });
    });
  }
  
  // Clear all data from Chrome storage
  export async function clearData(storageArea = 'sync') {
    return new Promise((resolve) => {
      const storage = storageArea === 'local' ? chrome.storage.local : chrome.storage.sync;
      
      storage.clear(() => {
        resolve();
      });
    });
  }
  
  // Get all data from Chrome storage
  export async function getAllData(storageArea = 'sync') {
    return await getData(null, storageArea);
  }
  
  // Save settings
  export async function saveSettings(settings) {
    return await saveData('settings', settings);
  }
  
  // Get settings
  export async function getSettings() {
    const settings = await getData('settings');
    
    // Default settings
    const defaultSettings = {
      ollamaHost: 'http://localhost:11434',
      defaultModel: 'llama2',
      theme: 'light',
      maxTokens: 2048,
      temperature: 0.7
    };
    
    // Merge with saved settings
    return { ...defaultSettings, ...settings };
  }
  