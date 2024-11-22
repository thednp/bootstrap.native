import { beforeEach, describe, expect, it, vi } from "vitest";
import { page } from '@vitest/browser/context';
import getMarkup from "./fixtures/getMarkup";

import "./assets/bootstrap.min.css";
import Modal from "../src/components/modal";

describe("Modal Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
    const popContainer = document.body.querySelector('.popup-container');
    if (popContainer) popContainer.innerHTML = '';
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Modal(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Modal Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Init with target element", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const instance = Modal.init(element);

    await vi.waitFor(() => {
      expect(instance.element).to.equal(element);
      expect(instance.name).to.equal('Modal');
      expect(instance.options).to.not.be.empty;
      expect(instance.defaults).to.not.be.undefined;
      expect(instance.version).to.not.be.undefined;
    }, 151);
  });

  it("Can do show() / hide() / toggle()", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);
    const instances = [] as Modal[];
    const elements = container.querySelectorAll<HTMLElement>(
      '[data-test="modal"]',
    )!;
    elements.forEach(element => instances.push(Modal.init(element)));

    instances[0].toggle();
    instances[0].show(); // test SPAM
    await vi.waitFor(() => {
      expect(instances[0].element.className).to.contain("show");
    }, 151);

    instances[0].hide();
    instances[0].toggle();
    await vi.waitFor(() => {
      expect(instances[0].element.className).to.not.contain("show");
    }, 151);

    instances[0].show();
    await vi.waitFor(() => {
      expect(instances[0].element.className).to.contain("show");
    }, 151);

    instances[1].show();
    await vi.waitFor(() => {
      expect(instances[0].element.className).to.not.contain("show");
      expect(instances[1].element.className).to.contain("show");
    }, 151);

    instances[0].show();
    await vi.waitFor(() => {
      expect(instances[1].element.className).to.not.contain("show");
      expect(instances[0].element.className).to.contain("show");
    }, 151);
  });

  it("Can be openeded / dismissed via click", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const trigger = container.querySelector<HTMLAnchorElement>('[href="#myModal"]')!
    const dismiss = element.querySelector<HTMLAnchorElement>('[data-bs-dismiss="modal"]')!
    const instance = Modal.init(element);

    trigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);

    // wait for events to be attached
    await new Promise(res => setTimeout(res, 101));
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 2, clientY: 2 }));
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 51);

    trigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);

    dismiss.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 51);
  });

  it("Can work with static backdrop", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const instance = new Modal(element, { backdrop: 'static' });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.isStatic).to.be.true;
      expect(instance.options.backdrop).to.equal('static');
      expect(instance.element.className).to.contain("show");
    }, 51);

    // wait for events to be attached
    await new Promise(res => setTimeout(res, 101));
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 2, clientY: 2 }));
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);
  });

  it("Can work with resize event", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelectorAll<HTMLElement>(
      '[data-test="modal"]',
    )[1]!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Modal(element, { backdrop: true });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.isStatic).to.be.false;
      expect(instance.options.backdrop).to.be.true;
      expect(instance.element.className).to.contain("show");
    }, 51);

    await page.viewport(320, 896);
    win.dispatchEvent(new Event('resize', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);

    instance.update();
    await vi.waitFor(() => {
      expect(win.document.body.style.cssText).to.contain("overflow: hidden");
    }, 51);

    await page.viewport(414, 896);
  });

  it("Can be dismissed via Escape", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Modal(element, { backdrop: false });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);

    // wait for events to be attached
    await new Promise(res => setTimeout(res, 101));
    win.document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'Escape' }));
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 51);
  });

  it("Can do dispose() while not open", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    element.classList.remove('fade');
    const instance = Modal.init(element);

    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.options).to.be.undefined;
    }, 151);
  });

  it("Can do dispose() while open with backdrop", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const instance = Modal.init(element);

    instance.show();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);

    // wait for events to be attached
    await new Promise(res => setTimeout(res, 101));
    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.options).to.be.undefined;
      expect(element.className).to.not.contain('show');
    }, 151);
  });

  it("Can do dispose() while open without backdrop", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const instance = new Modal(element, { backdrop: false });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);

    // wait for events to be attached
    await new Promise(res => setTimeout(res, 101));
    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.options).to.be.undefined;
      // expect(element.className).to.not.contain('show');
    }, 151);
    await new Promise(res => setTimeout(res, 101));
  });


  it("Can use focus trap", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    element.setAttribute('tabindex', '0');
    const doc = element.ownerDocument!;
    const dismiss = element.querySelector<HTMLAnchorElement>('[data-bs-dismiss="modal"]')!
    const instance = new Modal(element);

    instance.show();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    dismiss.focus();
    new Array(6).forEach(() => {
      element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'Tab' }));
    });
    new Array(6).forEach(() => {
      element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'Tab', shiftKey: true }));
    });

    expect(instance.element).to.contain(doc.activeElement);
  });

  it("Can work with CustomEvent hide", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const instance = Modal.init(element);

    element.addEventListener("hide.bs.modal", function (e) {
      if (!element.innerText.includes("Holy")) {
        e.preventDefault();
      }
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 51);
  });

  it("Can work with CustomEvent show", async () => {
    const container = getMarkup("modal");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="modal"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="modal"]',
    )!;
    const instance = Modal.init(element);

    element.addEventListener("show.bs.modal", function (e) {
      if (!element.innerText.includes("Holy")) {
        e.preventDefault();
      }
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 51);
  });
});
