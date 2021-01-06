
var added_countries = ["united-states", "vietnam", "japan", "india"];

var map = new Datamap({
    element: document.getElementById('container'),
    responsive: true,
    done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            console.log(geography);
            //window.location.href = 'https://www.google.com';
        });
    },
    fills: {
        defaultFill: '#494949', // Any hex, color name or rgb/rgba value
        'Countries of Food Eaten': '#55c2ff'
    },

    data: {
        USA: {fillKey: 'Countries of Food Eaten'},
        VNM: {fillKey: 'Countries of Food Eaten'},
        JPN: {fillKey: 'Countries of Food Eaten'},
        IND: {fillKey: 'Countries of Food Eaten'},
    }

});

map.legend();

window.addEventListener('resize', function() {
    map.resize();
});
