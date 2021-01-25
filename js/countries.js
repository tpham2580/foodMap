

// will generate page depending on each country

var c_image_amounts;
var countries_reference;

if (document.getElementById("main") !== null){
    fetch("../website_json/country_image_amounts.json").then(res => res.json()).then(json => {
        c_image_amounts = json;
    })
    .then(fetch("../website_json/countries_reference.json").then(response => response.json()).then(json => {
        countries_reference = json;
        time_to_fetch();
    }));

    // gets the country name from the path
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var name_country = page.split('.').slice(0, -1).join('.').toString();

    var fetch_url // sets the fetch_url variable

    // fetch response to get json data of all dishes from specified country
    function time_to_fetch(){
        fetch_url = "https://foodmap-backend-nxjye5q3fq-uc.a.run.app/country/" + countries_reference["country-to-3"][name_country] + "/";
        fetch(fetch_url, {
            mode: 'cors',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(response => response.json()).then(json => {
                    main_function(json);
            }).catch(err => console.log(err));
    }
}
// creates picture_carousel
export default function picture_carousel(dish, name_country){
    var new_col = document.createElement("div");
    new_col.setAttribute("class", "col-xxl-6 col-xl-12 p-0 my-auto");

    var dish_name = dish["name"];
    var dish_name_w_dashes = dish_name.replace(/\s+/g, "-");
    var amount_images = c_image_amounts[name_country][dish_name.toString()];

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
    dish_col.setAttribute("class", "col-xxl-6 col-xl-12 px-4 py-2");

    // create button row
    var dish_button_row = document.createElement("div");
    dish_button_row.setAttribute("class", "row justify-content-end m-0 p-0");

        var dish_bookmark_div = document.createElement("div");
        dish_bookmark_div.setAttribute("class", "col-auto float-left");

            // checks if dish is bookmarked in localStorage
            if (dish["name"] in localStorage){
                var dish_bookmark_i = document.createElement("i");
                dish_bookmark_i.setAttribute("class", "fa fa-bookmark p-0 mt-3 fs-3 float-right bookmark-dish-checked");
                dish_bookmark_i.className += " text-" + c_image_amounts[name_country]["bootstrap-color"];
            } else {
                var dish_bookmark_i = document.createElement("i");
                dish_bookmark_i.setAttribute("class", "fa fa-bookmark-o p-0 mt-3 fs-3 float-right bookmark-dish-unchecked");
                dish_bookmark_i.className += " text-" + c_image_amounts[name_country]["bootstrap-color"];
            }

            

        dish_bookmark_div.appendChild(dish_bookmark_i);
        dish_button_row.appendChild(dish_bookmark_div);
    dish_col.appendChild(dish_button_row);

    // create title row with cuisine tag
    var dish_title_row = document.createElement("div");
    dish_title_row.setAttribute("class", "row");

        // create dish title in title div to float left
        var dish_title_div = document.createElement("div");
        dish_title_div.setAttribute("class", "col-fluid float-left");
            var dish_title_h1 = document.createElement("h1");
            dish_title_h1.setAttribute("class", "text-dark");
            dish_title_h1.textContent = dish["name"];
        dish_title_div.appendChild(dish_title_h1);
        dish_title_row.appendChild(dish_title_div);

        // create button for cuisine name and append it to dish_col
        var dish_cuisine_div = document.createElement("div");
        dish_cuisine_div.setAttribute("class", "col-auto float-right");
            var dish_cuisine_a = document.createElement("a");
            dish_cuisine_a.setAttribute("class", "btn bg-light text-dark disabled");
            dish_cuisine_a.className += " btn-outline-" + c_image_amounts[name_country]["bootstrap-color"]
            dish_cuisine_a.textContent = dish["cuisine"];
        dish_cuisine_div.appendChild(dish_cuisine_a);
        dish_title_row.appendChild(dish_cuisine_div);

        // add area if not equal to country name
        if (dish["area"].toLowerCase() !== name_country){
            var dish_area_div = document.createElement("div");
            dish_area_div.setAttribute("class", "col-auto float-right");
                var dish_area_a = document.createElement("a");
                dish_area_a.setAttribute("class", "btn bg-light text-dark disabled");
                dish_area_a.className += " btn-outline-" + c_image_amounts[name_country]["bootstrap-color"]
                dish_area_a.textContent = dish["area"];
            dish_area_div.appendChild(dish_area_a);
            dish_title_row.appendChild(dish_area_div);
        }

    // append everything in title row to dish_col
    dish_col.appendChild(dish_title_row);

    // add horizontal line
    dish_col.appendChild(document.createElement("hr"));

    // create defining characteristics
    var dish_def_char_h4 = document.createElement("h4");
    dish_def_char_h4.textContent = "Defining Characteristics";
    var dish_def_char_p = document.createElement("p");
    dish_def_char_p.setAttribute("class", "border bg-light p-3");
    dish_def_char_p.className += " border-" + c_image_amounts[name_country]["bootstrap-color"]
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
    dish_impressions_p.setAttribute("class", "border bg-light p-3");
    dish_impressions_p.className += " border-" + c_image_amounts[name_country]["bootstrap-color"]
    dish_impressions_p.textContent = dish["impressions"];
    // append the defining char title and the content
    dish_col.appendChild(dish_impressions_h4);
    dish_col.appendChild(dish_impressions_p);

    // add break
    dish_col.appendChild(document.createElement("br"));

    // create button with link to favorite recipe
    var dish_recipe_a = document.createElement("a");
    dish_recipe_a.setAttribute("class", "btn");
    dish_recipe_a.className += " btn-" + c_image_amounts[name_country]["bootstrap-color"]
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
    section_container.setAttribute("class", "container-fluid rounded p-0 my-5 center-block shadow-lg");
    section_container.className += " background-" + c_image_amounts[name_country]["background-color"];

    var new_row = document.createElement("div");
    new_row.setAttribute("class", "row justify-content-evenly m-auto align-center");

    new_row.appendChild(picture_carousel(dish_data, name_country));
    new_row.appendChild(create_dish_info(dish_data));

    section_container.appendChild(new_row)

    return section_container
}

// bookmark event handler for each country page for all buttons with bookmark-dish
document.body.onclick = function(e) {   //when the document body is clicked
    if (window.event) {
        e = event.srcElement;           //assign the element clicked to e (IE 6-8)
    }
    else {
        e = e.target;                   //assign the element clicked to e
    }

    if ((e.className && e.className.indexOf('bookmark-dish-unchecked') != -1) || (e.className && e.className.indexOf('bookmark-dish-checked') != -1)) {
        if (e.className && e.className.indexOf('bookmark-dish-unchecked') != -1){

            // get the h1 dish title and add it to local storage
            var bookmark_dish_name = e.parentNode.parentNode.parentNode.children[1].children[0].textContent;
            console.log(bookmark_dish_name);
            localStorage.setItem(bookmark_dish_name.toString(), "checked");

            //if the element has a class name, and that is 'bookmark-dish' then...
            e.className = "fa fa-bookmark p-0 fs-3 mt-3 float-right bookmark-dish-checked";
            e.className += " text-" + c_image_amounts[name_country]["bootstrap-color"];
        } else if (e.className && e.className.indexOf('bookmark-dish-checked') != -1){

            // get the h1 dish title and add it to local storage
            var bookmark_dish_name = e.parentNode.parentNode.parentNode.children[1].children[0].textContent;
            console.log(bookmark_dish_name);
            localStorage.removeItem(bookmark_dish_name.toString());

            e.className = "fa fa-bookmark-o p-0 fs-3 mt-3 float-right bookmark-dish-unchecked";
            e.className += " text-" + c_image_amounts[name_country]["bootstrap-color"];
            //if the element has a class name, and that is 'bookmark-dish' then...
        }
        
    }
}
  

function main_function(data){

    if (document.getElementById("main") == null){
        return
    }

    // gets the main container by id "main"
    var main_container = document.getElementById("main");

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
