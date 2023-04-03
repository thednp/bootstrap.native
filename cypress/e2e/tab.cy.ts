/// <reference types="cypress" />
import Tab from '../../src/components/tab';
import Dropdown from '../../src/components/dropdown';

describe('Tab Class Tests', () => {

  beforeEach(() => {
    cy.visit('cypress/tab.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Tab(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Tab Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Init without a tab content won\'t work', () => {
    cy.get('[data-bs-toggle="tab"]').eq(4).then(($element) => {
        const element = $element[0];
        const newTab = element.cloneNode(true) as HTMLAnchorElement;
        newTab.id = 'newTab';
        newTab.href = '#newTabContent';
        element.after(newTab);
        const instance = new Tab(newTab);

        expect(instance.content).to.be.undefined;
      })
  });

  it('Can initialize all instances in the page', () => {
    cy.get('[data-bs-toggle="tab"]').each(($element, i) => {
        const element = $element[0];
        const win = element.ownerDocument.defaultView;
        const instance = Tab.init(element);
        if (!i) {
          expect(instance.element).to.equal(element);
          expect(instance.nav).to.be.instanceOf(win?.HTMLElement);
          expect(instance.options).to.be.empty;
          expect(instance.defaults).to.be.empty;
          expect(instance.name).to.equal('Tab');
          expect(instance.version).to.not.be.empty;
          expect(instance.tabContent).to.be.instanceOf(win?.HTMLElement);
        }
        cy.wrap(instance).as('instance' + i);
      })
  });

  it('Can do click()', () => {
    cy.get('[data-bs-toggle="dropdown"]').each(($element, j) => {
        cy.wrap(Dropdown.init($element[0])).as('dropdown' + j);
      })
      .get('[data-bs-toggle="tab"]').each(($element, i) => {
        const element = $element[0];
        const instance = new Tab(element);
        cy.wrap(instance).as('instance' + i);
      })
    cy.get('@dropdown0').its('element').then(el => cy.wrap(el).click())
    cy.get('@dropdown0').its('menu').then(menu => cy.wrap(menu).should('be.visible'))
    cy.get('@instance1').its('element').then(el => cy.wrap(el).click())
    cy.get('@instance1').its('content').then(ct => cy.wrap(ct).should('have.class', 'show').and('be.visible'))
    cy.get('@instance0').its('content').then(ct => cy.wrap(ct).should('not.have.class', 'show').and('be.hidden'))
    cy.wait(300)
    cy.get('@dropdown0').its('element').then(el => cy.wrap(el).click())
    cy.get('@instance2').its('element').then(el => cy.wrap(el).click())
    // cy.wait(500)
    cy.get('@instance2').its('content').then(ct => cy.wrap(ct).should('have.class', 'show').and('be.visible'))
    cy.get('@instance1').its('content').then(ct => cy.wrap(ct).should('not.have.class', 'show').and('be.hidden'))
    cy.wait(300)
    cy.get('@instance4').its('element').then(el => cy.wrap(el).click())
    // cy.wait(100)
    cy.get('@instance4').its('content').then(ct => cy.wrap(ct).should('have.class', 'show').and('be.visible'))
    // cy.wait(100)
    cy.get('@instance3').its('element').then(el => cy.wrap(el).click())
    // cy.wait(100)
    cy.get('@instance3').its('content').then(ct => cy.wrap(ct).should('have.class', 'show').and('be.visible'))
    cy.get('@instance4').its('content').then(ct => cy.wrap(ct).should('not.have.class', 'show').and('be.hidden'))

  });

  it('Can do original events', () => {
    cy.get('[data-bs-toggle="tab"]').each(($element, i) => {
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
    cy.get('@instance1').invoke('show')
    cy.get('@instance1').its('content').should('have.class', 'show').and('be.visible')
    cy.get('@instance0').its('content').should('not.have.class', 'show')
    cy.wait(500)
    cy.get('@instance0').invoke('show')
    cy.get('@instance1').its('content').should('not.have.class', 'show')
    cy.get('@instance0').its('content').should('not.have.class', 'show')
    cy.wait(500)
    cy.get('@instance4').invoke('show')
    cy.get('@instance3').its('content').should('have.class', 'show').and('be.visible')
    cy.get('@instance4').its('content').should('not.have.class', 'show')
  });

  it('Can dispose()', () => {
    cy.get('[data-bs-toggle="tab"]').eq(0).then(($element) => {
        const element = $element[0];
        const instance = new Tab(element);
        instance.dispose();
        expect(instance.element, 'element').to.be.undefined;
        expect(instance.content, 'content').to.be.undefined;
        expect(instance.nav, 'nav').to.be.undefined;
      })
  });
});