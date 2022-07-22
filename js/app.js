
// function createObserver(){
//     let options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.3
//     }
    
// // Add class 'active' to section when near top of viewport
//     const handleIntersection = (entries, observer) => entries.forEach(entry => {
//     let target = entry.target;
//     if (entry.isIntersecting) {
//       entry.target.classList.add('active');
//       // [...document.querySelectorAll('.menu__link')]
//       //   .filter((item) => item.hash.includes(target.id))
//       //   .pop().classList.add('active');

//     } else {
//       entry.target.classList.remove('active');
//        // [...document.querySelectorAll('.menu__link')]
//        //  .filter((item) => item.hash.includes(target.id))
//        //  .pop().classList.remove('active');
//     }
//     });

//     let observer = new IntersectionObserver(handleIntersection, options);   

//     let targets = document.querySelectorAll('section');

//     targets.forEach((target) => observer.observe(target));
// }



const sections = document.querySelectorAll('section');

function createNewObserver(){
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("active")
                // console.log("Intersecting",entry.target)
            }
        })
        // console.log(entries)
    });
    /// foreach of the sections I want to observe observer.observe(section)


    sections.forEach(section => observer.observe(section))

}

document.onload = createNewObserver();



// 1.
 let nav = document.querySelector('#navbar__list');
function buildNav(){
    let sections = document.querySelectorAll('section');

    let fragment = document.createDocumentFragment();

    sections.forEach((section) => {
        // 2.
        let li = document.createElement('li');
        // 3.
        li.innerHTML = `<a href=#${section.id} class="menu__link">${section.getAttribute("data-nav")}</a>`;
        fragment.appendChild(li);
      });

    nav.appendChild(fragment);
}



function handleScrollTo(e){
    if(e.target.nodeName === 'A'){
        e.preventDefault();
        let id = e.target.href.split("#")[1]; // #section1
        let section = document.querySelector(`#${id}`);
        section.scrollIntoView({
         behavior: 'smooth'
        });
    }
}


document.onload = buildNav();

nav.onclick = handleScrollTo;