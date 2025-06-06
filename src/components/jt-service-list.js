import { services } from "../data/services.js";
import stylesheet from "../styles/index.css?inline";
const JTServiceListTemplate = document.createElement("template");
JTServiceListTemplate.innerHTML = `
    <style>
        ${stylesheet}
        .m-icon{
            height: 24px;
            width: 24px;
            margin-right: -5px;
        }
        .man{
            background: url("/assets/icons/content/man.svg");
            background-size: contain;
        }
        .woman{
            background: url("/assets/icons/content/woman.svg");
            background-size: contain;
        }
        .family{
            background: url("/assets/icons/content/family.svg");
            background-size: contain;
        }
        .buttonbar{
        	position: absolute;
    		right: 50%;
    		transform: translate(50%, 0%);
    		z-index: 30;
    		transition: right .3s ease-in-out, transform .3s ease-in-out;
        }
        .header{
        	opacity: 0; 
        	transition: opacity .3s ease-in-out;
        }
        .expand .buttonbar{
        	right: 0%;
    		transform: translate(0%, 0%);
        }
        .expand .header{
        	opacity: 100% !important;
        }
        @media (max-width: 768px) {
        	.buttonbar{
        		position: static;
        		transform: none;
        		right: 0;
        	}
        	.header{
        		display: none;
        	}
        	#banner{
        		justify-content: center;
        	}
        }
    </style>
    <div id="banner" class="pb-16 pt-6 !sticky top-32 z-10 flex" style="background-image: linear-gradient(to bottom, white 55%, transparent 100%)">
    	<h2 class="header font-bold text-center text-5xl text-black my-2">
			Our <span class="bg-jt-grad-text">Services</span>
		</h2>
		<div class="buttonbar bg-white max-w-max flex h-12 sm:h-16 flex-row flex-nowrap gap-1 items-center justify-center tabs tabs-boxed bg-transparent border-black border-4 rounded-2xl !text-black ">
			<div class="btn btn-ghost normal-case border-0 text-black text-md sm:text-lg flex flex-row grow !min-h-0 h-8 sm:h-full items-center gap-2 bg-jt-grad pl-2" id="womensBtn"><div class="m-icon woman"></div>Womens</div>
			<div class="btn btn-ghost normal-case border-0 text-black text-md sm:text-lg flex flex-row grow !min-h-0 h-8 sm:h-full items-center gap-2 pl-2" id="mensBtn"><div class="m-icon man"></div>Mens</div>
			<div class="btn btn-ghost normal-case border-0 text-black text-md sm:text-lg flex flex-row grow !min-h-0 h-8 sm:h-full items-center gap-2 pl-4" id="kidsBtn"><div class="m-icon family"></div>Kids</div>
		</div>
    </div>
    <div id="serviceCardRoot" class="flex flex-col gap-2 mx-4"><jt-service-card name="On-The-Go Cut" price="$23.00" description="Cut and Shampoo" class="w-full _"></jt-service-card><jt-service-card name="Cut &amp; Blowout" price="$36.00" description="Cut, Shampoo, and Blowout" class="w-full _"></jt-service-card><jt-service-card name="All-Over Color" price="$69.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Full Highlights" price="$85.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Partial Highlights" price="$65.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Retouch" price="$60.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Balayage" price="$120.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Ombre" price="$120.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Shampoo &amp; Style" price="$30.00" description="" class="w-full _"></jt-service-card><jt-service-card name="Shampoo &amp; Roller Set" price="$42.00" description="" class="w-full _"></jt-service-card><jt-service-card name="Conditioning Treatment &amp; Blowout" price="$35.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Olaplex Hair Perfector &amp; Repair" price="$35.00" description="" class="w-full _"></jt-service-card><jt-service-card name="Malibu Treatment" price="$25.00" description="" class="w-full _"></jt-service-card><jt-service-card name="Fancy Do (Up Do)" price="$50.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Braiding" price="$20.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Perm" price="$65.00+" description="" class="w-full _"></jt-service-card><jt-service-card name="Eyebrow Waxing" price="$15.00" description="" class="w-full _"></jt-service-card><jt-service-card name="Lip Waxing" price="$8.00" description="" class="w-full _"></jt-service-card><jt-service-card name="Chin Waxing" price="$8.00" description="" class="w-full _"></jt-service-card></div>
    <h4 class="text-lg font-medium italic text-gray-400 my-8 text-left">All prices subject to change. Contact us for an accurate quote.</h4>
   
`;
class JtServiceList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      JTServiceListTemplate.content.cloneNode(true)
    );
    this.serviceCardRoot = this.shadowRoot.querySelector("#serviceCardRoot");
    this.category = 0;
    this.serviceBanner = this.shadowRoot.querySelector("#banner");
    this.womensButton = this.shadowRoot.querySelector("#womensBtn");
    this.mensButton = this.shadowRoot.querySelector("#mensBtn");
    this.kidsButton = this.shadowRoot.querySelector("#kidsBtn");
    this.womensButton.addEventListener("click", () => {
      this.setCategory(0);
    });
    this.mensButton.addEventListener("click", () => {
      this.setCategory(1);
    });
    this.kidsButton.addEventListener("click", () => {
      this.setCategory(2);
    });

    this.shiftHeader = (e) => {
      if (window.scrollY > 280) {
        this.serviceBanner.classList.add("expand");
      } else {
        this.serviceBanner.classList.remove("expand");
      }
    };
  }

  setCategory(category, force) {
    if (this.category === category && !force) {
      return;
    }
    this.category = category;
    this.womensButton.classList.remove("bg-jt-grad");
    this.mensButton.classList.remove("bg-jt-grad");
    this.kidsButton.classList.remove("bg-jt-grad");
    switch (category) {
      case 0: {
        this.womensButton.classList.add("bg-jt-grad");
        break;
      }
      case 1: {
        this.mensButton.classList.add("bg-jt-grad");
        break;
      }
      case 2: {
        this.kidsButton.classList.add("bg-jt-grad");
        break;
      }
    }
    if (!force) {
      this.shadowRoot.querySelectorAll("jt-service-card").forEach((card) => {
        card.classList.remove("slide-in-bottom");
        card.classList.add("slide-out-bottom");
      });
    }
    setTimeout(
      () => {
        this.serviceCardRoot.innerHTML = "";
        const renderServiceCard = (srv) => {
          let card = document.createElement("jt-service-card");
          card.setAttribute("name", srv.name);
          card.setAttribute(
            "price",
            "$" + srv.price + (srv.isVariable ? "+" : "")
          );
          card.setAttribute("description", srv.description);
          card.classList.add("w-full", force ? "_" : "slide-in-bottom");
          this.serviceCardRoot.appendChild(card);
        };
        switch (category) {
          case 0: {
            services.womens.forEach((service) => {
              renderServiceCard(service);
            });
            break;
          }
          case 1: {
            services.mens.forEach((service) => {
              renderServiceCard(service);
            });
            break;
          }
          case 2: {
            services.kids.forEach((service) => {
              renderServiceCard(service);
            });
            break;
          }
        }
        window.scrollTo(0, 350);
      },
      force ? 0 : 500
    );
  }

  connectedCallback() {
    document.addEventListener("scroll", this.shiftHeader);
  }
}

window.customElements.define("jt-service-list", JtServiceList);
