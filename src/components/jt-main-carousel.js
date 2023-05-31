const JtMainCarouselTemplate = document.createElement('template');
JtMainCarouselTemplate.innerHTML = `
        <style>
            @keyframes carousel {
                0% {transform: translateX(0%);}
                100% {transform: translateX(-50%);}
            }
            #carouselScaffold{
                overflow: clip;
                max-width: 100%;
                z-index: 0 !important;
                -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,.2) 0, #000 15%, #000 85%, rgba(0,0,0,.2));
            }
            #carouselTrack{
                width: fit-content;
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
                min-width: 500px;
                min-height: 300px;
                background-position: center;
                background-size: cover;
            }
            @media (min-width: 768px){
                #carousel{
                    max-height: 300px;
                }
            }
            @media (max-width: 1024px){
                #carouselScaffold{
                    -webkit-mask-image: none;
                }
            }
        </style>
        <div id="carouselScaffold">
            <div id='carouselTrack'>
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
            </div>
        </div>
`
class JtMainCarousel extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).appendChild(JtMainCarouselTemplate.content.cloneNode(true));
    }
}

window.customElements.define('jt-main-carousel', JtMainCarousel);
