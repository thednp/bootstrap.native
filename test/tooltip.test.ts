import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page } from '@vitest/browser/context';
import getMarkup from "./fixtures/getMarkup";

import Tooltip from "../src/components/tooltip";
import Modal from "../src/components/modal";
import Offcanvas from "../src/components/offcanvas";
import Popover from "../src/components/popover";

import { changeDirection, removeDirection } from "./fixtures/changeDirection";
import "./assets/bootstrap.min.css";

describe("Tooltip Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
    const popContainer = document.body.querySelector('.popup-container');
    if (popContainer) popContainer.innerHTML = '';
  });
  afterEach(async () => {
    await page.viewport(414, 896);
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Tooltip(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Tooltip Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Init without content - won't work", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="tooltip"]',
    )!;
    const instance = Popover.init(element);

    expect(instance.tooltip).to.be.undefined;
    expect(instance.arrow).to.be.undefined;
  });

  it("Can do toggle()", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
    const element = container.querySelectorAll<HTMLElement>(
      '[data-test="tooltip"]',
    )[1]!;
    const instance = new Tooltip(element, { trigger: "manual" });
    expect(instance.element, "element").to.equal(element);
    expect(instance.tooltip, "tooltip").to.not.be.undefined;
    expect(instance.name, "name").to.eq("Tooltip");
    expect(instance.options, "options").to.not.be.empty;
    expect(instance.defaults, "defaults").to.not.be.undefined;
    expect(instance.version, "version").to.be.string;

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 101);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 251);
  });

  it("Can initialize with title", async () => {
    const container = getMarkup("tooltip");
    const tooltipTarget = document.createElement('button');
    tooltipTarget.setAttribute('data-tip', 'tooltip');
    tooltipTarget.setAttribute('title', 'Sample Title');
    tooltipTarget.innerText = 'Test button';
    tooltipTarget.classList.add('btn');
    container.append(tooltipTarget);
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-tip="tooltip"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-tip="tooltip"]',
    )!;
    const instance = Tooltip.init(element);
    expect(instance.element, "element").to.equal(tooltipTarget);
    expect(Tooltip.getInstance(element), "element").to.equal(instance);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
      expect(element.getAttribute('data-original-title')).to.equal("Sample Title");
    }, 251);

    instance.dispose();
    await vi.waitFor(() => {
      expect(element.hasAttribute('data-original-title')).to.be.false;
    }, 251);
  });

  it("Can do automatic position on scroll / resize", async () => {
    await page.viewport(1000, 600);
    const container = getMarkup("tooltip");
    Object.assign(container.style, { padding: "10rem 30% 90vh 30%" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
    const element = container.querySelectorAll<HTMLElement>(
      '[data-test="tooltip"]',
    )[3]!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Tooltip(element, { placement: "left" });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 101);

    win.scrollTo({ top: 600, behavior: 'instant' });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-tooltip-start");
    }, 151);

    await page.viewport(200, 600);
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-tooltip-bottom");
    }, 151);

    win.scrollTo({ top: 0, behavior: 'instant' });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-tooltip-top");
    }, 151);

    await page.viewport(1000, 600);
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-tooltip-start");
    }, 151);

    // force a top = 0
    await page.viewport(1000, 200);
    Object.assign(container.style, { padding: "0rem 30% 0rem 30%" });
    win.dispatchEvent(new Event('resize'));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-tooltip-start");
    }, 151);

    // force a top = bottom = 0
    await page.viewport(1000, 120);
    Object.assign(container.style, { padding: "0rem 30% 0rem 30%" });
    win.dispatchEvent(new Event('resize'));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-tooltip-start");
    }, 151);
  });

  it("Can handle various trigger events", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
    const element = container.querySelectorAll<HTMLElement>(
      '[data-test="tooltip"]',
    )[1]!;
    const instance = new Tooltip(element, { trigger: "hover focus click" });

    // HOVER
    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    element.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    await new Promise(res => setTimeout(res, 151));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);

    // CLICK
    await new Promise(res => setTimeout(res, 151));
    element.click();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    element.click();
    await new Promise(res => setTimeout(res, 151));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);

    // FOCUS
    await new Promise(res => setTimeout(res, 151));
    element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    element.dispatchEvent(new MouseEvent('focusout', { bubbles: true }));
    await new Promise(res => setTimeout(res, 151));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);
  });

  it("Can do toggleEnabled()", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
    const element = container.querySelectorAll<HTMLElement>(
      '[data-test="tooltip"]',
    )[1]!;
    const instance = new Tooltip(element, { animation: false });

    expect(instance.enabled).to.be.true;
    instance.toggleEnabled();
    expect(instance.enabled).to.be.false

    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);

    instance.toggleEnabled();
    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    instance.disable();
    await new Promise(res => setTimeout(res, 151));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);
    await new Promise(res => setTimeout(res, 151));

    instance.dispose(); // code coverage
  });

  it("Can be dismissed when closing an offcanvas", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);
    const offcanvasTarget = container.querySelectorAll<HTMLElement>(
      '[data-test="offcanvas"]',
    )[0]!;
    const element = offcanvasTarget.querySelectorAll<HTMLElement>(
      '[data-bs-toggle="tooltip"]',
    )[0]!;
    const offcanvasInstance = new Offcanvas(offcanvasTarget);
    const instance = new Tooltip(element);

    offcanvasInstance.toggle();
    await vi.waitFor(() => {
      expect(offcanvasInstance.element.className).to.contain("show");
    }, 151);
    await new Promise(res => setTimeout(res, 151));

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    offcanvasInstance.toggle();
    await vi.waitFor(() => {
      expect(offcanvasInstance.element.className).to.not.contain("show");
    }, 151);

    await new Promise(res => setTimeout(res, 151));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);
  });

  it("Can be dismissed when closing an overflowing modal", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);
    const modalTarget = container.querySelectorAll<HTMLElement>(
      '[data-test="modal"]',
    )[0]!;
    const element = modalTarget.querySelectorAll<HTMLElement>(
      '[data-bs-toggle="tooltip"]',
    )[0]!;
    const modalInstance = new Modal(modalTarget);
    const instance = new Tooltip(element, { placement: 'top' });

    modalInstance.toggle();
    await vi.waitFor(() => {
      expect(modalInstance.element.className).to.contain("show");
    }, 151);
    await new Promise(res => setTimeout(res, 151));

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    modalInstance.toggle();
    await vi.waitFor(() => {
      expect(modalInstance.element.className).to.not.contain("show");
    }, 151);

    await new Promise(res => setTimeout(res, 151));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);
  });

  it("Can work with popover, template and sanitizeFn", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);

    const doc = wrapper.ownerDocument!;
    const popoverTarget = doc.createElement("button");
    popoverTarget.className = "btn btn-primary";
    popoverTarget.innerText = "Popover Demo";
    popoverTarget.setAttribute("data-bs-title", "Popover demo title");
    popoverTarget.setAttribute("data-bs-content", "Popover demo content");
    popoverTarget.setAttribute("data-bs-toggle", "popover");
    popoverTarget.setAttribute("data-bs-dismissible", "true");
    doc.querySelector(".btn-toolbar")?.append(popoverTarget);

    const template = doc.createElement("div");
    template.innerHTML = `<div class="popover fade bs-popover-top" role="tooltip">
      <h3 class="popover-header"></h3>
      <div class="popover-arrow"></div>
      <div class="popover-body"></div>
    </div>`;

    const instance = new Popover(popoverTarget, {
      template: template.firstChild as HTMLElement,
      sanitizeFn: (c) => c.trim(),
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);
  });

  it("Can work with popover and micro-template", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.btn-toolbar'), 200);

    const doc = wrapper.ownerDocument!;
    const popoverTarget = doc.createElement("button");
    popoverTarget.className = "btn btn-primary";
    popoverTarget.innerText = "Popover Demo";
    popoverTarget.setAttribute("data-bs-toggle", "popover");
    popoverTarget.setAttribute("data-bs-dismissible", "true");
    doc.querySelector(".btn-toolbar")?.append(popoverTarget);
    const title = doc.createElement("div");
    title.innerHTML =
      `<span class="my-header">My Header Micro-Template</span>`;
    const content = doc.createElement("div");
    content.innerHTML =
      `<p class="my-content"><b class="lead">My Content</b> Micro-Template</p>`;
    const btnClose = doc.createElement("div");
    btnClose.innerHTML =
      '<button class="btn-close" aria-label="Close"></button>';

    const instance = new Popover(popoverTarget, {
      title: title.firstChild as HTMLElement,
      content: content.firstChild as HTMLElement,
      btnClose: btnClose.firstChild as HTMLElement,
      customClass: "custom-class",
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);
  });

  it("Can be dismissed via touch events", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
    const element = container.querySelectorAll<HTMLElement>('[data-test="tooltip"]')[1]!;

    const instance = new Tooltip(element);
    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    container.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    container.dispatchEvent(new TouchEvent('touchend', { bubbles: true }));
    await new Promise(res => setTimeout(res, 101));
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 151);
  });

  it("Can work with popover without title 1", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    const doc = wrapper.ownerDocument!;
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);

    const popoverTarget = doc.createElement("button");
    popoverTarget.className = "btn btn-primary";
    popoverTarget.innerText = "Popover Demo";
    popoverTarget.setAttribute("data-bs-toggle", "popover");
    popoverTarget.setAttribute("data-bs-dismissible", "true");
    doc.querySelector(".btn-toolbar")?.append(popoverTarget);

    const instance = new Popover(popoverTarget, {
      content:
        `<p class="m-0"><b class="lead">My Content</b> Micro-Template</p>`,
      btnClose:
        '<button class="btn-close text-primary" aria-label="Close"></button>',
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);
  });

  it("Can work with popover without title 2", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    const doc = wrapper.ownerDocument!;
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);

    const popoverTarget = doc.createElement("button");
    popoverTarget.className = "btn btn-primary";
    popoverTarget.innerText = "Popover Demo";
    popoverTarget.setAttribute("data-bs-toggle", "popover");
    popoverTarget.setAttribute("data-bs-dismissible", "true");
    doc.querySelector(".btn-toolbar")?.append(popoverTarget);
    const btnClose = doc.createElement("div");
    btnClose.innerHTML =
      '<button class="btn-close" aria-label="Close"></button>';

    const instance = new Popover(popoverTarget, {
      content:
        `<p class="m-0"><b class="lead">My Content</b> Micro-Template</p>`,
      btnClose: btnClose.firstElementChild as HTMLElement,
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);
  });

  it("Can work with RTL", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    const doc = wrapper.ownerDocument!;
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
    changeDirection(wrapper, "rtl"); // added template without tooltip class for coverage

    const element = container.querySelectorAll<HTMLButtonElement>('[data-bs-toggle="tooltip"]')[1]!;
    const instance = new Tooltip(element, {
      template:
        '<div role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    instance.dispose();
    removeDirection(element);
  });

  it("Can do custom events", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    const doc = wrapper.ownerDocument!;
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-test="tooltip"]')!;
    const eventListener = (e: Event) => {
      if (!element.innerText.includes("wombat")) {
        e.preventDefault();
      }
    };
    
    const instance = new Tooltip(element, { title: "Sample Title 1" });
    element.addEventListener("hide.bs.tooltip", eventListener as EventListener);

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 101);

    instance.hide();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 151);

    element.removeEventListener("hide.bs.tooltip", eventListener as EventListener);

    await new Promise(res => setTimeout(res, 251));
    element.addEventListener("show.bs.tooltip", eventListener as EventListener);
    const newInstance = new Tooltip(element, { title: "Sample Title 2" });

    newInstance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.not.contain("show");
    }, 101);

    element.removeEventListener("show.bs.tooltip", eventListener as EventListener);
    instance.dispose();
  });

  const viewports = [[800,150], [150,800]];
  const placements = ['top', 'right', 'bottom', 'left'];

  viewports.forEach(([width, height]) => {
    placements.forEach((placement) => {
      it(`Can handle small devices ${placement} - ${width}, ${height}`, async () => {
        await page.viewport(width, height);
        const container = getMarkup("tooltip");
        wrapper.append(container);
        await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);
        Object.assign(container.style, { padding: "5rem" });
     
        const element = container.querySelectorAll<HTMLElement>('[data-test="tooltip"]')[1]!;
        // horizontal
        const instance = new Tooltip(element, { placement: placement as 'top' | 'left' | 'right' | 'bottom' });
        instance.show();
        await vi.waitFor(() => {
          expect(instance.tooltip?.className).to.contain("show");
        }, 151);
      })
    })
  })

  it("Can dispose()", async () => {
    const container = getMarkup("tooltip");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="tooltip"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-test="tooltip"]')!;
    const instance = new Tooltip(element, { title: "Sample Content" });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 101);

    await new Promise(res => setTimeout(res, 251));
    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.tooltip).to.be.undefined;
      expect(instance.element).to.be.undefined;
      expect(Tooltip.getInstance(element)).to.be.null;
    }, 101);
  });
});
