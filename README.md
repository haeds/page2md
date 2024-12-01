# Page2MD Chrome Extension

A Chrome extension that converts web pages into LLM-friendly markdown format using r.jina.ai service. It automatically copies the converted content to your clipboard, making it easy to use with ChatGPT, Claude, or other LLM-based assistants.

## Features

- One-click conversion of any web page to clean markdown format
- Automatic removal of unnecessary HTML elements and formatting
- Instant clipboard copy of the converted content
- Visual notifications for operation status
- Background processing without page interruption

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked extension"
4. Select the directory containing the extension files

## Usage

1. After installation, you'll see a new extension icon in your Chrome toolbar
2. When visiting any web page you want to convert:
   - Click the extension icon
   - The page will be processed through r.jina.ai
   - The cleaned markdown content will be automatically copied to your clipboard
3. A notification will appear to confirm successful copy or show an error
4. Paste the converted content into your favorite LLM chat interface

## Why Use Page2MD?

- **Clean Format**: Converts messy HTML into clean, readable markdown
- **LLM-Friendly**: Optimized output format for large language models
- **Time-Saving**: One-click operation with automatic clipboard copy
- **Non-Intrusive**: Works in the background without disrupting your browsing

## Development

The extension consists of the following files:
- `manifest.json`: Extension configuration
- `background.js`: Main extension logic
- `.gitignore`: Git ignore rules

## License

Private repository. All rights reserved.
