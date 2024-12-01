chrome.action.onClicked.addListener(async (tab) => {
  const currentUrl = tab.url;
  const jinaUrl = 'https://r.jina.ai/' + currentUrl;
  
  try {
    // Get markdown content from r.jina.ai
    const response = await fetch(jinaUrl);
    const content = await response.text();

    // Copy the markdown content to clipboard via content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
          // Create and show notification
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
        });
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
