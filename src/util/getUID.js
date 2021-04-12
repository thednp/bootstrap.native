let bsnUID = 1;

// popover, tooltip, scrollspy need a unique id
export default function getUID(element, key) {
  bsnUID += 1;
  return element[key] || bsnUID;
}
