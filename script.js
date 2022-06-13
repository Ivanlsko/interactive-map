"use strict"
//360 
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready!");
});

//window.addEventListener('load', onVrViewLoad);

function onVrViewLoad() {
  //alert("loaded")
  // Selector '#vrview' finds element with id 'vrview'.
  var vrView = new VRView.Player('#vrview', {
    image: 'https://live.staticflickr.com/65535/52110870100_fb24ecbe34_k.jpg',
    //is_stereo: true
    is_vr_off: true
  });

}

var informationShown = false;
getData(1);

//Menu


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
      churchID: "Chrám Narodenia Panny Márie v Losi",
    },
    {
      position: new google.maps.LatLng(49.509991351928946, 21.052843342098996),
      churchID: "Chrám sv. Demetra zo Solúna v Śnietnici",
    },
    {
      position: new google.maps.LatLng(49.540390964589605, 21.202099786286336),
      churchID: "Chrám sv. archanjela Michala v Przysłope",
    },
    {
      position: new google.maps.LatLng(49.292697168983466, 21.150125215055755),
      churchID: "Chrám svätého Lukáša v Krivom",
    },
    {
      position: new google.maps.LatLng(49.2919027660925, 21.074785697861376),
      churchID: "Chrám sv. Kozmu a Damiána - Lukov",
    },
    {
      position: new google.maps.LatLng(49.35258195488909, 21.70782195740022),
      churchID: "Chrám sv. Mikuláša v Bodružali",
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
    console.log(this)
    if (this.id == "polish") {
      document.querySelector("#slovak").classList.add("language_inactive");
      document.documentElement.lang = "pl";
    }
    else {
    document.querySelector("#polish").classList.add("language_inactive");
    document.documentElement.lang = "sk";
  }
  let currentChurch = document.querySelector("#church-name").getAttribute("title");
  let number = informationShown ? 2 : 3;
  getData(number, currentChurch);
  setLanguage();
}
  
  var obj, varObj;

  function getData(number, currentChurch){
    let ID;
    this ? ID = this.churchID : ID = currentChurch;
    //if number isn't definied, getData() was called after clicked on map pin
    if (!(Number(number))) number = 2;
    console.log("id", ID, "number ", number)

    if(document.documentElement.lang == "sk") {
      console.log("sk data")
     fetch('data_sk.json')
      .then(res => res.json())
      .then(data => obj = data)
      //on click get all json data (obj), and data of clicked marker (this)
      .then(() => controller(number, obj, ID))
        }
  
    if(document.documentElement.lang == "pl") {
      console.log("pl data")
     fetch('data_pl.json')
      .then(res => res.json())
      .then(data => obj = data)
      //on click get all json data (obj), and data of clicked marker (this)
      .then(() => controller(number, obj, ID))
        }   
      }

  //controller function
  function controller(number, jsonData, ID) {
    console.log("controller()")
    //from jsonData select ID of clicked marker
    //clicked markers ID is used also as object name in JSON file so it trigers correct church
    //console.log(clickedMarker.churchID)
    let selectedChurch = jsonData[`${ID}`]
    if (number == 2) {
      console.log("number 2")
      showData(selectedChurch)
      setAttribute(selectedChurch)
      showInformation()
    }

    if (number == 3) {
      console.log("number 3")
      loadMenu(jsonData)
    }

    if (number == 1) loadMenu(jsonData)
  }

  function showData(church) {
    document.querySelector("#church-name").innerHTML = church.name;
    document.querySelector("#church-type").innerHTML = church.type;
    document.querySelector("#church-year").innerHTML = church.year;
    document.querySelector("#church-style").innerHTML = church.style;
    document.querySelector("#short-description").innerHTML = church.shortDescription;
    document.querySelector("#long-description-paragraph").innerHTML = church.longDescription;
  }

  function setAttribute(church) {
    document.querySelector("#church-name").setAttribute(`title`, `${church.name}`)
  }

  function loadMenu(jsonData) {
    console.log(jsonData)
    document.querySelectorAll(".church-card").forEach((i) => {
      if (i.classList.length > 1) {
        if (i.classList[(i.classList.length) - 1] == "sk") {
          console.log(i)
          i.style.display = "none";
      } else {
        i.style.display = "none";
      }
    }
    })

    Object.entries(jsonData).forEach((entry) => {
      const templateContent = document.querySelector(".template").content;
      const templateCopy = templateContent.cloneNode(true);
      templateCopy.querySelector(".churches-menu-information > h3").textContent = `${entry[1].name}`;
      const parent = document.querySelector("#churches-menu");
      templateCopy.querySelector(".church-card").addEventListener("click", controllerCard)
      templateCopy.querySelector(".church-card").classList.add(`${document.documentElement.lang}`)
      parent.appendChild(templateCopy); 
    });
  }

  function controllerCard() {
    let clickedCard = (this.querySelector("h3")).textContent
    console.log("controllerCard()")
    getData(2, clickedCard)
    changeActiveState(this)
    showInformation()
  }

  function changeActiveState(clickedCard) {
    console.log(clickedCard)
/*     if (clickedCard.classList == "activeCard") {
      alert("already")
    } */
    if (document.querySelector(".church-card.activeCard"))  {
      document.querySelector(".church-card.activeCard .btn").style.opacity = 0;
    document.querySelector(".church-card.activeCard").classList.toggle("activeCard")
    }
    clickedCard.classList.add("activeCard")
    document.querySelector(".activeCard .btn").style.opacity = 1;
  }  

  function showInformation() {
    console.log(this)
    document.querySelector("#information").style.opacity = 1;
    document.querySelector("#information").style.zIndex = 1;
    informationShown = true;

    document.querySelector("#map").style.zIndex = -1;
    document.querySelector("#map").style.opacity = 0;
  }


  document.querySelector("#back-to-map").addEventListener("click", () => {
    console.log("backtomap")
    document.querySelector("#information").style.opacity = 0;
    document.querySelector("#information").style.zIndex = -1;
    informationShown = false;

    document.querySelector("#map").style.opacity = 1;
    document.querySelector("#map").style.zIndex = 1;

  })

window.initMap = initMap;

/*   document.querySelectorAll("#churches-menu").forEach((i) =>{
    console.log("jejje")
    i.addEventListener("click", getData)
  }) */