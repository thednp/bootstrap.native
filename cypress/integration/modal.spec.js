/// <reference types="cypress" />
import Modal from '../../src/components/modal-native';

describe('Modal Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/modal.html').as('modal-page')
      .visit('cypress/modal.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Modal(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Modal Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Init with target element', () => {
    cy.wait('@modal-page')
    cy.get('[data-cy="modal"]').then(($element) => {
        const element = $element.get(0);
        const instance = new Modal(element);
        expect(instance.element).to.equal(element);
        expect(instance.name).to.eq('Modal');
        expect(instance.options).to.not.be.empty;
        expect(instance.defaults).to.not.be.undefined;
        expect(instance.version).to.be.string;
      });
  });

  it('Can do show() / hide() / toggle()', function() {
    cy.wait('@modal-page')
      .get('[data-cy="modal"]').each(($element, i) => {
        const instance = Modal.init($element[0]);
        cy.wrap(instance).as(`instance${i}`);
      })
      .get('@instance0').invoke('toggle')
      .get('@instance0').invoke('show')
      .get('@instance0').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance0').invoke('toggle')
      .get('@instance0').its('element').should('not.have.class', 'show').and('be.hidden')
      .get('@instance0').invoke('hide')
      .get('@instance0').invoke('toggle')
      .get('@instance0').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance0').invoke('show')
      .wait(200)
      .get('@instance1').invoke('toggle')
      .get('@instance0').its('element').should('not.have.class', 'show').and('be.hidden')
      .get('@instance1').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance1').invoke('show')
      .wait(200)
      .get('@instance0').invoke('toggle')
      .get('@instance0').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance1').its('element').should('not.have.class', 'show').and('be.hidden')
      .get('@instance0').invoke('show')
  });

  it('Can be openeded / dismissed via click', () => {
      cy.wait('@modal-page')
        .get('[data-cy="modal"]').eq(0).then(($element) => {
        cy.wrap(new Modal($element[0])).as('click_test');
      })
      .get('@click_test').its('triggers').eq(0).click()
      .get('@click_test').its('element').should('have.class', 'show')
      .get('@click_test').its('element').should('be.visible')
      .get('@click_test').its('element').trigger('mousedown', 10, 10)
      .get('@click_test').its('element').trigger('mouseup', 10, 10)
      .get('@click_test').its('element').trigger('click', 10, 10)
      .wait(300)
      .get('@click_test').its('element').should('not.have.class', 'show')
      .get('@click_test').its('triggers').eq(0).click()
      .wait(300)
      .get('@click_test').its('element').should('have.class', 'show').and('be.visible')
      .get('@click_test').its('element').find('[data-bs-dismiss="modal"]').eq(0).trigger('click', 'center')
      .get('@click_test').its('element').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can work with static backdrop', () => {
      cy.wait('@modal-page')
        .get('[data-cy="modal"]').eq(0).then(($element) => {
        cy.wrap(new Modal($element[0], {backdrop: 'static'})).as('static_test');
      })
      .get('@static_test').invoke('show')
      .get('@static_test').its('element').should('have.class', 'show')
      .get('@static_test').its('element').should('be.visible')
      .get('@static_test').its('element').trigger('mousedown', 10, 10)
      .get('@static_test').its('element').trigger('mouseup', 10, 10)
      .get('@static_test').its('element').trigger('click', 10, 10)
      .get('@static_test').its('element').should('have.class', 'modal-static')
      .get('@static_test').its('element').should('have.class', 'show').and('be.visible')
      .get('@static_test').its('element').should('not.have.class', 'modal-static')
  });

  it('Can work with resize event', () => {
    cy.wait('@modal-page')
      .get('[data-cy="modal"]').eq(1).then(($element) => {
        cy.wrap(new Modal($element[0], { backdrop: true })).as('resize_test');
      })
      .get('@resize_test').invoke('show')
      .get('@resize_test').its('element').should('have.class', 'show')
      .get('@resize_test').its('element').should('be.visible');
    cy.viewport(320,600)
    cy.window().trigger('resize')
    cy.get('@resize_test').its('element').should('have.class', 'show').and('be.visible')
      .get('@resize_test').invoke('update') // force calling the method
      .document().its('body.style.cssText').should('contain', 'overflow: hidden')
  });
  
  it('Can be dismissed via Escape', function() {
    cy.wait('@modal-page')
      .get('[data-cy="modal"]').eq(0).then(($element) => {
      cy.wrap(new Modal($element[0])).as('key_test');
    })
    .get('@key_test').invoke('show')
    .get('@key_test').its('element').should('have.class', 'show').and('be.visible')
    .wait(300)
    .document().trigger('keydown', { code: 'Escape' })
    .get('@key_test').its('element').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can do dispose()', function() {
    cy.wait('@modal-page')
      .get('[data-cy="modal"]').eq(0).then(($element) => {
        cy.wrap(new Modal($element[0])).as('disposable');
      })
      .get('@disposable', { timeout: 200 }).invoke('show')
      .get('@disposable').its('element').should('have.class', 'show').and('be.visible')
      .get('@disposable').invoke('dispose')
      .get('[data-cy="modal"]').eq(0).should('not.have.class', 'show').and('be.hidden')
      .get('@disposable').its('element').should('be.null')
      .get('@disposable').its('options').should('be.null')
  });

  it('Can work with CustomEvent hide', function() {
    cy.wait('@modal-page')
      .get('[data-cy="modal"]').eq(0).then(($element) => {
        const element = $element.get(0);
        const instance = new Modal(element);
        element.addEventListener('hide.bs.modal', function(e){
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
      cy.wait('@modal-page')
        .get('[data-cy="modal"]').eq(1).then(($element) => {
          const element = $element.get(0);
          const instance = new Modal(element);
          element.addEventListener('show.bs.modal', function(e){
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