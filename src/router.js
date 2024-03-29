const routes = {
    '/': '/pages/home.html',
    '/services': '/pages/services.html',
    '/our-team': '/pages/team.html',
    '/about': '/pages/about.html',
    '/contact': '/pages/contact.html',
    404: '/pages/404.html',
}

const pageTitles = {
    '/': 'Home',
    '/services': 'Services',
    '/our-team': 'Our Team',
    '/about': 'About Us',
    '/contact': 'Contact Us',
    404: '404',
}

const pageDescriptions = {
    '/': 'With luxury hair care at modest prices, JT Hair is a high-end hair salon serving Brighton, Howell, and the Livingston county area.',
    '/services': 'JT Hair offers services for all hair types and styles.',
    '/our-team': 'Meet the people that make JT Hair a great place for your hair care.',
    '/about': 'With luxury hair care at modest prices, JT Hair is a high-end hair salon serving Brighton, Howell, and the Livingston county area.',
    '/contact': 'Book an appointment at JT Hair by phone or walk-in today!',
    404: '404',
}

const pageRoot = document.querySelector('#pageRoot');

export const route = (e) => {
    e.preventDefault();
    if(e.target.href !== window.location.href){
        window.history.pushState({}, "", e.target.href);
        document.querySelector('jt-navbar').setActiveLink(e.target.href);
        handleLocation();
    }
}

const changePage = async () => {
    const route = routes[window.location.pathname] || window.location.pathname + '.html';
    const title = pageTitles[window.location.pathname] || pageTitles[404];
    const description = pageDescriptions[window.location.pathname] || pageDescriptions[404];
    pageRoot.innerHTML = ""
    let fragment = new DOMParser().parseFromString(
        await fetch(route).then(async (data) => {
            if(!data.ok){
                return await fetch(routes[404]).then((data) => data.text());
            } else {
                return data.text();
            }
        }), 'text/html', {
            includeShadowRoots: true
        }
    );
    pageRoot.appendChild(fragment.body.children[0]);
    document.title = 'JT Hair Care of Brighton | ' + title;
    document.querySelector('meta[name="description"]').setAttribute('content', description)
}

const handleLocation = async (force) => {
    if(!force){
        pageRoot.classList.remove('slide-in-bottom', 'slide-in-bottom-longer', 'slide-out-bottom');
        pageRoot.classList.add('slide-out-bottom');
        setTimeout(async () => {
            await changePage();
            window.scroll(0,0);
            pageRoot.classList.replace('slide-out-bottom', 'slide-in-bottom');
        }, 500)
    } else {
        await changePage();
        pageRoot.classList.add('slide-in-bottom-longer');
        document.querySelectorAll('a.inner-navlink').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);
                document.querySelector('jt-navbar').setActiveLink(e.target.href);
                handleLocation();
            });
        })
    }
}

window.addEventListener('load', (e) =>  {
    handleLocation(true)
})
window.addEventListener('popstate', handleLocation)

window.route = route;
