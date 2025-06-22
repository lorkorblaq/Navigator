# Navigator
Keyboard Navigation Utility

## Overview
The `injectKeyboardNavigation` function provides keyboard navigation capabilities for web pages. It allows users to navigate through headers, links, and landmarks using specific keyboard shortcuts.

## Features
- Navigate through headers (`h1` to `h6`) using the `H` key.
- Navigate through links (`<a>` elements) using the `L` key.
- Navigate through landmarks (semantic and ARIA roles) using the `M` key.
- Use `ArrowUp` and `ArrowDown` keys to change navigation direction.
- Highlights the focused element with a yellow background and black outline.
- Automatically scans the DOM for changes to update navigation elements.

## Installation
Include the `nagivaitionAZ.js` script in your HTML file:

```html
<script src="nagivaitionAZ.js"></script>
```

## Usage
Call the `injectKeyboardNavigation` function to enable keyboard navigation:

```javascript
injectKeyboardNavigation();
```

## Customization
You can modify the styles for focused elements by editing the injected CSS:

```css
.__kbd-nav-focus {
  outline: 3px solid #000;
  background-color: #ff0 !important;
  color: #000 !important;
}
```

## Keyboard Shortcuts
- `H`: Navigate headers.
- `L`: Navigate links.
- `M`: Navigate landmarks.
- `ArrowUp`: Move to the previous element.
- `ArrowDown`: Move to the next element.

## Notes
- Editable elements (`<input>`, `<textarea>`, `<select>`, and content-editable elements) are excluded from navigation.
- The script observes DOM changes to dynamically update navigation elements.