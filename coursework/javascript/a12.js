class Effect1 extends HTMLElement {
    static observedAttributes = ['title', 'src']

    static template = document.createElement("template")
    constructor() {
        super()

        this.attachShadow({ mode: "open" })

        let link = document.createElement("link")
        link.href = "css/a12.css"
        link.type = "text/css"
        link.rel = "stylesheet"
        this.shadowRoot.append(link)

        Effect1.template.innerHTML = `
            <slot></slot>
        `

        let clone = Effect1.template.content.cloneNode(true)
        this.shadowRoot.append(clone)
    }


}

customElements.define("effect-1", Effect1)