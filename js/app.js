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
 * Define Global Variables
 * 
*/
let navigationMenu = document.querySelector('ul'); //nav menu that contains menu links 
let sections = document.querySelectorAll('section'); // selecting all sections to build the nav menu dynmicaly
let scrol = document.createElement('div'); // div that doing scroll to top  
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// create menu link dynamically 
function creatMenuItem(element) {
    let section = element.getAttribute('data-nav');
    let menuItem = document.createElement('li');
    menuItem.classList.add('menu__link');
    menuItem.innerHTML = `<a>${section}</a>`;
    navigationMenu.appendChild(menuItem);
}

// scroll to top function will called at 'add active class part' when section 2 show on screen
function scrollToTop() {
    scrol.innerHTML = `<strong>Top</strong>`;
    scrol.style.cssText = 'position: fixed; bottom : 30; right : 30; background-color: rgba(255, 0, 0, 0.603); color : #fff; width : 50px; height: 25px; text-align: center; cursor: pointer; border-radius: 5px; ';
    scrol.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(scrol);
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
sections.forEach(element => {
    creatMenuItem(element);
});



// Add class 'active' to section when near top of viewport
let menuItems = document.querySelectorAll('.menu__link');//return all links in menu
function activateSection() {
    for (const sec of sections) {
        document.addEventListener('scroll', function () {
            let top = sec.getBoundingClientRect().top;
            if (top < 200 && top > -200) {
                sec.classList.add("your-active-class");

                //Activate menu item paralell with active section
                for (const item of menuItems) {
                    if (item.textContent === sec.getAttribute('data-nav')) {
                        item.style.cssText = 'background: #333; color: #fff;';

                        //Scrolling to top 
                        if (sec.getAttribute('data-nav') >= 'Section 2') {
                            scrollToTop();
                        } else {
                            scrol.style = 'display : none';
                        }

                    }
                    else {
                        item.style = 'none';
                    }
                }
            }
            else {
                sec.classList.remove("your-active-class");
            }
        });
    }
}

// Scroll to anchor ID using scrollTO event
function scrollTO() {
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            let itemNumber = item.textContent.slice(item.textContent.length - 1);
            for (const sec of sections) {
                console.log(sec.getBoundingClientRect().top);
                let secNumber = sec.getAttribute('data-nav');
                if (itemNumber === secNumber.slice(secNumber.length - 1)) {
                    sec.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
}


// menu button event at small screen 
function menuButton() {
    let button = document.querySelector('.menu');
    button.addEventListener('click', function () {
        let list = document.querySelector('#navbar__list');
        list.style = 'display : flex';
        setTimeout(function () {
            list.style = 'display : none';
        }, 3000);
    });

}
menuButton();

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click
scrollTO();
// Set sections as active
activateSection();

