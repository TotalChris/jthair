const JtMainCarouselTemplate = document.createElement("template");
JtMainCarouselTemplate.innerHTML = `
        <style>
            @keyframes carousel {
                0% {transform: translateX(0%);}
                100% {transform: translateX(-50%);}
            }
            #carouselScaffold{
                overflow: hidden;
                max-width: 100%;
                z-index: 0 !important;
                -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,.2) 0, #000 15%, #000 85%, rgba(0,0,0,.2));
            }
            #carousel{
                display: inline-flex;
                gap: 16px;
                min-height: 300px;
                margin-block: 16px;
                animation: carousel 60s linear 0s infinite;
            }
            .childImage{
                border-radius: 16px;
                max-width: 500px;
                width: 85vw;
                min-height: 300px;
                background-position: center;
                background-size: cover;
                background-color: #f0f0f0;
            }
            .wavy-circle {
                --s: 200px; /* adjust to control the size */
                width: var(--s); 
                aspect-ratio: 1;
                --g:/calc(var(--s)*0.261) calc(var(--s)*0.261) radial-gradient(50% 50%,#000 99%,#0000 101%) no-repeat;
                mask: calc(50% + var(--s)*0.341) calc(50% + var(--s)*0) var(--g),calc(50% + var(--s)*0.241) calc(50% + var(--s)*0.241) var(--g),calc(50% + var(--s)*0) calc(50% + var(--s)*0.341) var(--g),calc(50% + var(--s)*-0.241) calc(50% + var(--s)*0.241) var(--g),calc(50% + var(--s)*-0.341) calc(50% + var(--s)*0) var(--g),calc(50% + var(--s)*-0.241) calc(50% + var(--s)*-0.241) var(--g),calc(50% + var(--s)*0) calc(50% + var(--s)*-0.341) var(--g),calc(50% + var(--s)*0.241) calc(50% + var(--s)*-0.241) var(--g),radial-gradient(calc(var(--s)*0.433),#000 99%,#0000 101%) subtract,calc(50% + var(--s)*0.5) calc(50% + var(--s)*0.207) var(--g),calc(50% + var(--s)*0.207) calc(50% + var(--s)*0.5) var(--g),calc(50% + var(--s)*-0.207) calc(50% + var(--s)*0.5) var(--g),calc(50% + var(--s)*-0.5) calc(50% + var(--s)*0.207) var(--g),calc(50% + var(--s)*-0.5) calc(50% + var(--s)*-0.207) var(--g),calc(50% + var(--s)*-0.207) calc(50% + var(--s)*-0.5) var(--g),calc(50% + var(--s)*0.207) calc(50% + var(--s)*-0.5) var(--g),calc(50% + var(--s)*0.5) calc(50% + var(--s)*-0.207) var(--g);
                background: linear-gradient(45deg,rgba(240, 203, 0, 1) 0%,rgba(255, 177, 0, 1) 100%);
                position: fixed;
                top: 9%;
                right: 3%;
                z-index: 10;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transform: rotate(-20deg);
            }
            @media (min-width: 768px){
                #carousel{
                    max-height: 300px;
                }
                .wavy-circle {
                top: 11%;
                right: 10%;
                    --s: 200px; /* adjust to control the size */
                }
            }
            @media (max-width: 1024px){
                #carouselScaffold{
                    -webkit-mask-image: none;
                }
                .wavy-circle {
                    --s: 175px; /* adjust to control the size */
                }
            }
            .sticker-text {
                color: black;
                user-select: none;
                -webkit-user-select: none;
            }
            .emphasis {
                font-size: 1.25rem;
                font-weight: bold;
            }
            .slant {
                font-style: italic;
                font-weight: 600;
            }
        </style>
        <div id="carouselScaffold">
            <div id='carousel'>
                <div style=" background-image: url('/assets/woman2.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/woman1.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/womenscut.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/menscut.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/tools.webp'); " class="childImage"></div>                    
                <div style=" background-image: url('/assets/woman2.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/woman1.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/womenscut.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/menscut.webp'); " class="childImage"></div>
                <div style=" background-image: url('/assets/tools.webp'); " class="childImage"></div>
            </div>
            <div class="wavy-circle">
                <div class="sticker-text emphasis">JT Body Care</div>
                <div class="sticker-text slant">Coming Soon!</div>
            </div>
        </div>
`;
class JtMainCarousel extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).appendChild(
			JtMainCarouselTemplate.content.cloneNode(true)
		);
	}
}

window.customElements.define("jt-main-carousel", JtMainCarousel);
