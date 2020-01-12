var dataset = [...Array(5).keys()].map(item => item + 1);

function shuffle (array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

shuffle(dataset);

var d = dataset.map(function(v,i){
    return {"id": i, "value": v, "y": 1, "class": "default"}
});

var b = new BubbleSort();
var step = b.steps(d);


var c = d3.select('body').append('svg')
    .attr("width", "1000")
    .attr("height", "1000")
    .append('g')
    .attr("transform", "translate(40, 40)")
    .attr("width", "500")
    .attr("height", "500");


var vv = new BarchartView(c, "card_view");
vv.init(d);


var d2 = d;
d3.interval(function() {
    vv.update(d2);
    d2 = step.next().value;
    console.log(d2);
}, 1500);

// //
// // var d = new Display();
// // d.init(dataset);
// //
// var q = new QuickSort();
// q.steps(dataset)
