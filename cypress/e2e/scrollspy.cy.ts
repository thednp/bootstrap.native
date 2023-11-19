/// <reference types="cypress" />
import ScrollSpy from '../../src/components/scrollspy';

describe('ScrollSpy Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/scrollspy.html')
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new ScrollSpy(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `ScrollSpy Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Init each target element', () => {
    cy.get('[data-bs-spy="scroll"]').each(($element) => {
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
    cy.document().then((doc) => {
        const element = doc.createElement('div');
        element.setAttribute('data-bs-target', "#nonExistingTarget");
        doc.body.append(element);

        const instance = ScrollSpy.init(element);
        expect(instance.target).to.be.null;
      });
  });

  it('Can activate targets', () => {
    cy.get('[data-bs-spy="scroll"]').eq(0).then(($element) => {
        cy.wrap(new ScrollSpy($element[0])).as('ssInstance');
      })
    cy.get('@ssInstance').its('scrollTarget')
    // .scrollTo('bottom')
    .then((st) => {
      cy.wrap(st).scrollTo('bottom')
    })
    cy.get('@ssInstance').its('items').then(itms => {
      cy.wrap(itms).eq(4).should('have.class', 'active')
    })
  });

  it('Can work with full page contents', () => {
    cy.document().then((doc) => {
        const content = doc.querySelector('.col-md-9 .row')?.cloneNode(true) as Node;
        doc.body.innerHTML = '';
        doc.body.append(content);
        Object.assign(doc.body.style, {padding: '5rem 0'});

        const disposableSpy = doc.getElementById('disposableSpy') as HTMLElement;
        const [nav] = doc.getElementsByTagName('nav');
        Object.assign(disposableSpy.style, {height: ''});
        Object.assign(nav.style, {top: '0px'});
        nav.classList.add('position-sticky')
      })
    // cy.viewport(780,1000)
    cy.get(ScrollSpy.selector).then(($element) => {
        cy.wrap(new ScrollSpy($element[0])).as('pageInstance');
      })
    cy.get('@pageInstance').its('scrollTarget').scrollTo('bottom')
    cy.get('@pageInstance').its('items').then(itms => {
      cy.wrap(itms).eq(4).should('have.class', 'active')
    })
    cy.wait(500)
    cy.get('@pageInstance').its('scrollTarget').scrollTo('top')
    cy.get('@pageInstance').its('items').then(itms => {
      cy.wrap(itms).eq(0).should('not.have.class', 'active')
    })
    cy.wait(200)
    cy.viewport(400, 600)
    cy.window().trigger('resize', { force: true })
    cy.wait(200)
    cy.get('@pageInstance').its('scrollTarget').scrollTo('bottom')
    cy.get('@pageInstance').its('items').then(itms => {
      cy.wrap(itms).eq(4).should('have.class', 'active')
    })
    // cy.get('@pageInstance').its('items').eq(4).should('have.class', 'active')

    cy.viewport(680,1000)
  });

  it('Can dispose', () => {
    cy.get('[data-bs-spy="scroll"]').eq(0).then(($element) => {
        cy.wrap(new ScrollSpy($element[0])).as('disposable');
      })
    cy.get('@disposable').invoke('dispose')
    cy.get('@disposable').its('element').should('be.undefined')
    cy.get('@disposable').its('items').should('be.undefined')
    cy.get('@disposable').its('offsets').should('be.undefined');
  });
});
