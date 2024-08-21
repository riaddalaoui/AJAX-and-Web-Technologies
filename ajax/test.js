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

// Fonction pour changer la couleur de fond et du texte
function changeColors() {
    // Selectionner le corps de la page
    var body = document.body;

    // Changer la couleur de fond en bleu
    body.style.backgroundColor = "blue";
    var leftColumn = document.querySelector(".left-column");
    var rightColumn = document.querySelector(".right-column");
    var titre = document.querySelector("h1");

    // Changer la couleur de fond des colonnes en bleu
    leftColumn.style.backgroundColor = "blue";
    rightColumn.style.backgroundColor = "blue";
    titre.style.color = "white";

    // Selectionner tous les boutons sur la page
    var buttons = document.querySelectorAll("input[type='button']");

    // Parcourir tous les boutons et changer la couleur du texte en blanc
    buttons.forEach(function(button) {
        button.style.color = "white";
    });
}

// Ajouter un ecouteur d'evenements au bouton

function BacktoWhite() {
    // Selectionner le corps de la page
    var body = document.body;

    // Changer la couleur de fond en bleu
    body.style.backgroundColor = "white";
    var leftColumn = document.querySelector(".left-column");
    var rightColumn = document.querySelector(".right-column");
    var titre = document.querySelector("h1");

    // Changer la couleur de fond des colonnes en bleu
    leftColumn.style.backgroundColor = "white";
    rightColumn.style.backgroundColor = "white";
    titre.style.color = "#4682B4";

}


// Fonction pour rendre les pays cliquables
function makeCountriesClickable() {
    // Sélectionner tous les éléments <path> correspondants aux pays dans le SVG
    var paths = document.querySelectorAll("#worldMapContainer path");

    // Parcourir tous les éléments <path> et leur ajouter un gestionnaire d'événements pour le clic
    paths.forEach(function(path) {
        // Ajouter un event listener seulement s'il n'y en a pas déjà un
        if (!path.hasClickListener) {
            path.addEventListener("click", function() {
                // Récupérer le nom du pays à partir de l'attribut countryname
                var countryName = path.getAttribute("countryname");

                // Afficher le nom du pays dans une alerte ou une autre action souhaitée
                alert("Pays : " + countryName);

                // Empêcher la propagation de l'événement de clic aux éléments parents
                event.stopPropagation();
            });
            // Marquer le path comme ayant un event listener
            path.hasClickListener = true;
        }
    });
}



// Déplacer l'appel à la fonction makeCountriesClickable() après le chargement et l'affichage du SVG de la carte du monde
// Fonction pour charger et afficher la carte du monde SVG
function loadWorldMapSVG() {
    // Charger le fichier worldHigh.svg en utilisant la fonction chargerHttpXML
    chargerHttpXML("worldHigh.svg", function(response) {
        // Vérifier si la réponse est correcte
        if (response !== null) {
            // Sérialiser la réponse en tant que chaîne de caractères et l'afficher dans un élément HTML
            var svgString = new XMLSerializer().serializeToString(response);
            document.getElementById("worldMapContainer").innerHTML = svgString;
            maploaded = true;
        } else {
            console.error("Failed to load the world map SVG.");
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
            console.log(xmlData); // Ajout de cette ligne pour afficher le contenu XML
            var countries = xmlData.getElementsByTagName("country");
            var countryInfo = "Pays non trouve.";

            // Rechercher les pays à l'intérieur de la balise <countries>
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
            // Obtenir le contenu SVG sous forme de chaîne
            var svgString = this.responseText;

            // Remplacer le contenu HTML du parent avec le SVG
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
        // Ajouter un event listener seulement s'il n'y en a pas déjà un
        if (!circle.hasClickListener) {
            circle.addEventListener("click", function() {
                // Afficher la valeur de l'attribut title du cercle cliqué
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
                // Afficher la valeur de l'attribut title du rectangle cliqué
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
                // Afficher la valeur de l'attribut title du chemin cliqué
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

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
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
            if (this.style.fill !== "red"){
                this.style.fill = previousColor;
            }
            infoBubble.style.display = "none";
        })
    }

}




// Fonction pour afficher les informations du pays au survol de la souris
async function mouseOver() {
    // Récupérer le code du pays
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

        // Créer un nouveau pop-up pour les informations du pays
        let infospan = document.getElementById("infospan");
        infospan.appendChild(infoBubble);


        infoBubble.classList.add("infoBubble");

        // Mettre à jour le contenu du pop-up
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

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

function Bouton9_addAutoComplete(){
    let autoComplete = document.getElementById("myButton9");

    autoComplete.style.backgroundColor = '#556B2F';

    autoComplete.value = "Autocomplete activated";

    const inputField = document.getElementById("countryCode");

    const button = document.getElementById("myButton9");

    const parser = new DOMParser();

    // On récupère tous les CCA2 des pays
    const xpath = "//country/country_codes/cca2";

    var xmlDoc = chargerFichierXml("countriesTP.xml");

    const nodes = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

    const options = [];

    // Adding the options from the XML file to the array options
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

function extractLanguages(xmlDoc) {
    let countries = xmlDoc.getElementsByTagName("country");
    let languagesData = {};

    // Parcourir chaque pays
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let countryCode = country.querySelector("country_codes cca2").textContent;
        let languages = country.querySelectorAll("languages > language");

        // Stocker les langues dans un objet avec le code du pays comme clé
        languagesData[countryCode] = [];

        // Parcourir chaque langue du pays
        for (let j = 0; j < languages.length; j++) {
            let language = languages[j].textContent;
            languagesData[countryCode].push(language);
        }
    }

    return languagesData;
}

let inGame =false;
var xmlDoc = chargerFichierXml("countriesTP.xml");
let countryCodes = xmlDoc.getElementsByTagName("cca2");
let languagesData = extractLanguages(xmlDoc);


// Retourne le nom d'un pays aléatoire
function getRandomCountryCode(){

    const randomCountryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)].textContent;

    return randomCountryCode;

}

function getCountryNameFromCode( countryCode ){

    let xpath = `//country[country_codes/cca2 = '${countryCode}']/country_name/common_name`;

    return xmlDoc.evaluate( xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
}

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

    // Réinitialiser la couleur de tous les pays à la couleur d'origine
    for (let i = 0; i < countries.length; i++) {
        countries[i].style.fill = ""; // Couleur d'origine
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
                document.getElementById('countryClique').innerHTML = "<strong style='color: green;'>Bravo! Vous avez trouve le pays en " + attemptNumber + " essais. Recliquez sur le bouton pour rejouer !</strong>";
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



async function extractLanguageData(xmlDoc) {
    try {
        // Vérifier si xmlDoc est un objet Document
        if (!(xmlDoc instanceof Document)) {
            throw new Error('Le document XML fourni est invalide.');
        }

        const languageNodes = xmlDoc.getElementsByTagName("languages");
        const languages = {};

        for (let i = 0; i < languageNodes.length; i++) {
            const languageNode = languageNodes[i];
            const languageElements = languageNode.children;

            for (let j = 0; j < languageElements.length; j++) {
                const lang = languageElements[j].tagName;
                const langName = languageElements[j].textContent;
                if (languages[lang]) {
                    languages[lang].push(langName);
                } else {
                    languages[lang] = [langName];
                }
            }
        }
        return languages;
    } catch (error) {
        console.error('Error extracting language data:', error);
        return null;
    }
}

function createChartData(languages) {
    var labels = Object.keys(languages); // Utiliser Object.keys pour obtenir les clés du tableau associatif
    var data = Object.values(languages); // Utiliser Object.values pour obtenir les valeurs du tableau associatif

    // Maintenant, languages est un objet avec des clés (langues) et des valeurs (nombre de locuteurs)
    // labels contient les noms des langues, et data contient le nombre de locuteurs correspondant

    return {
        labels: labels,
        datasets: [{
            label: 'Nombre de locuteurs',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };
}


// Fonction pour créer et afficher le graphique des langues les plus parlées
async function displayMostSpokenLanguagesChart() {
    try {
        var xml = await loadXMLData('countriesTP.xml');
        var languageData = await extractLanguageData(xml);
        
        if (languageData) {
            var chartData = createChartData(languageData);
            createInteractiveChart(chartData);
        } else {
            console.error('No language data extracted.');
        }
    } catch (error) {
        console.error('Error displaying most spoken languages chart:', error);
    }
}

function createInteractiveChart(chartData) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



