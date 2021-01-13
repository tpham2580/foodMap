

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

var fetch_url = "https://foodmap-backend-nxjye5q3fq-uc.a.run.app/country/" + get_countries[name_country];
console.log(fetch_url);
var country_information;

fetch(fetch_url).then(response => response.json()).then(json => {
                country_information = json;
                log_info(country_information)
        }).catch(err => console.log(err));

function log_info(info){
    console.log(info);
}

