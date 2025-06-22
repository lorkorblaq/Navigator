function injectKeyboardNavigation() {
  let headers = [];
  let links = [];
  let landmarks = [];

  let currentHeaderIndex = -1;
  let currentLinkIndex = -1;
  let currentLandmarkIndex = -1;
  let navigationDirection = 'next';

  const landmarkRoles = [
    'banner', 'main', 'navigation', 'complementary',
    'contentinfo', 'form', 'region', 'search'
  ];

  const semanticLandmarks = [
    'main', 'nav', 'aside', 'form', 'footer', 'header'
  ];

  function isLandmark(el) {
    return (
      semanticLandmarks.includes(el.tagName.toLowerCase()) ||
      landmarkRoles.includes(el.getAttribute('role'))
    );
  }

  function scanElements() {
    headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    links = Array.from(document.querySelectorAll('a[href]'));
    landmarks = Array.from(document.querySelectorAll('*')).filter(isLandmark);
  }

  function focusElement(el) {
    if (!el) return;
    el.setAttribute('tabindex', '-1');
    el.focus();

    // Clear previous highlights
    document.querySelectorAll('.__kbd-nav-focus').forEach((e) =>
      e.classList.remove('__kbd-nav-focus')
    );
    el.classList.add('__kbd-nav-focus');
  }

  function move(index, list) {
    if (list.length === 0) return index;
    index =
      navigationDirection === 'next'
        ? (index + 1) % list.length
        : (index - 1 + list.length) % list.length;
    focusElement(list[index]);
    return index;
  }

  function isEditableElement(el) {
    const tag = el.tagName.toLowerCase();
    return (
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      el.isContentEditable
    );
  }

  function handleKeyDown(e) {
    if (isEditableElement(e.target)) return;

    switch (e.key) {
      case 'ArrowUp':
        navigationDirection = 'prev';
        break;
      case 'ArrowDown':
        navigationDirection = 'next';
        break;
      case 'h':
      case 'H':
        currentHeaderIndex = move(currentHeaderIndex, headers);
        e.preventDefault();
        break;
      case 'l':
      case 'L':
        currentLinkIndex = move(currentLinkIndex, links);
        e.preventDefault();
        break;
      case 'm':
      case 'M':
        currentLandmarkIndex = move(currentLandmarkIndex, landmarks);
        e.preventDefault();
        break;
    }
  }

  function watchDOMChanges() {
    const observer = new MutationObserver(scanElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

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

  function init() {
    scanElements();
    injectStyle();
    document.addEventListener('keydown', handleKeyDown);
    watchDOMChanges();
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
}
