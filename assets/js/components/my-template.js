class MyTemplate extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id='my-template'></div>
        `;
    }
}

customElements.define('my-template', MyTemplate);