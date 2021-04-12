export default function dispatchCustomEvent(customEvent) {
  if (this) this.dispatchEvent(customEvent);
}
