/**
 * Returns the `Window` / `HTML` scroll position.
 * Popover, Tooltip & ScrollSpy need it.
 *
 * @returns {{x: number, y: number}} the scroll `{x,y}` values
 */
export default function getScroll() {
  return {
    y: window.pageYOffset || document.documentElement.scrollTop,
    x: window.pageXOffset || document.documentElement.scrollLeft,
  };
}
