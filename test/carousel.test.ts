import { beforeEach, describe, expect, it, vi } from "vitest";
import Carousel from "../src/components/carousel";
import getMarkup from "./fixtures/getMarkup";
import { changeDirection, removeDirection } from "./fixtures/changeDirection";
import selectText from "./fixtures/selectText";

import "./assets/bootstrap.min.css";
import swipe from "./fixtures/swipe";

describe("Carousel Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Carousel(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Carousel Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Can initialize with default options", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    // init only with 2 slides
    [...element.getElementsByClassName("carousel-item")].slice(-1)[0].remove();
    [...element.querySelectorAll("[data-bs-slide-to]")].slice(-1)[0].remove();
    element.classList.remove("slide");
    Object.keys({ ...element.dataset }).forEach((key) => {
      if (key.includes("bs")) {
        const K = key.replace("bs", "").toLowerCase();
        element.removeAttribute(`data-bs-${K}`);
      }
    });
    const instance = Carousel.init(element);
    await vi.waitFor(() => {
      expect(instance.element).to.be.instanceOf(win.HTMLElement);
      expect(instance.name).to.equal("Carousel");
      expect(instance.slides.length).to.equal(2);
      expect(instance.options).to.not.be.empty;
      expect(instance.options).to.deep.equal({
        touch: true,
        interval: 5000,
        pause: "hover",
        keyboard: false,
      });
      expect(instance.defaults).to.deep.equal({
        touch: true,
        interval: 5000,
        pause: "hover",
        keyboard: false,
      });
      expect(instance.version.length).to.be.above(0);
    }, { timeout: 350 });
  });

  it("Can invalidate with only 1 item or less", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const win = element.ownerDocument.defaultView!;

    // init only with 1 slides
    [...element.getElementsByClassName("carousel-item")].slice(-2).map((s) =>
      s.remove()
    );
    [...element.querySelectorAll("[data-bs-slide-to]")].slice(-2).map((u) =>
      u.remove()
    );

    const instance = Carousel.init(element);
    await vi.waitFor(() => {
      expect(instance.element).to.be.instanceOf(win.HTMLElement);
      expect(instance.name).to.equal("Carousel");
      expect(instance.slides.length).to.equal(1);
      expect(instance.controls).to.be.undefined;
      expect(instance.indicators).to.be.undefined;
    }, 350);
  });

  it("Can work without indicators and arrows", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    container.getElementsByClassName("carousel-indicators")[0]?.remove();
    
    [...container.querySelectorAll(".carousel-control-next,.carousel-control-prev,[data-bs-slide-to],[data-bs-slide]")].map((u) =>
      u.remove()
    );
    await new Promise((res) => setTimeout(res, 150));

    const instance = Carousel.init(element);
    await vi.waitFor(() => {
      expect(instance.element).to.be.instanceOf(win.HTMLElement);
      expect(instance.name).to.equal("Carousel");
      expect(instance.controls.length).to.equal(0);
      expect(instance.indicators.length).to.equal(0);
    }, 350);
  });

  it("Can initialize via DATA API", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    element.setAttribute("data-bs-interval", "200");

    const instance = Carousel.init(element);
    await vi.waitFor(() => {
      expect(instance.options).to.deep.equal({
        touch: true,
        interval: 200,
        pause: "hover",
        keyboard: true,
      });
      expect(instance.slides.length).to.equal(3);
      expect(instance.defaults).to.not.be.undefined;
      expect(instance.slides[0].className).to.include("active");
    }, 350);
  });

  it("Can initialize via JavaScript API", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const instance = new Carousel(element, {
      touch: false,
      keyboard: false,
      pause: false,
      interval: 200,
    });

    await vi.waitFor(() => {
      expect(instance.options).to.deep.equal({
        touch: false,
        interval: 200,
        pause: false,
        keyboard: false,
      });
      expect(instance.slides.length).to.equal(3);
      expect(instance.defaults).to.not.be.undefined;
    }, 17);

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
  });

  it("Can work without transition", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    element.classList.remove("slide");

    const instance = new Carousel(element, {
      touch: false,
      keyboard: false,
      pause: false,
      interval: 200,
    });

    await vi.waitFor(() => {
      expect(instance.options).to.deep.equal({
        touch: false,
        interval: 200,
        pause: false,
        keyboard: false,
      });
      expect(instance.slides.length).to.equal(3);
      expect(instance.defaults).to.not.be.undefined;
    }, 17);

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 321);

    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
      instance.pause();
    }, 321);
  });

  it("Can do to(), cycle(), next(), prev()", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const instance = new Carousel(element, {
      touch: false,
      keyboard: false,
      pause: false,
      interval: false,
    });

    await vi.waitFor(() => {
      expect(instance.options).to.deep.equal({
        touch: false,
        interval: false,
        pause: false,
        keyboard: false,
      });
      expect(instance.slides.length).to.equal(3);
      expect(instance.defaults).to.not.be.undefined;
    }, 17);

    instance.to(1);
    instance.to(1); // should be SPAM protected

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 321);

    instance.cycle();
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 321);

    instance.next();
    instance.next(); // should be SPAM protected
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 321);

    instance.prev();
    instance.prev(); // should be SPAM protected
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 321);
  });

  it("Can do pause(), cycle()", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const instance = new Carousel(element, {
      touch: false,
      keyboard: false,
      pause: false,
      interval: 200,
    });

    await vi.waitFor(() => {
      expect(instance.slides.length).to.equal(3);
      expect(instance.defaults).to.not.be.undefined;
    }, 17);

    instance.pause();
    instance.pause(); // should be protected from SPAM
    await vi.waitFor(() => {
      expect(instance.isPaused).to.be.true;
    }, 17);

    instance.cycle();
    instance.cycle(); // should be protected from SPAM
    await vi.waitFor(() => {
      expect(instance.isPaused).to.be.false;
    }, 17);

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
  });

  it("Can do page navigation", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const instance = new Carousel(element, {
      touch: false,
      keyboard: false,
      pause: false,
      interval: false,
    });
    const pages = element.querySelectorAll<HTMLButtonElement>(
      "[data-bs-slide-to]",
    );

    pages[0].click();
    pages[0].click(); // test SPAM protection
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 51);

    pages[2].click();
    pages[2].click(); // test SPAM protection
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 351);

    pages[1].click();
    pages[2].click(); // test SPAM protection
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
  });

  it("Can do arrow navigation", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const arrows = element.querySelectorAll<HTMLButtonElement>(
      "[data-bs-slide]",
    );
    const instance = new Carousel(element, {
      touch: false,
      keyboard: false,
      pause: false,
      interval: false,
    });

    arrows[0].click();
    arrows[0].click(); // test SPAM protection
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 351);

    arrows[1].click();
    arrows[0].click(); // test SPAM protection
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 351);
  });

  it("Can do pointer navigation", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const pages = element.querySelectorAll<HTMLButtonElement>(
      "[data-bs-slide-to]",
    );
    const arrows = element.querySelectorAll<HTMLButtonElement>(
      "[data-bs-slide]",
    );
    const doc = element.ownerDocument;

    const instance = new Carousel(element, {
      touch: true,
      keyboard: false,
      pause: false,
      interval: false,
    });

    swipe(element, [[230, 50], [150, 50], [100, 50]]);
    swipe(element, [[230, 50]]); // test SPAM protection
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
    swipe(element, [[100, 50], [200, 50], [300, 50]]);
    swipe(element, [[430, 50]]); // test SPAM protection
    await vi.waitFor(() => {
      arrows[1].dispatchEvent(new Event("pointerdown", { bubbles: true })); // test SPAM protection
      pages[2].dispatchEvent(new Event("pointerdown", { bubbles: true })); // test SPAM protection
      expect(instance.slides[0].className).to.include("active");
    }, 351);

    // transition can be prevented when text is **selected**
    selectText(instance.slides[0]);
    swipe(element, [[100, 50], [200, 50], [300, 50]]);
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
      expect(instance.slides[2].className).to.not.include("active");
      doc.getSelection()?.removeAllRanges();
    }, 351);

    // transition can be prevented when **event.target** is out of context
    swipe(element, [[100, 50], [550, 50], [650, 850]]);
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 351);
  });

  it("Can do keyboard navigation", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const doc = element.ownerDocument;
    const instance = new Carousel(element, {
      touch: false,
      keyboard: true,
      pause: false,
      interval: false,
    });

    doc.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowRight", bubbles: true }),
    );
    doc.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowRight", bubbles: true }),
    ); // SPAM
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);

    doc.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowRight", bubbles: true }),
    );
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 351);

    doc.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowLeft", bubbles: true }),
    );
    doc.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowLeft", bubbles: true }),
    ); // SPAM
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
  });

  it('Can be paused via "hover"', async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const instance = new Carousel(element, {
      pause: "hover",
      interval: 200,
    });

    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 17);

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);

    element.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    await vi.waitFor(() => {
      expect(element.className).to.include("paused");
      expect(instance.slides[1].className).to.include("active");
      expect(instance.isPaused).to.be.true;
    }, 351);

    element.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    await vi.waitFor(() => {
      expect(element.className).to.not.include("paused");
      expect(instance.slides[2].className).to.include("active");
      expect(instance.isPaused).to.be.false;
      instance.pause();
    }, 351);
  });

  it("Can prevent transition when out of viewport", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    const body = element.ownerDocument.body;
    Object.assign(body.style, { paddingBottom: "110vh" });
    const instance = new Carousel(element, { interval: 200 });

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);

    instance.pause();
    win.scrollTo({ left: 0, top: 10, behavior: "smooth" });
    win.dispatchEvent(new Event("scroll"));
    await new Promise((res) => setTimeout(res, 500));
    instance.cycle();

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);

    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
  });

  it("Can work with controls outside element context", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const buttonArrows = [
      ...container.querySelectorAll<HTMLButtonElement>("[data-bs-slide]"), // arrows
    ];
    const buttonPages = [
      ...container.querySelectorAll<HTMLButtonElement>("[data-bs-slide-to]"), // pages
    ];

    const instance = new Carousel(element, { interval: false });
    await vi.waitFor(() => {
      expect(instance.controls.length).to.equal(4);
      expect(instance.indicators.length).to.equal(6);
    }, 350);

    buttonArrows[2].click();
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 351);

    buttonArrows[3].click();
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 351);

    buttonPages[5].click();
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 351);

    buttonPages[4].click();
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);

    buttonPages[3].click();
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 351);
  });

  it("Can work in RTL mode", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    changeDirection(container, "rtl");
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const doc = element.ownerDocument;
    const buttonArrows = [
      ...container.querySelectorAll<HTMLButtonElement>("[data-bs-slide]"), // arrows
    ];

    const instance = new Carousel(element, { interval: false, touch: true });

    buttonArrows[1].click();
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);

    buttonArrows[0].click();
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 351);

    doc.dispatchEvent(
      new KeyboardEvent("keydown", { bubbles: true, code: "ArrowRight" }),
    );
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 351);

    doc.dispatchEvent(
      new KeyboardEvent("keydown", { bubbles: true, code: "ArrowRight" }),
    );
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);

    doc.dispatchEvent(
      new KeyboardEvent("keydown", { bubbles: true, code: "ArrowLeft" }),
    );
    await vi.waitFor(() => {
      expect(instance.slides[2].className).to.include("active");
    }, 351);

    swipe(element, [[100, 50], [200, 50], [300, 50]]);
    await vi.waitFor(() => {
      expect(instance.slides[0].className).to.include("active");
    }, 351);
    swipe(element, [[100, 50], [200, 50], [300, 50]]);
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
    swipe(element, [[300, 150], [150, 150], [150, 150]]);
    await vi.waitFor(() => {
      console.log(instance.index);
      expect(instance.slides[0].className).to.include("active");
    }, 351);

    removeDirection(container);
  });

  it("Can prevent drag and touch events", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const doc = element.ownerDocument;
    const buttonArrows = [
      ...container.querySelectorAll<HTMLButtonElement>("[data-bs-slide]"), // arrows
    ];
    const buttonPages = [
      ...container.querySelectorAll<HTMLButtonElement>("[data-bs-slide-to]"), // pages
    ];

    const instance = new Carousel(element, { interval: false });
    element.addEventListener("dragstart", function handle(e) {
      console.log("dragstart " + e.target + " is prevented");
    });
    element.addEventListener("touchstart", function handle(e) {
      console.log("touchstart " + e.target + " is prevented");
    });

    element.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, pointerType: "touch" }),
    );
    await vi.waitFor(() => {
      expect(element.className).to.not.include("paused");
    }, 351);

    element.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    await vi.waitFor(() => {
      expect(element.className).to.not.include("paused");
    }, 351);
  });

  it("Can do original event", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;

    element.addEventListener("slide.bs.carousel", function handle(e) {
      // @ts-ignore
      if (e.from === 0) {
        // @ts-expect-error
        console.log("slide from 0 to " + e.to + " is allowed");
      } else {
        // @ts-expect-error
        console.log("slide from " + e.from + " to " + e.to + " is prevented");
        e.preventDefault();
      }
    });
    element.addEventListener("slid.bs.carousel", function handle(e) {
      // @ts-expect-error
      console.log("slid from 0 to " + e.to + " is triggered");
    });
    const instance = new Carousel(element, { interval: false });

    instance.next();
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
    instance.next();
    await vi.waitFor(() => {
      expect(instance.slides[1].className).to.include("active");
    }, 351);
  });

  it("Can dispose()", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const instance = new Carousel(element, { interval: true });
    instance.next();

    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.slides).to.be.undefined;
      expect(instance.controls).to.be.undefined;
    }, 351);
  });

  it("Can re-init while animating", async () => {
    const container = getMarkup("carousel");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="carousel"]'), {
      timeout: 200,
    });
    const element = container.querySelector<HTMLElement>(
      '[data-test="carousel"]',
    )!;
    const instance = new Carousel(element, { interval: false });
    instance.next();
    const newInstance = new Carousel(element);
    expect(newInstance.element).not.to.be.undefined;
    expect(newInstance.element).to.be.eq(instance.element);
  });
});
