async function loadXMLData(url) {
    try {
        const response = await fetch(url);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        return xmlDoc;
    } catch (error) {
        console.error('Error loading XML:', error);
        return null;
    }
}

function evaluateXPath(xmlDoc, xpath) {
    const result = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE, null);
    return result.stringValue;
}


let maploaded = false;

// Fonction pour changer la couleur de fond en bleu et la couleur des textes de boutons en blanc
function changeColors() {
    var body = document.body;

    body.style.backgroundColor = "blue";
    var leftColumn = document.querySelector(".left-column");
    var rightColumn = document.querySelector(".right-column");
    var titre = document.querySelector("h1");

    leftColumn.style.backgroundColor = "blue";
    rightColumn.style.backgroundColor = "blue";
    titre.style.color = "white";

    var buttons = document.querySelectorAll("input[type='button']");

    buttons.forEach(function(button) {
        button.style.color = "white";
    });
}

// Fonction pour rechanger la couleur de fond en blanc
function BacktoWhite() {
    var body = document.body;

    body.style.backgroundColor = "white";
    var leftColumn = document.querySelector(".left-column");
    var rightColumn = document.querySelector(".right-column");
    var titre = document.querySelector("h1");

    leftColumn.style.backgroundColor = "white";
    rightColumn.style.backgroundColor = "white";
    titre.style.color = "#4682B4";

}


// Fonction pour rendre les pays cliquables
function makeCountriesClickable() {
    var paths = document.querySelectorAll("#worldMapContainer path");

    paths.forEach(function(path) {
        // Ajouter un event listener seulement s'il n'y en a pas déjà un pour éviter les doublons
        if (!path.hasClickListener) {
            path.addEventListener("click", function() {
                var countryName = path.getAttribute("countryname");

                alert("Pays : " + countryName);

                // Empêcher la propagation de l'événement de clic aux éléments parents
                event.stopPropagation();
            });
            path.hasClickListener = true;
        }
    });
}



// Fonction pour charger et afficher la carte du monde SVG
function loadWorldMapSVG() {
    // Charger le fichier worldHigh.svg en utilisant la fonction chargerHttpXML
    chargerHttpXML("worldHigh.svg", function(response) {
        // Vérifier si la réponse est correcte
        if (response !== null) {
            var svgString = new XMLSerializer().serializeToString(response);
            document.getElementById("worldMapContainer").innerHTML = svgString;
            maploaded = true;
        } else {
            console.error("Echec du chargement de la map du monde SVG.");
        }
    });
}


var button11 = false;

// Fonction pour afficher les informations du pays
function displayCountryInfo() {
    var countryCode = document.getElementById("countryCode").value;

    if (countryCode.trim() === "") {
        alert("Veuillez saisir un code de pays.");
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlData = this.responseXML;
            console.log(xmlData); // Ajout de cette ligne pour afficher le contenu XML dans la console
            var countries = xmlData.getElementsByTagName("country");
            var countryInfo = "Pays non trouve.";

            for (var i = 0; i < countries.length; i++) {
                var country = countries[i];
                var cca2 = country.querySelector("country_codes cca2").textContent;
                if (cca2 === countryCode) {
                    var officialName = country.querySelector("offic_name").textContent;
                    var capital = country.querySelector("capital").textContent;
                    countryInfo = "Nom officiel : " + officialName + "<br>Capitale : " + capital;
                    break;
                }
            }

            document.getElementById("countryInfo").innerHTML = countryInfo;
            makeCountriesClickable();
        }
        
    };
    xhttp.open("GET", "countriesTP.xml", true);
    xhttp.send();

    if (button11){
        colorLanguage(countryCode)
    }
}



function loadAndDisplaySVG() {
    // Charger le fichier SVG en utilisant AJAX
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var svgString = this.responseText;
            document.getElementById("svgContainer").innerHTML = svgString;
        }
    };
    xhttp.open("GET", "exemple.svg", true);
    xhttp.send();
}

function makeSVGElementsClickable() {
    // Sélectionner tous les cercles du SVG et les rendre cliquables
    var circles = document.querySelectorAll("circle");
    circles.forEach(function(circle) {
        // Ajouter un event listener seulement s'il n'y en a pas déjà un (là encore pour éviter les doublons si plusieurs cliques)
        if (!circle.hasClickListener) {
            circle.addEventListener("click", function() {
                alert(circle.getAttribute("title"));
            });
            // Marquer le cercle comme ayant un event listener
            circle.hasClickListener = true;
        }
    });

    // Sélectionner tous les rectangles du SVG et les rendre cliquables
    var rectangles = document.querySelectorAll("rect");
    rectangles.forEach(function(rectangle) {
        // Ajouter un event listener seulement s'il n'y en a pas déjà un
        if (!rectangle.hasClickListener) {
            rectangle.addEventListener("click", function() {
                alert(rectangle.getAttribute("title"));
            });
            // Marquer le rectangle comme ayant un event listener
            rectangle.hasClickListener = true;
        }
    });

    // Sélectionner tous les chemins du SVG et les rendre cliquables
    var paths = document.querySelectorAll("path");
    paths.forEach(function(path) {
        // Ajouter un event listener seulement s'il n'y en a pas déjà un
        if (!path.hasClickListener) {
            path.addEventListener("click", function() {
                alert(path.getAttribute("title"));
            });
            // Marquer le chemin comme ayant un event listener
            path.hasClickListener = true;
        }
    });
}


function chargerHttpXML(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, "text/xml");
            callback(xmlDoc);
        })
        .catch(error => console.error('Error loading XML:', error));
}


function chargerHttpJSON(jsonDocumentUrl) {

    let httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/json');
    }

    // chargement du fichier JSON a l'aide de XMLHttpRequest synchrone
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    let responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

// Variable pour stocker la référence du pays actuel
let currentCountry = null;
let showCurrency =false;
let infoBubble = document.createElement("div");
infoBubble.setAttribute("id","infoBubble");
infoBubble.style.display="none";
window.onload = () => {document.body.appendChild(infoBubble)};



// Ajouter un gestionnaire d'événements pour le survol de la souris sur chaque pays
function captureMouseMovement() {
    let countries = document.getElementById('worldMapContainer').children[0].getElementsByTagName('g')[0].children;

    for(let i = 0 ; i < countries.length ; i++){
        let previousColor = countries[i].style.fill;

        countries[i].addEventListener('mouseover' , mouseOver)

        countries[i].addEventListener('mouseleave', function() {
            if (this.style.fill !== "red" && this.style.fill !== "green"){
                this.style.fill = previousColor;
            }
            infoBubble.style.display = "none";
        })
    }

}




// Fonction pour afficher les informations du pays au survol de la souris
async function mouseOver() {
    const countryCode = this.getAttribute('id');

    // Mettre à jour la couleur du pays lorsqu'il est survolé
    if (this.style.fill !== "red"){
    this.style.fill = "#87ceeb";
    }
    //si le bouton 10 est cliqué, on affiche la monaie du pays
    if (showCurrency){
        let currency = "https://restcountries.com/v2/alpha/" + countryCode ;

        let JsonFile = chargerHttpJSON(currency);

        var currencyName = JsonFile.currencies[0].name;

    }

    // Récupérer les informations sur le pays à partir du fichier XML
    const xmlData = await loadXMLData('countriesTP.xml');
    if (xmlData) {
        const xpathCapital = `//country[country_codes/cca2 = '${countryCode}' ]/capital`;
        const capital = evaluateXPath(xmlData, xpathCapital);

        const xpathLanguages = `//country[country_codes/cca2 = '${countryCode}' ]/languages`;
        const languages = evaluateXPath(xmlData, xpathLanguages);

        const flag = `http://www.geonames.org/flags/x/${countryCode.toLowerCase()}.gif`;

        // Créer l'infoBubble pour les informations du pays
        let infospan = document.getElementById("infospan");
        infospan.appendChild(infoBubble);


        infoBubble.classList.add("infoBubble");

        // Mettre à jour le contenu de l'infoBubble
        infoBubble.innerHTML = `
            <div class="infoBubble__content">
                <div class="infoBubble__country">${this.getAttribute('countryname')}</div>
                <div class="infoBubble__capital"><span>Capital:</span> ${capital}</div>
                <div class="infoBubble__languages"><span>Languages:</span> ${languages}</div>
                ${showCurrency ? `<div class="infoBubble__currency"><span>Currency:</span> ${currencyName}</div>` : ''}
                <div class="infoBubble__flag"><img src="${flag}" width="50" alt=""></div>
            </div>
        `;
        infoBubble.style.display = "block";
        document.addEventListener('mousemove',(event) => {
            infoBubble.style.left = `${event.pageX+10}px`;
            infoBubble.style.top = `${event.pageY-10}px`;
        });
    } else {
        console.error("Failed to load XML data.");
    }
}


function chargerFichierXml(xmlDocumentUrl) {

    let httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

function addAutoComplete(){
    let autoComplete = document.getElementById("myButton9");

    autoComplete.style.backgroundColor = '#32CD32';

    autoComplete.value = "Autocomplete activee";

    const inputField = document.getElementById("countryCode");

    const button = document.getElementById("myButton9");

    const parser = new DOMParser();

    // On récupère tous les CCA2 des pays
    const xpath = "//country/country_codes/cca2";

    var xmlDoc = chargerFichierXml("countriesTP.xml");

    const nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

    const options = [];

    let node = nodes.iterateNext();
    while (node) {
        options.push(node.textContent);
        node = nodes.iterateNext();
    }

    // Création de la datalist
    const datalist = document.createElement("datalist");
    datalist.id = "autoComplete";

    // On rajoute les options du tablea options à la datalist
    for( let option in options ){
        const optionElement = document.createElement("option");

        optionElement.setAttribute("value", options[option] );
        datalist.appendChild(optionElement);
    }

    // On rajoute la datalist à notre document
    inputField.appendChild(datalist);

    // On lie l'input et la datalist
    inputField.setAttribute("list" , datalist.id);

}


function addCurrency (){
    showCurrency = true;
}

function colorLanguage(countryCode){
    button11 = true;

    let mapContainer = document.getElementById("worldMapContainer");
    let mapSVG = mapContainer.children[0];

    let countryList = mapSVG.getElementsByTagName("g")[0].children;

    // On recolorie les pays à leur couleur d'origine
    let countries = mapSVG.querySelectorAll(".land");
    countries.forEach(function(country) {
        if (country.style.fill !== "red" && country.style.fill !== "green")
            country.style.fill = "#cccccc";
    });

    let xmlDoc = chargerFichierXml("countriesTP.xml");


    // Récupération des langages du pays
    xpath = `//country[country_codes/cca2 = '${countryCode}']/languages/*`;
    let langList = xmlDoc.evaluate(xpath , xmlDoc, null , XPathResult.ANY_TYPE, null);

    let lang = langList.iterateNext();

    while(lang){
        // On récupère les cca2 des pays qui parlent les mêmes langues
        xpath = `//country[languages/* = '${lang.textContent}']/country_codes/cca2`;
        let matchList = xmlDoc.evaluate(xpath , xmlDoc, null , XPathResult.ANY_TYPE , null);

        // on colorie en vert les pays qui parlent la même langue
        let match = matchList.iterateNext();

        while(match){
            if( mapSVG.getElementById(match.textContent) != null ){
                mapSVG.getElementById(match.textContent).style.fill = 'green';
            }

            match = matchList.iterateNext();
        }

        lang = langList.iterateNext();

    }
}

let inGame =false;
var xmlDoc = chargerFichierXml("countriesTP.xml");
let countryCodes = xmlDoc.getElementsByTagName("cca2");


// Retourne le nom d'un pays aléatoire
function getRandomCountryCode(){

    const randomCountryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)].textContent;

    return randomCountryCode;

}

// Retourne le nom d'un pays a partir de son code
function getCountryNameFromCode( countryCode ){

    let xpath = `//country[country_codes/cca2 = '${countryCode}']/country_name/common_name`;

    return xmlDoc.evaluate( xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
}

// Retourne la capitale d'un pays a partir de son code
function getCountryCapitalFromCode ( countryCode ){
    let xpath = `//country[country_codes/cca2 = '${countryCode}']/capital`;

    return xmlDoc.evaluate( xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
}

function guessCountry() {
    // Effacer le contenu de l'élément countryToSearch
    document.getElementById('countryToSearch').innerHTML = "";

    // Sélectionner tous les pays sur la carte
    let countries = document.getElementById('worldMapContainer').children[0].getElementsByTagName('g')[0].children;

    // Sélectionner un code de pays aléatoire
    let countryCodes = xmlDoc.getElementsByTagName("cca2");
    const randomCountryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)].textContent;

    // Trouver le nom du pays correspondant au code aléatoire
    let xpath = `//country[country_codes/cca2 = '${randomCountryCode}']/country_name/common_name`;
    let randomCountryName = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;

    // Afficher le nom du pays à trouver
    document.getElementById('countryToSearch').innerHTML = "<strong> Indiquez sur la carte l'emplacement de ce pays :</strong> " + randomCountryName;

    // Effacer le contenu de l'élément countryClique
    document.getElementById('countryClique').innerHTML = "";

    for (let i = 0; i < countries.length; i++) {
        // Vérifier si le pays a déjà été coloré en rouge ou en vert et le réinitialiser
        if (countries[i].style.fill === "red" || countries[i].style.fill === "green") {
            countries[i].style.fill = ""; // Réinitialiser la couleur d'origine
        }
    }
    // Initialiser le compteur d'essais
    let attemptNumber = 0;

    // Attacher un écouteur d'événements à chaque pays
    for (let i = 0; i < countries.length; i++) {
        countries[i].addEventListener('click', function () {
            let countryCodeClicked = this.getAttribute('id');
            attemptNumber++; // Incrémenter le compteur d'essais
            if (randomCountryCode === countryCodeClicked) {
                // Le pays cliqué est le bon
                document.getElementById('countryClique').innerHTML = "<strong style='color: green;'>Bravo! Vous avez trouve le pays en " + attemptNumber + " essai(s). Recliquez sur le bouton pour rejouer !</strong>";
                // Réinitialiser la couleur de tous les pays à la couleur d'origine
                for (let i = 0; i < countries.length; i++) {
                    countries[i].style.fill = ""; // Couleur d'origine
                }
            } else {
                // Le pays cliqué est incorrect, le colorier en rouge
                this.style.fill = "red";
                document.getElementById('countryClique').innerHTML = "<strong style='color: red;'>Non, reessayez !</strong>";
            }
        });
    }
}


