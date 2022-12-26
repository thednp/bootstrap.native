/// <reference types="cypress" />
import Popover from '../../src/components/popover';

describe('Popover Class Tests', () => {

  beforeEach(() => {
    cy.visit('cypress/popover.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Popover(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Popover Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Can do toggle() and dismissible', () => {
    cy.get('[data-cy="popover"]').eq(0).then(($element) => {
          const element = $element[0];
          const instance = Popover.init(element);
          expect(Popover.getInstance(element), 'getInstance').to.be.instanceOf(Popover);
          expect(instance.element, 'element').to.equal(element);
          expect(instance.tooltip, 'tooltip').to.not.be.undefined;
          expect(instance.name, 'name').to.eq('Popover');
          expect(instance.options, 'options').to.not.be.empty;
          expect(instance.defaults, 'defaults').to.not.be.undefined;
          expect(instance.version, 'version').to.be.string;

          // cy.log(instance)
          cy.wrap(instance).as('instance');
        })
      cy.get('@instance').invoke('toggle')
      cy.get('@instance').its('tooltip').should('have.class', 'show')
      // cy.wait(200)
      cy.get('@instance').its('btn').then(btn => {
        btn.click()
      })
      cy.get('@instance').its('tooltip').then((tip) => {
        cy.wrap(tip).should('not.have.class', 'show')
      })
  });

  it('Can dispose()', () => {
    cy.log('can dispose **closed**').then(() => {
      cy.get('[data-cy="popover"]').eq(0).then(($element) => {
        cy.wrap(new Popover($element[0])).as('instance');
      })
      cy.get('@instance').invoke('dispose')
      cy.get('@instance').its('element').should('be.undefined')
      cy.get('@instance').its('tooltip').should('be.undefined')
    })
    cy.wait(100)
    cy.log('can dispose **open**').then(() => {
      cy.get('[data-cy="popover"]').eq(0).then(($element) => {
        cy.wrap(new Popover($element[0])).as('instance');
      })
      cy.get('@instance').invoke('show')
      cy.wait(200)
      cy.get('@instance').invoke('dispose')
      cy.get('@instance').its('element').should('be.undefined')
      cy.get('@instance').its('tooltip').should('be.undefined')
    })
  });
});