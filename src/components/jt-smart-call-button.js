import stylesheet from "../styles/index.css?inline";
import { isMobile } from "../util/isMobile.js"

const JTSmartCallButtonTemplate = document.createElement('Template');
JTSmartCallButtonTemplate.innerHTML = `
    <style>
        ${stylesheet}
    </style>
    <a ${(isMobile()?'href="tel:8105225028"':'href="/contact"')} id="buttonRoot" class="btn btn-ghost text-black bg-jt-grad hover:cursor-pointer normal-case text-lg">
        <i class="bi bi-telephone"></i>&nbsp;&nbsp;Call Now
    </a>
`

class JtSmartCallButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.appendChild(JTSmartCallButtonTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('#buttonRoot').addEventListener('click', (e) => {
            if(!isMobile()){
                e.preventDefault();
                route(e);
            }
        })
    }

    connectedCallback(){

    }
}

window.customElements.define('jt-smart-call-button', JtSmartCallButton)