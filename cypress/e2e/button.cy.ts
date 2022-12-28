/// <reference types="cypress" />
import Button from '../../src/components/button';

describe('Button Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/button.html');
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Button(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Button Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Can do toggle()', () => {
    cy.window()
      .then(win => {
        cy.get('[data-cy="button"]').then($element => {
          const element = $element[0];
          const instance = Button.init(element);
          expect(instance.element, 'element').to.be.instanceOf(win.HTMLButtonElement);
          expect(instance.element, 'element').to.equal(element);
          expect(instance.element, 'element').to.not.have.class('active');
          expect(instance.name, 'name').to.eq('Button');
          expect(instance.isActive, 'isActive').to.be.false;
          expect(instance.options, 'options').to.be.undefined;
          expect(instance.defaults, 'defaults').to.not.be.undefined;
          expect(instance.version, 'version').to.be.string;
          cy.wrap(instance).as('instance');
        });
      })
      .invoke('toggle')
      .get('@instance')
      .its('isActive')
      .should('be.true')
      .get('@instance')
      .its('element')
      .should('have.class', 'active')
      .get('@instance')
      .invoke('toggle')
      .get('@instance')
      .its('isActive')
      .should('be.false')
      .get('@instance')
      .its('element')
      .should('not.have.class', 'active');
  });

  it('Can handle click()', () => {
    cy.get('[data-cy="button"]')
      .then($element => {
        const element = $element[0];
        const instance = new Button(element);
        cy.wrap(instance).as('instance');
      })
      .get('@instance')
      .its('element')
      .then(element => {
        cy.wrap(element).click();
        cy.get('@instance').its('isActive').should('be.true');
        cy.get('@instance').its('element').should('have.class', 'active');
      });
  });

  it('Can handle disabled elements', () => {
    cy.get('[data-cy="button"]')
      .then($element => {
        const element = $element[0];
        element.setAttribute('disabled', 'true');
        element.classList.add('disabled');
        const instance = new Button(element);
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').its('element').invoke('click');
    cy.get('@instance').its('element').should('not.have.class', 'active');
    cy.get('@instance').invoke('toggle');
    cy.get('@instance').its('element').should('not.have.class', 'active');
  });

  it('Can dispose()', () => {
    cy.get('[data-cy="button"]')
      .then($element => {
        const element = $element[0];
        const instance = new Button(element);
        cy.wrap(instance).as('instance');
      })
      .get('@instance')
      .should('be.instanceOf', Button)
      .should(instance => {
        // @ts-ignore
        instance.dispose();
      })
      .get('@instance')
      .its('element')
      .should('be.undefined')
      .get('@instance')
      .its('active')
      .should('be.undefined')
      .get('@instance')
      .invoke('toggle')
      .then(() => {
        cy.log(`Button can do nothing now with this **instance**`);
      });
  });
});