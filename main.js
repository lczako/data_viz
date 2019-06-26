var dataset = [5, 6, 4, 3, 2, 1];
var bar_width = 30;
var delay = 100;

var bs = new BubbleSort(dataset, bar_width, delay, "bubblesort");
bs.init();


function give_x(i){
    return (i*10).toString()+"%";
}

function give_color(d) {
    return "rgb(40,"+((d-1)*40)+","+((d-1)*40)+")";
}


d3.select('#start').on("click", function () {
    console.log("start");
    bs.run();
});


d3.select('#reset').on("click", function(){
    console.log("reset");
    bs.restart();
});
