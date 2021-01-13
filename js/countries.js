// js is for all country htmls
// will generate page depending on each country

var get_countries =   {
    "vietnam": "VNM", 
    //"USA": "united-states.html",
    //"JPN": "united-states.html",
    //"IND": "united-states.html",
    };

// gets the country name from the path
var path = window.location.pathname;
var page = path.split("/").pop();
var name_country = page.split('.').slice(0, -1).join('.').toString();

var fetch_url = "https://foodmap-backend-nxjye5q3fq-uc.a.run.app/country/" + get_countries[name_country];

// fetch response to get json data of all dishes from specified country
fetch(fetch_url).then(response => response.json()).then(json => {
                main(json);
        }).catch(err => console.log(err));

function picture_carousel(name){

}

function create_section(country_data){
    console.log(country_data);
}

function main(data){
    console.log(data);
    var data_length = Object.keys(data).length;
    for (var i=0; i<data_length; i++){
        create_section(data[i]);
    }
}
