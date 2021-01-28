export default function(element){
  return [SVGElement,HTMLImageElement,HTMLVideoElement]
  .some( mediaType => element instanceof mediaType )
}