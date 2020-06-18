// Popover, Tooltip & ScrollSpy
export default function() { 
  return {
    y : window.pageYOffset || document.documentElement.scrollTop,
    x : window.pageXOffset || document.documentElement.scrollLeft
  }
}