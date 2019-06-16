
function SortBase(data, bar_width, delay, sort_id) {
    this.data = data;
    this.bar_width = bar_width;
    this.delay = delay;
    this.sort_id = sort_id;
    this.svg;
    this.recs;
}

SortBase.prototype.init = function() {
    console.log("here")
    this.svg = d3.select('body').append('svg').attr("id", this.sort_id).attr("height", "700").attr("width", "700");
    this.svg.selectAll('rect')
        .data(this.data)
        .enter()
        .append('rect')
        .attr("style", give_color)
        .attr("width", this.bar_width)
        .attr("height", function(d) { return d*this.bar_width; })
        .attr("x", give_x)
        .attr("y", "100")
        .attr("id", function (d, i) {
            return "rect"+i
        })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
    this.recs = d3.selectAll("rect");
};

SortBase.prototype.run = function() {
    console.log("Not implemented method");
};

SortBase.prototype.restart = function() {
    recs.interrupt();
    this.svg.remove();
    this.init();
};