let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: 54.597286, lng: -5.930120 },
  });
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
        directionsRenderer.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        document.getElementById("mode").addEventListener("change", () => {
          calculateAndDisplayRoute(directionsService, directionsRenderer);
        });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const selectedMode = document.getElementById("mode").value;
    
    directionsService
        .route({
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode[selectedMode],
        })
        .then((response) => {
        directionsRenderer.setDirections(response);
        })
        .catch((e) => console.log("Error: " + e));
}

initMap();


// jQuery(function () {
//     initMap();
//     $('#logoutBtn').on('click', function () {
//         $.ajax({
//             method: 'get',
//             url: '/logout',
//             success: function (response) {
//                 $(location).attr('href','/login');
//             },
//             error: function (response) {
//                 $(location).attr('href', '/login');
//                 console.log('server error occurred ', response);
//             }
//         });
//     });

//     function initMap() {
//         const directionsRenderer = new google.maps.DirectionsRenderer();
//         const directionsService = new google.maps.DirectionsService();
//         const map = new google.maps.Map(document.getElementById("map"), {
//           zoom: 14,
//           center: { lat: 37.77, lng: -122.447 },
//         });
//         directionsRenderer.setMap(map);
//         calculateAndDisplayRoute(directionsService, directionsRenderer);
//         document.getElementById("mode").addEventListener("change", () => {
//           calculateAndDisplayRoute(directionsService, directionsRenderer);
//         });
//       }
    
//     function calculateAndDisplayRoute(directionsService, directionsRenderer) {
//     const selectedMode = document.getElementById("mode").value;
    
//     directionsService
//         .route({
//         origin: document.getElementById("from").value,
//         destination: document.getElementById("to").value,
//         travelMode: google.maps.TravelMode[selectedMode],
//         })
//         .then((response) => {
//         directionsRenderer.setDirections(response);
//         })
//         .catch((e) => window.alert("Directions request failed due to " + e));
//     }
// // });

