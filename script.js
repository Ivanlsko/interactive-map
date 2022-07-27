"use strict"
//360 
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready!");
});

//window.addEventListener('load', onVrViewLoad);



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
    let map = new google.maps.Map(document.getElementById("map"), {
      mapId: "ce05a83d3d265b9a", 
      center: { lat: 49.44, lng: 21.35 },
      zoom: 10.7,
      minZoom: 10,
      maxZoom: 13,
      fullscreenControl: 0,
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
      icon: "assets/pin-losie.svg"
    },
    {
      position: new google.maps.LatLng(49.509991351928946, 21.052843342098996),
      churchID: "Chrám sv. Demetra zo Solúna v Śnietnici",
      icon: "assets/pin-snietnica.svg"
    },
    {
      position: new google.maps.LatLng(49.540390964589605, 21.202099786286336),
      churchID: "Chrám sv. archanjela Michala v Przysłope",
      icon: "assets/pin-przyslop.svg"
    },
    {
      position: new google.maps.LatLng(49.292697168983466, 21.150125215055755),
      churchID: "Chrám svätého Lukáša v Krivom",
      icon: "assets/pin-krive.svg"
    },
    {
      position: new google.maps.LatLng(49.2919027660925, 21.074785697861376),
      churchID: "Chrám sv. Kozmu a Damiána - Lukov",
      icon: "assets/pin-lukov.svg"
    },
    {
      position: new google.maps.LatLng(49.35258195488909, 21.70782195740022),
      churchID: "Chrám sv. Mikuláša v Bodružali",
      icon: "assets/pin-bodruzal.svg"
    },
  ];

  // Create markers.
  for (let i = 0; i < positions.length; i++) {
    const marker = new google.maps.Marker({
      position: positions[i].position,
      churchID: positions[i].churchID,
      icon: icon,
      
      map,
      
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
  let number = informationShown ? 2 : 1;
  getData(number, currentChurch);
  setLanguage();
}
  
  var obj, varObj;

  function getData(number, currentChurch){
    let ID;
    console.log("currentchurch:", currentChurch) 
    this ? ID = this.churchID : ID = currentChurch;
    //if number isn't definied, getData() was called after clicked on map pin
    if (!(Number(number))) {
      document.querySelector("#church-name").setAttribute("title", this.churchID)

      number = 2;
    }
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
      //setAttribute(selectedChurch)
      loadMenu(jsonData)
      showInformation()
      //load360(selectedChurch)
      let relatedCard = document.querySelector(`.church-card[title="${ID}"]`)
      console.log("here", relatedCard)
      changeActiveState(relatedCard)
      load360(selectedChurch)
    }

    if (number == 3) {
      console.log("number 3")
      showData(selectedChurch)
      load360(selectedChurch)
      //loadMenu(jsonData)
      console.log("tuto:", ID)
      //changeActiveState(ID)

    }

    if (number == 1) loadMenu(jsonData)
  }

  function load360(church) {
    console.log("360", church.threesixty)
    //alert("loaded")
    // Selector '#vrview' finds element with id 'vrview'.
    if (document.querySelector("#media #vrview iframe")) {
      document.querySelector("#media #vrview iframe").remove();
    }
    var vrView =  new VRView.Player('#media #vrview', {
      image: church.threesixty,
      //is_stereo: true
      is_vr_off: true
    });
  
  }

  function showData(church) {
    document.querySelector("#church-name").innerHTML = church.name;
    document.querySelector("#church-type").innerHTML = church.type;
    document.querySelector("#church-year").innerHTML = church.year;
    document.querySelector("#church-style").innerHTML = church.style;
    document.querySelector("#short-description").innerHTML = church.shortDescription;
    document.querySelector("#long-description-paragraph").innerHTML = church.longDescription;
    document.querySelector("#video-iframe").src = church.video;
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
          i.remove();
      } else {
        i.remove();
      }
    }
    })

    Object.entries(jsonData).forEach((entry) => {
      const templateContent = document.querySelector(".template").content;
      const templateCopy = templateContent.cloneNode(true);
      let menuShortDescription = (entry[1].shortDescription).substring(0, 80) + "...";
/*       if(window.innerWidth > 640 && window.innerWidth < 860){
        menuShortDescription = (entry[1].shortDescription).substring(0, 110) + "...";} */
      let menuYear = (entry[1].year).substring(((entry[1].year).length) - 4);
      let cardName;
      if((entry[1].name).length > 31) {
        if (window.innerWidth > 1500) {
          if((entry[1].name).length > 40) {
            cardName = `${(entry[1].name).substring(0, 37)}...`
          } else {
            cardName = `${(entry[1].name).substring(0, 40)}`
          }
          
        } else cardName = `${(entry[1].name).substring(0, 31)}...`
      } else cardName = (entry[1].name);
      templateCopy.querySelector(".churches-menu-information > h3").textContent = `${entry[1].name/* cardName */}`;
      templateCopy.querySelector(".churches-menu-description").textContent = menuShortDescription;
      templateCopy.querySelector(".churches-menu-information .church-year").textContent = menuYear;
      templateCopy.querySelector(".churches-menu-information .church-type").textContent = `${entry[1].type}`;
      templateCopy.querySelector(".churches-menu-information .church-style").textContent = `${entry[1].style}`;
      templateCopy.querySelector(".churches-menu-img").src = `${entry[1].image}`;

      const parent = document.querySelector("#churches-menu");
      templateCopy.querySelector(".church-card").addEventListener("click", controllerCard)
      templateCopy.querySelector(".church-card").classList.add(`${document.documentElement.lang}`)
      parent.appendChild(templateCopy); 
    });

    let menuCards = document.querySelectorAll(".church-card");
    for(let i = 0; i < menuCards.length; i++) {
      if (i == 0) menuCards[i].setAttribute("title", "Chrám svätého Lukáša v Krivom");
      if (i == 1) menuCards[i].setAttribute("title", "Chrám sv. Mikuláša v Bodružali");
      if (i == 2) menuCards[i].setAttribute("title", "Chrám Narodenia Panny Márie v Losi");
      if (i == 3) menuCards[i].setAttribute("title", "Chrám sv. Kozmu a Damiána - Lukov");
      if (i == 4) menuCards[i].setAttribute("title", "Chrám sv. archanjela Michala v Przysłope");
      if (i == 5) menuCards[i].setAttribute("title", "Chrám sv. Demetra zo Solúna v Śnietnici");
    }
  }

  function controllerCard() {
    let clickedCard = this.getAttribute("title")
    console.log("controllerCard()")
    getData(3, clickedCard, this)
    console.log("controllerCard()", clickedCard)    
    document.querySelector("#church-name").setAttribute("title", clickedCard)
    showInformation(clickedCard)
    changeActiveState(this)
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

  function showInformation(title) {
    if (window.innerWidth < 860){
      document.querySelector("#churches-menu").style.zIndex = -1;
      document.querySelector("#show-menu-button").style.display = "none";
    }
    //console.log("showinformation()", title)
    document.querySelector("#information").style.opacity = 1;
    document.querySelector("#information").style.zIndex = 1;
    informationShown = true;

    document.querySelector("#map").style.zIndex = -1;
    document.querySelector("#map").style.opacity = 0;
  }


  document.querySelector("#back-to-map").addEventListener("click", () => {
    console.log("backtomap")
    document.querySelector("#show-menu-button").style.display = "block";
    document.querySelector("#churches-menu").style.zIndex = 1;

    document.querySelector("#information").style.opacity = 0;
    document.querySelector("#information").style.zIndex = -1;
    informationShown = false;

    document.querySelector("#map").style.opacity = 1;
    document.querySelector("#map").style.zIndex = 1;

    document.querySelector(".activeCard .btn").style.opacity = 0;
    document.querySelector(".activeCard").classList.remove("activeCard");




  })

window.initMap = initMap;

//responsivity

document.querySelectorAll(".operate-menu").forEach((i) => {
  i.addEventListener("click", operateMenu);
})

function operateMenu(){
  let menu = document.querySelector("#churches-menu");
  let menuStyle = getComputedStyle(menu);
  if(menuStyle.display == "none") {
    menu.style.zIndex = 1;
    menu.style.display = "flex"
  } else {
    menu.style.display = "none";
  }
}

window.addEventListener("resize", evalMenuDisplay)

function evalMenuDisplay(){
  if (window.innerWidth < 860) {
/*     console.count("eval")
    if (window.innerWidth < 640) {
    let menuPara = document.querySelectorAll(".churches-menu-description");
    menuPara.innerHTML = (menuPara.textContent).substring(0, 70)} */
    return;
  }
  let menuStyle = document.querySelector("#churches-menu").style.display;
  if (menuStyle == "none") {
    document.querySelector("#churches-menu").style.display = "flex"; }  
}
/* document.querySelector("#show-menu-button").addEventListener("click", () => {
  let btn = document.querySelector("#show-menu-button");
  let menu = document.querySelector("#churches-menu");
  let menuStyle = getComputedStyle(menu);
  if(menuStyle.display == "none") {
    btn.querySelector("p").textContent = "zatvoriť prehľad";
    menu.style.display = "flex"
  } else {
    menuStyle.display = "none";
    btn.querySelector("p").textContent = "prehľad kostolov"
  }
}) */

/*   document.querySelectorAll("#churches-menu").forEach((i) =>{
    console.log("jejje")
    i.addEventListener("click", getData)
  }) */