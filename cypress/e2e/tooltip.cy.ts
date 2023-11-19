/// <reference types="cypress" />
import Tooltip from '../../src/components/tooltip';
import Modal from '../../src/components/modal';
import Offcanvas from '../../src/components/offcanvas';
import Popover from '../../src/components/popover';

import changeDirection from '../fixtures/changeDirection'

describe('Tooltip Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/tooltip.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Tooltip(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Tooltip Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Init without content - won\'t work', () => {
    cy.get('[data-cy="tooltip"]').eq(0).then(($element) => {
      const instance = Tooltip.init($element[0]);
      expect(instance.tooltip).to.be.undefined;
      expect(instance.arrow).to.be.undefined;
    })
  });

  it('Can do toggle()', () => {
    cy.get('[data-cy="tooltip"]').eq(1).then(($element) => {
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
    cy.get('@instance').invoke('toggle')
    cy.get('@instance').its('tooltip').should('have.class', 'show')
    cy.get('@instance').invoke('toggle')
    cy.get('@instance').its('tooltip').should('not.have.class', 'show')
  });

  it('Can do automatic position on scroll / resize', () => {
    cy.viewport(1000, 600)
    cy.window().trigger('resize', { force: true })
    cy.wait(200)
    cy.get('[data-cy="tooltip"]').eq(3).then(($element) => {
        const element = $element[0];
        const { body } = element.ownerDocument;
        Object.assign(body.style, { paddingTop: '5rem', paddingBottom: '90vh'})
        cy.wrap(new Tooltip(element, {placement: 'left'})).as('resize');
      })
    cy.wait(200)
    cy.get('@resize').invoke('show')
    cy.get('@resize').its('tooltip').should('have.class', 'show').and('be.visible');
    cy.scrollTo('bottomLeft')
    cy.wait(200)
    cy.get('@resize').its('tooltip').should('have.class', 'bs-tooltip-start');
    cy.scrollTo('topLeft')
    cy.wait(200)
    cy.viewport(200, 600);
    cy.window().trigger('resize', { force: true })
    // cy.wait(200)
    cy.get('@resize').its('tooltip').should('have.class', 'bs-tooltip-top');
    cy.scrollTo('bottomLeft')
    cy.wait(200)
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
    cy.wait(200)
    cy.viewport(1000, 600)
    cy.window().trigger('resize', { force: true })
    cy.wait(200)
  });

  it('Can handle various trigger events', () => {
    cy.get('[data-cy="tooltip"]').eq(1).then(($element) => {
        const element = $element[0];
        // const body = element.ownerDocument.body; // used for custom container option
        const instance = new Tooltip(element, { trigger: 'hover focus click' });
        expect(Tooltip.getInstance(element)).to.be.instanceOf(Tooltip); // coverage
        cy.wrap(instance).as('instance');
      })
    cy.log('can handle **hover**')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('mouseenter')
    // cy.get('.tooltip').should('have.class', 'show').and('be.visible')
    cy.get('@instance').its('tooltip').then((tip) => {
      cy.wrap(tip).should('have.class', 'show').and('be.visible')
    })
    // cy.wait(200)
    cy.get('[data-cy="tooltip"]').eq(1).trigger('mouseleave', 500, 500, { force: true })
    cy.get('[data-cy="tooltip"]').eq(1).trigger('mouseout', 500, 500, { force: true })
    // cy.wait(200)
    // cy.get('.tooltip').should('not.exist')
    cy.get('@instance').its('tooltip').then((tip) => {
      cy.wrap(tip).should('not.exist')
    })
    cy.log('can handle **click**')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('mousedown')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('mouseup')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('click')
    cy.get('.tooltip').should('have.class', 'show').and('be.visible')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('mousedown')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('mouseup')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('click')
    cy.get('@instance').its('tooltip').then((tip) => {
      cy.wrap(tip).should('not.exist')
    })
    cy.get('[data-cy="tooltip"]').eq(1).trigger('focusout')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('blur')
    // cy.wait(200)
    cy.log('can handle **focus**')
    cy.get('[data-cy="tooltip"]').eq(1).trigger('focusin')
    cy.get('[data-cy="tooltip"]').eq(1).focus()
    cy.get('@instance').its('tooltip').then((tip) => {
      cy.wrap(tip).should('have.class', 'show')
    })
    cy.get('[data-cy="tooltip"]').eq(1).trigger('focusout')
    cy.get('[data-cy="tooltip"]').eq(1).blur()
    cy.get('@instance').its('tooltip').should('not.exist')
  });

  it('Can do toggleEnabled()', () => {
    cy.get('[data-cy="tooltip"]').eq(1).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('toggleEnable');
      })
    cy.get('@toggleEnable').invoke('toggleEnabled')
    cy.get('@toggleEnable').its('enabled').should('be.false')
    cy.get('@toggleEnable').invoke('toggleEnabled')
    cy.get('@toggleEnable').its('enabled').should('be.true')
    cy.get('@toggleEnable').invoke('toggle')
    cy.get('@toggleEnable').its('tooltip').should('have.class', 'show').and('be.visible')
    cy.get('@toggleEnable').invoke('toggleEnabled')
    cy.get('@toggleEnable').its('enabled').should('be.false')
    cy.get('@toggleEnable').invoke('toggle')
    cy.get('@toggleEnable').its('tooltip').should('not.exist')
    cy.get('@toggleEnable').invoke('toggleEnabled')
    cy.get('@toggleEnable').its('enabled').should('be.true')
    cy.get('@toggleEnable').invoke('toggle')
    cy.get('@toggleEnable').its('tooltip').should('have.class', 'show').and('be.visible')
    cy.get('@toggleEnable').invoke('dispose')
    cy.get('@toggleEnable').its('tooltip').should('not.exist')
  });

  it('Can be dismissed when closing an offcanvas', () => {
    cy.visit('cypress/offcanvas.html')

    cy.get('[data-cy="offcanvas"]').eq(0).then(($offcanvas) => {
      cy.wrap(new Offcanvas($offcanvas[0])).as('offcanvas');
    })
    cy.get('[data-cy="offcanvas"] [data-bs-toggle="tooltip"]').eq(0).then(($tip) => {
      cy.wrap(new Tooltip($tip[0])).as('tooltip_offcanvas');
    })
    cy.get('@offcanvas').invoke('toggle')
    cy.wait(300)
    cy.get('@tooltip_offcanvas').invoke('show')
    cy.get('@tooltip_offcanvas').its('tooltip').should('have.class', 'show')
    cy.wait(300)
    cy.get('@offcanvas').invoke('toggle')
    cy.get('@tooltip_offcanvas').its('tooltip').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can be dismissed when closing an overflowing modal', () => {
    cy.visit('cypress/modal.html');

    cy.get('.modal').eq(0).then(($modal) => {
        cy.wrap(new Modal($modal[0])).as('modal');
      })
    cy.get('[data-bs-toggle="tooltip"]').eq(0).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('tooltip_modal');
      })
    cy.get('@modal').invoke('show')
    cy.wait(200)
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').invoke('update')
      // .then(s => console.log(s))
    cy.get('@modal').its('element').then($el => cy.wrap($el).scrollTo(0, 350))
    // cy.log()
    cy.wait(200)
    cy.get('@tooltip_modal').its('tooltip').should('have.class', 'show')
      .and('have.class', 'bs-tooltip-bottom').and('be.visible')
    cy.wait(200)
    cy.get('@modal').invoke('hide')
    cy.get('@tooltip_modal').its('tooltip').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can be dismissed when closing a small modal', () => {
    cy.visit('cypress/modal.html');

    cy.get('.modal').eq(1).then(($modal) => {
        cy.wrap(new Modal($modal[0])).as('modal');
      })
    cy.get('[data-bs-toggle="tooltip"]').eq(1).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('tooltip_modal');
      })
    cy.get('@modal').invoke('toggle')
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').its('tooltip').should('have.class', 'show').and('be.visible')
    cy.wait(200)
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').its('tooltip').should('not.have.class', 'show')
    cy.wait(200)
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').its('tooltip').should('have.class', 'show').and('be.visible')
    cy.get('@modal').invoke('toggle')
    // cy.wait(200)
    cy.get('@tooltip_modal').its('tooltip').should('not.have.class', 'show')
  });

  it('Can be toggleEnabled when inside a small modal', () => {
    cy.visit('cypress/modal.html');

    cy.get('.modal').eq(1).then(($modal) => {
        cy.wrap(new Modal($modal[0])).as('modal');
      })
    cy.get('[data-bs-toggle="tooltip"]').eq(1).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('tooltip_modal');
      })
    cy.get('@modal').invoke('toggle')
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').its('tooltip').should('have.class', 'show').and('be.visible')
    // cy.wait(200)
    cy.get('@tooltip_modal').invoke('toggleEnabled')
    cy.get('@tooltip_modal').its('tooltip').should('not.have.class', 'show')
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').its('tooltip').should('not.have.class', 'show')
    cy.get('@tooltip_modal').invoke('toggleEnabled')
    cy.wait(200)
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').its('tooltip').should('have.class', 'show').and('be.visible')
  });

  it('Can work with popover, template and sanitizeFn', () => {
    cy.document().then((doc) => {
        const popoverTarget = doc.createElement('button');
        popoverTarget.className = 'btn btn-primary';
        popoverTarget.innerText = 'Popover Demo';
        popoverTarget.setAttribute('data-bs-title', 'Popover demo title');
        popoverTarget.setAttribute('data-bs-content', 'Popover demo content');
        popoverTarget.setAttribute('data-bs-toggle', 'popover');
        popoverTarget.setAttribute('data-bs-dismissible', 'true');
        doc.querySelector('.btn-toolbar')?.append(popoverTarget);
      })
      .get('[data-bs-toggle="popover"]').then(($element) => {
        const [element] = $element;
        // const HTML = element.ownerDocument.documentElement;
        const template = element.ownerDocument.createElement('div');
        template.innerHTML = `<div class="popover fade bs-popover-top" role="tooltip">
        <h3 class="popover-header"></h3>
        <div class="popover-arrow"></div>
        <div class="popover-body"></div>
        </div>`;
        // add another container for code coverage
        cy.wrap(new Popover(element, {template: template.firstChild as HTMLElement, sanitizeFn: (c) => c.trim()})).as('popover');
      })
    cy.get('@popover').invoke('show')
    .then(() => {
      cy.get('@popover').its('tooltip').should('have.class', 'show')
    })
  });

  it('Can work with popover and micro-template', () => {
    cy.document().then((doc) => {
        const popoverTarget = doc.createElement('button');
        popoverTarget.className = 'btn btn-primary';
        popoverTarget.innerText = 'Popover Demo';
        popoverTarget.setAttribute('data-bs-toggle', 'popover');
        popoverTarget.setAttribute('data-bs-dismissible', 'true');
        doc.querySelector('.btn-toolbar')?.append(popoverTarget);
      })
    cy.get('[data-bs-toggle="popover"]').then(($element) => {
        const element = $element[0];
        const doc = element.ownerDocument;
        const title = doc.createElement('div');
        title.innerHTML = `<span class="my-header">My Header Micro-Template</span>`;
        const content = doc.createElement('div');
        content.innerHTML = `<p class="my-content"><b class="lead">My Content</b> Micro-Template</p>`;
        const btnClose = doc.createElement('div');
        btnClose.innerHTML = '<button class="btn-close" aria-label="Close"></button>';
        // add another container for code coverage
        cy.wrap(new Popover(element, {
          title: title.firstChild as HTMLElement,
          content: content.firstChild as HTMLElement,
          btnClose: btnClose.firstChild as HTMLElement,
          customClass: 'custom-class'
        })).as('popover');
      })
    cy.get('@popover').invoke('show')
    cy.get('@popover').its('tooltip').should('have.class', 'custom-class').and('have.class', 'show')
  });

  it('Can be dismissed via touch events', () => {
    cy.get('[data-cy="tooltip"]').eq(1).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('touch_dismiss');
      })
    cy.get('@touch_dismiss').invoke('show')
    cy.get('@touch_dismiss').its('tooltip').then((tip) => {
      cy.wrap(tip).should('have.class', 'show').and('be.visible')
    })
    // cy.wait(200)
    cy.get('body').trigger('touchstart', 890, 10, { force: true })
    cy.get('body').trigger('touchend', 890, 10, { force: true })
    cy.get('@touch_dismiss').its('tooltip').then((tip) => {
      cy.wrap(tip).should('not.exist')
    })
    // cy.wait(200)
  });

  it('Can work with popover without title 1', () => {
    cy.document().then((doc) => {
        const popoverTarget = doc.createElement('button');
        popoverTarget.className = 'btn btn-primary';
        popoverTarget.innerText = 'Popover Demo';
        popoverTarget.setAttribute('data-bs-toggle', 'popover');
        popoverTarget.setAttribute('data-bs-dismissible', 'true');
        doc.querySelector('.btn-toolbar')?.append(popoverTarget);
      })
      .get('[data-bs-toggle="popover"]').then(($element) => {
        const element = $element[0];
        // add another container for code coverage
        cy.wrap(new Popover(element, {
          content: `<p class="m-0"><b class="lead">My Content</b> Micro-Template</p>`,
          btnClose: '<button class="btn-close text-primary" aria-label="Close"></button>',
        })).as('popover1');
      })
      .get('@popover1').invoke('show')
      .get('@popover1').its('tooltip').should('have.class', 'show')
  });

  it('Can work with popover without title 2', () => {
    cy.document().then((doc) => {
        const popoverTarget = doc.createElement('button');
        popoverTarget.className = 'btn btn-primary';
        popoverTarget.innerText = 'Popover Demo';
        popoverTarget.setAttribute('data-bs-toggle', 'popover');
        popoverTarget.setAttribute('data-bs-dismissible', 'true');
        doc.querySelector('.btn-toolbar')?.append(popoverTarget);
      })
    cy.get('[data-bs-toggle="popover"]').then(($element) => {
        const element = $element[0];
        // add another container for code coverage
        const btnClose = element.ownerDocument.createElement('div');
        btnClose.innerHTML = '<button class="btn-close" aria-label="Close"></button>';
        cy.wrap(new Popover(element, {
          content: `<p class="m-0"><b class="lead">My Content</b> Micro-Template</p>`,
          btnClose: btnClose.firstChild as HTMLElement,
        })).as('popover2');
      })
    cy.get('@popover2').invoke('show')
    cy.get('.tooltip').should('have.class', 'show')
  });

  it('Can work with RTL', () => {
    cy.get('[data-cy="tooltip"]').eq(3).then(($element) => {
        const element = $element[0];
        changeDirection(element, 'rtl'); // added template without tooltip class for coverage
        cy.wrap(new Tooltip(element, {template: '<div role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'})).as('rtl');
      })
    cy.get('@rtl').invoke('show')
    cy.get('.tooltip').should('have.class', 'show').and('be.visible')
    cy.wait(200)
  });

  it('Can do custom events', () => {
    cy.log('**hide.bs.tooltip** event can be default prevented').then(() => {
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
    cy.log('can dispose **open**').then(() => {
        cy.get('[data-cy="tooltip"]').eq(0).then(($element) => {
          cy.wrap(new Tooltip($element[0], { title: 'Sample Content'})).as('instance0');
        })
        cy.get('@instance0').invoke('show')
        cy.get('@instance0').its('tooltip').then((tip) => {
          cy.wrap(tip).should('have.class', 'show').and('be.visible')
        })
        
        cy.get('@instance0').invoke('dispose')
        cy.get('@instance0').its('element').should('be.undefined')
        cy.get('@instance0').its('tooltip').should('be.undefined')
      })
      // .wait(100)
    cy.log('can dispose **closed**').then(() => {
        cy.get('[data-cy="tooltip"]').eq(1).then(($element) => {
          cy.wrap(new Tooltip($element[0])).as('instance1');
          cy.get('@instance1').invoke('dispose')
          cy.get('@instance1').its('element').should('be.undefined')
          cy.get('@instance1').its('tooltip').should('be.undefined')
          cy.get('[data-cy="tooltip"]').eq(1).should('have.attr', 'title')
          cy.get('[data-cy="tooltip"]').eq(1).should('not.have.attr', 'data-original-title')
        })
      })
  });

  it('Can be disposed when inside a small modal', () => {
    cy.visit('cypress/modal.html');

    cy.get('.modal').eq(1).then(($modal) => {
        cy.wrap(new Modal($modal[0])).as('modal');
      })
    cy.get('[data-bs-toggle="tooltip"]').eq(1).then(($element) => {
        cy.wrap(new Tooltip($element[0])).as('tooltip_modal');
      })
    cy.get('@modal').invoke('toggle')
    cy.get('@tooltip_modal').invoke('toggle')
    cy.get('@tooltip_modal').its('tooltip').should('have.class', 'show').and('be.visible')
    // cy.wait(200)
    cy.get('@tooltip_modal').invoke('dispose')
    cy.get('@tooltip_modal').its('tooltip').should('not.have.class', 'show')
    cy.get('@tooltip_modal').its('tooltip').should('be.undefined');
    cy.visit('cypress/tooltip.html')
  });
});