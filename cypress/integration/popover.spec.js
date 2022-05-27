/// <reference types="cypress" />
import Popover from '../../src/components/popover-native';

describe('Popover Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/popover.html').as('popover-page')
      .visit('cypress/popover.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Popover(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Popover Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Can do toggle() and dismissible', () => {
    cy.wait('@popover-page')
      .get('[data-cy="popover"]').eq(0).then(($element) => {
          const element = $element[0];
          const instance = Popover.init(element);
          expect(Popover.getInstance(element), 'getInstance').to.be.instanceOf(Popover);
          expect(instance.element, 'element').to.equal(element);
          expect(instance.tooltip, 'tooltip').to.not.be.undefined;
          expect(instance.name, 'name').to.eq('Popover');
          expect(instance.options, 'options').to.not.be.empty;
          expect(instance.defaults, 'defaults').to.not.be.undefined;
          expect(instance.version, 'version').to.be.string;

          cy.log(instance)
          cy.wrap(instance).as('instance');
        })
        .get('@instance').invoke('toggle')
        .get('@instance').its('tooltip').should('have.class', 'show')
        .wait(200)
        .get('@instance').its('btn').click()
        .get('@instance').its('tooltip').should('not.have.class', 'show')
  });

  it('Can dispose()', () => {
    cy.wait('@popover-page')
      .log('can dispose **closed**').then(() => {
        cy.get('[data-cy="popover"]').eq(0).then(($element) => {
          cy.wrap(new Popover($element[0])).as('instance');
        })
        .get('@instance').invoke('dispose')
        .get('@instance').its('element').should('be.null')
        .get('@instance').its('tooltip').should('be.null')
      })
      .wait(100)
      .log('can dispose **open**').then(() => {
        cy.get('[data-cy="popover"]').eq(0).then(($element) => {
          cy.wrap(new Popover($element[0])).as('instance');
        })
        .get('@instance').invoke('show')
        .wait(200)
        .get('@instance').invoke('dispose')
        .get('@instance').its('element').should('be.null')
        .get('@instance').its('tooltip').should('be.null')
      })
  });
});