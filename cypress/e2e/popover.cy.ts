/// <reference types="cypress" />
import Popover from '../../src/components/popover';

describe('Popover Class Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/popover.html');
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

  it('Can handle horizontal position when both exceed top and bottom 1', () => {
    cy.viewport(600, 200);
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        const { body } = $element[0].ownerDocument;
        Object.assign(body.style, { padding: '10rem 27rem' });
      });
    cy.wait(200);
    cy.get('[data-cy="popover"]').eq(0).then($element => {
        cy.wrap(
          new Popover($element[0], {
            dismissible: false,
            placement: 'left',
            title: 'Popover Left',
            content: `This Popover can handle horizontal position when both exceed top and bottom.
        Here we add more content for testing.
        Efficiently unleash cross-media information without cross-media value.
        Quickly maximize timely deliverables for real-time schemas.`,
          }),
        ).as('horizontal');
      });
    cy.wait(200);
    cy.get('@horizontal').invoke('toggle');
    cy.get('@horizontal').its('tooltip').should('have.class', 'show');
    cy.scrollTo('100%', '0%', { duration: 0 });
    cy.wait(200);
    cy.get('@horizontal').its('tooltip').should('have.class', 'bs-popover-end');
    cy.scrollTo('topLeft', { duration: 0 });
    // cy.wait(200);
    cy.get('@horizontal').its('tooltip').should('have.class', 'bs-popover-start');
    cy.wait(200);
    cy.scrollTo('bottomLeft', { duration: 0 });
    cy.get('@horizontal').its('tooltip').should('have.class', 'bs-popover-start');
    cy.wait(200);
  });

  it.skip('Can handle horizontal position when both exceed top and bottom 2', () => {
    cy.viewport(600, 200);
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        const { body } = $element[0].ownerDocument;
        Object.assign(body.style, { padding: '7rem 27rem' });
      });
    cy.wait(200);
    // cy.scrollTo('topRight', { duration: 0 });
    cy.scrollTo('right', { duration: 0 });
    cy.wait(200);
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        cy.wrap(
          new Popover($element[0], {
            dismissible: false,
            placement: 'right',
            title: 'Popover Right',
            content: `This Popover can handle horizontal position when both exceed top and bottom.
        Here we add more content for testing.
        Efficiently unleash cross-media information without cross-media value.
        Quickly maximize timely deliverables for real-time schemas.`,
          }),
        ).as('horizontal2');
      });
    cy.wait(200);
    cy.get('@horizontal2').invoke('toggle');
    cy.get('@horizontal2').its('tooltip').should('have.class', 'show');

    cy.get('@horizontal2').its('tooltip').should('have.class', 'bs-popover-start');
    // cy.scrollTo('100%', '0%', { duration: 0 });
    cy.scrollTo('right', { duration: 0 });
    cy.wait(200);
    cy.get('@horizontal2').its('tooltip').should('have.class', 'bs-popover-end');
    cy.wait(200);
    cy.scrollTo('bottomLeft', { duration: 0 });
    cy.get('@horizontal2').its('tooltip').should('have.class', 'bs-popover-end');
    cy.wait(200);
  });

  it('Can do toggle() and dismissible', () => {
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        const element = $element[0];
        const instance = Popover.init(element);
        expect(Popover.getInstance(element), 'getInstance').to.be.instanceOf(Popover);
        expect(instance.element, 'element').to.equal(element);
        expect(instance.tooltip, 'tooltip').to.not.be.undefined;
        expect(instance.name, 'name').to.eq('Popover');
        expect(instance.options, 'options').to.not.be.empty;
        expect(instance.defaults, 'defaults').to.not.be.undefined;
        expect(instance.version, 'version').to.be.string;

        cy.wrap(instance).as('instance');
      });
    cy.get('@instance').invoke('toggle');
    cy.get('@instance').its('tooltip').should('have.class', 'show');
    cy.get('@instance')
      .its('btn')
      .then(btn => {
        btn.click();
      });
    cy.get('@instance')
      .its('tooltip')
      .then(tip => {
        cy.wrap(tip).should('not.have.class', 'show');
      });
    cy.wait(200);
  });

  it('Can handle vertical right', () => {
    cy.viewport(400, 400);
    cy.window().trigger('resize', { force: true });
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        const { body } = $element[0].ownerDocument;
        Object.assign(body.style, { padding: '15rem 25rem 15rem 1rem' });
        cy.scrollTo('topRight', { duration: 0 });
        cy.get('[data-cy="popover"]')
          .eq(0)
          .then($element => {
            cy.wrap(
              new Popover($element[0], {
                dismissible: false,
                placement: 'top',
                title: 'Popover Right',
                content: `This Popover can handle vertical position when both exceed top and bottom.
            Here we add more content for testing.
            Efficiently unleash cross-media information without cross-media value.
            Quickly maximize timely deliverables for real-time schemas.`,
              }),
            ).as('verticalRight');
            cy.get('@verticalRight').invoke('toggle');
            cy.get('@verticalRight').its('tooltip').should('have.class', 'bs-popover-top');
            cy.scrollTo('topLeft', { duration: 0 }).then(() => {
              cy.get('@verticalRight').its('tooltip').should('have.class', 'bs-popover-top');
            });

            cy.wait(200);
          });
      });
  });

  it('Can handle vertical left', () => {
    cy.viewport(400, 400);
    cy.window().trigger('resize', { force: true });
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        const { body } = $element[0].ownerDocument;
        Object.assign(body.style, { padding: '15rem 5rem 15rem 25rem' });

        cy.wrap(
          new Popover($element[0], {
            dismissible: false,
            placement: 'top',
            title: 'Popover Top',
            content: `This Popover can handle vertical position when both exceed top and bottom.
          Here we add more content for testing.
          Efficiently unleash cross-media information without cross-media value.
          Quickly maximize timely deliverables for real-time schemas.`,
          }),
        ).as('verticalLeft');
        cy.get('@verticalLeft').invoke('toggle');
        cy.get('@verticalLeft').its('tooltip').should('have.class', 'show');
        cy.scrollTo('topRight', { duration: 0 }).then(() => {
          cy.get('@verticalLeft').its('tooltip').should('have.class', 'show');
        });
        cy.wait(200);
      });
  });

  it('Can switch top to bottom', () => {
    cy.viewport(400, 600);
    cy.window().trigger('resize', { force: true });
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        const { body } = $element[0].ownerDocument;
        Object.assign(body.style, { padding: '22rem 8rem' });
        cy.wrap(
          new Popover($element[0], {
            dismissible: false,
            placement: 'top',
            title: 'Top Popover',
            content: `This Popover can handle top position when exceed top.
          Here we add more content for testing.
          Efficiently unleash cross-media information without cross-media value.
          Quickly maximize timely deliverables for real-time schemas.`,
          }),
        ).as('top');
        cy.get('@top').invoke('toggle');
        cy.get('@top').its('tooltip').should('have.class', 'show');
        cy.scrollTo('bottom', { duration: 0 })
          .then(() => {
            cy.get('@top').its('tooltip').should('have.class', 'show');
          });
        cy.wait(200);
      });
  });

  it('Can switch bottom to top', () => {
    cy.viewport(400, 600);
    cy.window().trigger('resize', { force: true });
    cy.get('[data-cy="popover"]')
      .eq(0)
      .then($element => {
        const { body } = $element[0].ownerDocument as Document;
        Object.assign(body.style, { padding: '20rem 10rem' });
        cy.scrollTo('bottom', { duration: 0 });

        cy.wrap(
          new Popover($element[0], {
            dismissible: false,
            placement: 'bottom',
            title: 'Popover Bottom',
            content: `This Popover can handle bottom position when both exceed top and bottom.
            Here we add more content for testing.
            Efficiently unleash cross-media information without cross-media value.
            Quickly maximize timely deliverables for real-time schemas.`,
          }),
        ).as('bottom');
        cy.get('@bottom').invoke('toggle');
        cy.get('@bottom').its('tooltip').should('have.class', 'show');
        cy.scrollTo('top', { duration: 0 });

        cy.get('@bottom').its('tooltip').should('have.class', 'show');

        cy.wait(200);
      });
  });

  it('Can dispose()', () => {
    cy.log('can dispose **closed**').then(() => {
      cy.get('[data-cy="popover"]')
        .eq(0)
        .then($element => {
          cy.wrap(new Popover($element[0])).as('instance');
        });
      cy.get('@instance').invoke('dispose');
      cy.get('@instance').its('element').should('be.undefined');
      cy.get('@instance').its('tooltip').should('be.undefined');
    });
    cy.wait(100);
    cy.log('can dispose **open**').then(() => {
      cy.get('[data-cy="popover"]')
        .eq(0)
        .then($element => {
          cy.wrap(new Popover($element[0])).as('instance');
        });
      cy.get('@instance').invoke('show');
      cy.wait(200);
      cy.get('@instance').invoke('dispose');
      cy.get('@instance').its('element').should('be.undefined');
      cy.get('@instance').its('tooltip').should('be.undefined');
    });
  });
});
