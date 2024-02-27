import stylesheet from "../styles/index.css?inline";
import { staff } from "../data/staff";
const JTStaffMemberTemplate = document.createElement("template");
JTStaffMemberTemplate.innerHTML = `
        <div class="carousel-item" id="">
            <img src="" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none" draggable="false" alt="" />
            <div class='pt-4 !pb-12 bio'>
                <h1 class='font-bold text-center text-4xl lg:text-5xl text-black my-2'></h1>
                <h2 class="text-center text-xl font-medium italic text-gray-500"></h2>
            </div>        
        </div>
`;
const JTStaffCarouselTemplate = document.createElement("template");
JTStaffCarouselTemplate.innerHTML = `
    <style>
        ${stylesheet}
        .carousel-item{
            display: flex;
            flex-direction: column;
        }
        .bio {
            opacity: 0;
        }
        #staff-0 .bio{
            opacity: 1;
        }
    </style>
    <div class="carousel carousel-center mx-auto w-full gap-8 overflow-y-hidden cursor-grab select-none" id="staffCarousel" style="scroll-behavior: smooth;"></div>
`;
class JTStaffCarousel extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).appendChild(
			JTStaffCarouselTemplate.content.cloneNode(true)
		);
		this.staffCarouselRoot = this.shadowRoot.querySelector("#staffCarousel");
		this.scrollPos = 0;
		this.pos = { left: 0, x: 0 };
		this.handleDrag = (e) => {
			this.staffCarouselRoot.style.scrollBehavior = "auto";
			const dx = e.clientX - this.pos.x;
			this.staffCarouselRoot.scrollLeft = this.pos.left - dx;
		};
		this.handleDragExit = (e) => {
			this.staffCarouselRoot.style.scrollBehavior = "smooth";
			this.staffCarouselRoot.style.scrollSnapType = "x mandatory";
			this.staffCarouselRoot.style.cursor = "grab";
			this.staffCarouselRoot.removeEventListener("mousemove", this.handleDrag);
			this.staffCarouselRoot.removeEventListener(
				"mouseleave",
				this.handleDragExit
			);
			this.staffCarouselRoot.removeEventListener(
				"mouseup",
				this.handleDragExit
			);
		};
		this.staffCarouselRoot.addEventListener("mousedown", (e) => {
			this.pos = { left: this.staffCarouselRoot.scrollLeft, x: e.clientX };
			this.staffCarouselRoot.style.scrollSnapType = "none";
			this.staffCarouselRoot.style.cursor = "grabbing";
			this.staffCarouselRoot.style.userSelect = "none";
			this.staffCarouselRoot.addEventListener("mousemove", this.handleDrag);
			this.staffCarouselRoot.addEventListener(
				"mouseleave",
				this.handleDragExit
			);
			this.staffCarouselRoot.addEventListener("mouseup", this.handleDragExit);
		});
		this.staffCarouselRoot.addEventListener("scroll", (e) => {
			this.changeStaffFocus(e);
		});
	}

	connectedCallback() {
		staff.forEach((member, idx, arr) => {
			let el = JTStaffMemberTemplate.content.cloneNode(true);
			el.querySelector("img").src = member.image;
			el.querySelector("img").setAttribute("alt", member.name);
			el.querySelector(".carousel-item").setAttribute("id", "staff-" + idx);
			el.querySelector(".bio h1").innerHTML = member.name;
			el.querySelector(".bio h2").innerHTML = member.jobTitle;
			el.querySelector("img").classList.add("opacity-40");
			if (idx === 0) {
				el.querySelector("img").classList.remove("opacity-40");
				el.querySelector(".carousel-item").style.paddingLeft =
					"calc((100% - 300px) / 2)";
			} else if (idx === arr.length - 1) {
				el.querySelector(".carousel-item").style.paddingRight =
					"calc((100% - 300px) / 2)";
			}
			this.staffCarouselRoot.appendChild(el);
		});
	}

	changeStaffFocus(e) {
		let s = e.target.scrollLeft / 332;
		this.scrollPos = s - (s % 1); //set the new queue position
		this.shadowRoot.querySelectorAll(".carousel-item .bio").forEach((itm) => {
			itm.style.opacity = "0";
		});
		this.shadowRoot.querySelectorAll(".carousel-item img").forEach((itm) => {
			itm.classList.add("opacity-40");
		});
		if (s % 1 === 0) {
			this.shadowRoot
				.querySelector("#staff-" + this.scrollPos + " img")
				.classList.remove("opacity-40");
			this.shadowRoot.querySelector(
				"#staff-" + this.scrollPos + " .bio"
			).style.opacity = "1";
		} else {
			if (s < this.scrollPos) {
				this.shadowRoot.querySelector(
					"#staff-" + (this.scrollPos - 1) + " .bio"
				).style.opacity = (1 - (s % 1)).toString();
				this.shadowRoot.querySelector(
					"#staff-" + this.scrollPos + " .bio"
				).style.opacity = (s % 1).toString();
			} else if (s > this.scrollPos) {
				this.shadowRoot.querySelector(
					"#staff-" + this.scrollPos + " .bio"
				).style.opacity = (1 - (s % 1)).toString();
				this.shadowRoot.querySelector(
					"#staff-" + (this.scrollPos + 1) + " .bio"
				).style.opacity = (s % 1).toString();
			}
		}
	}
}

window.customElements.define("jt-staff-carousel", JTStaffCarousel);
