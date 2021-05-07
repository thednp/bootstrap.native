/* Native JavaScript for Bootstrap 4 | Collapse
----------------------------------------------- */
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import reflow from 'shorter-js/src/misc/reflow.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v4.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

// COLLAPSE DEFINITION
// ===================

export default function Collapse(elem, opsInput) {
  let element;
  // set options
  const options = opsInput || {};

  // bind
  const self = this;

  // target practice
  let accordion = null;
  let collapse = null;
  let activeCollapse;
  let activeElement;
  // custom events
  let showCustomEvent;
  let shownCustomEvent;
  let hideCustomEvent;
  let hiddenCustomEvent;

  // private methods
  function openAction(collapseElement, toggle) {
    dispatchCustomEvent.call(collapseElement, showCustomEvent);
    if (showCustomEvent.defaultPrevented) return;
    collapseElement.isAnimating = true;
    collapseElement.classList.add('collapsing');
    collapseElement.classList.remove('collapse');
    collapseElement.style.height = `${collapseElement.scrollHeight}px`;

    emulateTransitionEnd(collapseElement, () => {
      collapseElement.isAnimating = false;
      collapseElement.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      collapseElement.classList.remove('collapsing');
      collapseElement.classList.add('collapse');
      collapseElement.classList.add('show');
      collapseElement.style.height = '';
      dispatchCustomEvent.call(collapseElement, shownCustomEvent);
    });
  }
  function closeAction(collapseElement, toggle) {
    dispatchCustomEvent.call(collapseElement, hideCustomEvent);
    if (hideCustomEvent.defaultPrevented) return;
    collapseElement.isAnimating = true;
    collapseElement.style.height = `${collapseElement.scrollHeight}px`; // set height first
    collapseElement.classList.remove('collapse');
    collapseElement.classList.remove('show');
    collapseElement.classList.add('collapsing');
    reflow(collapseElement); // force reflow to enable transition
    collapseElement.style.height = '0px';

    emulateTransitionEnd(collapseElement, () => {
      collapseElement.isAnimating = false;
      collapseElement.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      collapseElement.classList.remove('collapsing');
      collapseElement.classList.add('collapse');
      collapseElement.style.height = '';
      dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
    });
  }

  // public methods
  self.toggle = (e) => {
    if ((e && e.target.tagName === 'A') || element.tagName === 'A') e.preventDefault();
    if (element.contains(e.target) || e.target === element) {
      if (!collapse.classList.contains('show')) self.show();
      else self.hide();
    }
  };
  self.hide = () => {
    if (collapse.isAnimating) return;
    closeAction(collapse, element);
    element.classList.add('collapsed');
  };
  self.show = () => {
    if (accordion) {
      [activeCollapse] = accordion.getElementsByClassName('collapse show');
      activeElement = activeCollapse && (queryElement(`[data-target="#${activeCollapse.id}"]`, accordion)
                    || queryElement(`[href="#${activeCollapse.id}"]`, accordion));
    }

    if (!collapse.isAnimating) {
      if (activeElement && activeCollapse !== collapse) {
        closeAction(activeCollapse, activeElement);
        activeElement.classList.add('collapsed');
      }
      openAction(collapse, element);
      element.classList.remove('collapsed');
    }
  };
  self.dispose = () => {
    element.removeEventListener('click', self.toggle, false);
    delete element.Collapse;
  };

  // init

  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Collapse) element.Collapse.dispose();

  // DATA API
  const accordionData = element.getAttribute('data-parent');

  // custom events
  showCustomEvent = bootstrapCustomEvent('show', 'collapse');
  shownCustomEvent = bootstrapCustomEvent('shown', 'collapse');
  hideCustomEvent = bootstrapCustomEvent('hide', 'collapse');
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse');

  // determine targets
  collapse = queryElement(options.target || element.getAttribute('data-target') || element.getAttribute('href'));

  if (collapse !== null) collapse.isAnimating = false;
  accordion = element.closest(options.parent || accordionData);

  // prevent adding event handlers twice
  if (!element.Collapse) {
    element.addEventListener('click', self.toggle, false);
  }

  // associate target to init object
  element.Collapse = self;
}
