import { getAttribute, hasClass } from "@thednp/shorty";

/**
 * Check if interactive element is disabled.
 * @param target either a `<button>` or an `<a>`
 * @returns whether the target is disabled
 */
const isDisabled = (target: Element) => {
  return hasClass(target, "disabled") ||
    getAttribute(target, "disabled") === "true";
};

export default isDisabled;
