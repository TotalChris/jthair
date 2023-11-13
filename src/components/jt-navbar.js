import {route} from "../router.js";
import { retrieveHours } from "../data/hours.js";
import stylesheet from '../styles/index.css?inline'



const JTNavbarTemplate = document.createElement('template');
JTNavbarTemplate.innerHTML = `
    <style>${stylesheet}</style>
    <div id="navbarRoot" class="fixed right-0 left-0 top-0 z-20">
        <div id="navbarWrapper" class="min-w-screen lg:max-w-5xl 2xl:max-w-7xl lg:mx-auto mx-4 mt-4 bg-black drop-shadow-2xl rounded-t-box h-20 md:!h-20 transition-all">
            <div class='flex flex-row justify-between items-center w-full gap-4 px-2 h-20'>
                <button id="drawerButton" class="btn btn-ghost text-2xl font-bold md:hidden h-14" aria-label="navigate">
                    <i class="bi bi-list"></i>
                </button>
                <a href="/" class="flex flex-row h-full items-center">
                    <img src="/assets/logo.webp" alt="logo" class='h-12 md:ml-2 w-auto'/>
                </a>
                <a class="btn btn-ghost text-white text-2xl font-bold md:hidden h-14 hover:bg-neutral-800" href='tel:8105225028' aria-label="call">
                    <i class="bi bi-telephone"></i>
                </a>
                <div class="flex flex-row md:flex-col ml-0 hidden md:block gap-4 w-full md:w-auto h-auto justify-center !text-2xl md:ml-auto md:my-auto px-2">
                    <a href="/" data-name="/" class="navlink btn btn-ghost bg-black text-white hover:bg-neutral-800 font-bold font-inter normal-case">Home</a>
                    <a href="./services" data-name="/services" class="navlink btn btn-ghost bg-black text-white hover:bg-neutral-800 font-bold font-inter normal-case">Services & Pricing</a>
                    <a href="./our-team" data-name="/our-team" class="navlink btn btn-ghost bg-black text-white hover:bg-neutral-800 font-bold font-inter normal-case">Our Team</a>
                    <a href="./about" data-name="/about" class="navlink btn btn-ghost bg-black text-white hover:bg-neutral-800 font-bold font-inter normal-case">About</a>
                    <a href="./contact" data-name="/contact" class="navlink btn btn-ghost bg-black text-white hover:bg-neutral-800 font-bold font-inter normal-case">Contact</a>
                </div>
            </div>
            <div id="drawerContents" class="flex flex-col gap-2 h-72 m-2 md:!hidden">
                <a href="/" data-name="/" class="navlink btn bg-transparent border-0 text-white hover:bg-neutral-800 font-bold font-inter normal-case">Home</a>
                <a href="./services" data-name="/services" class="navlink btn bg-transparent border-0 text-white hover:bg-neutral-800 font-bold font-inter normal-case">Services & Pricing</a>
                <a href="./our-team" data-name="/our-team" class="navlink btn bg-transparent border-0 text-white hover:bg-neutral-800 font-bold font-inter normal-case">Our Team</a>
                <a href="./about" data-name="/about" class="navlink btn bg-transparent border-0 text-white hover:bg-neutral-800 font-bold font-inter normal-case">About</a>
                <a href="./contact" data-name="/contact" class="navlink btn bg-transparent border-0 text-white hover:bg-neutral-800 font-bold font-inter normal-case">Contact</a>
            </div>
        </div>
        <div id="ticker" class="min-w-screen lg:max-w-5xl 2xl:max-w-7xl lg:mx-auto mx-4 bg-jt-grad text-black drop-shadow-2xl rounded-b-box h-8 flex flex-row items-center justify-center gap-2">
            
        </div>
    </div>
`
class JTNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).appendChild(JTNavbarTemplate.content.cloneNode(true))
        this.isDrawerOpen = true;
        const drawerButton = this.shadowRoot.querySelector('#drawerButton');
        const navbarRoot = this.shadowRoot.querySelector('#navbarRoot');
        const navbarWrapper = this.shadowRoot.querySelector('#navbarWrapper');
        const drawerContents = this.shadowRoot.querySelector('#drawerContents');
        this.ticker = this.shadowRoot.querySelector('#ticker');

        navbarRoot.querySelectorAll('.navlink').forEach((el) => {
            el.addEventListener('click', (e) => {
                route(e);
                this.changeHighlightedLink();
            });
        })

        navbarRoot.addEventListener('click', (e) => {
            if(e.target === navbarRoot){
                this.isDrawerOpen = true;
                this.toggleDrawer(false);
            }
        });

        drawerButton.addEventListener('click', () => {
            this.toggleDrawer();
        })

        this.toggleDrawer = (manual) => {
            if(manual || !this.isDrawerOpen){
                this.isDrawerOpen = true;
                drawerButton.classList.add('bg-white', 'text-black', 'hover:bg-neutral-200');
                drawerButton.classList.remove('bg-black', 'text-white', 'hover:bg-neutral-800');
                navbarWrapper.classList.add('h-96');
                navbarRoot.classList.add('bottom-0', 'navbar-root-mist-open');
                navbarRoot.classList.remove('navbar-root-mist-closed');
                drawerContents.classList.add('visible');
                drawerContents.classList.remove('hidden');
            } else if (!manual || this.isDrawerOpen) {
                this.isDrawerOpen = false;
                drawerButton.classList.remove('bg-white', 'text-black', 'hover:bg-neutral-200');
                drawerButton.classList.add('bg-black', 'text-white', 'hover:bg-neutral-800');
                navbarWrapper.classList.remove('h-96');
                navbarRoot.classList.add('navbar-root-mist-closed');
                navbarRoot.classList.remove('navbar-root-mist-open', 'bottom-0');
                drawerContents.classList.remove('visible');
                drawerContents.classList.add('hidden');
            }
        }
    }

    changeHighlightedLink() {
        this.shadowRoot.querySelectorAll("a.navlink").forEach((e) => {
            if(e.dataset.name === window.location.pathname){
                e.classList.remove('bg-black', 'text-white', 'hover:bg-neutral-800')
                e.classList.add('bg-white', 'text-black', 'hover:bg-neutral-200')
            } else {
                e.classList.remove('bg-white', 'text-black', 'hover:bg-neutral-200')
                e.classList.add('bg-black', 'text-white', 'hover:bg-neutral-800')
            }
            this.isDrawerOpen = true;
            this.toggleDrawer(false);
        })
    }

    setActiveLink(path){
        let linkUrl = new URL(path);
        this.shadowRoot.querySelectorAll("a.navlink").forEach((e) => {
            e.classList.remove('bg-white', 'text-black', 'hover:bg-neutral-200')
            e.classList.add('bg-black', 'text-white', 'hover:bg-neutral-800')
            if(linkUrl.pathname === e.dataset.name){
                e.classList.remove('bg-black', 'text-white', 'hover:bg-neutral-800')
                e.classList.add('bg-white', 'text-black', 'hover:bg-neutral-200')
            }
        })
    }

    async connectedCallback() {
        this.toggleDrawer();
        this.setActiveLink(window.location);
        let hours = await retrieveHours();
        let store = hours[new Date().getDay()]; //hours[new Date().getDay()]
        this.ticker.innerHTML = `
            <div style="font-weight: 800">${(store.isOpen ? 'Open Today' : "Closed")}</div>
            <div>${(store.isOpen ? (store.start) + ' - ' + (store.end) + (store.restricted ? ' (By Appointment)' : '') : ('Open Tuesday 9 AM - 7 PM'))}</div>
            
        `
    }
}

window.customElements.define('jt-navbar', JTNavbar);