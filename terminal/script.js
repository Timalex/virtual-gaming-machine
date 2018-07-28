class TerminalEdit extends HTMLElement {

    constructor() {
        super()

        // Create a shadow root
        this.attachShadow({ mode: 'open' })

        // Add template content including styling
        const templateEdit = document.querySelector('#terminal-edit')
        ShadyCSS.prepareTemplate(templateEdit, 'terminal-edit')
        const templateContent = templateEdit.content.cloneNode(true)
        this.shadowRoot.appendChild(templateContent)
    }

    connectedCallback() {
        const templateEdit = document.querySelector('#terminal-edit')
        ShadyCSS.styleElement(this);
    }
}

class TerminalCli extends TerminalEdit {

    static get observedAttributes() { return ['user', 'at', 'host', 'dir', 'symbol'] }

    constructor() {
        super()

        // Get template content including styling
        const templateCli = document.querySelector('#terminal-cli')
        const templateContent = templateCli.content.cloneNode(true)
        
        // Insert styling link
        const link = templateContent.querySelector('link')
        // this.shadowRoot.firstChild.before(link)

        // Insert prompt before slotted contet
        const prompt = templateContent.querySelector('#prompt')
        const slot = this.shadowRoot.querySelector('slot')
        ShadyCSS.prepareTemplate(templateCli, 'terminal-cli')
        slot.before(prompt)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Put x attribute value as text in element with class x
        this.shadowRoot.querySelector('#' + name).textContent = newValue
    }

    connectedCallback() {
        // ShadyCSS.styleElement(this);
    }
}

// Define a custom element
customElements.define('terminal-edit', TerminalEdit);
customElements.define('terminal-cli', TerminalCli);
