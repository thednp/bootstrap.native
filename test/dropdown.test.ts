import { beforeEach, describe, expect, it, vi } from "vitest";
import { page } from '@vitest/browser/context';
import getMarkup from "./fixtures/getMarkup";
import Dropdown from "../src/components/dropdown";

import "./assets/bootstrap.min.css";

import { changeDirection, removeDirection } from "./fixtures/changeDirection";

const bodyPads = {
  top: { paddingTop: "35vh", paddingBottom: "70vh" },
  bottom: { paddingTop: "70vh", paddingBottom: "35vh" },
  left: { paddingLeft: "22vw", paddingRight: "90vw" },
  right: { paddingLeft: "90vw", paddingRight: "22vw" },
  reset: { paddingLeft: '', paddingTop: '', paddingRight: '', paddingBottom: '' },
};
const toolbarPositions = {
  start: "btn-toolbar",
  middle: "btn-toolbar justify-content-center",
  end: "btn-toolbar justify-content-end",
  default: "btn-toolbar",
};

describe("Dropdown Class Tests", () => {
  const wrapper = document.createElement("div");
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = "";
  });

  it("Init without any parameters - throws error", () => {
    const args = [];
    try {
      // @ts-expect-error
      new Dropdown(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error).to.have.property(
        "message",
        `Dropdown Error: your target is not an instance of HTMLElement.`,
      );
    }
  });

  it('Can discontinue when no menu is provided', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const [element] = [...container.querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"]')]
      .slice(-1);
    element.parentElement?.querySelector('.dropdown-menu')?.remove();
    const instance = Dropdown.init(element);
    expect(instance.element, 'element').to.equal(element);
    expect(instance.menu, 'menu').to.not.exist;
  });

  it('Can do toggle()', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const elements = [...container.querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"]')];
    const instances: Dropdown[] = [];

    elements.forEach((element, i) => {
      const instance = Dropdown.init(element);
      instances.push(instance);
      expect(instance.element, 'element').to.equal(element);
      expect(instance.menu, 'menu').to.exist;
      expect(instance.parentElement, 'parentElement').to.exist;

      expect(instance.name, 'name').to.eq('Dropdown');
      expect(instance.options, 'options').to.deep.equal({ display: 'dynamic', offset: 5 })
      expect(instance.defaults, 'defaults').to.deep.equal({ display: 'dynamic', offset: 5 });
      expect(instance.version, 'version').to.be.string;
    });

    instances[0].toggle();
    await vi.waitFor(() => {
      expect(instances[0].menu.className).to.contain("show");
    }, 351);

    instances[1].toggle();
    await vi.waitFor(() => {
      expect(instances[1].menu.className).to.contain("show");
      expect(instances[0].menu.className).to.not.contain("show");
    }, 351);
  });

  it('Can handle keyboard navigation', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const elements = container.querySelectorAll<HTMLButtonElement>('[data-bs-toggle="dropdown"]');
    const instance = Dropdown.init(elements[1]);
    const dropdownItems = instance.menu.getElementsByClassName('dropdown-item') as HTMLCollectionOf<HTMLButtonElement>;
    const doc = elements[1].ownerDocument;

    elements[1].click();
    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp'})); // additional code covered
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp'})); // additional code covered

    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain("show");
    }, 351);

    dropdownItems[0].focus();
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems[0]);
    }, 50);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems[0]);
    }, 50);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems[1]);
    }, 50);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems[2]);
    }, 50);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems[3]);
    }, 50);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems[4]);
    }, 50);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems[4]); // still here
    }, 50);

    const instance3 = Dropdown.init(elements[3]);
    const dropdownItems3 = instance3.menu.getElementsByClassName('dropdown-item') as HTMLCollectionOf<HTMLButtonElement>;

    elements[3].click();
    await vi.waitFor(() => {
      expect(instance3.menu.className).to.contain("show");
    }, 351);

    dropdownItems3[0].focus();
    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems3[0]); // still here
    }, 50);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems3[1]);
    }, 50);
    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems3[2]);
    }, 50);
    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }));
    await vi.waitFor(() => {
      expect(doc.activeElement).to.equal(dropdownItems3[2]);
    }, 50);
  });

  it('Can be dismissed by keyboard', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const elements = container.querySelectorAll('[data-bs-toggle="dropdown"]') as NodeListOf<HTMLButtonElement>;
    const instances: Dropdown[] = [];
    const doc = elements[0].ownerDocument;

    [...elements].forEach(element => instances.push(Dropdown.init(element)));
    elements[0].click();
    elements[0].focus(); // additional code to be covered
    instances[0].menu.querySelector<HTMLButtonElement | HTMLInputElement>('.dropdown-item,input')?.focus();

    await vi.waitFor(() => {
      expect(instances[0].menu.className).to.contain("show");
    }, 351);

    doc.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'Escape' }));
    await vi.waitFor(() => {
      expect(instances[0].menu.className).to.not.contain("show");
    }, 351);
  });

  it('Can do automatic position on resize', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[1] as HTMLButtonElement;
    const win = element.ownerDocument.defaultView!;
    const body = element.ownerDocument.body!;
    [...container.querySelectorAll('[data-bs-toggle="dropdown"]')].forEach((d, i) => {
      if (i !== 1) d.parentElement?.classList.add('d-none');
    });
    const h3 = container.querySelector('h3')!;
    const toolbar = container.querySelector('.btn-toolbar')!;
    h3.classList.add('d-none');
    toolbar.className = toolbarPositions.middle;
    Object.assign(body.style, bodyPads.top);
    element.parentElement?.classList.remove('dropup');
    element.parentElement?.classList.add('dropstart');
    await page.viewport(800, 600);

    const dropdstart = Dropdown.init(element);

    element.click();
    await vi.waitFor(() => {
      expect(dropdstart.menu.className).to.contain("show");
      expect(dropdstart.menu.style.cssText).to.contain("left: auto");
    }, 351);

    await page.viewport(200, 660);
    win.dispatchEvent(new Event('resize'));
    await vi.waitFor(() => {
      expect(dropdstart.menu.style.cssText).to.contain("top: 100%");
    }, 351);

    await page.viewport(800, 660);
    win.dispatchEvent(new Event('resize'));
    await vi.waitFor(() => {
      expect(dropdstart.menu.style.cssText).to.contain("left: auto");
    }, 351);
    dropdstart.dispose();

    element.parentElement?.classList.remove('dropstart');
    element.parentElement?.classList.add('dropend');

    const dropend = Dropdown.init(element);
    dropend.show();
    await vi.waitFor(() => {
      expect(dropend.menu.className).to.contain("show");
      expect(dropend.menu.style.cssText).to.contain("right: auto");
    }, 351);

    await page.viewport(200, 660);
    win.dispatchEvent(new Event('resize'));
    await vi.waitFor(() => {
      expect(dropend.menu.className).to.contain("show");
      expect(dropend.menu.style.cssText).to.contain("top: 100%");
    }, 351);
    dropend.dispose();
    Object.assign(body.style, bodyPads.reset);
    await page.viewport(800, 660);
  });

  it('Can do automatic position on scroll', async () => {
    await page.viewport(800, 660);

    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[1] as HTMLButtonElement;
    const win = element.ownerDocument.defaultView!;
    const body = element.ownerDocument.body!;
    [...container.querySelectorAll('[data-bs-toggle="dropdown"]')].forEach((d, i) => {
      if (i !== 1) d.parentElement?.classList.add('d-none');
    });
    const h3 = container.querySelector('h3')!;
    const toolbar = container.querySelector('.btn-toolbar')!;
    h3.classList.add('d-none');
    toolbar.className = toolbarPositions.middle;
    // container.classList.remove('py-5');

    // dropdup top left
    Object.assign(body.style, bodyPads.top);
    const dropupTopLeft = Dropdown.init(element);
    dropupTopLeft.show();
    await vi.waitFor(() => {
      expect(dropupTopLeft.menu.className).to.contain("show");
      expect(dropupTopLeft.menu.style.cssText).to.contain("top: auto");
    }, 351);

    win.scrollTo({ left: 0, top: 800, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropupTopLeft.menu.style.cssText).to.contain("top: 100%");
    }, 351);

    dropupTopLeft.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropdown bottom left
    Object.assign(body.style, bodyPads.bottom);
    element.parentElement?.classList.remove('dropup');
    element.parentElement?.classList.add('dropdown');
    const dropdownBottomLeft = Dropdown.init(element);
    dropdownBottomLeft.show();
    await vi.waitFor(() => {
      expect(dropdownBottomLeft.menu.className).to.contain("show");
      expect(dropdownBottomLeft.menu.style.cssText).to.contain("top: auto");
    }, 351);

    win.scrollTo({ left: 0, top: 800, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropdownBottomLeft.menu.className).to.contain("show");
      expect(dropdownBottomLeft.menu.style.cssText).to.contain("top: 100%");
    }, 351);

    dropdownBottomLeft.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropdown top right
    Object.assign(body.style, {
      paddingTop: '3rem', paddingBottom: '',
      paddingLeft: '95%', paddingRight: '10%',
    });
    toolbar.className = toolbarPositions.end;
    const dropdownTopRight = Dropdown.init(element);
    win.scrollTo({ left: 500, top: 800, behavior: "instant" });
    dropdownTopRight.show();
    await vi.waitFor(() => {
      expect(dropdownTopRight.menu.className).to.contain("show");
      expect(dropdownTopRight.menu.style.cssText).to.contain("top: 100%");
    }, 351);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropdownTopRight.menu.className).to.contain("show");
      expect(dropdownTopRight.menu.style.cssText).to.contain("right: 0px");
    }, 351);

    dropdownTopRight.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropstart top left
    Object.assign(body.style, {
      paddingLeft: '80vw', paddingRight: '80vw',
      paddingTop: '20vh', paddingBottom: '80vh'
    });
    element.parentElement?.classList.remove('dropdown');
    element.parentElement?.classList.add('dropstart');
    toolbar.className = toolbarPositions.end;
    const dropstartTopLeft = Dropdown.init(element);

    dropstartTopLeft.show();
    await vi.waitFor(() => {
      expect(dropstartTopLeft.menu.className).to.contain("show");
      expect(dropstartTopLeft.menu.style.cssText).to.contain("left: auto");
    }, 351);

    win.scrollTo({ left: 500, top: 800, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropstartTopLeft.menu.className).to.contain("show");
      expect(dropstartTopLeft.menu.style.cssText).to.contain("left: 100%");
    }, 351);

    dropstartTopLeft.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropend top right
    Object.assign(body.style, {...bodyPads.right, paddingRight: '80vw', paddingTop: '40vh', paddingBottom: '80vh'});
    element.parentElement?.classList.remove('dropstart');
    element.parentElement?.classList.add('dropend');
    toolbar.className = toolbarPositions.end;
    const dropendTopRight = Dropdown.init(element);
    dropendTopRight.show();
    await vi.waitFor(() => {
      expect(dropendTopRight.menu.className).to.contain("show");
      expect(dropendTopRight.menu.style.cssText).to.contain("left: auto");
    }, 351);

    win.scrollTo({ left: 500, top: 800, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropendTopRight.menu.className).to.contain("show");
      expect(dropendTopRight.menu.style.cssText).to.contain("left: 100%");
    }, 351);

    dropendTopRight.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropend bottom left
    Object.assign(body.style, {
      paddingLeft: '40vw', paddingRight: '40vw',
      paddingTop: '80vh', paddingBottom: '40vh',
    });

    toolbar.className = toolbarPositions.start;
    const dropendBottomLeft = Dropdown.init(element);
    win.scrollTo({ left: 0, top: 800, behavior: "instant" });

    dropendBottomLeft.show();
    await vi.waitFor(() => {
      expect(dropendBottomLeft.menu.className).to.contain("show");
      expect(dropendBottomLeft.menu.style.cssText).to.not.contain("bottom: 0px");
    }, 351);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropendBottomLeft.menu.className).to.contain("show");
      expect(dropendBottomLeft.menu.style.cssText).to.contain("inset: auto auto 0px 100%");
    }, 351);

    dropendBottomLeft.dispose();
  });

  it('Can do automatic position on scroll RTL', async() => {
    await page.viewport(800, 660);
    
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);
    
    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[1] as HTMLButtonElement;
    changeDirection(element, 'rtl');
    const win = element.ownerDocument.defaultView!;
    const body = element.ownerDocument.body!;
    [...container.querySelectorAll('[data-bs-toggle="dropdown"]')].forEach((d, i) => {
      if (i !== 1) d.parentElement?.classList.add('d-none');
    });
    const h3 = container.querySelector('h3')!;
    const toolbar = container.querySelector('.btn-toolbar')!;
    h3.classList.add('d-none');

    // dropdup top left
    Object.assign(body.style, bodyPads.top);
    const dropupTopLeft = Dropdown.init(element);
    dropupTopLeft.show();
    await vi.waitFor(() => {
      expect(dropupTopLeft.menu.className).to.contain("show");
      expect(dropupTopLeft.menu.style.cssText).to.contain("top: auto");
    }, 351);

    win.scrollTo({ left: 0, top: 800, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropupTopLeft.menu.style.cssText).to.contain("top: 100%");
    }, 351);

    dropupTopLeft.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropdown bottom left
    Object.assign(body.style, bodyPads.bottom);
    element.parentElement?.classList.remove('dropup');
    element.parentElement?.classList.add('dropdown');
    const dropdownBottomLeft = Dropdown.init(element);
    dropdownBottomLeft.show();
    await vi.waitFor(() => {
      expect(dropdownBottomLeft.menu.className).to.contain("show");
      expect(dropdownBottomLeft.menu.style.cssText).to.contain("top: auto");
    }, 351);

    win.scrollTo({ left: 0, top: 800, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropdownBottomLeft.menu.className).to.contain("show");
      expect(dropdownBottomLeft.menu.style.cssText).to.contain("top: 100%");
    }, 351);

    dropdownBottomLeft.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropdown top left
    Object.assign(body.style, {
      paddingTop: '3rem', paddingBottom: '',
      paddingRight: '95%', paddingLeft: '10%'
    });
    toolbar.className = toolbarPositions.end;
    const dropdownTopRight = Dropdown.init(element);
    win.scrollTo({ left: 500, top: 800, behavior: "instant" });
    dropdownTopRight.show();
    await vi.waitFor(() => {
      expect(dropdownTopRight.menu.className).to.contain("show");
      expect(dropdownTopRight.menu.style.cssText).to.contain("top: 100%");
    }, 351);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropdownTopRight.menu.className).to.contain("show");
      expect(dropdownTopRight.menu.style.cssText).to.contain("left: 0px");
    }, 351);

    dropdownTopRight.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropstart top left
    Object.assign(body.style, {
      paddingLeft: '80vw', paddingRight: '80vw',
      paddingTop: '20vh', paddingBottom: '80vh'
    });
    element.parentElement?.classList.remove('dropdown');
    element.parentElement?.classList.add('dropstart');
    toolbar.className = toolbarPositions.start;
    const dropstartTopLeft = Dropdown.init(element);

    dropstartTopLeft.show();
    await vi.waitFor(() => {
      expect(dropstartTopLeft.menu.className).to.contain("show");
      expect(dropstartTopLeft.menu.style.cssText).to.contain("left: 100%");
    }, 351);

    dropstartTopLeft.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropend top left
    Object.assign(body.style, {...bodyPads.left, paddingTop: '3rem', paddingBottom: ''});
    element.parentElement?.classList.remove('dropstart');
    element.parentElement?.classList.add('dropend');
    toolbar.className = toolbarPositions.end;
    const dropendTopRight = Dropdown.init(element);
    dropendTopRight.show();
    await vi.waitFor(() => {
      expect(dropendTopRight.menu.className).to.contain("show");
      expect(dropendTopRight.menu.style.cssText).to.contain("left: 100%");
    }, 351);

    dropendTopRight.dispose();
    win.scrollTo({ left: 0, top: 0, behavior: "instant" });

    // dropend bottom right
    Object.assign(body.style, {
      paddingLeft: '5rem', paddingRight: '40vw',
      paddingTop: '85vh', paddingBottom: '45vh'
    });

    toolbar.className = toolbarPositions.start;
    const dropendBottomLeft = Dropdown.init(element);
    win.scrollTo({ left: 0, top: 800, behavior: "instant" });

    dropendBottomLeft.show();
    await vi.waitFor(() => {
      expect(dropendBottomLeft.menu.className).to.contain("show");
      expect(dropendBottomLeft.menu.style.cssText).to.not.contain("bottom: 0px");
    }, 351);

    win.scrollTo({ left: 0, top: 0, behavior: "instant" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => {
      expect(dropendBottomLeft.menu.className).to.contain("show");
      expect(dropendBottomLeft.menu.style.cssText).to.contain("inset: auto 100% 0px auto");
    }, 351);

    dropendBottomLeft.dispose();
    Object.assign(body.style, bodyPads.reset);
    await page.viewport(414,896);
    removeDirection(element);
  });

  it('Can handle click()', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[1] as HTMLButtonElement;
    const instance = Dropdown.init(element);
    const submenus = instance.menu.getElementsByClassName('dropdown-item') as HTMLCollectionOf<HTMLButtonElement>;
    const doc = element.ownerDocument;
    element.click();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain("show");
    }, 351);
    
    submenus[0].click();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.not.contain("show");
    }, 351);
    
    element.click();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain("show");
    }, 351);

    doc.body.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 5, clientY: 5 }));
    await vi.waitFor(() => {
      expect(instance.menu.className).to.not.contain("show");
    }, 351);
  });

  it('Can handle dropdown-menu-end', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[0] as HTMLButtonElement;
    const instance = Dropdown.init(element);
    instance.menu.classList.add('dropdown-menu-end');

    element.click();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain("show");
      expect(instance.menu.style.cssText).to.contain("left: 0px");
    }, 351);
  });

  it('Can handle dropdown-menu-end RTL', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[0] as HTMLButtonElement;
    changeDirection(element, 'rtl');
    const instance = Dropdown.init(element);
    instance.menu.classList.add('dropdown-menu-end');

    instance.show();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain("show");
      expect(instance.menu.style.cssText).to.contain("right: 0px");
    }, 351);
    removeDirection(element);
  });
  
  it('Can do original events - hide/hidden', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[1] as HTMLButtonElement;
    const parentElement = element.parentElement!;
    const instance = Dropdown.init(element);

    parentElement?.addEventListener('hide.bs.dropdown', function handleHide(e) {
      if (!element.innerText.includes('wombat')) {
        console.log(e.type + ' was prevented');
        e.preventDefault();
      } else {
        console.log(e.type + ' was fired')
      }
    })

    instance.show();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain("show");
    }, 351);

    instance.hide();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain("show");
    }, 351);
  });


  it('Can dispose()', async () => {
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[0] as HTMLButtonElement;
    const instance = Dropdown.init(element);

    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.element).to.be.undefined;
    }, 351);

    const instance1 = Dropdown.init(element);

    instance1.show();
    await vi.waitFor(() => {
      console.log(instance1.menu.className);
      expect(instance1.menu.className).to.contain("show");
    }, 350);

    instance1.dispose();
    await vi.waitFor(() => {
      expect(container.querySelector('.dropdown-menu.open')).to.be.null;
      expect(instance1.element).to.be.undefined;
    }, 351);
  });

  it('Can do original events - show/shown', async () => {
    // this test must be last because of the custom event
    const container = getMarkup("dropdown");
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector('[data-bs-toggle="dropdown"]'), 200);

    const element = container.querySelectorAll('[data-bs-toggle="dropdown"]')[1] as HTMLButtonElement;
    const parentElement = element.parentElement!;
    const instance = Dropdown.init(element);
    function handleShow(e: Event) {
      if (!element.innerText.includes('wombat')) {
        console.log(e.type + ' was prevented');
        e.preventDefault();
      } else {
        console.log(e.type + ' was fired')
      }
    }
    parentElement?.addEventListener('show.bs.dropdown', handleShow);

    instance.show();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.not.contain("show");
      parentElement?.removeEventListener('show.bs.dropdown', handleShow)
    }, 351);
  });
});
