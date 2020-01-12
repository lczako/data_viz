
d3.select('body').append('svg').attr("width", "1000").attr("height", "1000");
var svg = d3.select("svg");


function update(data) {
    var t = d3.transition()
        .duration(750);

    var circle = svg.selectAll("circle")
        .data(data, d => d.id);

    circle.exit().transition(t).remove();

    circle.enter().append("circle")
        .attr("class", "enter")
        .transition(t)
        .attr("r", function(d) { return d.r; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

var data1 = [{"x": 100.0, "y": 110, "r": 40, "id": 1}, {"x": 200.0, "y": 25, "r": 40, "id": 2}];
var data2 = [{"x": 200.0, "y": 110,"r": 20, "id": 1}, {"x": 100.0, "y": 25, "r": 20, "id": 2}];

var dat = data1;


update(dat);

d3.interval(function() {
    dat = (dat === data1) ? data2: data1;
    update(dat);
}, 1500);







