import stylesheet from "../styles/index.css?inline";
import { isMobile } from "../util/isMobile.js"

const JTSmartCallEndpointButtonTemplate = document.createElement('Template');
JTSmartCallEndpointButtonTemplate.innerHTML = `
    <style>
        ${stylesheet}
    </style>
    ${(isMobile()?'<a href="tel:8105225028" class="btn btn-ghost text-black bg-jt-grad hover:bg-yellow-200 hover:cursor-pointer normal-case text-lg"><i class="bi bi-telephone"></i>&nbsp;&nbsp;':'<p class="text-black font-bold normal-case text-xl">')}
    (810) 522-5028
    ${(isMobile()?'</a>':'</p>')}
`

class JtSmartCallEndpointButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.appendChild(JTSmartCallEndpointButtonTemplate.content.cloneNode(true));
    }
}

window.customElements.define('jt-smart-call-endpoint-button', JtSmartCallEndpointButton)