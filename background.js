chrome.action.onClicked.addListener(async (tab) => {
  const currentUrl = tab.url;
  const jinaUrl = 'https://r.jina.ai/' + currentUrl;
  
  try {
    // Get markdown content from r.jina.ai
    const response = await fetch(jinaUrl);
    const content = await response.text();

    // Execute script in the active tab to copy text and show notification
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (textToCopy) => {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Show notification
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4CAF50;
          color: white;
          padding: 16px;
          border-radius: 4px;
          z-index: 9999;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;
        notification.textContent = 'Markdown content copied to clipboard';
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 3000);
      },
      args: [content]
    });

    console.log('Page successfully converted to markdown');
  } catch (error) {
    console.error('Error converting page to markdown:', error);
    // Show error notification
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #f44336;
          color: white;
          padding: 16px;
          border-radius: 4px;
          z-index: 9999;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;
        notification.textContent = 'Error converting page to markdown';
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    });
  }
});
