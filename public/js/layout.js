
window.onscroll = myFunction;

function myFunction() {
    if (document.body.scrollTop > 275 || document.documentElement.scrollTop > 275){
        document.getElementsByClassName("navBar")[0].className = "navMove";
    } else {
        document.getElementsByClassName("navMove")[0].className = "navBar";
    }
}
