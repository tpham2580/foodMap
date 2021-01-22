// js is for all country htmls
// will generate page depending on each country

//import * as c_image_amounts from "./country_image_amounts.js"
//import * as countries_3_letter from "./countries_3_letter.js"
var c_image_amounts;
var countries_3_letter;
fetch("../website_json/country_image_amounts.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    ).then(res => res.json()).then(json => {
    c_image_amounts = json;
})
.then(fetch("../website_json/countries_3_letter.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    ).then(response => response.json()).then(json => {
    countries_3_letter = json;
    time_to_fetch();
}));


function console_that(val){
    console.log(val)
}


// gets the country name from the path
var path = window.location.pathname;
var page = path.split("/").pop();
var name_country = page.split('.').slice(0, -1).join('.').toString();

var fetch_url // sets the fetch_url variable

// fetch response to get json data of all dishes from specified country
function time_to_fetch(){
    fetch_url = "https://foodmap-backend-nxjye5q3fq-uc.a.run.app/country/" + countries_3_letter[name_country];
    fetch(fetch_url, {
        mode: 'cors',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(response => response.json()).then(json => {
                console.log(json.body);
                main(json);
        }).catch(err => console.log(err));
}



// gets the main container by id "main"
var main_container = document.getElementById("main");

// creates picture_carousel
function picture_carousel(dish){
    var new_col = document.createElement("div");
    new_col.setAttribute("class", "col-xxl-6 col-xl-12 m-auto p-0 align-center");

    var dish_name = dish["name"];
    var dish_name_w_dashes = dish_name.replace(/\s+/g, "-");
    console.log(dish_name_w_dashes);
    var amount_images = c_image_amounts[name_country][dish_name.toString()];
    console.log(amount_images);

    // create div with id="foodCarousel-" + dish_name_w_dashes, class="carousel slide" and data-bs-ride="carousel"
    var food_carousel = document.createElement("div");
    food_carousel.setAttribute("id", "foodCarousel-" + dish_name_w_dashes);
    food_carousel.setAttribute("class", "carousel slide");
    food_carousel.setAttribute("data-bs-ride", "carousel");
    
        // create div with class="carousel-inner"
        var div_carousel_inner = document.createElement("div");
        div_carousel_inner.setAttribute("class", "carousel-inner");
            
            //for loop to add all dish images to carousel
            for (var image=1; image<amount_images+1;image++){
                // create div with class="carousel-item"
                var div_carousel_item = document.createElement("div");
                div_carousel_item.setAttribute("class", "carousel-item");

                // if image == 1, append active to class
                if (image==1){
                    div_carousel_item.setAttribute("class", "carousel-item active");
                } else {
                    div_carousel_item.setAttribute("class", "carousel-item");
                }

                //images url to add to carousel
                var new_image = document.createElement("img");
                //var image_url = "../images/" + name_country + "/" + dish_name;
                new_image.setAttribute("src", "../images/" + name_country + "/" + dish_name + "/" + dish_name + " " + image + ".jpg");
                new_image.setAttribute("class", "d-block w-100");
                new_image.setAttribute("alt", dish_name + " " + image);

                // append image to div
                div_carousel_item.appendChild(new_image);

                // append div to outer div
                div_carousel_inner.appendChild(div_carousel_item);
            }
        // append div to outer div
        food_carousel.appendChild(div_carousel_inner);

        
        // create a with class="carousel-control-prev" href="#foodCarousel-" + dish_name_w_dashes role="button" data-bs-slide="prev"
        var a_carousel_prev = document.createElement("a");
        a_carousel_prev.setAttribute("class", "carousel-control-prev");
        a_carousel_prev.setAttribute("href", "#foodCarousel-" + dish_name_w_dashes);
        a_carousel_prev.setAttribute("role", "button");
        a_carousel_prev.setAttribute("data-bs-slide", "prev");
            // create span with class="carousel-control-prev-icon" aria-hidden="true"
            var span_carousel_prev_icon = document.createElement("span");
            span_carousel_prev_icon.setAttribute("class", "carousel-control-prev-icon");
            span_carousel_prev_icon.setAttribute("aria-hidden", "true");

            // append span to a
            a_carousel_prev.appendChild(span_carousel_prev_icon);

            // create span with class="visually-hidden" and textContent="Previous"
            var span_carousel_prev_hidden = document.createElement("span");
            span_carousel_prev_hidden.setAttribute("class", "visually-hidden");
            span_carousel_prev_hidden.textContent = "Previous";

            // append span to a
            a_carousel_prev.appendChild(span_carousel_prev_hidden);

        // append a to div
        food_carousel.appendChild(a_carousel_prev);

        // create a with class="carousel-control-next" href="#foodCarousel-" + dish_name_w_dashes role="button" data-bs-slide="next"
        var a_carousel_next = document.createElement("a");
        a_carousel_next.setAttribute("class", "carousel-control-next");
        a_carousel_next.setAttribute("href", "#foodCarousel-" + dish_name_w_dashes);
        a_carousel_next.setAttribute("role", "button");
        a_carousel_next.setAttribute("data-bs-slide", "next");
            // create span with class="carousel-control-next-icon" aria-hidden="true"
            var span_carousel_next_icon = document.createElement("span");
            span_carousel_next_icon.setAttribute("class", "carousel-control-next-icon");
            span_carousel_next_icon.setAttribute("aria-hidden", "true");

            // append span to a
            a_carousel_next.appendChild(span_carousel_next_icon);

            // create span with class="visually-hidden" and textContent="Next"
            var span_carousel_next_hidden = document.createElement("span");
            span_carousel_next_hidden.setAttribute("class", "visually-hidden");
            span_carousel_next_hidden.textContent = "Next";

            // append span to a
            a_carousel_next.appendChild(span_carousel_next_hidden);

        // append a to div
        food_carousel.appendChild(a_carousel_next);

    // append div to new_col
    new_col.appendChild(food_carousel);

    return new_col
}

// creates dish information
function create_dish_info(dish){
    var dish_col = document.createElement("div");
    dish_col.setAttribute("class", "col-xxl-6 col-xl-12 p-4");

    console.log(dish);

    // create title row with cuisine tag
    var dish_title_row = document.createElement("div");
    dish_title_row.setAttribute("class", "row");

        // create dish title in title div to float left
        var dish_title_div = document.createElement("div");
        dish_title_div.setAttribute("class", "col-fluid float-left");
            var dish_title_h2 = document.createElement("h2");
            dish_title_h2.setAttribute("class", "text-dark");
            dish_title_h2.textContent = dish["name"];
        dish_title_div.appendChild(dish_title_h2);

        // *** add start button here in future update ***

        // create button for cuisine name and append it to dish_col
        var dish_cuisine_div = document.createElement("div");
        dish_cuisine_div.setAttribute("class", "col float-right");
            var dish_cuisine_a = document.createElement("a");
            dish_cuisine_a.setAttribute("class", "btn btn-outline-warning bg-light text-dark disabled");
            dish_cuisine_a.textContent = dish["cuisine"];
        dish_cuisine_div.appendChild(dish_cuisine_a);

    // append everything in title row to dish_col
    dish_title_row.appendChild(dish_title_div);
    dish_title_row.appendChild(dish_cuisine_div);
    dish_col.appendChild(dish_title_row);

    // add horizontal line
    dish_col.appendChild(document.createElement("hr"));

    // create defining characteristics
    var dish_def_char_h4 = document.createElement("h4");
    dish_def_char_h4.textContent = "Defining Characteristics";
    var dish_def_char_p = document.createElement("p");
    dish_def_char_p.setAttribute("class", "border border-warning bg-light p-3");
    dish_def_char_p.textContent = dish["defining_char"];
    // append the defining char title and the content
    dish_col.appendChild(dish_def_char_h4);
    dish_col.appendChild(dish_def_char_p);

    // add break
    dish_col.appendChild(document.createElement("br"));

    // create impressions
    var dish_impressions_h4 = document.createElement("h4");
    dish_impressions_h4.textContent = "Thoughts & Impressions";
    var dish_impressions_p = document.createElement("p");
    dish_impressions_p.setAttribute("class", "border border-warning bg-light p-3");
    dish_impressions_p.textContent = dish["impressions"];
    // append the defining char title and the content
    dish_col.appendChild(dish_impressions_h4);
    dish_col.appendChild(dish_impressions_p);

    // add break
    dish_col.appendChild(document.createElement("br"));

    // create button with link to favorite recipe
    var dish_recipe_a = document.createElement("a");
    dish_recipe_a.setAttribute("class", "btn btn-warning");
    dish_recipe_a.setAttribute("href", dish["recipe"]);
    dish_recipe_a.setAttribute("target", "_blank");  // opens link in new tab
    dish_recipe_a.setAttribute("role", "button");
    dish_recipe_a.textContent = "Favorite Recipe";
    dish_col.appendChild(dish_recipe_a);

    return dish_col
}

//creates section for dish
function create_section(dish_data){
    var section_container = document.createElement("div");
    section_container.setAttribute("class", "container-fluid background-yellow rounded p-0 my-5 center-block shadow-lg");
    //section_container.setAttribute("style", "border: 0.05rem solid black; box-shadow: 0.50rem 0.50rem 0.25rem 0.25rem #969696");

    var new_row = document.createElement("div");
    new_row.setAttribute("class", "row justify-content-evenly m-auto align-center");

    new_row.appendChild(picture_carousel(dish_data));
    new_row.appendChild(create_dish_info(dish_data));

    section_container.appendChild(new_row)

    return section_container
}

function main(data){

    // add title heading to page
    var country_h1 = document.createElement("h1");
    country_h1.setAttribute("class", "display-3 text-center");
    country_h1.textContent = name_country.toUpperCase();
    main_container.appendChild(country_h1);

    // add horizontal line
    main_container.appendChild(document.createElement("hr"));

    var data_length = Object.keys(data).length;
    for (var i=0; i<data_length; i++){
        main_container.appendChild(create_section(data[i]));
    }
}
