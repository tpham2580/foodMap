
import picture_carousel from "./countries.js"

var c_image_amounts;
var countries_reference;
var post_bookmark_json = {"bookmarks": {}};
var bookmarked_json;
var main_container = document.getElementById("main-container")
fetch(window.location.href + "/website_json/country_image_amounts.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    ).then(res => res.json()).then(json => {
    c_image_amounts = json;
})
.then(fetch(window.location.href + "/website_json/countries_reference.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    ).then(response => response.json()).then(json => {
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
                console.log(geography.id);
                if (geography.id in countries_reference["3-to-country"]){
                    console.log(geography.id);
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

    main_container.appendChild(document.createElement("br"));

    var bookmark_h1 =document.createElement("h1");
    bookmark_h1.textContent = "Bookmarked Dishes";
    main_container.appendChild(bookmark_h1);

    main_container.appendChild(document.createElement("hr"))

    // do picture carousel
    var bookmarked_dishes_row = document.createElement("div");
    bookmarked_dishes_row.setAttribute("class", "row justify-content-center");
    for (var dishes=0; dishes<bookmarked_json.length; dishes++){
        console.log(bookmarked_json[dishes]);
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
/* 
    <li><a class="dropdown-item" href="./html/vietnam.html">Vietnam</a></li>
*/
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
