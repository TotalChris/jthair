const JtMainCarouselTemplate = document.createElement('template');
JtMainCarouselTemplate.innerHTML = `
        <style>
            @keyframes carousel {
                0% {transform: translateX(0%);}
                100% {transform: translateX(-50%);}
            }
            #carouselScaffold{
                margin-inline: -0.5rem;
                z-index: 0 !important;
                -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,.2) 0, #000 15%, #000 85%, rgba(0,0,0,.2));
                overflow: hidden;
            }
            #carouselTrack{
                width: max-content;
                overflow: hidden;
                z-index: -1;
            }
            #carousel{
                display: flex;
                flex-wrap: nowrap;
                gap: 16px;
                min-height: 150px;
                max-height: 350px;
                margin-block: 16px;
                justify-content: center;
                position: relative;
                animation: carousel 60s linear 0s infinite;
            }
            .childImage{
                border-radius: 16px;
                width: 500px;
                object-fit: cover;
            }
            @media (min-width: 768px){
                #carousel{
                    max-height: 400px;
                }
                .childImage{
                    width: auto;
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
                    <img src="/assets/woman2.webp" class="childImage">
                    <img src="/assets/woman1.webp" class="childImage">
                    <img src="/assets/womenscut.webp" class="childImage">
                    <img src="/assets/menscut.webp" class="childImage">
                    <img src="/assets/tools.webp" class="childImage">
                    <img src="/assets/woman1.webp" class="childImage">
                    <img src="/assets/woman2.webp" class="childImage">
                    <img src="/assets/womenscut.webp" class="childImage">
                    <img src="/assets/menscut.webp" class="childImage">
                    <img src="/assets/tools.webp" class="childImage">
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
