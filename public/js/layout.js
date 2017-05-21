window.onscroll = fixNav;

var mainContainer = document.getElementsByClassName("main-container")[0];

function fixNav() {
    // console.log(document.body.scrollTop);
    if (document.body.scrollTop > 275){
        document.getElementsByClassName("navBar")[0].classList.add("navMove");
        mainContainer.classList.add("fixed-nav-container-margin");
    } else {
        document.getElementsByClassName("navMove")[0].classList.remove("navMove");
        mainContainer.classList.remove("fixed-nav-container-margin");
    }

}
