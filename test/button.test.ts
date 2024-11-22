import { beforeEach, describe, expect, it, vi } from "vitest";
import getMarkup from "./fixtures/getMarkup";
import Button from "../src/components/button";

import "./assets/bootstrap.min.css";

describe("Button Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Button(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Button Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Init with incorrect selector - throws error", () => {
    try {
      new Button('wombat');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Button Error: "wombat" is not a valid selector.`,
      );
    }
    try {
      // @ts-expect-error
      new Button({});
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Button Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Can do toggle()", async () => {
    const container = getMarkup("button");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="button"]'), 200);

    const element = container.querySelector<HTMLElement>(
      '[data-test="button"]',
    )!;
    const win = element.ownerDocument.defaultView || window;
    const instance = Button.init(element);

    expect(instance.element, "element").to.be.instanceOf(win.HTMLButtonElement);
    expect(instance.element, "element").to.equal(element);
    expect(instance.element.className, "element.className").to.not.include(
      "active",
    );
    expect(instance.name, "name").to.eq("Button");
    expect(instance.isActive, "isActive").to.be.false;
    expect(instance.options, "options").to.be.empty;
    expect(instance.defaults, "defaults").to.be.empty;
    expect(instance.version, "version").to.be.string;
    expect(Button.getInstance(element)).to.be.instanceOf(Button);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.isActive).to.be.true;
      expect(instance.element.className).to.contain("active");
    }, 351);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.isActive).to.be.false;
      expect(instance.element.className).to.not.contain("active");
    }, 351);
  });

  it("Can handle click()", async () => {
    const container = getMarkup("button");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="button"]'), {
      timeout: 200,
    });

    const element = container.querySelector<HTMLElement>(
      '[data-test="button"]',
    )!;
    const instance = Button.init(element);

    element.click();
    await vi.waitFor(() => {
      expect(instance.isActive).to.be.true;
      expect(instance.element.className).to.contain("active");
    }, 351);
  });

  it("Can handle disabled elements", async () => {
    const container = getMarkup("button");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="button"]'), {
      timeout: 200,
    });

    const element = container.querySelector<HTMLElement>(
      '[data-test="button"]',
    )!;
    element.setAttribute("disabled", "true");
    element.classList.add("disabled");
    const instance = Button.init(element);

    element.click();
    await vi.waitFor(() => {
      expect(instance.isActive).to.be.false;
      expect(instance.element.className).to.not.contain("active");
    }, 351);

    instance.toggle();
    await vi.waitFor(() => {
      expect(instance.isActive).to.be.false;
      expect(instance.element.className).to.not.contain("active");
    }, 351);
  });

  it("Can dispose()", async () => {
    const container = getMarkup("button");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="button"]'), {
      timeout: 200,
    });

    const element = container.querySelector<HTMLElement>(
      '[data-test="button"]',
    )!;
    const instance = new Button(element);

    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.isActive).to.undefined;
      expect(instance.toggle).to.undefined;
    }, 351);
  });
});
