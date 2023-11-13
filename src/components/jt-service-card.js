import stylesheet from "../styles/index.css?inline";
const JTServiceCardTemplate = document.createElement("template");
JTServiceCardTemplate.innerHTML = `
<style>${stylesheet}</style>
    <div class="stats shadow" id="cardRoot">
        <div class="bg-accent-content gap-2 jt-price-card bg-cover">
            <div class='w-full h-full jt-price-card stat'>
                <div class="stat-title text-white" id="serviceName"></div>
                <div class="stat-value bg-jt-grad-text" id="servicePrice"></div>
                <div class="stat-desc text-neutral-300" id="serviceDescription"></div>
            </div>
        </div>
    </div>
`;

class JtServiceCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).appendChild(
			JTServiceCardTemplate.content.cloneNode(true)
		);
		this.cardRoot = this.shadowRoot.querySelector("#cardRoot");
		this.cardName = this.shadowRoot.querySelector("#serviceName");
		this.cardPrice = this.shadowRoot.querySelector("#servicePrice");
		this.cardDescription = this.shadowRoot.querySelector("#serviceDescription");
	}

	connectedCallback() {
		this.cardName.innerHTML = this.getAttribute("name");
		this.cardPrice.innerHTML = this.getAttribute("price");
		this.cardDescription.innerHTML = this.getAttribute("description");
		this.classList.forEach((c) => {
			this.cardRoot.classList.add(c);
		});
	}
}

window.customElements.define("jt-service-card", JtServiceCard);
