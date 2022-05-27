/// <reference types="cypress" />
import Tooltip from '../../src/components/tooltip-native';
import Modal from '../../src/components/modal-native';
import Offcanvas from '../../src/components/offcanvas-native';
import Popover from '../../src/components/popover-native';

import changeDirection from '../fixtures/changeDirection'

describe('Tooltip Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/tooltip.html').as('tooltip-page')
      .visit('cypress/tooltip.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Tooltip(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Tooltip Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Init without content - won\'t work', () => {
    cy.wait('@tooltip-page')
    .get('[data-cy="tooltip"]').eq(0).then(($element) => {
      const instance = Tooltip.init($element[0]);
      expect(instance.tooltip).to.be.empty;
      expect(instance.arrow).to.be.empty;
    })
  });

  it('Can do toggle()', () => {
    cy.wait('@tooltip-page')
      .get('[data-cy="tooltip"]').eq(1).then(($element) => {
          const element = $element[0];
          const instance = new Tooltip(element, { trigger: 'manual' });
          expect(instance.element, 'element').to.equal(element);
          expect(instance.tooltip, 'tooltip').to.not.be.undefined;
          expect(instance.name, 'name').to.eq('Tooltip');
          expect(instance.options, 'options').to.not.be.empty;
          expect(instance.defaults, 'defaults').to.not.be.undefined;
          expect(instance.version, 'version').to.be.string;

          cy.wrap(instance).as('instance');
        })
        .get('@instance').invoke('toggle')
        .get('@instance').its('tooltip').should('have.class', 'show')
        .get('@instance').invoke('toggle')
        .get('@instance').its('tooltip').should('not.have.class', 'show')
  });

  it('Can do automatic position on scroll / resize', () => {
    cy.wait('@tooltip-page')
      .get('[data-cy="tooltip"]').eq(3).then(($element) => {
        const element = $element[0];
        const body = element.ownerDocument.body;
        Object.assign(body.style, { paddingTop: '5rem', paddingBottom: '90vh'})
        cy.wrap(new Tooltip(element, {placement: 'left'})).as('resize');
      })
    cy.get('@resize').invoke('show')
    cy.get('@resize').its('tooltip').should('have.class', 'show').and('be.visible');
    cy.scrollTo('bottomLeft')
    cy.wait(200)
    cy.get('@resize').its('tooltip').should('have.class', 'bs-tooltip-start');
    cy.get('@resize').its('tooltip.style.cssText').should('include', 'top: 120');
    cy.scrollTo('topLeft')
    cy.wait(200)
    cy.viewport(200, 600);
    cy.wait(17);
    cy.window().trigger('resize', { force: true })
    cy.wait(200)
    cy.get('@resize').its('tooltip').should('have.class', 'bs-tooltip-top');
    cy.scrollTo('bottomLeft')
    cy.wait(200)
    // cy.wait(17);
    cy.get('@resize').its('tooltip').should('have.class', 'bs-tooltip-bottom')
    cy.viewport(1000, 600)
      .get('[data-cy="tooltip"]').eq(3).then(($element) => {
        Object.assign(
          $element[0].ownerDocument.body.style,
          { paddingTop: '90vh', paddingBottom: '5rem'})
      })
    cy.window().trigger('resize', { force: true })
    cy.scrollTo('topLeft')
    cy.wait(200)
    cy.get('@resize').its('tooltip').should('have.class', 'bs-tooltip-start')
    cy.get('@resize').its('tooltip.style.cssText').should('include', 'top: 489');
    cy.wait(200)

  });

  it('Can do toggleEnabled()', () => {
    cy.wait('@tooltip-page')
      .get('[data-cy="tooltip"]').eq(1).then(($element) => {
          const element = $element[0];
          const instance = new Tooltip(element, {container: element.parentElement}); // force a container bypass

          cy.wrap(instance).as('toggleEnable');
        })
        .get('@toggleEnable').invoke('toggleEnabled')
        .get('@toggleEnable').its('enabled').should('be.false')
        .get('@toggleEnable').invoke('toggleEnabled')
        .get('@toggleEnable').its('enabled').should('be.true')
        .get('@toggleEnable').invoke('toggle')
        .get('@toggleEnable').its('tooltip').should('have.class', 'show')
        .get('@toggleEnable').invoke('toggleEnabled')
        // .wait(200)
        .get('@toggleEnable').its('enabled').should('be.false')
        .get('@toggleEnable').invoke('toggle')
        .get('@toggleEnable').its('tooltip').should('be.hidden')
        // .wait(200)
        .get('@toggleEnable').invoke('toggleEnabled')
        .wait(200)
        .get('@toggleEnable').its('enabled').should('be.true')
        .get('@toggleEnable').invoke('toggle')
        .get('@toggleEnable').its('tooltip').should('have.class', 'show')
        .wait(200)
  });

  it('Can handle various trigger events', () => {
    cy.wait('@tooltip-page')
      .get('[data-cy="tooltip"]').eq(1).then(($element) => {
          const element = $element.get(0);
          const body = element.ownerDocument.body; // used for custom container option
          const instance = new Tooltip(element, { trigger: 'hover focus click', container: body });
          expect(Tooltip.getInstance(element)).to.be.instanceOf(Tooltip); // coverage
          cy.wrap(instance).as('instance');
        })
        .log('can handle **hover**')
        .get('@instance').its('element').trigger('mouseenter')
        .get('@instance').its('tooltip').should('have.class', 'show')
        .get('@instance').its('element').trigger('mouseleave')
        .get('@instance').its('tooltip').should('not.have.class', 'show')
        .wait(200)
        .log('can handle **click**')
        .get('@instance').its('element').trigger('mousedown')
        .get('@instance').its('element').trigger('mouseup')
        .get('@instance').its('element').trigger('click')
        .get('@instance').its('tooltip').should('have.class', 'show')
        .get('@instance').its('element').trigger('mousedown')
        .get('@instance').its('element').trigger('mouseup')
        .get('@instance').its('element').trigger('click')
        .get('@instance').its('tooltip').should('not.have.class', 'show')
        .get('@instance').its('element').trigger('focusout')
        .get('@instance').its('element').trigger('blur')
        .wait(200)
        .log('can handle **focus**')
        .get('@instance').its('element').trigger('focusin')
        .get('@instance').its('element').focus()
        .get('@instance').its('tooltip').should('have.class', 'show')
        .get('@instance').its('element').trigger('focusout')
        .get('@instance').its('element').blur()
        .get('@instance').its('tooltip').should('not.have.class', 'show')
        .wait(200)
  });

  it('Can be dismissed when closing a modal', () => {
    cy.intercept('GET', 'cypress/modal.html').as('modal-page')
      .visit('cypress/modal.html');

    cy.wait('@modal-page')
      .get('.modal').then(($modal) => {
        const modal = $modal[0];
        const modalBody = modal.querySelector('.modal-body');
        const doc = modalBody.ownerDocument;
        const tooltipTarget = doc.createElement('button');
        tooltipTarget.innerText = 'Tooltip Demo';
        tooltipTarget.setAttribute('data-bs-title', 'Tooltip Inside Modal');
        tooltipTarget.setAttribute('data-bs-toggle', 'tooltip');
        modalBody.append(tooltipTarget);
        cy.wrap(new Modal(modal)).as('modal');
      })
      .get('[data-bs-toggle="tooltip"]').eq(0).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('tooltip_modal');
      })
      .get('@modal').invoke('show')
      .get('@tooltip_modal').invoke('show')
      .get('@tooltip_modal').its('tooltip').should('have.class', 'show').and('be.visible')
      .wait(200)
      .get('@modal').invoke('hide')
      .get('@tooltip_modal').its('tooltip').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can be dismissed when closing an offcanvas', () => {
    cy.intercept('GET', 'cypress/offcanvas.html').as('offcanvas-page')
      .visit('cypress/offcanvas.html');

    cy.wait('@offcanvas-page')
      .get('.offcanvas').then(($offcanvas) => {
        const offcanvas = $offcanvas[0];
        const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
        const doc = offcanvasBody.ownerDocument;
        const tooltipTarget = doc.createElement('button');
        tooltipTarget.innerText = 'Tooltip Demo';
        tooltipTarget.setAttribute('data-bs-title', 'Tooltip Inside Offcanvas');
        tooltipTarget.setAttribute('data-bs-toggle', 'tooltip');
        offcanvasBody.append(tooltipTarget);
        cy.wrap(new Offcanvas(offcanvas)).as('offcanvas');
      })
      .get('[data-bs-toggle="tooltip"]').eq(0).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('tooltip_offcanvas');
      })
      .get('@offcanvas').invoke('show')
      .get('@tooltip_offcanvas').invoke('show')
      .get('@tooltip_offcanvas').its('tooltip').should('have.class', 'show').and('be.visible')
      .wait(200)
      .get('@offcanvas').invoke('hide')
      .get('@tooltip_offcanvas').its('tooltip').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can work with popover', () => {
    cy.wait('@tooltip-page')
      .document().then((doc) => {
        const popoverTarget = doc.createElement('button');
        popoverTarget.innerText = 'Popover Demo';
        popoverTarget.setAttribute('data-bs-title', 'Popover demo title');
        popoverTarget.setAttribute('data-bs-content', 'Popover demo content');
        popoverTarget.setAttribute('data-bs-toggle', 'popover');
        popoverTarget.setAttribute('data-bs-dismissible', 'true');
        doc.querySelector('.btn-toolbar').append(popoverTarget);
      })
      .get('[data-bs-toggle="popover"]').then(($element) => {
        const element = $element[0];
        const HTML = element.ownerDocument.documentElement;
        // add another container for code coverage
        cy.wrap(new Popover(element, {container: HTML})).as('popover');
      })
      .get('@popover').invoke('show')
      .get('@popover').its('tooltip').should('have.class', 'show').and('be.visible')
      // .wait(200)
  });

  it('Can be dismissed via touch events', () => {
    cy.wait('@tooltip-page')
      .get('[data-cy="tooltip"]').eq(1).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('touch_dismiss');
      })
      .get('@touch_dismiss').invoke('show')
      .get('@touch_dismiss').its('tooltip').should('have.class', 'show').and('be.visible')
      .wait(200)
      .document().its('body').trigger('touchstart', 890, 10, { force: true })
      .document().its('body').trigger('touchend', 890, 10, { force: true })
      .get('@touch_dismiss').its('tooltip').should('not.have.class', 'show')
      .wait(200)
  });

  it('Can work with RTL', () => {
    cy.wait('@tooltip-page')
      .get('[data-cy="tooltip"]').eq(3).then(($element) => {
        const element = $element[0];
        changeDirection(element, 'rtl');
        cy.wrap(new Tooltip(element)).as('rtl');
      })
      .get('@rtl').invoke('show')
      .get('@rtl').its('tooltip').should('have.class', 'show').and('be.visible')
      .get('@rtl').its('tooltip.style.cssText').should('include', 'left: 71');

    cy.wait(200)
  });

  it('Can work with media elements', () => {
    cy.wait('@tooltip-page')
      .get('svg').then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('media');
      })
      .get('@media').its('element').trigger('mouseenter', 'center')
      .get('@media').its('tooltip').should('have.class', 'show').and('be.visible')
      .get('@media').its('element').trigger('mousemove', 'topLeft')
      .get('@media').its('element').trigger('mouseleave', 'topLeft')
      .get('@media').its('tooltip').should('not.have.class', 'show')
  });

  it('Can do custom events', () => {
    cy.wait('@tooltip-page')
      .log('**hide.bs.tooltip** event can be default prevented').then(() => {
        cy.get('[data-cy="tooltip"]').eq(0).then(($element) => {
            const element = $element[0];
            element.addEventListener('hide.bs.tooltip', function(e){
              if (!element.innerText.includes('wombat')) {
                e.preventDefault();
              }
            })
            cy.wrap(new Tooltip(element, {title: 'Sample Title'})).as('hide_event');
          })
          .get('@hide_event').invoke('show')
          .get('@hide_event').its('tooltip').should('have.class', 'show').and('be.visible')
          .get('@hide_event').invoke('hide')
          .get('@hide_event').its('tooltip').should('have.class', 'show').and('be.visible')
      })
      .wait(200)
      .log('**show.bs.tooltip** event can be default prevented').then(() => {
        cy.get('[data-cy="tooltip"]').eq(1).then(($element) => {
            const element = $element[0];
            element.addEventListener('show.bs.tooltip', function(e){
              if (!element.innerText.includes('wombat')) {
                e.preventDefault();
              }
            })
            cy.wrap(new Tooltip(element)).as('show_event');
          })
          .get('@show_event').invoke('show')
          .get('@show_event').its('tooltip').should('not.exist')
      })
      .wait(200)
  });

  it('Can dispose()', () => {
    cy.wait('@tooltip-page')
      .log('can dispose **open**').then(() => {
        cy.get('[data-cy="tooltip"]').eq(0).then(($element) => {
          cy.wrap(new Tooltip($element[0], { title: 'Sample Content'})).as('instance0');
        })
        .get('@instance0').invoke('show')
        .get('@instance0').its('tooltip').should('have.class', 'show').and('be.visible')
        .get('@instance0').invoke('dispose')
        .get('@instance0').its('element').should('be.null')
        .get('@instance0').its('tooltip').should('be.null')
      })
      .wait(100)
      .log('can dispose **closed**').then(() => {
        cy.get('[data-cy="tooltip"]').eq(1).then(($element) => {
          cy.wrap(new Tooltip($element[0])).as('instance1');
        })
        .get('@instance1').invoke('dispose')
        .get('@instance1').its('element').should('be.null')
        .get('@instance1').its('tooltip').should('be.null')
        .get('[data-cy="tooltip"]').eq(1).should('have.attr', 'title')
        .get('[data-cy="tooltip"]').eq(1).should('not.have.attr', 'data-original-title')
      })
  });
});