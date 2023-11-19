/// <reference types="cypress" />
import Alert from '../../src/components/alert';

describe('Alert Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/alert.html');
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Alert(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', 'Alert Error: your target is not an instance of HTMLElement.');
    }
  });

  it('Init with wrong selector - throws error', () => {
    const selector = 'wombat';
    try {
      // @ts-ignore
      new Alert(selector);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Alert Error: "${selector}" is not a valid selector.`);
    }
  });

  it('Init with target element', () => {
    cy.get('[data-cy="alert"]').then($element => {
      const element = $element[0];
      const instance = new Alert(element);
      expect(instance.element).to.equal(element);
      expect(instance.name).to.eq('Alert');
      expect(instance.options).to.be.empty;
      expect(instance.defaults).to.be.empty;
      expect(instance.version).to.be.string;
      expect(Alert.getInstance(element)).to.be.instanceOf(Alert);
    });
  });

  it('Can do close() - removes target from DOM', () => {
    cy.get('[data-cy="alert"]')
      .then($element => {
        Alert.init($element[0]);
        cy.wrap(Alert.init($element[0])).as('instance');
      })
    cy.get('@instance').invoke('close')
      .then(() => {
        cy.get('[data-cy="alert"]').should('not.exist');
      });
  });

  it('Can do dispose() - keeps target in DOM', () => {
    cy.get('[data-cy="alert"]')
      .then($element => {
        const instance = new Alert($element[0]);
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').invoke('dispose')
      // .then(() => {
        cy.get('[data-cy="alert"]').should('exist');
      // })
    cy.get('@instance').its('element').should('be.undefined');
  });

  it('Can be dismissed via click', () => {
    cy.get('[data-cy="alert"]')
      .then($element => {
        const element = $element[0];
        element.classList.remove('fade');
        const instance = new Alert(element);
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').its('dismiss').invoke('click');
    cy.get('[data-cy="alert"]').should('not.exist');
  });

  it('CustomEvent can be prevented', () => {
    cy.get('[data-cy="alert"]')
      .then($element => {
        const element = $element[0];
        const instance = new Alert(element);
        element.addEventListener('close.bs.alert', function (e) {
          if (element.innerText.includes('Holy')) {
            e.preventDefault();
          }
        });
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').invoke('close')
    cy.get('[data-cy="alert"]').should('exist');
  });
});
