var dataset = [5, 6, 4, 3, 2, 1];
var bar_width = 30;
var delay = 100;

var svg;
var recs;

init();

// var bs = new BubbleSort(dataset, bar_width, delay, "bubblesort");
// bs.init();

function give_x(d,i){
    return i*bar_width+100;
}

function give_color(d, i) {
    return "fill:rgb(40,"+((d-1)*40)+","+((d-1)*40)+")";
}

function init(){
    svg = d3.select('body').append('svg').attr("id", "main").attr("height", "700").attr("width", "700");
    svg.selectAll('rect').remove();
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr("style", give_color)
        .attr("width", bar_width)
        .attr("height", function(d) { return d*bar_width; })
        .attr("x", give_x)
        .attr("y", "100")
        .attr("id", function (d, i) {
            return "rect"+i
        })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
    recs = d3.selectAll("rect");
}

function mouseOver(d, i) {

    var x = parseInt(d3.select(this).attr("x")) + bar_width/3;
    var y = d3.select(this).attr("y");
    svg.append("text")
        .attr("id", "mouseover")
        .attr("x", x)
        .attr("y", parseInt(y) - 10)
        .attr("font-family","sans-serif")
        .text(function () {
            return d;
        });
}

function mouseOut() {
    svg.select("#mouseover").remove();
}

function default_colors() {
    recs.transition()
        .delay(delay)
        .attr("style", give_color)
}

function move(j, k) {
    console.log("move", j, k);
    var last_d;
    var last_x;
    var last_id;

    var candidate_d;
    var candidate_x;
    var candidate_id;

    recs.each(function(d) {
        if (parseInt(d3.select(this).attr("x")) == give_x(d, j)) {
            console.log(parseInt(d3.select(this).attr("x")), give_x(d, j));
            last_d = d;
            last_x = parseInt(d3.select(this).attr("x"));
            last_id = d3.select(this).attr("id");

        } else if(parseInt(d3.select(this).attr("x")) == give_x(d, k)){
            candidate_d = d;
            candidate_x = parseInt(d3.select(this).attr("x"));
            candidate_id = d3.select(this).attr("id");
        }});

    if (last_d < candidate_d){
        var temp = last_x;
        last_x = candidate_x;
        candidate_x = temp;
    }

    recs.transition()
        .delay(delay)
        .attr("x", function(d, i) {
            switch (d3.select(this).attr("id")) {
                case last_id:
                    return last_x;
                case candidate_id:
                    return candidate_x;
                default:
                    return parseInt(d3.select(this).attr("x"));
            }
        })
        .on("end", function () {
            console.log(j, k);
            switch (true) {
                case (k < (j-1)): return pick(j, k+1);
                case (k == j-1 && j > 0): return pick(j-1, 0);
                default: return default_colors();
            }
        })
}

function pick(j, k) {
    console.log("pick", j, k);
    recs.transition()
        .delay(delay)
        .attr("style", function (d, i) {
            switch (parseInt(d3.select(this).attr("x"))) {
                case give_x(d, j):
                    return "fill:red";
                case give_x(d, k):
                    return "fill:orange";
                default:
                    return give_color(d, i);
            }
        })
        .on("end", function () {
            move(j, k);
        })
}

function bubble_sort() {
    var k = 0;
    var j = dataset.length - 1;
    pick(j, k);
}


d3.select('#start').on("click", function () {
    console.log("start");
    bubble_sort();
    // bs.run();
});


d3.select('#reset').on("click", function(){
    console.log("reset");
    // bs.restart();
    recs.interrupt();
    d3.selectAll("svg").remove();
    init();
});
