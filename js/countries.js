

console.log("Hello Vietnam!")
var get_countries =   {
    "vietnam": "VNM", 
    //"USA": "united-states.html",
    //"JPN": "united-states.html",
    //"IND": "united-states.html",
    };

var path = window.location.pathname;
var page = path.split("/").pop();
var name_country = page.split('.').slice(0, -1).join('.').toString();

var fetch_url = "/country/" + get_countries[name_country];
var country_information = fetch(fetch_url).then(response => response.json()).catch(err => console.log(err))
console.log(country_information);
