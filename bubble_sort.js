
function BubbleSort(data, bar_width, delay, sort_id){
    SortBase.call(this, data, bar_width, delay, sort_id);
}


BubbleSort.prototype.run = function () {
    var k = 0;
    var j = this.dataset.length - 1;
    pick(j, k);
};

BubbleSort.prototype.move = function(j, k){
    console.log("move", j, k);
    var last_d;
    var last_x;
    var last_id;

    var candidate_d;
    var candidate_x;
    var candidate_id;

    recs.each(function(d) {
        if (parseInt(d3.select(this).attr("x")) === give_x(d, j)) {
            last_d = d;
            last_x = parseInt(d3.select(this).attr("x"));
            last_id = d3.select(this).attr("id");

        } else if(parseInt(d3.select(this).attr("x")) === give_x(d, k)){
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
        .delay(this.delay)
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
            switch (true) {
                case (k < (j-1)): return this.pick(j, k+1);
                case (k == j-1 && j > 0): return this.pick(j-1, 0);
                default: return default_colors();
            }
        })
};

BubbleSort.prototype.pick = function(j, k) {
    console.log("pick", j, k);
    recs.transition()
        .delay(this.delay)
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
};

