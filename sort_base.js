
function SortBase(data, bar_width, delay, sort_id) {
    this.data = data;
    this.bar_width = bar_width;
    this.delay = delay;
    this.sort_id = sort_id;
    this.svg = d3.select('body').append('svg').attr("id", this.sort_id).attr("height", "500").attr("width", "50%");
    this.recs;
}

SortBase.prototype.init = function() {
    self = this;

    self.svg.selectAll('rect')
        .data(self.data)
        .enter()
        .append('rect')
        .style("fill", give_color)
        .attr("width", "10%")
        .attr("height", function(d) { return d * self.bar_width; })
        .attr("x", function(d,i) { return give_x(i)})
        .attr("y", "100")
        .attr("id", function (d, i) {
            return "rect"+i
        })
       // .on("mouseover", function () { mouseOver(self.svg, d3.select(this)) })
       // .on("mouseout", function() { mouseOut(self.svg) });
    this.recs = d3.selectAll("rect");
};


SortBase.prototype.run = function() {
    console.log("Not implemented method");
};

SortBase.prototype.restart = function() {
    this.recs.interrupt();
    this.svg.remove();
    this.svg = d3.select('body').append("svg").attr("id", this.sort_id).attr("height", "500").attr("width", "50%");
    this.init();
};

SortBase.prototype.default_colors = function() {
    self = this;
    self.recs.transition()
        .delay(self.delay)
        .style("fill", give_color)
};

// function mouseOver(svg, rect) {
//     svg.append("text")
//         .attr("id", "mouseover")
//         .attr("x", rect.attr("x") + parseInt(rect.attr("width"))/3)
//         .attr("y", parseInt(rect.attr("y")) - 10)
//         .attr("font-family","sans-serif")
//         .text(() => { return rect.datum() });
// }
//
// function mouseOut(svg) {
//     svg.select("#mouseover").remove();
// }

function endall(transition, callback) {
    if (typeof callback !== "function") throw new Error("Wrong callback in endall");
    if (transition.size() === 0) { callback() }
    var n = 0;
    transition
        .each(function() { ++n; })
        .on("end", function() { if (!--n) callback.apply(this, arguments); });
}