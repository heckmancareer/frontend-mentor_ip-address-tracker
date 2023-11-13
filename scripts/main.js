import { apiKey } from "./environment-variables.js";

var map = L.map('map').setView([51.505, -0.09], 13);
var searchLocked = false;
var latestMarker;
const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var button = document.getElementById('fire-search-button');
button.onclick = fetchIPAddress;

function fetchIPAddress() {
    if(!searchLocked) {
        let ipValue = document.getElementById('ip-input').value;
        console.log(ipValue);
        if(!regex.test(ipValue)) {
            console.error('Invalid IP Address provided. Try again.');
            return;
        }
        searchLocked = true;
        if(apiKey === '') {
            console.log('For demonstration purposes, since no API key was found, random coordinates will be selected instead.');
        } else {
            fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipValue}`).then(r => {
                if(!r.ok) {
                    throw new Error('Network response failed.');
                }
                return r.json();
            }).then(data => {
                console.log(data);
                if(latestMarker) latestMarker.remove();
                updateValues(data['ip'], data['location'], data['isp']);
                latestMarker = L.marker([data['location']['lat'], data['location']['lng']]).addTo(map).bindPopup(`${data['ip']}`).openPopup();
                searchLocked = false;
            }).catch(e => {
                console.log('There was a problem fetching the data.');
                searchLocked = false;
            });
        }
    }
}

function updateValues(ipAddress, locationObject, isp) {
    document.getElementById('ip-address-value').textContent = `${ipAddress}`;
    document.getElementById('location-value').textContent = `${locationObject.city}, ${retrieveStateAbbreviation(locationObject.region)} ${locationObject.postalCode}`;
    document.getElementById('timezone-value').textContent = `UTC ${locationObject.timezone}`;
    document.getElementById('isp-value').textContent = `${isp}`;
    return;
}

function retrieveStateAbbreviation(stateName) {
    return stateAbbreviations[stateName];
}

const stateAbbreviations = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
};