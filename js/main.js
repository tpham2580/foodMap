
var c_image_amounts;
var countries_reference;
fetch("../website_json/country_image_amounts.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    ).then(res => res.json()).then(json => {
    c_image_amounts = json;
})
.then(fetch("../website_json/countries_reference.json", {
        mode: 'no-cors',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }
    ).then(response => response.json()).then(json => {
    countries_reference = json;
    main_one();
}));

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
