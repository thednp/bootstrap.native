import getTipTemplate from './getTipTemplate';
import tooltipString from '../strings/tooltipString';

const tooltipDefaults = {
  /** @type {string} */
  template: getTipTemplate(tooltipString),
  /** @type {string?} */
  title: null, // string
  /** @type {string?} */
  customClass: null, // string | null
  /** @type {string} */
  trigger: 'hover focus',
  /** @type {string?} */
  placement: 'top', // string
  /** @type {((c:string)=>string)?} */
  sanitizeFn: null, // function
  /** @type {boolean} */
  animation: true, // bool
  /** @type {number} */
  delay: 200, // number
  /** @type {HTMLElement?} */
  container: null,
};
export default tooltipDefaults;
