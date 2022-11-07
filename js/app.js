(function () {
        let nav = document.querySelector("#navbar__list");

        const ACTIVE_CLASS = "fXmn";


        /**
         * Handles the toggling of ACTIVE_CLASS on both links and sections
         *
         * @param entries
         *
         */
        function inViewHandler(entries) {
            const lis = Array.from(document.querySelectorAll(".menu__link"));
            lis.length && entries.forEach((entry) => {
                    const {target, isIntersecting} = entry;
                    if (isIntersecting) {
                        target.classList.add(ACTIVE_CLASS);
                        lis.find((item) => item.hash.includes(target.id)).classList.add(ACTIVE_CLASS);
                    } else {
                        entry.target.classList.remove(ACTIVE_CLASS);
                        lis.find((item) => item.hash.includes(target.id)).classList.remove(ACTIVE_CLASS);
                    }
                }
            );
        }


        /**
         * Sets up IntersectionObserver
         * @param elem - The element to observe
         * @param threshold - Observer threshold
         */
        function observeSections(elem, threshold) {
            const observer = new IntersectionObserver(inViewHandler, {
                threshold
            });
            let targets = document.querySelectorAll(elem);
            targets.forEach((target) => observer.observe(target));
        }

        /**
         * @param event - The click event object
         */
        function handleClick(e) {
            e.preventDefault();
            if (e.target.classList.contains("menu__link")) {
                let section = document.getElementById(e.target.href.split('#')[1]);
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }

        /**
         * Build Nav Items dynamically from the sections
         *
         */
        function buildLi(fragment, section) {
            let li = document.createElement("li");
            li.innerHTML = `<a href=#${section.id} class="menu__link">${section.dataset["nav"]}</a>`;
            fragment.appendChild(li);
            return fragment;
        }


        /**
         * Build Nav
         *
         */
        function buildNav() {
            let sections = document.querySelectorAll("section");
            let lis = Array.from(sections).reduce(buildLi, document.createDocumentFragment());
            nav.appendChild(lis);
        }


        /**
         * Initialize the App
         */
        function init() {
            if (document.readyState === 'interactive') {
                buildNav();
                observeSections("section", 0.4);
                document.body.onclick = handleClick
            }
        }

        document.onreadystatechange = init

    }
)()
