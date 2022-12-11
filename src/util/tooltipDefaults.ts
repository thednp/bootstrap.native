import getTipTemplate from './getTipTemplate';
import tooltipString from '../strings/tooltipString';
import { TooltipOptions } from '../interface/tooltip';

const tooltipDefaults: TooltipOptions = {
  template: getTipTemplate(tooltipString),
  title: '',
  customClass: '',
  trigger: 'hover focus',
  placement: 'top',
  sanitizeFn: undefined,
  animation: true,
  delay: 200,
  container: document.body,
  content: '',
  dismissible: false,
  btnClose: '',
};
export default tooltipDefaults;
