/**
 * Triggers a number of pointer events for a given target and
 * an array of coordinates.
 * @param target the element to dispatch the pointer event(s)
 * @param points an array of [clientX, clientY] coordinates
 * @param offset an optional offset object of { x, y } coordinates
 */
const swipe = <T extends HTMLElement = HTMLElement>(
  target: T,
  points: [number, number][],
  offset?: { x: number; y: number },
) => {
  const rect = target.getBoundingClientRect();
  const offsetX = Number.isInteger(offset?.x) ? offset!.x : rect.left;
  const offsetY = Number.isInteger(offset?.y) ? offset!.y : rect.top;
  if (points.length === 1) points.push([0, 0]);

  points.forEach(([x, y], i) => {
    // first is a pointerdown, last is a pointerup and all pointermove in between
    const ev = i === 0
      ? "pointerdown"
      : i === points.length - 1
      ? "pointerup"
      : "pointermove";
    const point = new PointerEvent(ev, {
      clientX: x + offsetX,
      clientY: y + offsetY,
      pressure: 1,
      bubbles: true, // Whether the event should bubble up the DOM
      cancelable: true, // Whether the event can be canceled
      pointerId: 0, // The ID of the pointer (e.g., a touch point)
      pointerType: "touch", // The type of pointer (e.g., touch or mouse)
      width: 1, // The width of the pointer (in pixels)
      height: 1, // The height of the pointer (in pixels)
      isPrimary: true, // Whether this is the primary pointer (true) or not (false)
    });
    target.dispatchEvent(point);
    target.offsetWidth;
  });
};

export default swipe;
