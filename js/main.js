
var added_countries =   {
                        "VNM": "vietnam.html", 
                        //"USA": "united-states.html",
                        //"JPN": "united-states.html",
                        //"IND": "united-states.html",
                        };

// creates a new map
var map = new Datamap({
    element: document.getElementById('container'),

    // map changes with changes in display size
    responsive: true,

    // adds a function on click
    done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            if (geography.id in added_countries){
                //creates the href to country html by first checking if country is already added
                let current_href = window.location.href.toString();
                current_href = current_href.substring(0, current_href.length - 11);
                let country_href = current_href + "/html/" + added_countries[geography.id];
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
        //USA: {fillKey: 'Countries of Food Eaten'},
        VNM: {fillKey: 'Countries of Food Eaten'},
        //JPN: {fillKey: 'Countries of Food Eaten'},
        //IND: {fillKey: 'Countries of Food Eaten'},
    }

});

map.legend();

window.addEventListener('resize', function() {
    map.resize();
});
