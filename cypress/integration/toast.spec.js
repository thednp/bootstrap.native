/// <reference types="cypress" />
import Toast from '../../src/components/toast-native';

describe('Toast Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/toast.html').as('toast-page')
      .visit('cypress/toast.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Toast(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Toast Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Init with target element', () => {
    cy.wait('@toast-page')
      cy.get('.toast').then(($element) => {
          const element = $element[0];
          const instance = Toast.init(element);
          expect(instance.element).to.equal(element);
          expect(instance.name).to.eq('Toast');
          expect(instance.options).to.deep.equal({animation: true, autohide: true, delay: 5000});
          expect(instance.defaults).to.deep.equal({animation: true, autohide: true, delay: 5000});
          expect(instance.version).to.be.string;
        });
  });

  it('Can do show() and autoclose', () => {
    cy.wait('@toast-page')
      .get('.toast').then(($element) => {
        $element[0].classList.remove('fade'); // code coverage
        const instance = new Toast($element[0], { delay: 500 });
        cy.wrap(instance).as('instance');
      })
      .get('@instance').invoke('show')
      .get('@instance').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance').its('isShown').should('be.true')
      .wait(550)
      .get('@instance').its('element').should('not.have.class', 'show')
  });

  it('Can do click()', () => {
    cy.wait('@toast-page')
      .get('.toast').each(($element, i) => {
        cy.wrap(new Toast($element[0])).as('instance' + i);
      })
      .get('@instance0').its('triggers').eq(0).click()
      .get('@instance0').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance0').its('isShown').should('be.true')
      .get('@instance0').its('dismiss').click()
      .get('@instance0').its('element').should('not.have.class', 'show')
      .get('@instance1').its('triggers').eq(0).click()
      .get('@instance1').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance1').its('isShown').should('be.true')
      .get('@instance1').its('dismiss').click()
      .get('@instance1').its('element').should('not.have.class', 'show')
  });

  it('Can extend visibility duration by user interaction', () => {
    cy.wait('@toast-page')
      .get('.toast').then(($element) => {
        const instance = new Toast($element[0], { animation: false, delay: 200 });
        cy.wrap(instance).as('instance');
        cy.log(instance.options)
      })
      .get('@instance').invoke('show')
      .get('@instance').its('element').should('have.class', 'show').and('be.visible')
      .get('@instance').its('isShown').should('be.true')
      .wait(100)
      .get('@instance').its('element').trigger('mouseenter')
      .wait(217)
      .get('@instance').its('element').should('have.class', 'show').and('be.visible')
      .wait(100)
      .get('@instance').its('element').trigger('mouseleave')
      .wait(217)
      .get('@instance').its('element').should('not.have.class', 'show').and('be.hidden')
      .get('@instance').its('isShown').should('be.false')
  });

  it('Can do dispose()', () => {
    cy.wait('@toast-page')
      .get('.toast').then(($element) => {
        const instance = new Toast($element[0]);
        cy.wrap(instance).as('disposable');
      })
      .wait(17)
      .get('@disposable').invoke('show')
      .get('@disposable').its('element').should('have.class', 'show').and('be.visible')
      .wait(100)
      .get('@disposable').invoke('dispose')
      .get('@disposable').its('element').should('be.null');
  });

  it('CustomEvent can be prevented - hide', () => {
    cy.wait('@toast-page')
      .get('.toast').then(($element) => {
        const element = $element[0];
        const instance = new Toast(element);
        element.addEventListener('hide.bs.toast', function(e){
          if (!element.innerText.includes('wombat')) {
            e.preventDefault()
          }
        })
        cy.wrap(instance).as('instance_hide');
      })
      .get('@instance_hide').invoke('show')
      .get('@instance_hide').its('element').should('have.class', 'show').and('be.visible')
      .wait(500)
      .get('@instance_hide').its('dismiss').click()
      .get('@instance_hide').its('element').should('have.class', 'show').and('be.visible')
      // .get('@instance_hide').invoke('dispose')
      // .wait(200)
  });

  it('CustomEvent can be prevented - show', () => {
    cy.wait('@toast-page')
      .get('.toast').then(($element) => {
        const element = $element[0];
        const instance = new Toast(element);
        element.addEventListener('show.bs.toast', function(e){
          if (!element.innerText.includes('wombat')) {
            e.preventDefault()
          }
        })
        cy.wrap(instance).as('instance_show');
      })
      .get('@instance_show').invoke('show')
      .get('@instance_show').its('element').should('not.have.class', 'show').and('be.hidden')
      // .get('@instance_show').invoke('dispose')
      // .wait(200)
  });

});