# Navigator
Keyboard Navigation Utility

## Overview
The `injectKeyboardNavigation` script enhances web accessibility by enabling keyboard navigation for headers, links, and landmarks. It provides users with a seamless way to navigate through structured content using intuitive keyboard shortcuts.

## How the Script Works
The script scans the DOM for specific elements:
- **Headers**: All header tags (`h1` to `h6`).
- **Links**: All anchor tags (`<a>` with `href` attributes).
- **Landmarks**: Semantic tags (`main`, `nav`, `aside`, etc.) and elements with ARIA landmark roles (`banner`, `navigation`, `region`, etc.).

It listens for keyboard events and moves focus to the next or previous element in the respective category based on user input. Focused elements are highlighted with a yellow background and black outline for better visibility.

### Key Features
- **Keyboard Shortcuts**:
  - `H`: Navigate headers.
  - `L`: Navigate links.
  - `M`: Navigate landmarks.
  - `ArrowUp`: Move to the previous element.
  - `ArrowDown`: Move to the next element.
- **Dynamic Updates**: Observes DOM changes to keep navigation elements up-to-date.
- **Exclusions**: Editable elements (`<input>`, `<textarea>`, `<select>`, and content-editable elements) are excluded from navigation.

## Assumptions
- The web page follows semantic HTML practices, using proper header tags and landmark roles.
- ARIA roles are correctly applied to elements where necessary.
- Users are familiar with basic keyboard navigation concepts.

## Accessibility Rules Applied
- **Focus Management**: Ensures that focused elements are visually highlighted and accessible via the `tabindex` attribute.
- **Keyboard Navigation**: Provides intuitive shortcuts for navigating structured content.
- **Exclusion of Editable Elements**: Prevents interference with user input fields.
- **Dynamic Content Handling**: Observes DOM changes to maintain accessibility in dynamic web pages.

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

## Notes
- The script is designed to work on pages with semantic HTML and ARIA roles.
- Editable elements are excluded to avoid disrupting user input.
- The script dynamically updates navigation elements when the DOM changes.