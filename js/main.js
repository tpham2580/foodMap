
var c_image_amounts;
var countries_reference;
var post_bookmark_json = {"bookmarks": {}};
var bookmarked_json;
fetch(window.location.href + "website_json/country_image_amounts.json")
    .then(res => res.json()).then(json => {
        c_image_amounts = json;
})
.then(fetch(window.location.href + "website_json/countries_reference.json")
    .then(response => response.json()).then(json => {
        countries_reference = json;
    })
.then( response => {
    fetch_bookmarks();
}

));

// fetch response to get json data of all dishes from specified country
function fetch_bookmarks(){

    var dict_local_storage = {};
    var keys_dict = Object.keys(localStorage);
    var length_local = keys_dict.length;

    for (var i = 0; i < length_local; i++){
        dict_local_storage[keys_dict[i]] = localStorage[keys_dict[i]]
    }

    // turn the dictionary into form data
    var formBody = [];
    for (var property in dict_local_storage) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(localStorage[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        }
    formBody = formBody.join("&");
    var fetch_url = "https://foodmap-backend-nxjye5q3fq-uc.a.run.app/bookmarked/";
    fetch(fetch_url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
        }
    ).then(response => response.json()).then(json => {
            bookmarked_json = json;
            main_one();
        }).catch(err => console.log(err));
}

function main_one(){

    // creates a new map
    var map = new Datamap({
        element: document.getElementById('container'),

        // map changes with changes in display size
        responsive: true,

        // adds a function on click
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                if (geography.id in countries_reference["3-to-country"]){
                    //creates the href to country html by first checking if country is already added
                    let country_href = window.location.href + "html/" + countries_reference["3-to-country"][geography.id].toLowerCase() + ".html";
                    window.location.href = country_href;
                }
                
                
            });
        },

        // add all new fill colors here
        fills: {
            defaultFill: '#494949', // Any hex, color name or rgb/rgba value
            'Countries of Food Eaten': '#55c2ff'
        },

        // adds all countries that need a new fill color from default
        data: {
            USA: {fillKey: 'Countries of Food Eaten'},
            VNM: {fillKey: 'Countries of Food Eaten'},
            JPN: {fillKey: 'Countries of Food Eaten'},
        }
        

    });
    map.legend();
    window.addEventListener('resize', function() {
        map.resize();
    });

    // add countries to dropdown
    add_dropdown_countries();

    var main_container = document.getElementById("main-container");

    main_container.appendChild(document.createElement("br"));

    var bookmark_h1 =document.createElement("h1");
    bookmark_h1.textContent = "Bookmarked Dishes";
    main_container.appendChild(bookmark_h1);

    main_container.appendChild(document.createElement("hr"))

    // do picture carousel
    var bookmarked_dishes_row = document.createElement("div");
    bookmarked_dishes_row.setAttribute("class", "row justify-content-center");
    for (var dishes=0; dishes<bookmarked_json.length; dishes++){
        let name_country = bookmarked_json[dishes]["country"].toLowerCase();
        var bookmark_dish = document.createElement("div");
        bookmark_dish.setAttribute("class", "col-5 col-lg-5 col-sm-12 my-3 mx-2 p-0 justify-content-center");

        var bookmark_name = document.createElement("h3");
        bookmark_name.setAttribute("class", "text-center")
        bookmark_name.textContent = bookmarked_json[dishes]["name"];

        bookmark_dish.appendChild(bookmark_name);
        
        var picture_carousel_bookmark = picture_carousel(bookmarked_json[dishes], name_country);
        picture_carousel_bookmark.className += " w-100";
        bookmark_dish.appendChild(picture_carousel_bookmark);
        bookmarked_dishes_row.appendChild(bookmark_dish);
    }
    main_container.appendChild(bookmarked_dishes_row);

};

// creates picture_carousel
function picture_carousel(dish, name_country){
    var new_col = document.createElement("div");
    new_col.setAttribute("class", "col-xxl-6 col-xl-12 p-0 my-auto");

    var dish_name = dish["name"];
    var dish_name_w_dashes = dish_name.replace(/\s+/g, "-");

    // create div with id="foodCarousel-" + dish_name_w_dashes, class="carousel slide" and data-bs-ride="carousel"
    var food_carousel = document.createElement("div");
    food_carousel.setAttribute("id", "foodCarousel-" + dish_name_w_dashes);
    food_carousel.setAttribute("class", "carousel slide");
    food_carousel.setAttribute("data-bs-ride", "carousel");
    
        // append inner carousel div to outer div
        food_carousel.appendChild(create_div_carousel_inner(dish_name, name_country));

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

function create_div_carousel_inner(dish_name, name_country){
    // create div with class="carousel-inner"
    var div_carousel_inner = document.createElement("div");
    div_carousel_inner.setAttribute("class", "carousel-inner");
        
        //for loop to add all dish images to carousel
        var amount_images = c_image_amounts[name_country][dish_name.toString()];
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
            new_image.setAttribute("src", "./images/" + name_country + "/" + dish_name + "/" + dish_name + " " + image + ".jpg");
            new_image.setAttribute("class", "d-block w-100");
            new_image.setAttribute("alt", dish_name + " " + image);

            // append image to div
            div_carousel_item.appendChild(new_image);

            // append div to outer div
            div_carousel_inner.appendChild(div_carousel_item);
        }
}

function add_dropdown_countries(){
    var dropdown_country = document.getElementById("dropdown-country");
    for (var i in countries_reference["3-to-country"]){
        var country_li = document.createElement("li");
        var country_a = document.createElement("a");
        country_a.setAttribute("class", "dropdown-item");
        country_a.setAttribute("href", "./html/" + countries_reference["3-to-country"][i.toString()].toLowerCase() + ".html");
        country_a.textContent = countries_reference["3-to-country"][i.toString()];

        // append the a to list and the list to the dropdown menu
        country_li.appendChild(country_a);
        dropdown_country.appendChild(country_li)

    }
};
