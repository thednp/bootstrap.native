/// <reference types="cypress" />
import Button from '../../src/components/button';

describe('Button Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/button.html').as('button-page')
      .visit('cypress/button.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Button(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Button Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Can do toggle()', () => {
    cy.wait('@button-page')
      .window().then((win) => {
        cy.get('[data-cy="button"]').then(($element) => {
            const element = $element[0];
            const instance = Button.init(element);
            expect(instance.element, 'element').to.be.instanceOf(win.HTMLButtonElement);
            expect(instance.element, 'element').to.equal(element);
            expect(instance.element, 'element').to.not.have.class('active');
            expect(instance.name, 'name').to.eq('Button');
            expect(instance.isActive, 'isActive').to.be.false;
            expect(instance.options, 'options').to.be.empty;
            expect(instance.defaults, 'defaults').to.be.undefined;
            expect(instance.version, 'version').to.be.string;
            cy.wrap(instance).as('instance');
          });
        })
        .get('@instance').invoke('toggle')
        .wait(100)
        .get('@instance').then((instance) => {
          expect(instance.isActive, 'isActive').to.be.true;
          expect(instance.element, 'element').to.have.class('active');
        })
        .get('@instance').invoke('toggle')
        .wait(100)
        .get('@instance').then((instance) => {
          expect(instance.isActive, 'isActive').to.be.false;
          expect(instance.element, 'element').to.not.have.class('active');
        })
  });

  it('Can handle click()', () => {
    cy.wait('@button-page')
      .get('[data-cy="button"]').then(($element) => {
        const element = $element[0];
        const instance = new Button(element);
        cy.wrap(instance).as('instance');
      })
      .get('@instance').its('element').click()
      .wait(100)
      .get('@instance').then((instance) => {
        expect(instance.isActive).to.be.true;
        expect(instance.element).to.have.class('active');
      })
  });

  it('Can handle disabled elements', () => {
    cy.wait('@button-page')
      .get('[data-cy="button"]').then(($element) => {
        const element = $element[0];
        element.setAttribute('disabled', 'true');
        element.classList.add('disabled');
        const instance = new Button(element);
        cy.wrap(instance).as('instance');
      })
      .get('@instance').then((instance) => {
        cy.log('disabled buttons cannot be clicked').then(() => {
          instance.element.click();
          expect(instance.element).to.not.have.class('active');
        });
        cy.log('disabled buttons also prevent using toggle()').then(() => {
          instance.toggle();
          expect(instance.element).to.not.have.class('active');
        });
      });
  });

  it('Can dispose()', () => {
    cy.wait('@button-page')
      .get('[data-cy="button"]').then(($element) => {
        const element = $element[0];
        const instance = new Button(element);
        cy.wrap(instance).as('instance');
      })
      .get('@instance').invoke('dispose')
      .wait(100)
      .get('@instance').then((instance) => {
        expect(instance.element, 'element').to.be.null;
        expect(instance.isActive, 'isActive').to.be.null;
      })
      .get('@instance')
      .invoke('toggle')
      .then(() => {
        cy.log(`Button can do nothing now with this **instance**`)
      });
  });
});