import stylesheet from '../styles/index.css?inline'
const JTStaffCarouselTemplate = document.createElement('template');
JTStaffCarouselTemplate.innerHTML = `
    <style>${stylesheet}</style>
        <div class="carousel carousel-center mx-auto w-full gap-8 overflow-y-hidden cursor-grab select-none" id="staffCarousel" style="scroll-behavior: auto; height: 300px;">
        <div class="carousel-item" style="padding-left: calc((100% - 300px) / 2);">
            <img src="src/assets/team/jody.webp" height="300px" width="300px" class="rounded-full mx-auto transition-opacity select-none" draggable="false" alt="Jody" id="staff-0" data-staffid="0" />
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/aimee.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Aimee" id="staff-1" data-staffid="1" />
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/carol.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Carol" id="staff-2" data-staffid="2" />
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/dana.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Dana" id="staff-3" data-staffid="3" />
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/kathy.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Kathy" id="staff-4" data-staffid="4" />
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/krista.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Krista" id="staff-5" data-staffid="5"/>
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/laura.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Laura" id="staff-6" data-staffid="6"/>
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/lauren.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Lauren" id="staff-7" data-staffid="7"/>
        </div>
        <div class="carousel-item">
            <img src="src/assets/team/stephanie.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Stephanie" id="staff-8" data-staffid="8"/>
        </div>
        <div class="carousel-item" style="padding-right: calc((100% - 300px) / 2)">
            <img src="src/assets/team/valerie.webp" height="300px" width="300px" class="rounded-full mx-auto opacity-40 transition-opacity select-none" draggable="false" alt="Valerie" id="staff-9" data-staffid="9"/>
        </div>
    </div>
    <div id="staffBio" class="px-4 min-h-12 min-w-screen lg:max-w-5xl 2xl:max-w-7xl lg:mx-auto m-4">
        <div class='pt-4 !pb-12'>
            <h1 class='font-bold text-center text-5xl lg:text-7xl text-black my-2'>FirstName <span class='jt-yellow'>LastName</span></h1>
            <h2 class="text-center text-xl font-medium italic text-gray-500">Job Title</h2>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nibh vitae luctus sodales. Nunc sit amet libero in enim mollis mattis. Sed vel felis vitae ex ultricies malesuada. Maecenas fringilla porta euismod. Proin congue, odio et placerat euismod, dui nulla imperdiet orci, nec scelerisque lorem elit ac lectus. Mauris efficitur, dolor in mollis pretium, mauris augue ullamcorper dui, at sodales nisi metus faucibus metus. Ut dapibus quam est, quis accumsan ligula rhoncus ac.

Pellentesque in nibh id nulla bibendum placerat ut sollicitudin eros. Nullam pellentesque justo non imperdiet sodales. Maecenas pulvinar turpis feugiat ullamcorper tristique. Quisque eu sodales tellus. Aenean mattis ipsum arcu, in sagittis nulla consequat in. Integer a ligula nec sapien malesuada lacinia vitae eu leo. Mauris blandit tellus ut volutpat viverra. Ut sit amet dapibus mi, a rutrum odio. Nunc urna odio, mattis suscipit eros id, ultrices pretium nibh. Nam efficitur nunc a felis suscipit, ultrices ultricies nisl eleifend. Suspendisse nunc magna, placerat vel fringilla ac, placerat at ligula. Maecenas in bibendum lacus. Duis varius sapien urna, eu placerat nulla lacinia ut. Etiam bibendum vel est sit amet tincidunt.</p>
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
            const dx = e.clientX - this.pos.x;
            this.staffCarouselRoot.scrollLeft = this.pos.left - dx;
        }
        this.handleDragExit = (e) => {
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

    scrollToStaff(staffId){
        this.staffCarouselRoot.scrollLeft = staffId * 332;
        this.shadowRoot.querySelector('#staff-' + this.scrollPos).classList.add('opacity-40');
        this.changeStaffFocus( {target: {scrollLeft: staffId * 332} } )
    }

    changeStaffFocus(e){
        let s = (e.target.scrollLeft / 332);
        if(s % 1 === 0){
            this.scrollPos = s - (s % 1);
            this.shadowRoot.querySelector('#staff-' + this.scrollPos).classList.remove('opacity-40');
            this.changeStaffDesc(this.scrollPos)
        } else {
            this.shadowRoot.querySelector('#staff-' + this.scrollPos).classList.add('opacity-40');
        }
    }

    changeStaffDesc(staffId){
        this.staffBioRoot.classList.remove('slide-in-bottom');
        this.staffBioRoot.classList.add('slide-out-bottom');
        setTimeout(() => {
            this.staffBioRoot.innerHTML= "";
            this.staffBioRoot.innerHTML = `
                <div class='pt-4 !pb-12'>
                    <h1 class='font-bold text-center text-5xl lg:text-7xl text-black my-2'>FirstName <span class='jt-yellow'>LastName</span></h1>
                    <h2 class="text-center text-xl font-medium italic text-gray-500">Job Title</h2>
                    <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nibh vitae luctus sodales. Nunc sit amet libero in enim mollis mattis. Sed vel felis vitae ex ultricies malesuada. Maecenas fringilla porta euismod. Proin congue, odio et placerat euismod, dui nulla imperdiet orci, nec scelerisque lorem elit ac lectus. Mauris efficitur, dolor in mollis pretium, mauris augue ullamcorper dui, at sodales nisi metus faucibus metus. Ut dapibus quam est, quis accumsan ligula rhoncus ac.

Pellentesque in nibh id nulla bibendum placerat ut sollicitudin eros. Nullam pellentesque justo non imperdiet sodales. Maecenas pulvinar turpis feugiat ullamcorper tristique. Quisque eu sodales tellus. Aenean mattis ipsum arcu, in sagittis nulla consequat in. Integer a ligula nec sapien malesuada lacinia vitae eu leo. Mauris blandit tellus ut volutpat viverra. Ut sit amet dapibus mi, a rutrum odio. Nunc urna odio, mattis suscipit eros id, ultrices pretium nibh. Nam efficitur nunc a felis suscipit, ultrices ultricies nisl eleifend. Suspendisse nunc magna, placerat vel fringilla ac, placerat at ligula. Maecenas in bibendum lacus. Duis varius sapien urna, eu placerat nulla lacinia ut. Etiam bibendum vel est sit amet tincidunt.</p>
                </div>
            `;
            this.staffBioRoot.classList.remove('slide-out-bottom');
            this.staffBioRoot.classList.add('slide-in-bottom');
        }, 500)
    }

    connectedCallback() {

    }


}

window.customElements.define('jt-staff-carousel', JTStaffCarousel);