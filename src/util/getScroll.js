// Popover, Tooltip & ScrollSpy
export default function getScroll() {
  return {
    y: window.pageYOffset || document.documentElement.scrollTop,
    x: window.pageXOffset || document.documentElement.scrollLeft,
  };
}
