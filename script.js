const SKPL_BOUNDS =  {
  north: 50,
  south: 48.52,
  west: 14.22,
  east: 23.22,
};



function initMap() {
    new google.maps.Map(document.getElementById("map"), {
      mapId: "ce05a83d3d265b9a", 
      center: { lat: 49.3423, lng: 19.1075 },
      
      zoom: 9,
      minZoom: 8,
      maxZoom: 10,
      restriction: {
        latLngBounds: SKPL_BOUNDS,
        strictBounds: false,
      },
  
    });

  const icon = document.createElement("icon");
  icon.src = "assets/map-pin.svg"
  const positions = [
    {
      position: new google.maps.LatLng(49.8423, 17.1075),
    },
    {
      position: new google.maps.LatLng(49.5423, 18.1075),
    },
    {
      position: new google.maps.LatLng(48.9423, 19.1075),
    },
    {
      position: new google.maps.LatLng(49.1423, 20.1075),
    },
    {
      position: new google.maps.LatLng(49, 16.6075),
    },
    {
      position: new google.maps.LatLng(49.7, 21.1075),
    },
  ];

  // Create markers.
  for (let i = 0; i < positions.length; i++) {
    const marker = new google.maps.Marker({
      position: positions[i],
      icon: icon,
      map: map,
    });
  }

  }
  
  window.initMap = initMap;