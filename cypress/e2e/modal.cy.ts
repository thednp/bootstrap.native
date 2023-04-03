/// <reference types="cypress" />
import Modal from '../../src/components/modal';

describe('Modal Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/modal.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Modal(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Modal Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Init with target element', () => {
    cy.get('[data-cy="modal"]').then(($element) => {
        const element = $element[0];
        const instance = new Modal(element);
        expect(instance.element).to.equal(element);
        expect(instance.name).to.eq('Modal');
        expect(instance.options).to.not.be.empty;
        expect(instance.defaults).to.not.be.undefined;
        expect(instance.version).to.be.string;
      });
  });

  it('Can do show() / hide() / toggle()', function() {
    cy.get('[data-cy="modal"]').each(($element, i) => {
        const instance = Modal.init($element[0]);
        cy.wrap(instance).as(`instance${i}`);
      })
    cy.get('@instance0').invoke('toggle')
    cy.get('@instance0').invoke('show')
    cy.get('[data-cy="modal"]').should('have.class', 'show').and('be.visible')
    cy.get('@instance0').invoke('toggle')
    cy.get('[data-cy="modal"]').eq(0).should('not.have.class', 'show').and('be.hidden')
    cy.get('@instance0').invoke('hide')
    cy.wait(300)
    cy.get('@instance0').invoke('toggle')
    cy.get('[data-cy="modal"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.get('@instance0').invoke('show')
    cy.wait(300)
    cy.get('@instance1').invoke('toggle')
    cy.get('[data-cy="modal"]').eq(0).should('not.have.class', 'show').and('be.hidden')
    cy.get('[data-cy="modal"]').eq(1).should('have.class', 'show').and('be.visible')
    cy.get('@instance1').invoke('show')
    cy.wait(300)
    cy.get('@instance0').invoke('toggle')
    cy.get('[data-cy="modal"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.get('[data-cy="modal"]').eq(1).should('not.have.class', 'show').and('be.hidden')
    cy.get('@instance0').invoke('show')
  });

  it('Can be openeded / dismissed via click', () => {
    cy.get('[data-cy="modal"]').eq(0).then(($element) => {
      cy.wrap(new Modal($element[0])).as('click_test');
    })
    cy.get('[href="#myModal"]').click({force:true})
    cy.get('[data-cy="modal"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.get('[data-cy="modal"]').eq(0).trigger('mousedown', 10, 10)
    cy.get('[data-cy="modal"]').eq(0).trigger('mouseup', 10, 10)
    cy.get('[data-cy="modal"]').eq(0).trigger('click', 10, 10)
    cy.wait(300)
    cy.get('[data-cy="modal"]').eq(0).should('not.have.class', 'show')
    cy.get('[href="#myModal"]').click({force:true})
    cy.wait(300)
    cy.get('[data-cy="modal"]').eq(0).should('have.class', 'show').and('be.visible')
    cy.get('[data-cy="modal"]').eq(0).find('[data-bs-dismiss="modal"]').eq(0).trigger('click', 'center')
    cy.get('[data-cy="modal"]').eq(0).should('not.have.class', 'show').and('be.hidden')
  });

  it('Can work with static backdrop', () => {
      cy.get('[data-cy="modal"]').eq(0).then(($element) => {
        cy.wrap(new Modal($element[0], {backdrop: 'static'})).as('static_test');
      })
      cy.get('@static_test').invoke('show')
      cy.get('[data-cy="modal"]').eq(0).should('have.class', 'show')
      cy.get('[data-cy="modal"]').eq(0).should('be.visible')
      cy.get('[data-cy="modal"]').eq(0).trigger('mousedown', 10, 10)
      cy.get('[data-cy="modal"]').eq(0).trigger('mouseup', 10, 10)
      cy.get('[data-cy="modal"]').eq(0).trigger('click', 10, 10)
      cy.get('[data-cy="modal"]').eq(0).should('have.class', 'modal-static')
      cy.get('[data-cy="modal"]').eq(0).should('have.class', 'show').and('be.visible')
      cy.get('[data-cy="modal"]').eq(0).should('not.have.class', 'modal-static')
  });

  it('Can work with resize event', () => {
    cy.get('[data-cy="modal"]').eq(1).then(($element) => {
        cy.wrap(new Modal($element[0], { backdrop: true })).as('resize_test');
      })
      .get('@resize_test').invoke('show')
      .get('@resize_test').its('element').should('have.class', 'show')
      .get('@resize_test').its('element').should('be.visible');
    cy.wait(200)
    cy.viewport(320,600)
    cy.window().trigger('resize')
    cy.get('@resize_test').its('element').should('have.class', 'show').and('be.visible')
      .get('@resize_test').invoke('update') // force calling the method
      .document().its('body.style.cssText').should('contain', 'overflow: hidden')
    cy.wait(200)
    cy.viewport(1000,600)
    // cy.wait(200)
  });
  
  it('Can be dismissed via Escape', function() {
    cy.get('[data-cy="modal"]').eq(0).then(($element) => {
      cy.wrap(new Modal($element[0])).as('key_test');
    })
    cy.get('@key_test').invoke('show')
    cy.get('@key_test').its('element').should('have.class', 'show').and('be.visible')
    cy.wait(300)
    cy.document().trigger('keydown', { code: 'Escape' })
    cy.get('@key_test').its('element').should('not.have.class', 'show').and('be.hidden')
  });

  it('Can do dispose()', function() {
    cy.get('[data-cy="modal"]').eq(0).then(($element) => {
        cy.wrap(new Modal($element[0])).as('disposable');
        cy.get('@disposable').invoke('show').then(() => {
          cy.wait(300)
          cy.get('[data-cy="modal"]').eq(0).should('exist').and('have.class', 'show').and('be.visible')
        })
        cy.get('@disposable').invoke('dispose').then(() => {
          cy.wait(300)
          cy.get('@disposable').then(s => console.log(s));
          cy.get('[data-cy="modal"]').eq(0).should('not.have.class', 'show').and('be.hidden')
          // cy.wrap(Modal.getInstance($element[0])).should('be.null')
          cy.get('@disposable').its('element').should('be.undefined')
          cy.get('@disposable').its('options').should('be.undefined')
        })
      })
  });

  it('Can work with CustomEvent hide', function() {
    cy.get('[data-cy="modal"]').eq(0).then(($element) => {
        const element = $element[0];
        const instance = new Modal(element);
        element.addEventListener('hide.bs.modal', function(e){
        if (!element.innerText.includes('Holy')) {
          e.preventDefault()
        }
      })
      cy.wrap(instance).as('hide_event');
    })
    cy.get('@hide_event').invoke('toggle')
    cy.get('@hide_event').its('element').should('have.class', 'show').and('be.visible')
    cy.get('@hide_event').invoke('hide')
    cy.get('@hide_event').its('element').should('have.class', 'show').and('be.visible')
  });
  
  it('Can work with CustomEvent show', function() {
      cy.get('[data-cy="modal"]').eq(1).then(($element) => {
          const element = $element[0];
          const instance = new Modal(element);
          element.addEventListener('show.bs.modal', function(e){
          if (!element.innerText.includes('Holy')) {
            e.preventDefault()
          }
        })
        cy.wrap(instance).as('show_event');
      })
    cy.get('@show_event').invoke('toggle')
    cy.get('@show_event').its('element').should('not.have.class', 'show').and('be.hidden')
  });
});
