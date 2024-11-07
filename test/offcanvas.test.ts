import { beforeEach, describe, expect, it, vi } from "vitest";
import getMarkup from "./fixtures/getMarkup";

import "./assets/bootstrap.min.css";
import Offcanvas from "../src/components/offcanvas";

describe("Offcanvas Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", async () => {
    const args = [];
    try {
      // @ts-expect-error
      new Offcanvas(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Offcanvas Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Init with target element", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const instance = new Offcanvas(element);
    expect(instance.element).to.equal(element);
    expect(instance.name).to.eq("Offcanvas");
    expect(instance.options).to.not.be.empty;
    expect(instance.defaults).to.not.be.undefined;
    expect(instance.version).to.be.string;
  });

  it("Can be openeded / dismissed via click - backdrop", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const doc = element.ownerDocument;
    const trigger = container.querySelector<HTMLAnchorElement>('[href="#offcanvasExample"]')!;
    const dismiss = element.querySelector<HTMLButtonElement>('[data-bs-dismiss="offcanvas"]')!;
    const instance = Offcanvas.init(element);

    trigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    // wait for events to be attached and backdrop added
    const backdrop = doc.querySelector<HTMLElement>('.offcanvas-backdrop')!;
    await new Promise(res => setTimeout(res, 151));

    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true, /*clientX: 412, clientY: 2*/ }));

    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 1251);

    trigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);
    await new Promise(res => setTimeout(res, 151));

    dismiss.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 151);
  });

  it("Can do show() / hide()", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const instance = new Offcanvas(element);
    const element1 = container.querySelectorAll<HTMLElement>(
      '[data-test="offcanvas"]',
    )[1]!;
    const instance1 = new Offcanvas(element1);

    instance.toggle();
    instance.show(); // test SPAM
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    instance.toggle();
    instance.hide(); // test SPAM
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 151);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    instance1.toggle();
    instance1.show(); // test SPAM
    await vi.waitFor(() => {
      expect(instance1.element.className).to.contain("show");
      expect(instance.element.className).to.not.contain("show");
    }, 151);

    instance.toggle();
    instance.hide(); // test SPAM
    await vi.waitFor(() => {
      expect(instance1.element.className).to.not.contain("show");
      expect(instance.element.className).to.contain("show");
    }, 151);
  });

  it("Can use focus trap", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '#offcanvasNoBackdrop',
    )!;
    element.setAttribute('tabindex', '0');
    const doc = element.ownerDocument!;
    const dismiss = element.querySelector<HTMLAnchorElement>('[data-bs-dismiss="offcanvas"]')!

    const instance = new Offcanvas(element);

    instance.show();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    dismiss.focus();
    element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'Tab' }));
    element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'Tab', shiftKey: true }));

    expect(instance.element).to.contain(doc.activeElement);
  });

  it("Can be openeded / dismissed via click - no backdrop", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '#offcanvasNoBackdrop',
    )!;
    const trigger = container.querySelector<HTMLButtonElement>('[data-bs-target="#offcanvasNoBackdrop"]')!;
    const dismiss = element.querySelector<HTMLButtonElement>('[data-bs-dismiss="offcanvas"]')!;
    const instance = new Offcanvas(element);

    trigger.click();
    instance.show(); // test SPAM
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    trigger.click();
    instance.hide(); // test SPAM
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 151);

    trigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    // wait for events to kick in
    await new Promise(res => setTimeout(res, 150));
    dismiss.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 151);
  });

  it("Can do dispose() when open", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const instance = new Offcanvas(element);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    instance.dispose();
    await new Promise(res => setTimeout(res, 101));
    await vi.waitFor(() => {
      expect(element.className).to.not.contain("show");
      expect(instance.element).to.be.undefined;
      expect(instance.options).to.be.undefined;
    }, 151);
  });

  it("Can be dismissed via Escape", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const doc = element.ownerDocument!;
    const instance = new Offcanvas(element);

    instance.toggle();
    instance.show(); // test SPAM
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    await new Promise(res => setTimeout(res, 150));
    doc.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: "Escape" }))
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 151);
  });

  it("Can do dispose()", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const instance = new Offcanvas(element);

    instance.dispose();
    await vi.waitFor(() => {
      expect(element.className).to.not.contain("show");
      expect(instance.element).to.be.undefined;
      expect(instance.options).to.be.undefined;
    }, 151);
  });

  it("Can work with CustomEvent hide", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const instance = new Offcanvas(element);
    element.addEventListener("hide.bs.offcanvas", function testHide(e) {
      if (!element.innerText.includes("Holy")) {
        e.preventDefault();
      }
      element.removeEventListener("hide.bs.offcanvas", testHide);
    });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);

    instance.hide();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 151);
  });

  it("Can work with CustomEvent show", async () => {
    const container = getMarkup("offcanvas");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="offcanvas"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="offcanvas"]',
    )!;
    const doc = element.ownerDocument!;
    const instance = new Offcanvas(element);
    element.addEventListener("show.bs.offcanvas", function testShow(e) {
      if (!element.innerText.includes("Holy")) {
        e.preventDefault();
      }
      element.removeEventListener("hide.bs.offcanvas", testShow);
    });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 151);
  });
});
