/// <reference types="cypress" />
import Alert from '../../src/components/alert-native';

describe('Alert Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/alert.html').as('alert-page')
      .visit('cypress/alert.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Alert(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Alert Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Init with target element', () => {
    cy.wait('@alert-page')
      .window().then((win) => {
        cy.get('[data-cy="alert"]').then(($element) => {
            const element = $element.get(0);
            const instance = new Alert(element);
            expect(instance.element).to.be.instanceOf(win.HTMLDivElement);
            expect(instance.element).to.equal(element);
            expect(instance.name).to.eq('Alert');
            expect(instance.options).to.be.empty;
            expect(instance.defaults).to.be.undefined;
            expect(instance.version).to.be.string;
          });
        });
  });

  it('Can do close() - removes target from DOM', () => {
    cy.wait('@alert-page')
      .get('[data-cy="alert"]').then(($element) => {
        const instance = Alert.init($element.get(0));
        cy.wrap(instance).as('instance');
      })
      .get('@instance').invoke('close').then(() => {
        cy.get('[data-cy="alert"]').should('not.exist');
      });
  });

  it('Can do dispose() - keeps target in DOM', () => {
    cy.wait('@alert-page')
      .get('[data-cy="alert"]').then(($element) => {
        const instance = new Alert($element.get(0));
        cy.wrap(instance).as('instance');
      })
      .get('@instance').invoke('dispose').then(() => {
        cy.get('[data-cy="alert"]').should('exist');
      })
      .get('@instance').its('element').should('be.null');
  });

  it('Can be dismissed via click', () => {
    cy.wait('@alert-page')
      .get('[data-cy="alert"]').then(($element) => {
        const element = $element.get(0);
        element.classList.remove('fade');
        const instance = new Alert(element);
        cy.wrap(instance).as('instance');
      })
      .get('@instance').its('dismiss').click()
      .get('[data-cy="alert"]').should('not.exist');
  });

  it('CustomEvent can be prevented', () => {
    cy.wait('@alert-page')
      .get('[data-cy="alert"]').then(($element) => {
        const element = $element.get(0);
        const instance = new Alert(element);
        element.addEventListener('close.bs.alert', function(e){
          if (element.innerText.includes('Holy')) {
            e.preventDefault()
          }
        })
        cy.wrap(instance).as('instance');
      })
      .get('@instance').invoke('close')
      .get('[data-cy="alert"]').should('exist');
  });
});