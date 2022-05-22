const SKPL_BOUNDS =  {
  north: 50,
  south: 48.52,
  west: 14.22,
  east: 23.22,
};

var gmarkers = Array();

/* const data = fetch("./data.json")
.then(response => {
   return response.json();
})
.then((jsondata) => {
  console.log(jsondata)});


  

console.log(data) */



  



/* async function fun() {
  return fetch('data.json').then(res => res.json());
}
 
const data  = await fun();

console.log(data) */





function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
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

    const icon = {
      url: "assets/map-pin.svg",
      scaledSize: new google.maps.Size(40, 64),
    };

  

  const positions = [
    {
      position: new google.maps.LatLng(49.8423, 17.1075),
      churchID: "#svmikulas",
    },
    {
      position: new google.maps.LatLng(49.5423, 18.1075),
      churchID: "#svmikulas",
    },
    {
      position: new google.maps.LatLng(48.9423, 19.1075),
      churchID: "#svmikulas",
    },
    {
      position: new google.maps.LatLng(49.1423, 20.1075),
      churchID: "#svkonkamikulas",
    },
    {
      position: new google.maps.LatLng(49, 16.6075),
      churchID: "#svmikulas",
    },
    {
      position: new google.maps.LatLng(49.7, 21.1075),
      churchID: "#svmikulas",
    },
  ];

  // Create markers.
  for (let i = 0; i < positions.length; i++) {
    const marker = new google.maps.Marker({
      position: positions[i].position,
      churchID: positions[i].churchID,
      map,
      icon: icon,
      //map: map,
      
    });
    marker.addListener("click", getData)
  }

  }
  
  var obj, varObj;
  function getData(){
    
   fetch('data.json')
      .then(res => res.json())
      .then(data => obj = data)
      .then(() => controller(obj, this))
        }

  function controller(data, clickedMarker) {
    showData(data, clickedMarker.churchID)
  }

  function showData(data, ID) {
    console.log(data)
    console.log(ID)
  }
  window.initMap = initMap;