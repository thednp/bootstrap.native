/// <reference types="cypress" />

import Carousel from '../../src/components/carousel';
import { CarouselEvent } from '../../src/interface/carousel';
import changeDirection from '../fixtures/changeDirection';
import selectText from '../fixtures/selectText';

describe('Carousel Class Tests', () => {

  beforeEach(() => {
    cy.clock();
    cy.visit('cypress/carousel.html');
  });

  it('Init without any parameters - throws error', () => {
    const args = [];
    try {
      // @ts-ignore
      new Carousel(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property('message', `Carousel Error: your target is not an instance of HTMLElement.`);
    }
  });

  it('Can initialize with default options', () => {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];
        // init only with 2 slides
        [...element.getElementsByClassName('carousel-item')].slice(-1)[0].remove();
        [...element.querySelectorAll('[data-bs-slide-to]')].slice(-1)[0].remove();
        element.classList.remove('slide');

        Object.keys({...element.dataset}).forEach((key) => {
          if (key.includes('bs')) {
            const K = key.replace('bs', '').toLowerCase();
            element.removeAttribute(`data-bs-${K}`);
          }
        })

        const instance = Carousel.init(element);
        cy.wrap(instance).as('instance');
      })
      .get('@instance').should('be.instanceOf', Carousel)
      .get('@instance').its('element').should('be.visible')
      .get('@instance').its('name').should('eq', 'Carousel')
      .get('@instance').its('slides').should('have.length', 2)
      .get('@instance').its('options').should('not.be.empty').and('deep.equal', {touch: true, interval: 5000, pause: 'hover', keyboard: false})
      .get('@instance').its('defaults').should('deep.equal', {touch: true, interval: 5000, pause: 'hover', keyboard: false})
      .get('@instance').its('version').should('not.be.empty').and('have.length.greaterThan', 0)
  });

  it('Can invalidate with only 1 item or less', () => {
    cy.window().then((win) => {
        cy.get('[data-cy="carousel"]').then(($element) => {
          const element = $element[0];
          // init only with 1 slides
          [...element.getElementsByClassName('carousel-item')].slice(-2).map(s => s.remove());
          [...element.querySelectorAll('[data-bs-slide-to]')].slice(-2).map(u => u.remove());

          const instance = Carousel.init(element);
          cy.wrap(instance).as('instance');
        })
        .get('@instance').should('be.instanceOf', Carousel)
        .get('@instance').its('element').should('be.instanceOf', win.HTMLDivElement)
        .get('@instance').its('element').find('.carousel-item').eq(0).should('be.hidden')
        .get('@instance').its('controls').should('be.undefined')
        .get('@instance').its('indicators').should('be.undefined')
      });
  });

  it('Can initialize via DATA API', () => {
    cy.window().then((win) => {
        cy.clock();
        cy.get('[data-cy="carousel"]').then(($element) => {
          const element = $element[0];
          element.setAttribute('data-bs-interval', '200');

          const instance = Carousel.init(element);
          cy.wrap(instance).as('instance');
        })
        .get('@instance').should('be.instanceOf', Carousel)
        .get('@instance').its('element').should('be.instanceOf', win.HTMLDivElement).and('be.visible')
        .get('@instance').its('name').should('eq', 'Carousel')
        .get('@instance').its('options').should('not.be.empty').and('deep.equal', {touch: true, interval: 200, pause: 'hover', keyboard: true})
        .get('@instance').its('slides').should('have.length', 3)
        .get('@instance').its('defaults').should('not.be.undefined')
        .get('@instance').its('version').should('not.be.empty').and('have.length.greaterThan', 0);
        cy.tick(200);
        cy.get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active');
      });
  });

  it('Can initialize via JavaScript API', function() {
    cy.get('[data-cy="carousel"]').then(function($element) {
        const element = $element[0];

        const instance = new Carousel(element, {
          touch: false,
          keyboard: false,
          pause: false,
          interval: 200
        });
        cy.wrap(instance).as('instance');
      })
    cy.clock();
    cy.get('@instance').its('options').should('deep.equal', { touch: false, interval: 200, pause: false, keyboard: false });
    cy.tick(200);
    cy.get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active');
  });

  it('Can work without transition', function() {
    cy.get('[data-cy="carousel"]').then(function($element) {
        const element = $element[0];
        element.classList.remove('slide');

        const instance = new Carousel(element, {
          touch: false,
          keyboard: false,
          pause: false,
          interval: 200
        });
        cy.wrap(instance).as('instance');
      });
    cy.clock(); // must be off-chain
    cy.get('@instance').its('options').should('deep.equal', { touch: false, interval: 200, pause: false, keyboard: false });
    cy.tick(210); // must be off-chain
    cy.get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active');
    cy.tick(210); // same here
    cy.get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active');
    cy.get('@instance').invoke('pause');
  });

  it('Can do to(), cycle(), next(), prev()', function() {
    cy.get('[data-cy="carousel"]').then(function($element) {
        const element = $element[0];

        const instance = new Carousel(element, {
          touch: false,
          keyboard: false,
          pause: false,
          interval: false
        });
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').its('options').should('deep.equal', { touch: false, interval: false, pause: false, keyboard: false })
      .get('@instance').invoke('to', 1)
      .get('@instance').invoke('to', 1) // must be protected from SPAM
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .get('@instance').invoke('cycle')
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
      .get('@instance').invoke('next')
      .get('@instance').invoke('next') // must be rotected from SPAM
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
      .get('@instance').invoke('prev')
      .get('@instance').invoke('prev') // same here
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
  });

  it('Can do pause(), cycle()', function() {
    cy.get('[data-cy="carousel"]').then(function($element) {
        const element = $element[0];

        const instance = new Carousel(element, {
          touch: false,
          keyboard: false,
          pause: false,
          interval: 200
        });
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').invoke('pause')
      .get('@instance').invoke('pause') // should be protected from SPAM
      .get('@instance').its('isPaused').should('be.true')
      .get('@instance').invoke('cycle')
      .get('@instance').invoke('cycle') // should be protected from SPAM
      .get('@instance').its('isPaused').should('be.false')
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .get('@instance').invoke('pause')
  });

  it('Can do page navigation', function() {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];

        const instance = new Carousel(element, {
          touch: false,
          keyboard: false,
          pause: false,
          interval: false
        });
        cy.wrap(instance).as('instance');
      });
    cy.get('@instance').its('element').find('[data-bs-slide-to]').eq(0).click()
      .get('@instance').its('element').find('[data-bs-slide-to]').eq(0).click() // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
      .get('@instance').its('element').find('[data-bs-slide-to]').eq(2).click()
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
      .get('@instance').its('element').find('[data-bs-slide-to]').eq(1).click()
      .get('@instance').its('element').find('[data-bs-slide-to]').eq(2).click() // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active');
  });

  it('Can do arrow navigation', function() {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];
        const instance = new Carousel(element, {
          touch: false,
          keyboard: false,
          pause: false,
          interval: false
        });
        cy.wrap(instance).as('instance');
      })
    cy.get('@instance').its('element').find('[data-bs-slide]').eq(0).click()
    cy.get('@instance').its('element').find('[data-bs-slide]').eq(0).click() // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
    cy.get('@instance').its('element').find('[data-bs-slide]').eq(1).click()
    cy.get('@instance').its('element').find('[data-bs-slide]').eq(1).click()  // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
      .get('@instance').its('element').find('[data-bs-slide]').eq(1).click()
      .get('@instance').its('element').find('[data-bs-slide]').eq(1).click()  // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active');
  });

  it('Can do pointer navigation', function() {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];

        // init and wtap
        const instance = new Carousel(element, {
          touch: true,
          keyboard: false,
          pause: false,
          interval: false
        });
        cy.wrap(instance).as('instance');
      })
      .get('[data-cy="carousel"]')
      .trigger('pointerdown', 530, 250)
      .trigger('pointermove', 150, 250)
      .trigger('pointerup', 150, 250)
      .trigger('pointerdown', 530, 250) // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .get('[data-cy="carousel"]')
      .trigger('pointerdown', 330, 250)
      .trigger('pointermove', 550, 250)
      .trigger('pointerup', 550, 250)
      .trigger('pointerdown', 430, 250) // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
      .get('[data-cy="carousel"]').find('[data-bs-slide]').eq(1).trigger('pointerdown') // test SPAM protection
      .get('[data-cy="carousel"]').find('[data-bs-slide-to]').eq(2).trigger('pointerdown') // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active');

    // edge case 1
    cy.log('transition can be prevented when text is **selected**').then(() => {
      cy.get('@instance').its('element').find('.carousel-item').eq(0).then(($item) => {
          selectText($item[0]);
        });
      cy.clock()
      cy.get('[data-cy="carousel"]')
        .trigger('pointerdown', 150, 400)
        .trigger('pointermove', 350, 430)
        .trigger('pointerup', 350, 430);
      cy.tick(200);
      cy.get('@instance').its('element').find('.carousel-item').eq(2).should('not.have.class', 'active')
        .document().then(($el) => {
          $el.getSelection()?.removeAllRanges()
        });
    });

    // edge case 2
    cy.log('transition can be prevented when **event.target** is out of context').then(() => {
      cy.get('[data-cy="carousel"]').trigger('pointerdown', 150, 400)
        .get('body').trigger('pointermove', 550, 20)
        .get('body').trigger('pointerup', 550, 20)
        .get('[data-cy="carousel"]').find('.carousel-item').eq(0).should('have.class', 'active')
    })

  });

  it('Can do keyboard navigation', function() {
    cy.get('[data-cy="carousel"]').then(($element) => {
        // init and wrap
        cy.wrap(new Carousel($element[0], {
          touch: false,
          keyboard: true,
          pause: false,
          interval: false
        })).as('instance');
      })
      .document().trigger('keydown', { code: 'ArrowRight' })
      .document().trigger('keydown', { code: 'ArrowRight', force: true })  // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .document().trigger('keydown', { code: 'ArrowRight' })
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
      .document().trigger('keydown', { code: 'ArrowLeft' })
      .document().trigger('keydown', { code: 'ArrowLeft', force: true })  // test SPAM protection
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active');
  });

  it('Can be paused via "hover"', () => {
    cy.clock();
    cy.get('[data-cy="carousel"]').then(($element) => {
        cy.wrap(new Carousel($element[0], {
          pause: 'hover',
          interval: 200
        })).as('instance');
      });
    cy.get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
    cy.tick(200);
    cy.get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
    cy.get('[data-cy="carousel"]').trigger('mouseenter')
    cy.get('@instance').its('element').should('have.class', 'paused')
    cy.get('[data-cy="carousel"]').trigger('mouseleave')
    cy.get('@instance').its('element').should('not.have.class', 'paused')
    cy.tick(200);
    cy.get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
    cy.get('@instance').invoke('pause');

  });

  it('Can prevent transition when out of viewport', () => {
    cy.clock();
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];
        // make window overflow
        const body = element.ownerDocument.body;
        Object.assign(body.style, {paddingBottom: '110vh'});
        // init and wrap
        cy.wrap(new Carousel(element, { interval: 200 })).as('instance');
      });
    cy.tick(200);
    cy.get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
    cy.get('@instance').invoke('pause')
    cy.scrollTo('bottom');
    cy.get('@instance').invoke('cycle')
    cy.tick(200);
    cy.get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
    cy.tick(200);
    cy.get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
  });

  it('Can work with controls outside element context', () => {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];
        const { body } = element.ownerDocument;

        // move controls outside context
        [...element.querySelectorAll('[data-bs-slide]'), ...element.querySelectorAll('[data-bs-slide-to]')]
        .forEach((control, i, arr) => {
          const button = document.createElement('button');
          const target = control.getAttribute('href') || control.getAttribute('data-bs-target');
          const bsSlide = control.getAttribute('data-bs-slide');
          const bsSlideTo = control.getAttribute('data-bs-slide-to');
          button.className = 'btn btn-outline-secondary mt-3 me-2';
          button.setAttribute('data-bs-target', target as string);
          if (bsSlide) {
            button.setAttribute('data-bs-slide', bsSlide);
            button.innerText = bsSlide.toUpperCase();
          } else {
            button.setAttribute('data-bs-slide-to', bsSlideTo as string);
            button.innerText = bsSlideTo as string;
          }
          body.append(button);

          if (i === arr.length - 1 && control.parentElement) {
            control.parentElement.remove();
          } else {
            control.remove();
          }
        });

        const instance = new Carousel(element, { interval: false });
        cy.wrap(instance).as('instance');
      })
      .get('button').eq(0).click()
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
      .get('button').eq(1).click()
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
      .get('button').eq(4).click()
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
      .get('button').eq(3).click()
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .get('button').eq(2).click()
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
  });

  it('Can work in RTL mode', () => {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];
        changeDirection(element, 'rtl');
        cy.wrap(new Carousel(element, { interval: false })).as('instance');
      })
      .get('@instance').its('element').find('[data-bs-slide]').eq(1).click()
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .get('@instance').its('element').find('[data-bs-slide]').eq(0).click()
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')

      .document().trigger('keydown', { code: 'ArrowRight' }) // -1
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')
      .document().trigger('keydown', { code: 'ArrowRight' }) // -1
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .document().trigger('keydown', { code: 'ArrowLeft' }) // +1
      .get('@instance').its('element').find('.carousel-item').eq(2).should('have.class', 'active')

      .get('[data-cy="carousel"]').trigger('pointerdown', 150, 300) // +1
      .get('[data-cy="carousel"]').trigger('pointermove', 550, 400)
      .get('[data-cy="carousel"]').trigger('pointerup', 550, 400)
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
      .get('[data-cy="carousel"]').trigger('pointerdown', 150, 300) // +1
      .get('[data-cy="carousel"]').trigger('pointermove', 550, 400)
      .get('[data-cy="carousel"]').trigger('pointerup', 550, 400)
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .get('[data-cy="carousel"]').trigger('pointerdown', 550, 300) // -1
      .get('[data-cy="carousel"]').trigger('pointermove', 150, 400)
      .get('[data-cy="carousel"]').trigger('pointerup', 150, 400)
      .get('@instance').its('element').find('.carousel-item').eq(0).should('have.class', 'active')
  });

  it('Can prevent drag and touch events', () => {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const [element] = $element;
        const instance = new Carousel(element, { interval: false });

        element.addEventListener('dragstart', function handle(e) {
          console.log('dragstart ' + e.target + ' is prevented');
        });
        element.addEventListener('touchstart', function handle(e) {
          console.log('touchstart ' + e.target + ' is prevented');
        });

        cy.wrap(instance).as('instance');
      })
      cy.get('[data-cy="carousel"]').trigger('touchstart', { force: true })
      cy.get('@instance').its('element').should('not.have.class', 'paused')
      cy.get('[data-cy="carousel"]').trigger('dragstart', { force: true })
      cy.get('@instance').its('element').should('not.have.class', 'paused')
  })

  it('Can do original event', () => {
    cy.get('[data-cy="carousel"]').then(($element) => {
        const element = $element[0];
        const instance = new Carousel(element, { interval: false });

        element.addEventListener('slide.bs.carousel', function handle(e) {
          // @ts-ignore
          if (e.from === 0) {
            // @ts-ignore
            console.log('slide from 0 to ' + e.to + ' is allowed');
          } else {
            // @ts-ignore
            console.log('slide from ' + e.from + ' to ' + e.to + ' is prevented');
            e.preventDefault()
          }
        });
        element.addEventListener('slid.bs.carousel', function handle(e) {
          // @ts-ignore
          console.log('slid from 0 to ' + e.to + ' is triggered');
        });

        cy.wrap(instance).as('instance');
      })
      .get('@instance').invoke('next')
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
      .get('@instance').invoke('next')
      .get('@instance').its('element').find('.carousel-item').eq(1).should('have.class', 'active')
  });

  it('Can dispose()', () => {
    cy.get('[data-cy="carousel"]').then(($element) => {
        cy.wrap(new Carousel($element[0], { interval: true })).as('instance');
      });
    cy.get('@instance').invoke('next')
      cy.wait(200)
      // @ts-ignore
    cy.get('@instance').should('be.instanceOf', Carousel).should(instance => instance.dispose());
    cy.get('@instance').its('element').should('be.undefined')
    cy.get('@instance').its('slides').should('be.undefined')
    cy.get('@instance').its('controls').should('be.undefined')
    cy.get('@instance').its('indicators').should('be.undefined')
  });

  it('Can re-init while animating', () => {
    cy.get('[data-cy="carousel"]').then(($element) => {
        cy.wrap(new Carousel($element[0], { interval: false })).then(e => {
          // console.log(e)
          e.next();
          const newInstance = new Carousel($element[0]);
          expect(newInstance.element).not.to.be.undefined;
          expect(e.element).to.be.eq(newInstance.element);
        })
      })
    });
});
