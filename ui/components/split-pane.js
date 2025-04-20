// ScoutMind Split Pane Component
// Manages the split interface with collapse functionality

// Initialize the split pane
export function initSplitPane() {
    console.log('Initializing split pane');
    
    // Get elements
    const splitPane = document.getElementById('split-pane');
    const configPanel = document.getElementById('config-panel');
    const webviewPanel = document.getElementById('webview-panel');
    const collapseBtn = document.getElementById('collapse-btn');
    
    if (!splitPane || !configPanel || !webviewPanel || !collapseBtn) {
      console.error('Split pane elements not found');
      return;
    }
    
    // Set up collapse button
    collapseBtn.addEventListener('click', () => {
      toggleConfigPanel();
    });
    
    // Initialize resizable split pane (simplified version)
    let resizing = false;
    let startX = 0;
    let startWidth = 0;
    
    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';
    splitPane.appendChild(resizeHandle);
    
    // Set up resize events
    resizeHandle.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    
    function startResize(e) {
      resizing = true;
      startX = e.clientX;
      startWidth = configPanel.offsetWidth;
      document.body.style.cursor = 'ew-resize';
    }
    
    function resize(e) {
      if (!resizing) return;
      
      const newWidth = startWidth + e.clientX - startX;
      const minWidth = 200; // Minimum width
      const maxWidth = splitPane.offsetWidth * 0.8; // Maximum width (80% of container)
      
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      configPanel.style.width = `${clampedWidth}px`;
      
      // Adjust webview panel to fill remaining space
      webviewPanel.style.width = `calc(100% - ${clampedWidth}px)`;
    }
    
    function stopResize() {
      resizing = false;
      document.body.style.cursor = '';
    }
    
    // Toggle config panel visibility
    function toggleConfigPanel() {
      const isCollapsed = configPanel.classList.contains('collapsed');
      
      if (isCollapsed) {
        // Expand the panel
        configPanel.classList.remove('collapsed');
        collapseBtn.textContent = '◀';
        collapseBtn.title = 'Collapse panel';
        
        // Restore previous width or use default
        const width = configPanel.dataset.width || '300px';
        configPanel.style.width = width;
        webviewPanel.style.width = `calc(100% - ${width})`;
      } else {
        // Collapse the panel
        configPanel.classList.add('collapsed');
        collapseBtn.textContent = '▶';
        collapseBtn.title = 'Expand panel';
        
        // Store current width for later restoration
        configPanel.dataset.width = configPanel.style.width;
        
        // Collapse to minimal width
        configPanel.style.width = '40px';
        webviewPanel.style.width = 'calc(100% - 40px)';
      }
    }
  }
  