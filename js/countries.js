// js is for all country htmls
// will generate page depending on each country

import * as c_image_amounts from "./country_image_amounts.js"
import * as countries_3_letter from "./countries_3_letter.js"



// gets the country name from the path
var path = window.location.pathname;
var page = path.split("/").pop();
var name_country = page.split('.').slice(0, -1).join('.').toString();

var fetch_url = "https://foodmap-backend-nxjye5q3fq-uc.a.run.app/country/" + countries_3_letter.get_countries[name_country];

// fetch response to get json data of all dishes from specified country
fetch(fetch_url).then(response => response.json()).then(json => {
                main(json);
        }).catch(err => console.log(err));

// gets the main container by id "main"
var main_container = document.getElementById("main");

function picture_carousel(dish){
    var new_col = document.createElement("div");
    new_col.setAttribute("class", "col-6");

    var dish_name = dish["name"];
    console.log(dish_name)
    var amount_images = c_image_amounts.country_images[name_country][dish_name.toString()];

    //for loop to add all dish images to carousel
    for (var image=0; image<amount_images+1;image++){
        //images url to add to carousel
        //var image_url = "../images/" + name_country + "/" + dish_name;
    }
        

    return new_col
}

function create_section(dish_data){
    var new_row = document.createElement("div");
    new_row.setAttribute("class", "row");

    new_row.appendChild(picture_carousel(dish_data));

    
}

function main(data){

    var data_length = Object.keys(data).length;
    for (var i=0; i<data_length; i++){
        create_section(data[i]);
    }
}
