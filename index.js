mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2lyZ2V0dG8iLCJhIjoiY2pqeTN3Z3p0MnZ4eDNybWF6NjFyeTJybCJ9.EpIVsQVachGWPiHwCijVOg";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-118.243683, 34.052235],
  zoom: 10,
});

fetch("https://api.metro.net/LACMTA/vehicle_positions/all")
  .then((response) => {
    return response.json();
  })
  .then((vehicles) => {
    console.log(vehicles);

    function actualizar() {
      console.log("Actualizado 10s atras")
      vehicles.forEach((vehicle) => {
        let longitude = vehicle.position.longitude;
        let latitude = vehicle.position.latitude;
        let id = vehicle.vehicle.vehicle_id;
        
        var marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map)
          .setPopup(new mapboxgl.Popup().setHTML(id));
      });
    }
    setInterval(actualizar, 10000)
  });
