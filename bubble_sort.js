function BubbleSort(data, bar_width, delay, sort_id){
    SortBase.call(this, data, bar_width, delay, sort_id);
}

BubbleSort.prototype = Object.create(SortBase.prototype);
BubbleSort.prototype.constructor = BubbleSort;
BubbleSort.prototype.candidate_0_color = 'red';
BubbleSort.prototype.candidate_1_color = 'orange';


BubbleSort.prototype.run = function () {
    var k = 0;
    var j = this.data.length - 1;
    this.sort(j, k);
};

BubbleSort.prototype.driver = function(j, k) {
    switch (true) {
        case (k < (j - 1)): return this.sort(j, k + 1);
        case (k === (j - 1) && j > 0): return this.sort(j - 1, 0);
        default: return this.default_colors();
    }
};

BubbleSort.prototype.sort = function(j, k) {
    var self = this;
    console.log("pick", j, k);

    this.recs
        .transition()
        .delay(self.delay)
        .style("fill", function (d, i) {
            console.log(d, i);
            switch (d3.select(this).attr("x")) {
                case give_x(j): return self.candidate_0_color;
                case give_x(k): return self.candidate_1_color;
                default: return give_color(d);
            }})
        .call(endall, function() {
            var last = d3.select("rect[x=\"" + give_x(j) + "\"]");
            var candidate = d3.select("rect[x=\"" + give_x(k) + "\"]");

            if (last.datum() < candidate.datum()) {
                console.log("prep for switch");
                var last_x = give_x(j);
                var candidate_x = give_x(k);

                self.recs
                    .transition()
                    .delay(self.delay)
                    .filter(function() { return [last_x, candidate_x].includes(d3.select(this).attr("x")) })
                    .attr("x", function () {
                        switch (d3.select(this).attr("x")) {
                            case last_x: return candidate_x;
                            case candidate_x: return last_x;
                        }})
                    .call(endall, function() { self.driver(j, k); })
            } else {
                console.log("no switch");
                self.driver(j, k);
            }})
};
