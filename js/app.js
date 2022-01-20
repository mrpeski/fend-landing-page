 /**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

    let nav = document.querySelector('#navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function createObserver(){
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }
    
// Add class 'active' to section when near top of viewport
    const handleIntersection = (entries, observer) => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-viewport');
    } else {
      entry.target.classList.remove('in-viewport');
    }
    });

    let observer = new IntersectionObserver(handleIntersection, options);   

    let targets = document.querySelectorAll('section');

    targets.forEach((target) => observer.observe(target));
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav(){
    let sections = document.querySelectorAll('section');

    let fragment = document.createDocumentFragment();

    [...sections].forEach((section) => {
        let li = document.createElement('li');
        li.innerHTML = `<a href=#${section.id} class="menu__link">${section.dataset['nav']}</a>`;
        fragment.appendChild(li);
      });

    nav.appendChild(fragment);
}




// Scroll to anchor ID using scrollTo event

function handleScrollTo(e){
    if(e.target.nodeName === 'A'){
        e.preventDefault();
        let id = e.target.href.split('#')[1];
        let section = document.querySelector(`#${id}`);
        let rect = section.getBoundingClientRect();
        window.scrollTo({
            top: document.body.scrollTop + rect.top,
            behavior: 'smooth'
        })
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.onload = buildNav();
document.onload = createObserver();

// Scroll to section on link click
nav.onclick = handleScrollTo;


