/// <reference types="cypress" />
import Toast from '../../src/components/toast';

describe('Toast Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/toast.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Toast(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Toast Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Init with target element', () => {
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
    cy.get('.toast').then(($element) => {
        $element[0].classList.remove('fade'); // code coverage
        const instance = new Toast($element[0], { delay: 200 });
        cy.wrap(instance).as('instance');
        cy.get('@instance').invoke('show')
        cy.wait(250)

        cy.get('@instance').its('element').should('have.class', 'show')
        cy.get('@instance').its('isShown').should('be.true')
        cy.wait(250)
        // cy.get('@instance').then(() => {
          cy.get('@instance').its('isShown').should('be.false')
          cy.get('@instance').its('element').should('not.have.class', 'show')
        // })
      })
  });

  it('Can do click()', () => {
    cy.get('.toast').each(($element, i) => {
        cy.wrap(new Toast($element[0])).as('instance' + i);
      })
    cy.get('@instance0').its('triggers').then(tgs => cy.wrap(tgs).eq(0).click())
    cy.get('@instance0').its('element').should('have.class', 'show').and('be.visible')
    cy.get('@instance0').its('isShown').should('be.true')
    cy.get('@instance0').its('dismiss').then(dsm => cy.wrap(dsm).click())
    cy.get('@instance0').its('element').should('not.have.class', 'show')
    cy.get('@instance1').its('triggers').then(tgs => cy.wrap(tgs).eq(0).click())
    cy.get('@instance1').its('element').should('have.class', 'show').and('be.visible')
    cy.get('@instance1').its('isShown').should('be.true')
    cy.get('@instance1').its('dismiss').then(dsm => cy.wrap(dsm).click())
    cy.get('@instance1').its('element').should('not.have.class', 'show')
  });

  it('Can extend visibility duration by user interaction', () => {
    cy.get('.toast').then(($element) => {
        const instance = new Toast($element[0], { animation: false, delay: 200 });
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').invoke('show')
    cy.get('@instance').its('element').should('have.class', 'show').and('be.visible')
    cy.get('@instance').its('isShown').should('be.true')
    cy.wait(100)
    cy.get('@instance').its('element').first().trigger('mouseenter', {force: true})
    cy.wait(190)
    cy.get('@instance').its('element').should('have.class', 'show').and('be.visible')
    cy.wait(100)
    cy.get('@instance').its('element').first().trigger('mouseenter', {force: true}).trigger('mouseleave', {force: true})
    cy.wait(201)
    cy.get('@instance').its('element').should('not.have.class', 'show')
    cy.get('@instance').its('isShown').should('be.false')
  });

  it('Can do dispose()', () => {
    cy.get('.toast').then(($element) => {
        const instance = new Toast($element[0]);
        cy.wrap(instance).as('disposable');
      })
    // cy.wait(17)
    cy.get('@disposable').invoke('show')
    cy.get('@disposable').its('element').should('have.class', 'show').and('be.visible')
      // .wait(100)
    cy.get('@disposable').invoke('dispose')
    cy.get('@disposable').its('element').should('be.undefined');
  });

  it('CustomEvent can be prevented - hide', () => {
    cy.get('.toast').then(($element) => {
        const element = $element[0];
        const instance = new Toast(element);
        element.addEventListener('hide.bs.toast', function(e){
          if (!element.innerText.includes('wombat')) {
            e.preventDefault()
          }
        })
        cy.wrap(instance).as('instance_hide');
      })
    cy.get('@instance_hide').invoke('show')
    cy.get('@instance_hide').its('element').should('have.class', 'show').and('be.visible')
      // .wait(500)
    cy.get('@instance_hide').its('dismiss').then(dsm => cy.wrap(dsm).click())
    cy.get('@instance_hide').its('element').should('have.class', 'show').and('be.visible')
  });

  it('CustomEvent can be prevented - show', () => {
    cy.get('.toast').then(($element) => {
        const element = $element[0];
        const instance = new Toast(element);
        element.addEventListener('show.bs.toast', function(e){
          if (!element.innerText.includes('wombat')) {
            e.preventDefault()
          }
        })
        cy.wrap(instance).as('instance_show');
      })
    cy.get('@instance_show').invoke('show')
    cy.get('@instance_show').its('element').should('not.have.class', 'show').and('be.hidden')
  });

});