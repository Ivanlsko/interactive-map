"use strict"
//360 

window.addEventListener('load', onVrViewLoad);

function onVrViewLoad() {
  // Selector '#vrview' finds element with id 'vrview'.
  var vrView = new VRView.Player('#vrview', {
    image: 'https://live.staticflickr.com/65535/52110870100_fb24ecbe34_k.jpg',
    //is_stereo: true
    is_vr_off: true
  });

}


//LANGUAGE
setLanguage()
function setLanguage() {
const langs = document.querySelectorAll("#language > div");
langs.forEach((div) => {
  div.style.cursor = "pointer"
  if (div.classList == "language_inactive"){
  div.addEventListener("click", manageLangs);
  } 
})
};

function manageLangs() {
    this.classList.remove("language_inactive");
    if (this.id == "polish") {
      document.querySelector("#slovak").classList.add("language_inactive");
      document.documentElement.lang = "pl";
    }
    else {
    document.querySelector("#polish").classList.add("language_inactive");
    document.documentElement.lang = "sk";
  }
  let currentChurch = document.querySelector("#church-name").textContent;
  getData(currentChurch);
  setLanguage();
}

//MAP
const SKPL_BOUNDS =  {
  north: 50,
  south: 48.52,
  west: 14.22,
  east: 23.22,
};

var gmarkers = Array();


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      mapId: "ce05a83d3d265b9a", 
      center: { lat: 49.44, lng: 21.1 },
      
      zoom: 10.7,
      minZoom: 10,
      maxZoom: 13,
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
      position: new google.maps.LatLng(49.57179396544074, 21.089980142115593),
      churchID: "Gréckokatolícky chrám Narodenia Panny Márie v Losi",
    },
    {
      position: new google.maps.LatLng(49.509991351928946, 21.052843342098996),
      churchID: "Gréckokatolícky chrám sv. Demetra zo Solúna v Śnietnici",
    },
    {
      position: new google.maps.LatLng(49.540390964589605, 21.202099786286336),
      churchID: "Gréckokatolícky chrám sv. archanjela Michala v Przysłope",
    },
    {
      position: new google.maps.LatLng(49.292697168983466, 21.150125215055755),
      churchID: "Gréckokatolícky chrám svätého Lukáša v Krivom",
    },
    {
      position: new google.maps.LatLng(49.2919027660925, 21.074785697861376),
      churchID: "Drevený chrám sv. Kozmu a Damiána - Lukov",
    },
    {
      position: new google.maps.LatLng(49.35258195488909, 21.70782195740022),
      churchID: "Gréckokatolícky chrám sv. Mikuláša v Bodružali",
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
  function getData(currentChurch){
    //console.log(document.documentElement.lang)
    let ID;
    this ? ID = this.churchID : ID = currentChurch;
    console.log("id", ID)

   if(document.documentElement.lang == "sk") {
     fetch('data_sk.json')
      .then(res => res.json())
      .then(data => obj = data)
      //on click get all json data (obj), and data of clicked marker (this)
      .then(() => controller(obj, ID))
        }
  
    if(document.documentElement.lang == "pl") {
     fetch('data_pl.json')
      .then(res => res.json())
      .then(data => obj = data)
      //on click get all json data (obj), and data of clicked marker (this)
      .then(() => controller(obj, ID))
        }   
      }

  //controller function
  function controller(jsonData, ID) {
    //from jsonData select ID of clicked marker
    //clicked markers ID is used also as object name in JSON file so it trigers correct church
    //console.log(clickedMarker.churchID)
    console.log(jsonData)
    let selectedChurch = jsonData[`${ID}`]
    showData(selectedChurch)
  }

  function showData(church) {
    document.querySelector("#church-name").innerHTML = church.name;
    document.querySelector("#church-type").innerHTML = church.type;
    document.querySelector("#church-year").innerHTML = church.year;
    document.querySelector("#church-style").innerHTML = church.style;
    document.querySelector("#short-description").innerHTML = church.shortDescription;
    document.querySelector("#long-description-paragraph").innerHTML = church.longDescription;
  }

  window.initMap = initMap;