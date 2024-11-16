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
    expect(instance._observables).to.be.instanceOf(Map).and.have.property('size').above(0);
    // expect(instance.items).to.be.instanceOf(Array).and.have.length.above(0);
    // expect(instance.items[0].className).to.contain("active");
    expect(Array.from(instance._observables)[0][1].className).to.contain("active");
    expect(instance.name).to.eq("ScrollSpy");
    expect(instance.options).to.not.be.empty;
    expect(instance.defaults).to.not.be.undefined;
    expect(instance.version).to.be.string;
    instance.dispose();
  });

  it("Init without a target", async () => {
    const doc = wrapper.ownerDocument!;
    const target = doc.createElement("div");
    target.setAttribute("data-bs-target", "#nonExistingTarget");
    wrapper.append(target);
    const element = await vi.waitFor(() => wrapper.querySelector<HTMLElement>('[data-bs-target="#nonExistingTarget"]')!, 50);
    if (!element) return;

    const instance = ScrollSpy.init(element);
    console.log(instance.target);
    await vi.waitFor(() => {
      expect(instance.target).to.be.undefined;
      expect(ScrollSpy.getInstance(element)).to.eq(instance);
    }, 150)
  });

  it("Can activate targets", async () => {
    await page.viewport(780, 800);
    const container = getMarkup("scrollspy");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-spy="scroll"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-bs-spy="scroll"]');
    if (!element) return;
    await new Promise(res => setTimeout(res, 50));

    const instance = ScrollSpy.init(element);
    await new Promise(res => setTimeout(res, 51));
    
    instance.scrollTarget.scrollTo({ top: 500, left: 0, behavior: 'instant' });
    instance.scrollTarget.scrollTo({ top: 2000, left: 0, behavior: 'instant' });
    instance.scrollTarget.scrollTo({ top: 2500, left: 0, behavior: 'instant' });
    await new Promise(res => setTimeout(res, 150));

    await vi.waitFor(() => {
      expect(Array.from(instance._observables)[4][1].className).to.contain("active");
      instance.dispose()
    }, 151);
  });

  it("Can dispose", async () => {
    const container = getMarkup("scrollspy");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-spy="scroll"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-bs-spy="scroll"]')!;
    const instance = ScrollSpy.init(element);

    await new Promise(res => setTimeout(res, 250));
    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.scrollTarget).to.be.undefined;
      expect(instance._observables).to.be.undefined;
    }, 150);
  });

  it("Can handle click", async () => {
    const container = getMarkup("scrollspy");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-spy="scroll"]'), 200);

    const element = container.querySelector<HTMLElement>('[data-bs-spy="scroll"]')!;
    const instance = ScrollSpy.init(element);

    await new Promise(res => setTimeout(res, 250));
    Array.from(instance._observables)[1][1].click();
    await vi.waitFor(() => {
      expect(Array.from(instance._observables)[1][1].className).to.contain('active');
    }, 550);
  });

  it("Can work with full page contents", async () => {
    await page.viewport(780, 600);
    const containerSource = getMarkup("scrollspy");
    const content = containerSource.querySelector(".col-md-8 .row")!.cloneNode(
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

    const element = await vi.waitFor(() =>
      container.querySelector<HTMLDivElement>(ScrollSpy.selector)
    , 250);
    if (!element) return;
    const instance = ScrollSpy.init(element);
    await new Promise(res => setTimeout(res, 150));

    instance.scrollTarget.scrollTo({ top: 500, left: 0, behavior: 'instant' });
    instance.scrollTarget.scrollTo({ top: 1500, left: 0, behavior: 'instant' });
    instance.scrollTarget.scrollTo({ top: 5000, left: 0, behavior: 'instant' });
    await new Promise(res => setTimeout(res, 150));

    await vi.waitFor(() => {
      expect(Array.from(instance._observables)[4][1].className).to.contain('active');
    }, 151);

    instance.scrollTarget.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise(res => setTimeout(res, 150));
    await vi.waitFor(() => {
      expect(Array.from(instance._observables)[4][1].className).to.not.contain('active');
      expect(Array.from(instance._observables)[0][1].className).to.not.contain('active');
    }, 151);

    await page.viewport(400, 600);
    // win.dispatchEvent(new Event('resize'));
    instance.scrollTarget.scrollTo({ top: 2500, behavior: 'instant' });
    await new Promise(res => setTimeout(res, 250));
    await vi.waitFor(() => {
      expect(Array.from(instance._observables)[0][1].className).to.not.contain('active');
      expect(Array.from(instance._observables)[4][1].className).to.contain('active');
      instance.dispose();
    }, 151);

    await page.viewport(414, 896);
  });
});
