/*!
  * Native JavaScript for Bootstrap Offcanvas v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
function queryElement(selector, parent) {
  const lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

const addEventListener = 'addEventListener';

const removeEventListener = 'removeEventListener';

function hasClass(element, classNAME) {
  return element.classList.contains(classNAME);
}

function addClass(element, classNAME) {
  element.classList.add(classNAME);
}

function removeClass(element, classNAME) {
  element.classList.remove(classNAME);
}

const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

function getElementTransitionDuration(element) {
  const computedStyle = getComputedStyle(element);
  const propertyValue = computedStyle[transitionProperty];
  const durationValue = computedStyle[transitionDuration];
  const durationScale = durationValue.includes('ms') ? 1 : 1000;
  const duration = supportTransition && propertyValue && propertyValue !== 'none'
    ? parseFloat(durationValue) * durationScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

function emulateTransitionEnd(element, handler) {
  let called = 0;
  const endEvent = new Event(transitionEndEvent);
  const duration = getElementTransitionDuration(element);

  if (duration) {
    element.addEventListener(transitionEndEvent, function transitionEndWrapper(e) {
      if (e.target === element) {
        handler.apply(element, [e]);
        element.removeEventListener(transitionEndEvent, transitionEndWrapper);
        called = 1;
      }
    });
    setTimeout(() => {
      if (!called) element.dispatchEvent(endEvent);
    }, duration + 17);
  } else {
    handler.apply(element, [endEvent]);
  }
}

function bootstrapCustomEvent(namespacedEventType, eventProperties) {
  const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

  if (eventProperties instanceof Object) {
    Object.keys(eventProperties).forEach((key) => {
      Object.defineProperty(OriginalCustomEvent, key, {
        value: eventProperties[key],
      });
    });
  }
  return OriginalCustomEvent;
}

const dataBsTarget = 'data-bs-target';

const dataBsParent = 'data-bs-parent';

const dataBsContainer = 'data-bs-container';

function getTargetElement(element) {
  return queryElement(element.getAttribute(dataBsTarget) || element.getAttribute('href'))
        || element.closest(element.getAttribute(dataBsParent))
        || queryElement(element.getAttribute(dataBsContainer));
}

const dataBsDismiss = 'data-bs-dismiss';

const dataBsToggle = 'data-bs-toggle';

const showClass = 'show';

const ariaHidden = 'aria-hidden';

const ariaModal = 'aria-modal';

const ariaExpanded = 'aria-expanded';

function setFocus(element) {
  element.focus();
}

const fixedTopClass = 'fixed-top';

const fixedBottomClass = 'fixed-bottom';

const stickyTopClass = 'sticky-top';

const fixedItems = Array.from(document.getElementsByClassName(fixedTopClass))
  .concat(Array.from(document.getElementsByClassName(fixedBottomClass)))
  .concat(Array.from(document.getElementsByClassName(stickyTopClass)))
  .concat(Array.from(document.getElementsByClassName('is-fixed')));

function resetScrollbar() {
  const bd = document.body;
  bd.style.paddingRight = '';
  bd.style.overflow = '';

  if (fixedItems.length) {
    fixedItems.forEach((fixed) => {
      fixed.style.paddingRight = '';
      fixed.style.marginRight = '';
    });
  }
}

function measureScrollbar() {
  const windowWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - windowWidth);
}

function setScrollbar(scrollbarWidth, overflow, isOpen) {
  const bd = document.body;
  const bodyPad = parseInt(getComputedStyle(bd).paddingRight, 10);
  const sbWidth = isOpen && bodyPad ? 0 : scrollbarWidth;

  if (overflow) {
    bd.style.paddingRight = `${bodyPad + sbWidth}px`;
    // bd.style.overflow = 'hidden';

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        const isSticky = hasClass(fixed, stickyTopClass);
        const itemPadValue = getComputedStyle(fixed).paddingRight;
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        if (isSticky) {
          const itemMValue = getComputedStyle(fixed).marginRight;
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
}

function reflow(element) {
  return element.offsetHeight;
}

const fadeClass = 'fade';

const modalOpenClass = 'modal-open';
const modalBackdropClass = 'modal-backdrop';
const modalActiveSelector = `.modal.${showClass}`;
const offcanvasActiveSelector = `.offcanvas.${showClass}`;

const overlay = document.createElement('div');
overlay.setAttribute('class', `${modalBackdropClass}`);

function getCurrentOpen() {
  return queryElement(`${modalActiveSelector},${offcanvasActiveSelector}`);
}

function appendOverlay(hasFade) {
  document.body.appendChild(overlay);
  if (hasFade) addClass(overlay, fadeClass);
}

function showOverlay() {
  addClass(overlay, showClass);
  reflow(overlay);
}

function hideOverlay() {
  removeClass(overlay, showClass);
}

function removeOverlay() {
  const bd = document.body;
  const currentOpen = getCurrentOpen();

  if (!currentOpen) {
    removeClass(overlay, fadeClass);
    removeClass(bd, modalOpenClass);
    bd.removeChild(overlay);
    resetScrollbar();
  }
}

function normalizeValue(value) {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (!Number.isNaN(+value)) {
    return +value;
  }

  if (value === '' || value === 'null') {
    return null;
  }

  // string / function / Element / Object
  return value;
}

function normalizeOptions(element, defaultOps, inputOps, ns) {
  const normalOps = {};
  const dataOps = {};
  const data = { ...element.dataset };

  Object.keys(data)
    .forEach((k) => {
      const key = k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
        : k;

      dataOps[key] = normalizeValue(data[k]);
    });

  Object.keys(inputOps)
    .forEach((k) => {
      inputOps[k] = normalizeValue(inputOps[k]);
    });

  Object.keys(defaultOps)
    .forEach((k) => {
      if (k in inputOps) {
        normalOps[k] = inputOps[k];
      } else if (k in dataOps) {
        normalOps[k] = dataOps[k];
      } else {
        normalOps[k] = defaultOps[k];
      }
    });

  return normalOps;
}

/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

class BaseComponent {
  constructor(name, target, defaults, config) {
    const self = this;
    const element = queryElement(target);

    if (element[name]) element[name].dispose();
    self.element = element;

    if (defaults && Object.keys(defaults).length) {
      self.options = normalizeOptions(element, defaults, (config || {}), 'bs');
    }
    element[name] = self;
  }

  dispose(name) {
    const self = this;
    self.element[name] = null;
    Object.keys(self).forEach((prop) => { self[prop] = null; });
  }
}

/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */

// OFFCANVAS PRIVATE GC
// ====================
const offcanvasString = 'offcanvas';
const offcanvasComponent = 'Offcanvas';
const OffcanvasSelector = `.${offcanvasString}`;
const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
const offcanvasTogglingClass = `${offcanvasString}-toggling`;
const offcanvasDefaultOptions = {
  backdrop: true, // boolean
  keyboard: true, // boolean
  scroll: false, // boolean
};

// OFFCANVAS CUSTOM EVENTS
// =======================
const showOffcanvasEvent = bootstrapCustomEvent(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = bootstrapCustomEvent(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = bootstrapCustomEvent(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = bootstrapCustomEvent(`hidden.bs.${offcanvasString}`);

// OFFCANVAS EVENT HANDLERS
// ========================
function offcanvasTriggerHandler(e) {
  const trigger = this;
  const element = getTargetElement(trigger);
  const self = element && element[offcanvasComponent];

  if (trigger.tagName === 'A') e.preventDefault();
  if (self) self.toggle(trigger);
}

function offcanvasDismissHandler(e) {
  const element = queryElement(offcanvasActiveSelector);
  const offCanvasDismiss = element && queryElement(offcanvasDismissSelector, element);
  const self = element && element[offcanvasComponent];
  const { open, triggers } = self;
  const { target } = e;
  const trigger = target.closest(offcanvasToggleSelector);

  if (trigger && trigger.tagName === 'A') e.preventDefault();

  if (self && open && ((!element.contains(target) && element !== target
    && (!trigger || (trigger && !triggers.includes(trigger))))
    || target === offCanvasDismiss)) {
    self.hide(target === offCanvasDismiss ? offCanvasDismiss : null);
  }
}

function offcanvasKeyDismissHandler({ which }) {
  const element = queryElement(offcanvasActiveSelector);
  const self = element && element[offcanvasComponent];

  if (self && self.options.keyboard && which === 27) {
    self.hide();
  }
}

function showOffcanvasComplete(self, related) {
  const { element, triggers } = self;
  removeClass(element, offcanvasTogglingClass);

  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);
  element.setAttribute('role', 'dialog');

  if (triggers.length) {
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, true));
  }

  shownOffcanvasEvent.relatedTarget = related || null;
  element.dispatchEvent(shownOffcanvasEvent);

  toggleOffCanvasDismiss(1);
  setFocus(element);
}

function hideOffcanvasComplete(self, related) {
  const { element, options, triggers } = self;
  element.setAttribute(ariaHidden, true);
  element.removeAttribute(ariaModal);
  element.removeAttribute('role');
  element.style.visibility = 'hidden';

  if (triggers.length) {
    setFocus(triggers[0]);
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, false));
  }

  hiddenOffcanvasEvent.relatedTarget = related || null;
  element.dispatchEvent(hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);

  // handle new offcanvas showing up
  if (!queryElement(offcanvasActiveSelector)) {
    if (options.backdrop) removeOverlay();
    if (!options.scroll) {
      resetScrollbar();
      removeClass(document.body, modalOpenClass);
    }
  }
}

// OFFCANVAS PRIVATE METHODS
// =========================
function toggleOffcanvasEvents(self, add) {
  const { triggers } = self;
  const action = add ? addEventListener : removeEventListener;

  triggers.forEach((btn) => btn[action]('click', offcanvasTriggerHandler));
}

function toggleOffCanvasDismiss(add) {
  const action = add ? addEventListener : removeEventListener;
  document[action]('keydown', offcanvasKeyDismissHandler);
  document[action]('click', offcanvasDismissHandler);
}

function setOffCanvasScrollbar(self) {
  const bd = document.body;
  const html = document.documentElement;
  const openOffCanvas = hasClass(bd, modalOpenClass);
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  setScrollbar(self.scrollbarWidth, bodyOverflow, openOffCanvas);
}

function beforeOffcanvasShow(self, related) {
  // const {element} = self;

  emulateTransitionEnd(self.element, () => showOffcanvasComplete(self, related));
}

function beforeOffcanvasHide(self, related) {
  const { element } = self;

  element.blur();
  self.open = false;
  toggleOffCanvasDismiss();

  emulateTransitionEnd(element, () => hideOffcanvasComplete(self, related));
}

// OFFCANVAS DEFINITION
// ====================
class Offcanvas extends BaseComponent {
  constructor(target, config) {
    super(offcanvasComponent, target, offcanvasDefaultOptions, config);
    const self = this;

    // instance element
    const { element } = self;

    // all the triggering buttons
    self.triggers = Array.from(document.querySelectorAll(offcanvasToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional instance property
    self.open = false;
    self.scrollbarWidth = measureScrollbar();

    // attach event listeners
    toggleOffcanvasEvents(self, 1);
  }

  // OFFCANVAS PUBLIC METHODS
  // ========================
  toggle(related) {
    const self = this;
    return self.open ? self.hide(related) : self.show(related);
  }

  show(related) {
    const self = this[offcanvasComponent] ? this[offcanvasComponent] : this;
    const { element, options } = self;
    const currentOpen = getCurrentOpen();
    let overlayDelay = 0;

    if (currentOpen && currentOpen !== element) {
      const that = currentOpen.Modal
        ? currentOpen.Modal
        : currentOpen[offcanvasComponent];
      that.hide();
    }

    if (self.open) return;

    showOffcanvasEvent.relatedTarget = related || null;
    element.dispatchEvent(showOffcanvasEvent);

    if (showOffcanvasEvent.defaultPrevented) return;

    self.open = true;

    if (!options.scroll) {
      addClass(document.body, modalOpenClass);
      setOffCanvasScrollbar(self);
    }

    addClass(element, offcanvasTogglingClass);
    addClass(element, showClass);
    element.style.visibility = 'visible';

    if (options.backdrop) {
      if (!queryElement(`.${modalBackdropClass}`)) {
        appendOverlay(1);
      }

      overlayDelay = getElementTransitionDuration(overlay);

      if (!currentOpen && !hasClass(overlay, showClass)) showOverlay();
      setTimeout(() => beforeOffcanvasShow(self, related), overlayDelay);
    } else beforeOffcanvasShow(self, related);
  }

  hide(related) {
    const self = this;
    const { element, options } = self;
    const currentOpen = getCurrentOpen();

    if (!self.open) return;

    hideOffcanvasEvent.relatedTarget = related || null;
    element.dispatchEvent(hideOffcanvasEvent);
    if (hideOffcanvasEvent.defaultPrevented) return;

    addClass(element, offcanvasTogglingClass);
    removeClass(element, showClass);

    if (!currentOpen && options.backdrop) {
      hideOverlay();
      emulateTransitionEnd(overlay, () => beforeOffcanvasHide(self, related));
    } else beforeOffcanvasHide(self, related);
  }

  dispose() {
    toggleOffcanvasEvents(this);
    super.dispose(offcanvasComponent);
  }
}

Offcanvas.init = {
  component: offcanvasComponent,
  selector: OffcanvasSelector,
  constructor: Offcanvas,
};

export default Offcanvas;
