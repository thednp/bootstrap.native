/// <reference types="cypress" />
import Collapse from '../../src/components/collapse-native';

describe('Collapse Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/collapse.html').as('collapse-page')
      .visit('cypress/collapse.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Collapse(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Collapse Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Can initialize all instances in the page and toggle()', () => {
    cy.wait('@collapse-page')
      .get('.collapse').each(($element, i) => {
        const element = $element[0];
        const instance = Collapse.init(element);
        expect(instance.element, 'element').to.exist;
        expect(instance.element, 'element').to.equal(element);
        expect(instance.name, 'name').to.eq('Collapse');
        if (!i) {
          expect(instance.triggers, 'triggers').to.have.length(2);
          expect(instance.options, 'options').to.deep.equal({parent: null});
          expect(instance.parent, 'parent').to.be.null;
        } else {
          expect(instance.triggers, 'triggers').to.have.length(1);
          expect(instance.options, 'options').to.deep.equal({parent: '.accordion'});
          expect(instance.parent.nodeType, 'parent').to.equal(1);
        }
        expect(instance.defaults, 'defaults').to.deep.equal({parent: null});
        expect(instance.version, 'version').to.be.string;
        cy.wrap(instance).as('instance' + i);
      })
      .get('@instance0').invoke('toggle')
      .get('@instance0').invoke('toggle') // must be SPAM protected
      .get('@instance0').its('element').should('have.class', 'show')
      .get('@instance1').invoke('toggle')
      .get('@instance2').invoke('toggle') // must be SPAM protected
      .get('@instance1').its('element').should('have.class', 'show')
      .get('@instance3').invoke('toggle')
      .get('@instance1').its('element').should('not.have.class', 'show')
      .get('@instance3').its('element').should('have.class', 'show')
      .get('@instance3').invoke('hide')
      .get('@instance3').invoke('hide') // must be SPAM protected
      .get('@instance3').its('element').should('not.have.class', 'show')
  });

  it('Can handle click', () => {
    cy.wait('@collapse-page')
      .get('.collapse').each(($element, i) => {
        const element = $element[0];
        const instance = Collapse.init(element);
        cy.wrap(instance).as('instance' + i);
      })
      .get('@instance0').its('triggers').eq(0).click()
      .get('@instance0').its('triggers').eq(1).click() // must be SPAM protected
      .get('@instance0').its('element').should('have.class', 'show')
      .get('@instance0').its('triggers').eq(1).click()
      .get('@instance0').its('element').should('not.have.class', 'show');
  });

  it('Can do original events', () => {
    cy.wait('@collapse-page')
      .get('.collapse').eq(0).then(($element) => {
        const element = $element[0];
        const doc = element.ownerDocument;
        const instance = new Collapse(element);

        element.addEventListener('show.bs.collapse', function handle(e) {
          if (instance.triggers[0] === doc.activeElement) {
            console.log('show fired for <div#' + element.id + '> and is allowed');
          } else {
            console.log('show fired for <div#' + element.id + '> and is prevented');
            e.preventDefault()
          }
        });
        element.addEventListener('shown.bs.collapse', function handle(e) {
          console.log('shown was triggered');
        });
        element.addEventListener('hide.bs.collapse', function handle(e) {
          if (instance.triggers[1] === doc.activeElement) {
            console.log('hide fired for <div#' + element.id + '> and is allowed');
          } else {
            console.log('hidden fired for <div#' + element.id + '> and is prevented');
            e.preventDefault()
          }
        });
        element.addEventListener('hidden.bs.collapse', function handle(e) {
          console.log('hidden was triggered');
        });

        cy.wrap(instance).as('instance');
      })
      .get('@instance').its('triggers').eq(1).click()
      .get('@instance').its('element').should('not.have.class', 'show')
      .get('@instance').invoke('show')
      .get('@instance').its('triggers').eq(0).click()
      .get('@instance').invoke('hide')
      .get('@instance').its('element').should('not.have.class', 'show')
  });

  it('Can dispose()', () => {
    cy.wait('@collapse-page')
      .get('.collapse').eq(0).then(($element) => {
        const element = $element[0];
        const instance = new Collapse(element);
        instance.dispose();
        expect(instance.element, 'element').to.be.null;
        expect(instance.triggers, 'triggers').to.be.null;
        expect(instance.options, 'options').to.be.null;
        expect(instance.parent, 'parent').to.be.null;
      })
    });
});