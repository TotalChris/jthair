const routes = {
    '/': '/pages/home.html',
    '/services': '/pages/services.html',
    '/our-team': '/pages/team.html',
    '/about': '/pages/about.html',
    '/contact': '/pages/contact.html',
    404: '/pages/404.html',
}

const pageRoot = document.querySelector('#pageRoot');

const changePage = async () => {
    const route = routes[window.location.pathname] || routes[404];
    pageRoot.innerHTML = await fetch(route).then((data) => data.text());
}

const handleLocation = async (force) => {
    if(!force){
        pageRoot.classList.remove('slide-in-bottom', 'slide-in-bottom-longer', 'slide-out-bottom');
        pageRoot.classList.add('slide-out-bottom');
        setTimeout(async () => {
            await changePage();
            pageRoot.classList.replace('slide-out-bottom', 'slide-in-bottom');
        }, 500)
    } else {
        await changePage();
        pageRoot.classList.add('slide-in-bottom-longer');
    }
}
export const route = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", e.target.href);
    handleLocation();
}

window.addEventListener('load', () =>  handleLocation(true) )
window.addEventListener('popstate', handleLocation)
