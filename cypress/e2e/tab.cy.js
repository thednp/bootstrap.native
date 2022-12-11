/// <reference types="cypress" />
import Tab from '../../src/components/tab';
import Dropdown from '../../src/components/dropdown';

describe('Tab Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/tab.html').as('tab-page')
      .visit('cypress/tab.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new Tab(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Tab Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Init without a tab content won\'t work', () => {
    cy.wait('@tab-page')
      .get('[data-bs-toggle="tab"]').eq(4).then(($element) => {
        const element = $element[0];
        const newTab = element.cloneNode(true);
        newTab.id = 'newTab';
        newTab.href = '#newTabContent';
        element.after(newTab);
        const instance = new Tab(newTab);

        expect(instance.content).to.be.undefined;
      })
  });

  it('Can initialize all instances in the page', () => {
    cy.wait('@tab-page')
      .get('[data-bs-toggle="tab"]').each(($element, i) => {
        const element = $element[0];
        const win = element.ownerDocument.defaultView;
        const instance = Tab.init(element);
        if (!i) {
          expect(instance.element).to.equal(element);
          expect(instance.nav).to.be.instanceOf(win.HTMLElement);
          expect(instance.options).to.be.empty;
          expect(instance.defaults).to.be.undefined;
          expect(instance.name).to.equal('Tab');
          expect(instance.version).to.not.be.empty;
          expect(instance.tabContent).to.be.instanceOf(win.HTMLElement);
        }
        cy.wrap(instance).as('instance' + i);
      })
  });

  it('Can do click()', () => {
    cy.wait('@tab-page')
      .get('[data-bs-toggle="dropdown"]').each(($element, j) => {
        cy.wrap(Dropdown.init($element[0])).as('dropdown' + j);
      })
      .get('[data-bs-toggle="tab"]').each(($element, i) => {
        const element = $element[0];
        const instance = new Tab(element);
        cy.wrap(instance).as('instance' + i);
      })
      .get('@dropdown0').its('element').click()
      .get('@dropdown0').its('menu').should('be.visible')
      .get('@instance1').its('element').click()
      .get('@instance1').its('content').should('have.class', 'show').and('be.visible')
      .get('@instance0').its('content').should('not.have.class', 'show')
      .wait(500)
      .get('@dropdown0').its('element').click()
      .get('@instance2').its('element').click()
      .wait(100)
      .get('@instance2').its('content').should('have.class', 'show').and('be.visible')
      .get('@instance1').its('content').should('not.have.class', 'show')
      .wait(300)
      .get('@instance4').its('element').click()
      .wait(100)
      .get('@instance4').its('content').should('have.class', 'show').and('be.visible')
      .wait(100)
      .get('@instance3').its('element').click()
      .wait(100)
      .get('@instance3').its('content').should('have.class', 'show').and('be.visible')
      .get('@instance4').its('content').should('not.have.class', 'show')

  });

  it('Can do original events', () => {
    cy.wait('@tab-page')
      .get('[data-bs-toggle="tab"]').each(($element, i) => {
        if (i === 0) {
          $element[0].addEventListener('show.bs.tab', (e) => {
            e.preventDefault();
          })
        }
        if (i === 3) {
          $element[0].addEventListener('hide.bs.tab', (e) => {
            e.preventDefault();
          })
        }
        cy.wrap(new Tab($element[0])).as('instance' + i);
      })
      .get('@instance1').invoke('show')
      .get('@instance1').its('content').should('have.class', 'show').and('be.visible')
      .get('@instance0').its('content').should('not.have.class', 'show')
      .wait(500)
      .get('@instance0').invoke('show')
      .get('@instance1').its('content').should('not.have.class', 'show')
      .get('@instance0').its('content').should('not.have.class', 'show')
      .wait(500)
      .get('@instance4').invoke('show')
      .get('@instance3').its('content').should('have.class', 'show').and('be.visible')
      .get('@instance4').its('content').should('not.have.class', 'show')
  });

  it('Can dispose()', () => {
    cy.wait('@tab-page')
      .get('[data-bs-toggle="tab"]').eq(0).then(($element) => {
        const element = $element[0];
        const instance = new Tab(element);
        instance.dispose();
        expect(instance.element, 'element').to.be.null;
        expect(instance.content, 'content').to.be.null;
        expect(instance.nav, 'nav').to.be.null;
      })
  });
});