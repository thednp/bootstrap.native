/// <reference types="cypress" />
import Offcanvas from '../../src/components/offcanvas';

describe('Offcanvas Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/offcanvas.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Offcanvas(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Offcanvas Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Can be openeded / dismissed via click - backdrop', () => {
    cy.get('[data-cy="offcanvas"]').eq(0).then(($element) => {
        cy.wrap(new Offcanvas($element[0])).as('click_test');
      })
    cy.get('[href="#offcanvasExample"]').click()
    cy.get('[data-cy="offcanvas"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.get('.offcanvas-backdrop').eq(0).trigger('mousedown', 990, 10)
    cy.get('.offcanvas-backdrop').eq(0).trigger('mouseup', 990, 10)
    cy.get('.offcanvas-backdrop').eq(0).trigger('click', 990, 10)
    cy.wait(100)
    cy.get('[data-cy="offcanvas"]').eq(0).should('not.have.class', 'show').and('be.hidden')
    cy.get('[href="#offcanvasExample"]').eq(0).click()
    cy.get('[data-cy="offcanvas"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.get('[data-cy="offcanvas"]').eq(0).find('[data-bs-dismiss="offcanvas"]').eq(0).trigger('click', 'center')
    cy.get('[data-cy="offcanvas"]').eq(0).should('not.have.class', 'show').and('be.hidden')
  });

  it('Init with target element', () => {
    cy.get('[data-cy="offcanvas"]').then(($element) => {
        const element = $element[0];
        const instance = new Offcanvas(element);
        expect(instance.element).to.equal(element);
        expect(instance.name).to.eq('Offcanvas');
        expect(instance.options).to.not.be.empty;
        expect(instance.defaults).to.not.be.undefined;
        expect(instance.version).to.be.string;
      });
  });

  it('Can do show() / hide()', function() {
    cy.get('[data-cy="offcanvas"]').each(($element, i) => {
        const instance = Offcanvas.init($element[0]);
        cy.wrap(instance).as(`instance${i}`);
      })
    cy.get('@instance0').invoke('toggle')
    cy.get('@instance0').invoke('show')
    cy.get('[data-cy="offcanvas"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.wait(100)
    cy.get('@instance0').invoke('toggle')
    cy.get('@instance0').invoke('hide') // should be prevented
    cy.get('[data-cy="offcanvas"]').eq(0).should('not.have.class', 'show').and('be.hidden')
    cy.wait(100)
    cy.get('@instance0').invoke('toggle')
    cy.get('[data-cy="offcanvas"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.wait(100)
    cy.get('@instance1').invoke('toggle')
    cy.get('@instance1').invoke('show') // should be prevented
    cy.get('[data-cy="offcanvas"]').eq(0).should('not.have.class', 'show')
    cy.get('[data-cy="offcanvas"]').eq(1).should('have.class', 'show').and('be.visible')
    cy.get('@instance0').invoke('toggle')
    cy.get('@instance0').invoke('show') // should be prevented
    cy.get('[data-cy="offcanvas"]').eq(0).should('have.class', 'show')
    cy.get('[data-cy="offcanvas"]').eq(1).should('not.have.class', 'show').and('be.hidden')
  });

  it('Can be openeded / dismissed via click - no backdrop', () => {
    cy.get('[data-cy="offcanvas"]').eq(1).then(($element) => {
        cy.wrap(new Offcanvas($element[0])).as('click_test');
      })
    cy.get('[data-bs-target="#offcanvasNoBackdrop"]').click()
    cy.get('[data-cy="offcanvas"]').eq(1).should('have.class', 'show').and('be.visible')
    cy.get('[data-bs-target="#offcanvasNoBackdrop"]').click()
    cy.get('[data-cy="offcanvas"]').eq(1).should('not.have.class', 'show').and('be.hidden')
    cy.get('[data-bs-target="#offcanvasNoBackdrop"]').click()
    cy.get('[data-cy="offcanvas"]').eq(1).should('have.class', 'show').and('be.visible')
    cy.get('[data-cy="offcanvas"]').eq(1).find('[data-bs-dismiss="offcanvas"]').click()
    cy.get('[data-cy="offcanvas"]').eq(1).should('not.have.class', 'show').and('be.hidden')
  });
  
  it('Can be dismissed via Escape', function() {
    cy.get('[data-cy="offcanvas"]').eq(0).then(($element) => {
      cy.wrap(new Offcanvas($element[0], { backdrop: 'static'})).as('key_test');
    })
    .get('@key_test').invoke('show')
    .get('@key_test').its('element').should('have.class', 'show').and('be.visible')
    .get('.offcanvas-backdrop').click()
    .get('@key_test').its('element').should('have.class', 'show').and('be.visible')
    .wait(100)
    .document().trigger('keydown', { code: 'Escape' })
    .get('@key_test').its('element').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can work with CustomEvent hide', function() {
    cy.get('[data-cy="offcanvas"]').eq(0).then(($element) => {
        const [element] = $element;
        const instance = new Offcanvas(element);
        element.addEventListener('hide.bs.offcanvas', function(e){
        if (!element.innerText.includes('Holy')) {
          e.preventDefault()
        }
      })
      cy.wrap(instance).as('hide_event');
      cy.get('@hide_event').invoke('toggle')
      cy.get('@hide_event').its('element').should('have.class', 'show')
      cy.wait(500)
      cy.get('@hide_event').invoke('toggle')
      cy.get('@hide_event').its('element').should('have.class', 'show')
    })
  });
  it('Can do dispose()', () => {
    cy.get('[data-cy="offcanvas"]').eq(0).then(($element) => {
        cy.wrap(new Offcanvas($element[0])).as('disposable');
        cy.get('@disposable').invoke('show')
        cy.get('@disposable').its('element').should('have.class', 'show').and('be.visible')
        cy.get('@disposable').invoke('dispose')
        cy.get('@disposable').its('element').should('be.undefined')
        cy.get('@disposable').its('options').should('be.undefined')
        cy.wait(500)
      })
  });

  it('Can work with CustomEvent show', function() {
    cy.get('[data-cy="offcanvas"]').eq(0).then(($element) => {
        const [element] = $element;
        const instance = new Offcanvas(element);
        element.addEventListener('show.bs.offcanvas', function(e){
        if (!element.innerText.includes('Holy')) {
          e.preventDefault()
        }
      })
      cy.wrap(instance).as('show_event');
      cy.get('@show_event').invoke('toggle')
      cy.get('@show_event').its('element').should('not.have.class', 'show').and('be.hidden')
    })
  });

});
