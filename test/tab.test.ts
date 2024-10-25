import { beforeEach, describe, expect, it, vi } from "vitest";
import { page } from '@vitest/browser/context';
import getMarkup from "./fixtures/getMarkup";

import "./assets/bootstrap.min.css";

import Tab from "../src/components/tab";
import Dropdown from "../src/components/dropdown";

describe("Tab Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Tab(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Tab Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Init without a tab content won't work", async () => {
    const container = getMarkup('tab');
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="tab"]'), 200);

    const element = container.querySelectorAll<HTMLAnchorElement>('[data-bs-toggle="tab"]')[4]!;
    const newTab = element.cloneNode(true) as HTMLAnchorElement;
    newTab.id = "newTab";
    newTab.href = "#newTabContent";
    element.after(newTab);
    const instance = new Tab(newTab);
    expect(instance.content).to.be.undefined;
  });

  it("Can initialize all instances in the page", async () => {
    const container = getMarkup('tab');
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="tab"]'), 200);

    const elements = [...container.querySelectorAll('[data-bs-toggle="tab"]')] as HTMLElement[];

    elements.forEach((element, i) => {
      const instance = Tab.init(element);
      expect(instance.element, 'element').to.equal(element);
      expect(instance.nav, 'nav').to.exist;
      expect(instance.content, 'content').to.exist;
      expect(instance.tabContent, 'tabContent').to.exist;
      expect(instance.options, 'options').to.be.empty;
      expect(instance.defaults, 'defaults').to.be.empty;

      expect(instance.name, 'name').to.eq('Tab');
      expect(instance.version, 'version').to.be.string;
    });
  });

  it("Can do click()", async () => {
    const container = getMarkup('tab');
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="tab"]'), 200);

    const dropdowns = [...container.querySelectorAll('[data-bs-toggle="dropdown"]')] as HTMLElement[];
    const elements = [...container.querySelectorAll('[data-bs-toggle="tab"]')] as HTMLElement[];

    const dropdownInstances: Dropdown[] = [];
    const tabInstances: Tab[] = [];

    dropdowns.forEach(dropdown => dropdownInstances.push(Dropdown.init(dropdown)));
    elements.forEach(element => tabInstances.push(Tab.init(element)));

    dropdownInstances[0].element.click();
    await vi.waitFor(() => {
      expect(dropdownInstances[0].menu.className).to.contain('show');
    }, 50);
    tabInstances[1].element.click();
    await vi.waitFor(() => {
      expect(tabInstances[0].content?.className).to.not.contain('show');
      expect(tabInstances[1].content?.className).to.contain('show');
    }, 151);

    await new Promise(res => setTimeout(res, 101));
    dropdownInstances[0].element.click();
    await vi.waitFor(() => {
      expect(dropdownInstances[0].menu.className).to.contain('show');
    }, 50);
    await new Promise(res => setTimeout(res, 171));
    tabInstances[2].element.click();
    await vi.waitFor(() => {
      expect(tabInstances[1].content?.className).to.not.contain('show');
      expect(tabInstances[2].content?.className).to.contain('show');
    }, 151);

    await new Promise(res => setTimeout(res, 101));
    tabInstances[4].element.click();
    await vi.waitFor(() => {
      expect(tabInstances[4].content?.className).to.contain('show');
    }, 151);

    tabInstances[3].element.click();
    await vi.waitFor(() => {
      expect(tabInstances[4].content?.className).to.not.contain('show');
      expect(tabInstances[3].content?.className).to.contain('show');
    }, 151);
  });

  it("Can do original events", async () => {
    const container = getMarkup('tab');
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="tab"]'), 200);

    const elements = [...container.querySelectorAll('[data-bs-toggle="tab"]')] as HTMLElement[];
    const tabInstances: Tab[] = [];
    elements.forEach(element => tabInstances.push(Tab.init(element)));

    // attach Tab event listeners
    elements[0].addEventListener("show.bs.tab", (e) => {
      e.preventDefault();
    });
    elements[3].addEventListener("hide.bs.tab", (e) => {
      e.preventDefault();
    });

    tabInstances[1].show();
    await vi.waitFor(() => {
      expect(tabInstances[0].content?.className).to.not.contain('show');
      expect(tabInstances[1].content?.className).to.contain('show');
    }, 151);

    tabInstances[0].show();
    await vi.waitFor(() => {
      expect(tabInstances[0].content?.className).to.not.contain('show');
      expect(tabInstances[1].content?.className).to.contain('show');
    }, 151);

    await new Promise(res => setTimeout(res, 101));
    tabInstances[4].show();
    await vi.waitFor(() => {
      expect(tabInstances[4].content?.className).to.not.contain('show');
      expect(tabInstances[3].content?.className).to.contain('show');
    }, 151);
  });

  it("Can dispose()", async () => {
    const container = getMarkup('tab');
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="tab"]'), 200);

    const element = container.querySelector('[data-bs-toggle="tab"]') as HTMLElement;

    const instance = new Tab(element);
    instance.dispose();
    expect(instance.element, "element").to.be.undefined;
    expect(instance.content, "content").to.be.undefined;
    expect(instance.nav, "nav").to.be.undefined;
  });
});
