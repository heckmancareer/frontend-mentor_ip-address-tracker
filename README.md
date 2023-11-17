![Design preview for the IP address tracker coding challenge](./design/desktop-preview.jpg)

# IP Address Tracker

A basic HTML, CSS, and JavaScript exercise from FrontEndMentor that can be found [here](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0/hub). The objective was to recreate the design in the image above. When a user enters an IP address, it will make an API call to [geo.ipify](https://geo.ipify.org/) to retrieve the longitude and latitude, then render a map marker of the coordinates using [Leaflet.js](https://leafletjs.com/).

# Demo Version
Given that geo.ipify is a paid service, the demo version of this repo on Github Pages will not actually function. When a user fires a request, it will **return static information and generate random coordinates for the marker.**

If you would like to try a working version, clone this repo locally, sign up for a free account with geo.ipify, then place your API key [here](https://github.com/heckmancareer/frontend-mentor_ip-address-tracker/blob/main/scripts/main.js#L2).

Live Demo via Github Pages: https://heckmancareer.github.io/frontend-mentor_ip-address-tracker/
