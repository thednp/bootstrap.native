import { beforeEach, describe, expect, it, vi } from "vitest";
import { page } from '@vitest/browser/context';
import getMarkup from "./fixtures/getMarkup";
import "./assets/bootstrap.min.css";

import ScrollSpy from "../src/components/scrollspy";

describe("ScrollSpy Class Tests", async () => {
  await page.viewport(800, 600);
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new ScrollSpy(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `ScrollSpy Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Init each target element", async () => {
    const container = getMarkup("scrollspy");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-spy="scroll"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-bs-spy="scroll"]')!;
    const instance = ScrollSpy.init(element);

    expect(ScrollSpy.getInstance(element)).to.be.instanceOf(ScrollSpy);
    expect(instance.element).to.equal(element);
    expect(instance.offsets).to.be.instanceOf(Array).and.have.length.above(0);
    expect(instance.items).to.be.instanceOf(Array).and.have.length.above(0);
    expect(instance.items[0].className).to.contain("active");
    expect(instance.name).to.eq("ScrollSpy");
    expect(instance.options).to.not.be.empty;
    expect(instance.defaults).to.not.be.undefined;
    expect(instance.version).to.be.string;
  });

  it("Init without a target", () => {
    const doc = wrapper.ownerDocument!;
    const element = doc.createElement("div");
    element.setAttribute("data-bs-target", "#nonExistingTarget");
    wrapper.append(element);

    const instance = ScrollSpy.init(element);
    expect(ScrollSpy.getInstance(element)).to.eq(instance);
    expect(instance.target).to.be.null;
  });

  it("Can activate targets", async () => {
    const container = getMarkup("scrollspy");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-spy="scroll"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-bs-spy="scroll"]')!;
    const instance = ScrollSpy.init(element);

    instance.scrollTarget.scrollTo({ top: 1500, left: 0, behavior: 'instant' });

    await vi.waitFor(() => {
      expect(instance.items[4].className).to.contain("active");
    }, 51);
  });

  it("Can work with full page contents", async () => {
    await page.viewport(780, 1000);
    const containerSource = getMarkup("scrollspy");
    const content = containerSource.querySelector(".col-md-9 .row")!.cloneNode(
      true,
    ) as Node;
    const container = document.createElement('div');
    container.append(content);
    const win = wrapper.ownerDocument.defaultView!;
    Object.assign(container.style, { padding: "5rem 0" });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector("#disposableSpy"), 200);
    const disposableSpy = container.querySelector("#disposableSpy") as HTMLElement;
    const [nav] = container.getElementsByTagName("nav");
    Object.assign(disposableSpy.style, { height: "" });
    Object.assign(nav.style, { top: "0px" });
    nav.classList.add("position-sticky");

    const element = container.querySelector<HTMLDivElement>(ScrollSpy.selector)!;
    const instance = ScrollSpy.init(element);

    instance.scrollTarget.scrollTo({ top: 1500, behavior: 'instant' });
    await vi.waitFor(() => {
      expect(instance.items[4].className).to.contain('active');
    }, 101);

    instance.scrollTarget.scrollTo({ top: 0, behavior: 'instant' });
    await vi.waitFor(() => {
      expect(instance.items[4].className).to.not.contain('active');
      expect(instance.items[0].className).to.not.contain('active');
    }, 101);

    await page.viewport(400, 600);
    win.dispatchEvent(new Event('resize'));
    instance.scrollTarget.scrollTo({ top: 2500, behavior: 'instant' });
    await vi.waitFor(() => {
      expect(instance.items[0].className).to.not.contain('active');
      expect(instance.items[4].className).to.contain('active');
    }, 101);

    await page.viewport(414, 896);
  });

  it("Can dispose", async () => {
    const container = getMarkup("scrollspy");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-spy="scroll"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-bs-spy="scroll"]')!;
    const instance = ScrollSpy.init(element);

    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.scrollTarget).to.be.undefined;
      expect(instance.scrollHeight).to.be.undefined;
      expect(instance.items).to.be.undefined;
      expect(instance.offsets).to.be.undefined;
    }, 50);
  });
});
