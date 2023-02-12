/// <reference types="cypress" />
import Collapse from '../../src/components/collapse';

describe('Collapse Class Tests', () => {

  beforeEach(() => {
    cy.visit('cypress/collapse.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Collapse(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Collapse Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Can initialize all instances in the page and toggle()', () => {
    cy.get('.collapse').each(($element, i) => {
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
          expect(instance.parent?.nodeType, 'parent').to.equal(1);
        }
        expect(instance.defaults, 'defaults').to.deep.equal({parent: null});
        expect(instance.version, 'version').to.be.string;
        cy.wrap(instance).as('instance' + i);
      })
    cy.get('@instance0').invoke('toggle')
      .get('@instance0').invoke('toggle') // must be SPAM protected
    cy.get('#collapseExample').should('be.visible').and('have.class', 'show')
    cy.get('@instance0').invoke('toggle')
    cy.get('@instance0').invoke('toggle') // must be SPAM protected
    cy.get('#collapseExample').should('be.hidden').and('not.have.class', 'show')
    cy.get('@instance1').invoke('toggle')
    cy.get('@instance2').invoke('toggle') // must be SPAM protected
    cy.get('#collapseOne').should('be.visible').should('have.class', 'show')
    cy.get('@instance3').invoke('toggle')
    cy.get('#collapseOne').should('not.have.class', 'show')
    cy.get('#collapseThree').should('have.class', 'show')
    cy.get('@instance3').invoke('hide')
    cy.get('@instance3').invoke('hide') // must be SPAM protected
    cy.get('#collapseThree').should('not.have.class', 'show')
  });

  it('Can handle click', () => {
    cy.get('.collapse').each(($element, i) => {
        const element = $element[0];
        const instance = Collapse.init(element);
        cy.wrap(instance).as('instance' + i);
      })
      .get('[href="#collapseExample"]').click()
      .get('[data-bs-target="#collapseExample"]').click() // must be SPAM protected
      .get('#collapseExample').should('have.class', 'show')
      .get('[data-bs-target="#collapseOne"]').click()
      .get('#collapseOne').should('not.have.class', 'show');
  });

  it('Can do original events', () => {
    cy.get('.collapse').eq(0).then(($element) => {
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
    cy.get('[data-bs-target="#collapseExample"]').click()
      .get('#collapseExample').should('not.have.class', 'show')
    cy.get('@instance').invoke('show')
      .get('[href="#collapseExample"]').click()
      .get('@instance').invoke('hide')
    cy.get('#collapseExample').should('not.have.class', 'show')
  });

  it('Can dispose()', () => {
    cy.get('.collapse').eq(0).then(($element) => {
        const element = $element[0];
        const instance = new Collapse(element);
        instance.dispose();
        expect(instance.element, 'element').to.be.undefined;
        expect(instance.triggers, 'triggers').to.be.undefined;
        expect(instance.options, 'options').to.be.undefined;
        expect(instance.parent, 'parent').to.be.undefined;
      })
    });
});