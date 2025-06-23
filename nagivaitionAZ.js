function injectKeyboardNavigation() {
  // Initialize arrays to store headers, links, and landmarks
  let headers = [];
  let links = [];
  let landmarks = [];

  // Initialize indices for navigation
  let currentHeaderIndex = -1;
  let currentLinkIndex = -1;
  let currentLandmarkIndex = -1;
  let navigationDirection = 'next';

  // Define ARIA landmark roles
  const landmarkRoles = [
    'banner', 'main', 'navigation', 'complementary',
    'contentinfo', 'form', 'region', 'search'
  ];

  // Define semantic landmark tags
  const semanticLandmarks = [
    'main', 'nav', 'aside', 'form', 'footer', 'header'
  ];

  // Check if an element is a landmark
  function isLandmark(el) {
    return (
      semanticLandmarks.includes(el.tagName.toLowerCase()) ||
      landmarkRoles.includes(el.getAttribute('role'))
    );
  }

  // Scan the DOM for headers, links, and landmarks
  function scanElements() {
    headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    links = Array.from(document.querySelectorAll('a[href]'));
    landmarks = Array.from(document.querySelectorAll('*')).filter(isLandmark);
  }

  // Focus on a specific element and highlight it
  function focusElement(el) {
    if (!el) return;
    el.setAttribute('tabindex', '-1'); // Make the element focusable
    el.focus();

    // Clear previous highlights
    document.querySelectorAll('.__kbd-nav-focus').forEach((e) =>
      e.classList.remove('__kbd-nav-focus')
    );
    el.classList.add('__kbd-nav-focus'); // Add highlight class
  }

  // Move to the next or previous element in the list
  function move(index, list) {
    if (list.length === 0) return index; // Return if the list is empty
    index =
      navigationDirection === 'next'
        ? (index + 1) % list.length // Move to the next element
        : (index - 1 + list.length) % list.length; // Move to the previous element
    focusElement(list[index]); // Focus on the new element
    return index;
  }

  // Check if an element is editable
  function isEditableElement(el) {
    const tag = el.tagName.toLowerCase();
    return (
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      el.isContentEditable
    );
  }

  // Handle keyboard navigation events
  function handleKeyDown(e) {
    if (isEditableElement(e.target)) return; // Ignore editable elements

    switch (e.key) {
      case 'ArrowUp':
        navigationDirection = 'prev'; // Set navigation direction to previous
        break;
      case 'ArrowDown':
        navigationDirection = 'next'; // Set navigation direction to next
        break;
      case 'h':
      case 'H':
        currentHeaderIndex = move(currentHeaderIndex, headers); // Navigate headers
        e.preventDefault();
        break;
      case 'l':
      case 'L':
        currentLinkIndex = move(currentLinkIndex, links); // Navigate links
        e.preventDefault();
        break;
      case 'm':
      case 'M':
        currentLandmarkIndex = move(currentLandmarkIndex, landmarks); // Navigate landmarks
        e.preventDefault();
        break;
    }
  }

  // Observe DOM changes to update navigation elements
  function watchDOMChanges() {
    const observer = new MutationObserver(scanElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Inject CSS styles for focused elements
  function injectStyle() {
    const style = document.createElement('style');
    style.textContent = `
      .__kbd-nav-focus {
        outline: 3px solid #000;
        background-color: #ff0 !important;
        color: #000 !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize the keyboard navigation utility
  function init() {
    scanElements(); // Scan the DOM for elements
    injectStyle(); // Inject styles
    document.addEventListener('keydown', handleKeyDown); // Add event listener for keydown
    watchDOMChanges(); // Start observing DOM changes
  }

  // Check if the document is ready and initialize
  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
}
