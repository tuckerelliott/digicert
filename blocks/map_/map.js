import maps from "https://maps.google.com/maps/api/js?key=AIzaSyDXzFn5v3nI8tvmgI9lDk17bVYszO0ThsI";

function initialize() {
  // Setup map and options
  const map = new google.maps.Map(document.getElementById("map_canvas"), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  let bounds = new google.maps.LatLngBounds();

  fetch("locations.json")
    .then((response) => response.json())
    .then((data) => {
      // Loop through the data
      if (Array.isArray(data.data)) {
        data.data.forEach((item) => {
          const myLatlng = new google.maps.LatLng(item.lat, item.lng); // set position

          // Add marker to map
          const marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
          });

          bounds.extend(marker.position); // extend bounds with marker

          // Set info window content
          let infoContent = "<strong>" + item.name + "</strong>";
          infoContent += "<p>" + item.address + "</p>";

          // Add info window
          marker.info = new google.maps.InfoWindow({
            content: infoContent,
          });

          // Add listener for info window
          google.maps.event.addListener(marker, "click", function () {
            marker.info.open(map, marker);
          });

          // Add marker location to loc var
          const loc = new google.maps.LatLng(
            marker.position.lat(),
            marker.position.lng()
          );

          // extend bounds with loc
          bounds.extend(loc);
        });
        map.fitBounds(bounds);
        map.panToBounds(bounds);
      } else {
        console.error("Error: data is not an array");
      }
    })
    .catch((error) => console.error("Error:", error));
}

export default async function decorate(block) {}
