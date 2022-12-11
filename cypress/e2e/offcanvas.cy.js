/// <reference types="cypress" />
import Offcanvas from '../../src/components/offcanvas';

describe('Offcanvas Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/offcanvas.html').as('offcanvas-page')
      .visit('cypress/offcanvas.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Offcanvas(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Offcanvas Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Init with target element', () => {
    cy.wait('@offcanvas-page')
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
    cy.wait('@offcanvas-page')
      .get('[data-cy="offcanvas"]').each(($element, i) => {
        const instance = Offcanvas.init($element[0]);
        cy.wrap(instance).as(`instance${i}`);
      })
      .get('@instance0').invoke('toggle')
      .get('@instance0').invoke('show')
      .get('@instance0').its('element').should('have.class', 'show').and('be.visible')
      .wait(100)
      .get('@instance0').invoke('toggle')
      .get('@instance0').invoke('hide') // should be prevented
      .get('@instance0').its('element').should('not.have.class', 'show').and('be.hidden')
      .wait(100)
      .get('@instance0').invoke('toggle')
      .get('@instance0').its('element').should('have.class', 'show').and('be.visible')
      .wait(100)
      .get('@instance1').invoke('toggle')
      .get('@instance1').invoke('show') // should be prevented
      .get('@instance0').its('element').should('not.have.class', 'show')
      .get('@instance1').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance0').invoke('toggle')
      .get('@instance0').invoke('show') // should be prevented
      .get('@instance0').its('element').should('have.class', 'show')
      .get('@instance1').its('element').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can be openeded / dismissed via click - backdrop', () => {
    cy.wait('@offcanvas-page')
      .get('[data-cy="offcanvas"]').eq(0).then(($element) => {
        cy.wrap(new Offcanvas($element[0])).as('click_test');
      })
      .get('@click_test').its('triggers').eq(0).click()
      .get('@click_test').its('element').should('have.class', 'show').and('be.visible')
      .get('.offcanvas-backdrop').eq(0).trigger('mousedown', 990, 10)
      .get('.offcanvas-backdrop').eq(0).trigger('mouseup', 990, 10)
      .get('.offcanvas-backdrop').eq(0).trigger('click', 990, 10)
      .wait(100)
      .get('@click_test').its('element').should('not.have.class', 'show').and('be.hidden')
      .get('@click_test').its('triggers').eq(0).click()
      .get('@click_test').its('element').should('have.class', 'show').and('be.visible')
      .get('@click_test').its('element').find('[data-bs-dismiss="offcanvas"]').eq(0).trigger('click', 'center')
      .get('@click_test').its('element').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can be openeded / dismissed via click - no backdrop', () => {
    cy.wait('@offcanvas-page')
      .get('[data-cy="offcanvas"]').eq(1).then(($element) => {
        cy.wrap(new Offcanvas($element[0])).as('click_test');
      })
      .get('@click_test').its('triggers').eq(0).click()
      .get('@click_test').its('element').should('have.class', 'show').and('be.visible')
      .get('@click_test').its('triggers').eq(0).click()
      .get('@click_test').its('element').should('not.have.class', 'show').and('be.hidden')
      .get('@click_test').its('triggers').eq(0).click()
      .get('@click_test').its('element').should('have.class', 'show').and('be.visible')
      .get('@click_test').its('element').find('[data-bs-dismiss="offcanvas"]').eq(0).trigger('click', 'center')
      .get('@click_test').its('element').should('not.have.class', 'show').and('be.hidden')
  });
  
  it('Can be dismissed via Escape', function() {
    cy.wait('@offcanvas-page')
      .get('[data-cy="offcanvas"]').eq(0).then(($element) => {
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

  it('Can do dispose()', () => {
    cy.wait('@offcanvas-page')
      .get('[data-cy="offcanvas"]').eq(0).then(($element) => {
        cy.wrap(new Offcanvas($element[0])).as('disposable');
      })
      .get('@disposable', { timeout: 200 }).invoke('show')
      .get('@disposable').its('element').should('have.class', 'show').and('be.visible')
      .wait(200)
      .get('@disposable').invoke('dispose')
      .wait(200)
      .get('[data-cy="offcanvas"]').eq(0).should('not.have.class', 'show').and('be.hidden')
      .get('@disposable').its('element').should('be.null')
      .get('@disposable').its('options').should('be.null')
      .wait(200)
  });

  it('Can work with CustomEvent hide', function() {
    cy.wait('@offcanvas-page')
      .get('[data-cy="offcanvas"]').eq(0).then(($element) => {
        const element = $element[0];
        const instance = new Offcanvas(element);
        element.addEventListener('hide.bs.offcanvas', function(e){
        if (!element.innerText.includes('Holy')) {
          e.preventDefault()
        }
      })
      cy.wrap(instance).as('hide_event');
    })
    .get('@hide_event').invoke('toggle')
    .get('@hide_event').its('element').should('have.class', 'show').and('be.visible')
    .get('@hide_event').invoke('hide')
    .get('@hide_event').its('element').should('have.class', 'show').and('be.visible')
  });
  
  it('Can work with CustomEvent show', function() {
      cy.wait('@offcanvas-page')
        .get('[data-cy="offcanvas"]').eq(0).then(($element) => {
          const element = $element[0];
          const instance = new Offcanvas(element);
          element.addEventListener('show.bs.offcanvas', function(e){
          if (!element.innerText.includes('Holy')) {
            e.preventDefault()
          }
        })
        cy.wrap(instance).as('show_event');
      })
      .get('@show_event').invoke('toggle')
      .get('@show_event').its('element').should('not.have.class', 'show').and('be.hidden')
  });
});