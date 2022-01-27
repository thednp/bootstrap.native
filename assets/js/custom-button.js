class CustomButtonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.getElementById('sample-ce');
    const node = document.importNode(template.content, true);
    this.shadowRoot.appendChild(node.cloneNode(true));

    this.type = this.getAttribute('type');
    this.button = this.shadowRoot.querySelector('button');
  }
  
  connectedCallback() {}
  disconnectedCallback() {}
}
customElements.define('ce-tip', CustomButtonElement);