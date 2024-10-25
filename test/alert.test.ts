import { beforeEach, describe, expect, it, vi } from "vitest";
import getMarkup from "./fixtures/getMarkup";
import Alert from "../src/components/alert";

import "./assets/bootstrap.min.css";

describe("Alert Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Alert(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        "Alert Error: your target is not an instance of HTMLElement.",
      );
    }
  });

  it("Init with wrong selector - throws error", () => {
    const selector = "wombat";
    try {
      new Alert(selector);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Alert Error: "${selector}" is not a valid selector.`,
      );
    }
  });

  it("Init with target element", async () => {
    const container = getMarkup("alert");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="alert"]'), {
      timeout: 200,
    });

    const element = container.querySelector<HTMLElement>(
      '[data-test="alert"]',
    )!;
    const instance = new Alert(element);
    expect(instance.element).to.equal(element);
    expect(instance.name).to.eq("Alert");
    expect(instance.options).to.be.empty;
    expect(instance.defaults).to.be.empty;
    expect(instance.version).to.be.string;
    expect(Alert.getInstance(element)).to.be.instanceOf(Alert);
  });

  it("Can do close() - removes target from DOM", async () => {
    const container = getMarkup("alert");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="alert"]'), 100);

    const element = container.querySelector<HTMLElement>(
      '[data-test="alert"]',
    )!;
    const instance = Alert.init(element);
    instance.close();
    await vi.waitFor(
      () => expect(container.querySelector('[data-test="alert"]')).to.be.null,
      351,
    );
  });

  it("Can do dispose() - keeps target in DOM", async () => {
    const container = getMarkup("alert");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="alert"]'), 351);
    const element = container.querySelector<HTMLElement>(
      '[data-test="alert"]',
    )!;
    const instance = Alert.init(element);
    instance.dispose();
    await vi.waitFor(() => {
      expect(container.querySelector('[data-test="alert"]')).to.exist;
      expect(instance.element).to.be.undefined;
    }, 351);
  });

  it("Can be dismissed via click", async () => {
    const container = getMarkup("alert");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="alert"]'), 351);
    const element = container.querySelector<HTMLElement>(
      '[data-test="alert"]',
    )!;

    element.classList.remove("fade");
    const instance = Alert.init(element);
    instance.dismiss?.click();

    await vi.waitFor(() => {
      expect(container.querySelector('[data-test="alert"]')).to.not.exist;
    }, { timeout: 150 });
  });

  it("CustomEvent can be prevented", async () => {
    const container = getMarkup("alert");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-test="alert"]'), 351);
    const element = container.querySelector<HTMLElement>(
      '[data-test="alert"]',
    )!;
    const instance = new Alert(element);
    element.addEventListener("close.bs.alert", function (e) {
      if (element.innerText.includes("Holy")) {
        e.preventDefault();
      }
    });
    instance.close();
    await vi.waitFor(() => {
      expect(container.querySelector('[data-test="alert"]')).to.exist;
    }, 351);
  });
});
