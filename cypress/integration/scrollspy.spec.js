/// <reference types="cypress" />
import ScrollSpy from '../../src/components/scrollspy-native';

describe('ScrollSpy Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/scrollspy.html').as('scrollspy-page')
      .visit('cypress/scrollspy.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      new ScrollSpy(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `ScrollSpy Error: "${args[0]}" is not a valid selector.`);
    }
  });

  it('Init each target element', () => {
    cy.wait('@scrollspy-page')
      .get('[data-bs-spy="scroll"]').each(($element) => {
        const element = $element[0];
        const instance = ScrollSpy.init(element);
        expect(ScrollSpy.getInstance(element)).to.be.instanceOf(ScrollSpy);
        expect(instance.element).to.equal(element);
        expect(instance.offsets).to.be.instanceOf(Array).and.have.length.above(0);
        expect(instance.items).to.be.instanceOf(Array).and.have.length.above(0);
        expect(instance.items[0]).to.have.class('active');
        expect(instance.name).to.eq('ScrollSpy');
        expect(instance.options).to.not.be.empty;
        expect(instance.defaults).to.not.be.undefined;
        expect(instance.version).to.be.string;
      });
  });

  it('Init without a target', () => {
    cy.wait('@scrollspy-page')
      .document().then((doc) => {
        const element = doc.createElement('div');
        element.setAttribute('data-bs-target', "#nonExistingTarget");
        doc.body.append(element);

        const instance = ScrollSpy.init(element);
        expect(instance.target).to.be.null;
      });
  });

  it('Can activate targets', () => {
    cy.wait('@scrollspy-page')
      .get('[data-bs-spy="scroll"]').eq(0).then(($element) => {
        cy.wrap(new ScrollSpy($element[0])).as('ssInstance');
      })
      .get('@ssInstance').its('scrollTarget').scrollTo('bottom')
      .get('@ssInstance').its('items').eq(4).should('have.class', 'active')
  });

  it('Can work with full page contents', () => {
    cy.wait('@scrollspy-page')
      .document().then((doc) => {
        const content = doc.querySelector('.col-md-9 .row').cloneNode(true);
        doc.body.innerHTML = '';
        doc.body.append(content);
        Object.assign(doc.body.style, {padding: '5rem'});

        const disposableSpy = doc.getElementById('disposableSpy');
        const [nav] = doc.getElementsByTagName('nav');
        Object.assign(disposableSpy.style, {height: ''});
        Object.assign(nav.style, {top: '0px'});
        nav.classList.add('position-sticky')
      })
      .viewport(780,1000)
      .get(ScrollSpy.selector).then(($element) => {
        cy.wrap(new ScrollSpy($element[0])).as('pageInstance');
      })
      .get('@pageInstance').its('scrollTarget').scrollTo('bottom')
      .get('@pageInstance').its('items').eq(4).should('have.class', 'active')
      .wait(500)
      .get('@pageInstance').its('scrollTarget').scrollTo('top')
      .get('@pageInstance').its('items').eq(0).should('not.have.class', 'active')
      .wait(500)
      .viewport(680,1000)

  });

  it('Can dispose', () => {
    cy.wait('@scrollspy-page')
      .get('[data-bs-spy="scroll"]').eq(0).then(($element) => {
        cy.wrap(new ScrollSpy($element[0])).as('disposable');
      })
      .get('@disposable').invoke('dispose')
      .get('@disposable').its('element').should('be.null')
      .get('@disposable').its('items').should('be.null')
      .get('@disposable').its('offsets').should('be.null');
  });

});