import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page } from '@vitest/browser/context';
import getMarkup from "./fixtures/getMarkup";

import "./assets/bootstrap.min.css";

import Popover from "../src/components/popover";

describe("Popover Class Tests", () => {
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
      new Popover(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Popover Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Can handle horizontal position when both exceed top and bottom 1", async () => {
    await page.viewport(600, 200);
    const container = getMarkup("popover");
    Object.assign(container.style, { padding: "10rem 27rem" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Popover(element, {
      dismissible: false,
      placement: "left",
      title: "Popover Left",
      content:
        `This Popover can handle horizontal position when both exceed top and bottom.
          Here we add more content for testing.
          Efficiently unleash cross-media information without cross-media value.
          Quickly maximize timely deliverables for real-time schemas.`,
    });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 51);

    win.scrollTo({ left: 600, top: 0, behavior: "instant" });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-popover-end");
    }, 51);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-popover-start");
    }, 51);
  });

  it("Can handle horizontal position when both exceed top and bottom 2", async () => {
    await page.viewport(600, 200);
    const container = getMarkup("popover");
    Object.assign(container.style, { padding: "7rem 27rem" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Popover(element, {
      dismissible: false,
      placement: "right",
      title: "Popover Right",
      content:
        `This Popover can handle horizontal position when both exceed top and bottom.
        Here we add more content for testing.
        Efficiently unleash cross-media information without cross-media value.
        Quickly maximize timely deliverables for real-time schemas.`,
    });

    win.scrollTo({ left: 600, top: 0, behavior: "instant" });
    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
      expect(instance.tooltip?.className).to.contain("bs-popover-end");
    }, 51);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-popover-start");
    }, 151);
  });

  it("Can do toggle() and dismissible", async () => {
    await page.viewport(600, 200);
    const container = getMarkup("popover");
    Object.assign(container.style, { padding: "7rem 27rem" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const instance = Popover.init(element);

    expect(instance.element, "element").to.equal(element);
    expect(instance.tooltip, "tooltip").to.not.be.undefined;
    expect(instance.name, "name").to.eq("Popover");
    expect(instance.options, "options").to.not.be.empty;
    expect(instance.defaults, "defaults").to.not.be.undefined;
    expect(instance.version, "version").to.be.string;

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
    }, 51);
  });

  it("Can handle vertical right", async () => {
    await page.viewport(400, 400);
    const container = getMarkup("popover");
    Object.assign(container.style, { padding: "15rem 25rem 15rem 1rem" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Popover(element, {
      dismissible: false,
      placement: "top",
      title: "Popover Right",
      content:
        `This Popover can handle vertical position when both exceed top and bottom.
        Here we add more content for testing.
        Efficiently unleash cross-media information without cross-media value.
        Quickly maximize timely deliverables for real-time schemas.`,
    });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
      expect(instance.tooltip?.className).to.contain("bs-popover-top");
    }, 51);

    win.scrollTo({ left: 600, top: 0, behavior: "instant" });

    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-popover-top");
    }, 51);
  });

  it("Can handle vertical left", async () => {
    await page.viewport(400, 400);
    const container = getMarkup("popover");
    Object.assign(container.style, { padding: '15rem 35rem 15rem 25rem' });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    win.scrollTo({ left: 600, top: 0, behavior: "instant" });

    const instance = new Popover(element, {
      dismissible: false,
      placement: "top",
      title: "Popover Top",
      content:
        `This Popover can handle vertical position when both exceed top and bottom.
        Here we add more content for testing.
        Efficiently unleash cross-media information without cross-media value.
        Quickly maximize timely deliverables for real-time schemas.`,
    });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
      expect(instance.tooltip?.className).to.contain("bs-popover-top");
    }, 51);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-popover-top");
    }, 51);
  });

  it("Can switch top to bottom", async () => {
    await page.viewport(400, 400);
    const container = getMarkup("popover");
    Object.assign(container.style, { height: '100vh', padding: "22rem 8rem" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Popover(element, {
      dismissible: false,
      placement: "top",
      title: "Top Popover",
      content: `This Popover can handle top position when exceed top.
        Here we add more content for testing.
        Efficiently unleash cross-media information without cross-media value.
        Quickly maximize timely deliverables for real-time schemas.`,
    });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
      expect(instance.tooltip?.className).to.contain("bs-popover-top");
    }, 51);

    win.scrollTo({ left: 0, top: 400, behavior: "instant" });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-popover-bottom");
    }, 51);
  });

  it("Can switch bottom to top", async () => {
    await page.viewport(400, 450);
    const container = getMarkup("popover");
    Object.assign(container.style, { margin: "40vh 10rem", padding: '3rem' });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const win = element.ownerDocument.defaultView!;
    const instance = new Popover(element, {
      dismissible: false,
      placement: "bottom",
      title: "Popover Bottom",
      content: `This Popover can handle bottom position when both exceed top and bottom.
      Here we add more content for testing.
      Efficiently unleash cross-media information without cross-media value.
      Quickly maximize timely deliverables for real-time schemas.`,
    });

    win.scrollTo({ left: 0, top: 600, behavior: "instant" });

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("show");
      expect(instance.tooltip?.className).to.contain("bs-popover-bottom");
    }, 51);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain("bs-popover-top");
    }, 51);
  });

  it("Can dispose()", async () => {
    const container = getMarkup("popover");
    Object.assign(container.style, { margin: "30vh 10rem" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const instance = new Popover(element);

    instance.dispose();
    await vi.waitFor(() => {
      expect(Popover.getInstance(element)).to.be.null;
      expect(instance.element).to.be.undefined;
      expect(instance.tooltip).to.be.undefined;
    }, 51);
  });

  it("Can dispose() while open", async () => {
    await page.viewport(400, 500);
    const container = getMarkup("popover");
    Object.assign(container.style, { margin: "30vh 10rem" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="popover"]'), 200);
    const element = container.querySelector<HTMLElement>(
      '[data-test="popover"]',
    )!;
    const instance = new Popover(element);

    instance.show();
    await vi.waitFor(() => {
      expect(instance.tooltip?.className).to.contain('show');
    }, 51);

    await new Promise(res => setTimeout(res, 250));
    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.tooltip).to.be.undefined;
    }, 151);
  });
});
