export default function (element){
  element.focus ? element.focus() : element.setActive();
}