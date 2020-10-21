const selectCity = (value) => {
    document.getElementById("selectCityField").innerHTML = value
}

function showCityList() {
    document.getElementsByClassName("my-dropdown-list")[0].style.visibility = "visible"
    document.getElementsByClassName('my-dropdown-select')[0].classList.add('smoothCorners')
        // list.style.visibility = "visible";
        // list.classList.add('smoothCorners')

}

function hideCityList() {
    document.getElementsByClassName("my-dropdown-list")[0].style.visibility = "hidden"
    document.getElementsByClassName('my-dropdown-select')[0].classList.remove('smoothCorners')
}

function goToProperties() {
    let city = document.getElementById("selectCityField").innerHTML
    window.location.href = "/properties?city=" + city;
}