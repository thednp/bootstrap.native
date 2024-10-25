import { beforeEach, describe, expect, it, vi } from "vitest";
import getMarkup from "./fixtures/getMarkup";
import Toast from "../src/components/toast";

import "./assets/bootstrap.min.css";

describe("Toast Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Toast(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Toast Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it("Init with target element", async () => {
    const container = getMarkup("toast");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.toast'), 200);

    const element = container.querySelector<HTMLElement>('.toast')!;
    const instance = Toast.init(element);
    expect(instance.element).to.equal(element);
    expect(instance.name).to.eq("Toast");
    expect(instance.options).to.deep.equal({
      animation: true,
      autohide: true,
      delay: 5000,
    });
    expect(instance.defaults).to.deep.equal({
      animation: true,
      autohide: true,
      delay: 5000,
    });
    expect(instance.version).to.be.string;
    instance.dispose(); // coverage
  });

  it("Can do show() and autoclose", async () => {
    const container = getMarkup("toast");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.toast'), 200);

    const element = container.querySelector<HTMLElement>('.toast')!;
    element.classList.remove("fade"); // code coverage
    const instance = new Toast(element, { delay: 200 });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.true;
      expect(instance.element.className).to.contain('show');
    }, 101);

    // wait for the delay interval
    await new Promise(res => setTimeout(res, 251));
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.false;
      expect(instance.element.className).to.not.contain('show');
    }, 151);
  });

  it("Can do click()", async () => {
    const container = getMarkup("toast");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.toast'), 200);

    const elements = container.querySelectorAll<HTMLElement>('.toast');
    const instances = [...elements].map(element => new Toast(element));

    instances[0].triggers[0].click();
    await vi.waitFor(() => {
      expect(instances[0].isShown).to.be.true;
      expect(instances[0].element.className).to.contain('show');
    }, 151);

    instances[0].dismiss?.click();
    await vi.waitFor(() => {
      expect(instances[0].isShown).to.be.false;
      expect(instances[0].element.className).to.not.contain('show');
    }, 151);

    instances[1].triggers[0].click();
    await vi.waitFor(() => {
      expect(instances[1].isShown).to.be.true;
      expect(instances[1].element.className).to.contain('show');
    }, 151);

    instances[1].dismiss?.click();
    await vi.waitFor(() => {
      expect(instances[1].isShown).to.be.false;
      expect(instances[1].element.className).to.not.contain('show');
    }, 151);
  });

  it("Can extend visibility duration by user interaction", async () => {
    const container = getMarkup("toast");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.toast'), 200);

    const element = container.querySelector<HTMLElement>('.toast')!;
    const instance = new Toast(element, { delay: 200, animation: false });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.true;
      expect(instance.element.className).to.contain('show');
    }, 151);

    instance.element.dispatchEvent(new MouseEvent('mouseenter'));
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.true;
      expect(instance.element.className).to.contain('show');
    }, 251);

    instance.element.dispatchEvent(new MouseEvent('mouseleave'));
    // wait for the delay interval
    await new Promise(res => setTimeout(res, 251));
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.false;
      expect(instance.element.className).to.not.contain('show');
    }, 51);
  });

  it("Can do dispose()", async () => {
    const container = getMarkup("toast");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.toast'), 200);

    const element = container.querySelector<HTMLElement>('.toast')!;
    const instance = new Toast(element, { autohide: false, animation: false });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.true;
      expect(instance.element.className).to.contain('show');
    }, 51);
    
    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
      expect(instance.options).to.be.undefined;
      expect(element.className).to.not.contain('show');
    }, 151);
  });

  it("CustomEvent can be prevented - hide", async () => {
    const container = getMarkup("toast");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.toast'), 200);

    const element = container.querySelector<HTMLElement>('.toast')!;
    const instance = new Toast(element, { autohide: false, animation: false });
    element.addEventListener("hide.bs.toast", function (e) {
      if (!element.innerText.includes("wombat")) {
        e.preventDefault();
      }
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.true;
      expect(instance.element.className).to.contain('show');
    }, 51);

    instance.hide();
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.true;
      expect(instance.element.className).to.contain('show');
    }, 51);
  });

  it("CustomEvent can be prevented - show", async () => {
    const container = getMarkup("toast");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('.toast'), 200);

    const element = container.querySelector<HTMLElement>('.toast')!;
    const instance = new Toast(element, { autohide: false, animation: false });
    element.addEventListener("show.bs.toast", function (e) {
      if (!element.innerText.includes("wombat")) {
        e.preventDefault();
      }
    });

    instance.show();
    await vi.waitFor(() => {
      expect(instance.isShown).to.be.false;
      expect(instance.element.className).to.not.contain('show');
    }, 51);
  });
});
