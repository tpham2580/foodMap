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

// creates picture_carousel
function picture_carousel(dish){
    var new_col = document.createElement("div");
    new_col.setAttribute("class", "col-6");

    var dish_name = dish["name"];
    var dish_name_w_dashes = dish_name.replace(/\s+/g, "-");
    console.log(dish_name_w_dashes);
    var amount_images = c_image_amounts.country_images[name_country][dish_name.toString()];
    console.log(amount_images);

    // create div with id="foodCarousel-" + dish_name_w_dashes, class="carousel slide" and data-bs-ride="carousel"
    var food_carousel = document.createElement("div");
    food_carousel.setAttribute("id", "foodCarousel-" + dish_name_w_dashes);
    food_carousel.setAttribute("class", "carousel slide");
    food_carousel.setAttribute("data-bs-ride", "carousel");
    
        // create ol with class=class="carousel-indicators"
        var ol_carousel = document.createElement("ol");
            // for slide_number in range 0 to amount_images
            for (var slide_number=0; slide_number<amount_images; slide_number++){
                // create li with data-bs-target="#foodCarousel-" + dish_name_w_dashes ata-bs-slide-to=slide_number
                var li_carousel = document.createElement("li");
                li_carousel.setAttribute("data-bs-target", "#foodCarousel-" + dish_name_w_dashes);
                li_carousel.setAttribute("ata-bs-slide-to", slide_number.toString());

                // if slide_number == 0, add class="active"
                if (slide_number==0){
                    li_carousel.setAttribute("class", "active");
                }

                // append to ol
                ol_carousel.appendChild(li_carousel);
            }
                
        // append ol to div
        food_carousel.appendChild(ol_carousel);

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
                new_image.setAttribute("class", "d-block w-100 h-100");
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
    dish_col.setAttribute("class", "col-6");



    return dish_col
}

//creates section for dish
function create_section(dish_data){
    var new_row = document.createElement("div");
    new_row.setAttribute("class", "row");

    new_row.appendChild(picture_carousel(dish_data));

    new_row.appendChild(create_dish_info(dish_data));

    return new_row
}

function main(data){

    var data_length = Object.keys(data).length;
    for (var i=0; i<data_length; i++){
        main_container.appendChild(create_section(data[i]));
    }
}
