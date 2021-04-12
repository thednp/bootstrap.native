export default function isMedia(element) {
  return [SVGElement, HTMLImageElement, HTMLVideoElement]
    .some((mediaType) => element instanceof mediaType);
}
