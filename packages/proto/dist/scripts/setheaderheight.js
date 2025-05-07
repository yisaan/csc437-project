function syncHeaderHeight() {
    const header = document.querySelector('header');
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', `${h}px`);
  }
  
  window.addEventListener('DOMContentLoaded', syncHeaderHeight);
  window.addEventListener('resize', syncHeaderHeight);
  