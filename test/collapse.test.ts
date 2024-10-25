import { beforeEach, describe, expect, it, vi } from "vitest";
import getMarkup from "./fixtures/getMarkup";
import Collapse from "../src/components/collapse";

import "./assets/bootstrap.min.css";

describe("Collapse Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Collapse(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Collapse Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Can initialize all instances in the page and toggle()", async () => {
    const container = getMarkup("collapse");
    wrapper.append(container);
    await vi.waitFor(
      () => container.getElementsByClassName("collapse").length === 4,
      200,
    );

    const elements = container.getElementsByClassName(
      "collapse",
    ) as HTMLCollectionOf<HTMLElement>;
    const accordion = container.querySelector(".accordion") as HTMLElement;
    const instances: Collapse[] = [];
    
    [...elements].forEach((element, i) => {
      if (i === 2) element.removeAttribute('data-bs-parent'); // code coverage
      const instance = i === 1
        ? new Collapse(element, { parent: accordion }) // code coverage
        : i === 2 ? new Collapse(element, { parent: '.accordion' }) // code coverage
        : new Collapse(element);
      instances.push(instance);
      expect(instance.element, "element").to.exist;
      expect(instance.element, "element").to.equal(element);
      expect(instance.name, "name").to.eq("Collapse");
      if (!i) {
        expect(instance.triggers, "triggers").to.have.length(2);
        expect(instance.options, "options").to.deep.equal({ parent: null });
        expect(instance.parent, "parent").to.be.null;
      } else {
        expect(instance.triggers, "triggers").to.have.length(1);
        expect(instance.options, "options").to.deep.equal({
          parent: i === 1 ? accordion : ".accordion",
        });
        expect(instance.parent?.nodeType, "parent").to.equal(1);
      }
      expect(instance.defaults, "defaults").to.deep.equal({ parent: null });
      expect(instance.version, "version").to.be.string;
    });

    instances[0].toggle();
    instances[0].toggle(); // must be SPAM protected
    await vi.waitFor(() => {
      expect(instances[0].element.className).to.contain("show");
    }, 351);

    instances[0].toggle();
    await vi.waitFor(() => {
      expect(instances[0].element.className).to.not.contain("show");
    }, 351);

    instances[1].toggle();
    instances[2].toggle();
    await vi.waitFor(() => {
      expect(instances[1].element.className).to.contain("show");
    }, 351);

    instances[3].toggle();
    await vi.waitFor(() => {
      expect(instances[1].element.className).to.not.contain("show");
      expect(instances[3].element.className).to.contain("show");
    }, 351);

    instances[3].hide();
    await vi.waitFor(() => {
      expect(instances[3].element.className).to.not.contain("show");
    }, 351);
  });

  it("Can handle click", async () => {
    const container = getMarkup("collapse");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(".collapse"), 200);

    const element = container.querySelector(".collapse") as HTMLElement;
    const hrefTrigger = document.querySelector(
      '[href="#collapseExample"]',
    ) as HTMLAnchorElement;
    const btnTrigger = document.querySelector(
      '[data-bs-target="#collapseExample"]',
    ) as HTMLButtonElement;
    const instance = Collapse.init(element);

    hrefTrigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.contain("show");
    }, 351);

    btnTrigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 351);
  });

  it("Can do original events", async () => {
    const container = getMarkup("collapse");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(".collapse"), 200);

    const element = container.querySelector(".collapse") as HTMLElement;
    const doc = element.ownerDocument;
    const hrefTrigger = document.querySelector(
      '[href="#collapseExample"]',
    ) as HTMLAnchorElement;
    const btnTrigger = document.querySelector(
      '[data-bs-target="#collapseExample"]',
    ) as HTMLButtonElement;
    const instance = Collapse.init(element);

    element.addEventListener("show.bs.collapse", function handle(e) {
      if (instance.triggers[0] === doc.activeElement) {
        console.log("show fired for <div#" + element.id + "> and is allowed");
      } else {
        console.log("show fired for <div#" + element.id + "> and is prevented");
        e.preventDefault();
      }
    });
    element.addEventListener("shown.bs.collapse", function handle(e) {
      console.log("shown was triggered");
    });
    element.addEventListener("hide.bs.collapse", function handle(e) {
      if (instance.triggers[1] === doc.activeElement) {
        console.log("hide fired for <div#" + element.id + "> and is allowed");
      } else {
        console.log(
          "hidden fired for <div#" + element.id + "> and is prevented",
        );
        e.preventDefault();
      }
    });
    element.addEventListener("hidden.bs.collapse", function handle(e) {
      console.log("hidden was triggered");
    });

    btnTrigger.click();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 351);

    instance.show();
    hrefTrigger.click();
    instance.hide();
    await vi.waitFor(() => {
      expect(instance.element.className).to.not.contain("show");
    }, 351);
  });

  it("Can dispose()", async () => {
    const container = getMarkup("collapse");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(".collapse"), 200);

    const element = container.querySelector(".collapse") as HTMLElement;
    const instance = Collapse.init(element);
    instance.dispose();
    expect(instance.element, "element").to.be.undefined;
    expect(instance.triggers, "triggers").to.be.undefined;
    expect(instance.options, "options").to.be.undefined;
    expect(instance.parent, "parent").to.be.undefined;
  });
});
