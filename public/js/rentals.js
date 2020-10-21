// Fetch lan and lat for a city
var cityName = document.getElementById("cityName").value

var center = {}
switch (cityName) {
    case "Toronto":
        center = {
            lng: -79.3832,
            lat: 43.6532,
        }
        break;
    case "New York":
        center = {
            lng: -73.935242,
            lat: 40.730610
        }
        break;
    case "Waterloo":
        center = {
            lng: -80.516670,
            lat: 43.466667
        }
        break;

    default:
        center = {
            lng: -80.516670,
            lat: 43.466667
        }
}



console.log(center)
function initMap() {
    var options = {
        zoom: 11,
        center: center,
    }

    var map = new google.maps.Map(document.getElementById('maps'), options)

    // Configure markers here:
    const listings = Array.from(document.getElementsByClassName("locations"))
    const prices = Array.from(document.getElementsByClassName("prices"))
    var markers = []
    for (let i = 0; i < listings.length; i++) {
        markers.push({
            position: getCoordinates(listings[i].value, prices[i].innerHTML),
        })
    }

    window.addMarker = function (params) {
        var marker = new google.maps.Marker({
            position: params.position,
            label: params.label,
            map: map,
            icon: {
                url: 'img/marker.png',
                size: new google.maps.Size(50, 35),
                origin: new google.maps.Point(0, -6),
            }
        })



        return marker

    }

    for (let i = 0; i < markers.length; i++) {
        markers[i] = addMarker(markers[i]);
    }

    let firstZoom = true

    for (let i = 0; i < markers.length; i++) {
        markers[i].addListener("click", () => {
            alert("click")
            if (firstZoom) {
                firstZoom = false
                map.setZoom(14.5);
                map.setCenter(markers[i].getPosition());
            }
            markers[i].setIcon('img/marker2.png');

            let otherCheckedMarker = []
            markers.forEach(marker => {
                if (marker.checked) {
                    marker.setIcon('img/marker.png')
                    marker.checked = false
                    otherCheckedMarker.push(marker)
                }
            })
            console.log(otherCheckedMarker)
            // otherCheckedMarker.icon.url = 'marker.png'
            markers[i].checked = true
        });

    }

}

function getCoordinates(address, price) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + ",+Mountain+View,+CA&key=AIzaSyAsrsaCC1KXl9QRDG5Xeda3hqAf0kOQ5No"
    fetch(url)
        .then(res => res.json())
        .then((out) => {

            addMarker({
                position: {
                    lat: out.results[0].geometry.location.lat,
                    lng: out.results[0].geometry.location.lng
                },
                label: price,
            })
        })
        .catch(err => {
            alert(err)
            throw err
        });
}

