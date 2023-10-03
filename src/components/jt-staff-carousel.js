import stylesheet from '../styles/index.css?inline'
import {staff} from '../data/staff'
const JTStaffCarouselTemplate = document.createElement('template');
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
        <div class="carousel carousel-center mx-auto w-full gap-8 overflow-y-hidden cursor-grab select-none" id="staffCarousel" style="scroll-behavior: smooth;">
        <div class="carousel-item" id="staff-0" data-staffid="0" style="padding-left: calc((100% - 300px) / 2);">
            <img src="/assets/team/jody.webp" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none" draggable="false" alt="Jody" />
            <div class='pt-4 !pb-12 bio'>
                <h1 class='font-bold text-center text-4xl lg:text-5xl text-black my-2'>Jody</h1>
                <h2 class="text-center text-xl font-medium italic text-gray-500">Stylist</h2>
            </div>        
        </div>
        <div class="carousel-item" id="staff-1" data-staffid="1">
            <img src="/assets/team/kathi.webp" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none opacity-40" draggable="false" alt="Kathi"/>
            <div class='pt-4 !pb-12 bio'>
                <h1 class='font-bold text-center text-4xl lg:text-5xl text-black my-2'>Kathi</h1>
                <h2 class="text-center text-xl font-medium italic text-gray-500">Stylist</h2>
            </div>
        </div>
        <div class="carousel-item" id="staff-2" data-staffid="2">
            <img src="/assets/team/stephanie.webp" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none opacity-40" draggable="false" alt="Stephanie" />
            <div class='pt-4 !pb-12 bio'>
                <h1 class='font-bold text-center text-4xl lg:text-5xl text-black my-2'>Stephanie</h1>
                <h2 class="text-center text-xl font-medium italic text-gray-500">Stylist</h2>
            </div>
        </div>
        <div class="carousel-item" id="staff-3" data-staffid="3">
            <img src="/assets/team/valerie.webp" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none opacity-40" draggable="false" alt="Valerie" loading="lazy" />
            <div class='pt-4 !pb-12 bio'>
                <h1 class='font-bold text-center text-4xl lg:text-5xl text-black my-2'>Valerie</h1>
                <h2 class="text-center text-xl font-medium italic text-gray-500">Stylist</h2>
            </div>
        </div>
        <div class="carousel-item" id="staff-4" data-staffid="4">
            <img src="/assets/team/ariel.webp" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none opacity-40" draggable="false" alt="Ariel" loading="lazy" />
            <div class='pt-4 !pb-12 bio'>
                <h1 class='font-bold text-center text-4xl lg:text-5xl text-black my-2'>Ariel</h1>
                <h2 class="text-center text-xl font-medium italic text-gray-500">Stylist</h2>
            </div>
        </div>
        <div class="carousel-item" id="staff-5" data-staffid="5" style="padding-right: calc((100% - 300px) / 2)">
            <img src="/assets/team/lisa.png" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none opacity-40" draggable="false" alt="Lisa" loading="lazy" />
            <div class='pt-4 !pb-12 bio'>
                <h1 class='font-bold text-center text-4xl lg:text-5xl text-black my-2'>Lisa</h1>
                <h2 class="text-center text-xl font-medium italic text-gray-500">Stylist</h2>
            </div>
        </div>
    </div>
`
class JTStaffCarousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).appendChild(JTStaffCarouselTemplate.content.cloneNode(true));
        this.staffCarouselRoot = this.shadowRoot.querySelector('#staffCarousel');
        this.staffBioRoot = this.shadowRoot.querySelector('#staffBio');
        this.isScrolling = false;
        this.scrollPos = 0
        this.pos = { left: 0, x: 0 };
        this.handleDrag = (e) => {
            this.staffCarouselRoot.style.scrollBehavior = 'auto';
            const dx = e.clientX - this.pos.x;
            this.staffCarouselRoot.scrollLeft = this.pos.left - dx;
        }
        this.handleDragExit = (e) => {
            this.staffCarouselRoot.style.scrollBehavior = 'smooth';
            this.staffCarouselRoot.style.scrollSnapType = "x mandatory"
            this.staffCarouselRoot.style.cursor = 'grab';
            this.staffCarouselRoot.removeEventListener('mousemove', this.handleDrag);
            this.staffCarouselRoot.removeEventListener('mouseleave', this.handleDragExit)
            this.staffCarouselRoot.removeEventListener('mouseup', this.handleDragExit);
        }
        this.staffCarouselRoot.addEventListener('mousedown', (e) => {
            this.pos = { left: this.staffCarouselRoot.scrollLeft, x: e.clientX };
            this.staffCarouselRoot.style.scrollSnapType = "none";
            this.staffCarouselRoot.style.cursor = 'grabbing';
            this.staffCarouselRoot.style.userSelect = 'none';
            this.staffCarouselRoot.addEventListener('mousemove', this.handleDrag);
            this.staffCarouselRoot.addEventListener('mouseleave', this.handleDragExit)
            this.staffCarouselRoot.addEventListener('mouseup', this.handleDragExit);

        })
        this.staffCarouselRoot.addEventListener('scroll', (e) => {
            this.changeStaffFocus(e);
        })
    }

    changeStaffFocus(e){
        let s = (e.target.scrollLeft / 332);
        this.scrollPos = s - (s % 1); //set the new queue position
        this.shadowRoot.querySelectorAll('.carousel-item .bio').forEach((itm) => {itm.style.opacity = '0'})
        this.shadowRoot.querySelectorAll('.carousel-item img').forEach((itm) => {itm.classList.add('opacity-40')})
        if(s % 1 === 0){
            this.shadowRoot.querySelector('#staff-' + this.scrollPos + ' img').classList.remove('opacity-40')
            this.shadowRoot.querySelector('#staff-' + this.scrollPos + ' .bio').style.opacity = '1'
        } else {
            if(s < this.scrollPos){
                this.shadowRoot.querySelector('#staff-' + (this.scrollPos - 1) + ' .bio').style.opacity = (1 - (s % 1)).toString()
                this.shadowRoot.querySelector('#staff-' + this.scrollPos + ' .bio').style.opacity = (s % 1).toString()
            } else if(s > this.scrollPos) {
                this.shadowRoot.querySelector('#staff-' + this.scrollPos + ' .bio').style.opacity = (1 - (s % 1)).toString()
                this.shadowRoot.querySelector('#staff-' + (this.scrollPos + 1) + ' .bio').style.opacity = (s % 1).toString()
            }
        }
    }

}

window.customElements.define('jt-staff-carousel', JTStaffCarousel);