
const toggleClass = () => {
    let hamburgerMenu = document.getElementsByClassName('hamburger-menu')[0]
    let menu = document.getElementById('mobileNav')
    if (hamburgerMenu.classList.contains("animate")) {
        hamburgerMenu.classList.remove("animate")
        menu.style.height="0px"
    }else{
        hamburgerMenu.classList.add("animate")
        menu.style.height="100vh"
    }
}