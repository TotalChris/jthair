import stylesheet from "../styles/index.css?inline";
import { isMobile } from "../util/isMobile.js"

const JTSmartCallNavbarButtonTemplate = document.createElement('Template');
JTSmartCallNavbarButtonTemplate.innerHTML = `
    <style>
        ${stylesheet}
    </style>
    <a class="btn btn-ghost text-white text-2xl font-bold md:hidden h-14 hover:bg-neutral-800" ${(isMobile()?'href="tel:8105225028"':'href="/contact"')} id="buttonRoot" aria-label="call">
       <i class="bi bi-telephone"></i>
    </a>
`

class JtSmartCallNavbarButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.appendChild(JTSmartCallNavbarButtonTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('#buttonRoot').addEventListener('click', (e) => {
            if(!isMobile()){
                e.preventDefault()
                route({ target: {href: this.shadowRoot.querySelector('#buttonRoot').href}, preventDefault: () => {} });
            }
        })
    }

    connectedCallback(){

    }
}

window.customElements.define('jt-smart-call-navbar-button', JtSmartCallNavbarButton)