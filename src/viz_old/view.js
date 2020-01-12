class VBase{

    constructor(container, sid){
        this.bar_width = 30;
        this.bar_height = 30;
        this.level_0 = 30;
        this.level_distance = 35;
        this.group_distance = 5;
        this.sid = sid;
        this.color = "white";
        this.container = container;
        this.delay = 0;
        this.default_level = 0;
        this.container_x = container.attr("width");
        this.container_y = container.attr("height");
        this.main_pick_color = "red";
        this.side_pick_color = "orange";
    }

    get_translate(index, level) {
        console.log(index, level)
        var index_level = (typeof(level)=="undefined") ? index: [index, level];
        return "translate("+ this.get_x_y(index_level).toString() + ")"
    }

    get_color(d, i) {
        return this.color;
    }

    get_height(d, i) {
        return this.bar_height;
    }

    get_index_level(id){
        var il = id.match(/\d+/g).map(Number);
        return il
    }

    get_x_y(index, level){
        [index, level] = (typeof(level)=="undefined") ? [index[0], index[1]]: [index, level];
        console.log(index, level);
        return [this.get_x(index), this.get_y(level)];
    }

    get_x(index){
        index = (typeof index === "string") ? this.get_index_level(index)[0]: index;
        return index * this.bar_width
    }

    get_y(level) {
        level = (typeof level === "string") ? this.get_index_level(level)[1]: level;
        return this.level_0 + level * this.level_distance;
    }

    get_id(index, level) {
        var index_level = (typeof(level)=="undefined") ? ((Array.isArray(index)) ? index: [index, this.default_level]): [index, level];
        return this.sid + index_level.join("_");
    }

    geez() {
        return this.container.selectAll('g');
    }

    rex() {
        return this.container.selectAll('g').selectAll('rect');
    }

    create_display(dataset) {
        var self = this;
        this.bar_width = Math.min(this.bar_width, this.container_x / dataset.length);

        self.container
            .attr('id', self.sid)
            .append('text')
            .text(self.sid)
            .attr("dx", 10)
            .attr("dy", 10);

        self.geez()
            .data(dataset)
            .enter()
            .append('g')
            .attr("id", (d, i) => self.get_id(i, self.default_level))
            .attr("transform", (d, i) => self.get_translate([i, self.default_level]))
            .append('rect')
            .style("fill", (d, i) => self.get_color(d, i))
            .attr("width", self.bar_width)
            .attr("height", (d, i) => self.get_height(d, i));
    }

    finish(){
        var self = this;
        self.rex()
            .transition()
            .delay(self.delay)
            .style("fill", function (d, i) { return self.get_color(d, i) })
            .call(endall, function(){
                self.geez()
                    .transition()
                    .delay(self.delay)
                    .attr("transform", function (){
                        var oid = d3.select(this).attr("id");
                        return self.get_translate(self.get_index_level(oid)[0], self.default_level)
                    })
            })
    }

    swap(params, steps){
        var self = this;
        var [selected_0, selected_1] = params;

        var id0 = self.get_id(selected_0);
        var id1 = self.get_id(selected_1);

        var mc = d3.select("#"+id0).attr("transform");
        var sc = d3.select("#"+id1).attr("transform");

        self.geez()
            .transition()
            .delay(self.delay)
            .filter(function () {
                return [mc, sc].includes(d3.select(this).attr("transform"))
            })
            .attr("transform", function () {
                switch (d3.select(this).attr("transform")) {
                    case mc: return sc;
                    case sc: return mc;
                }
            })
            .attr("id", function () {
                switch (d3.select(this).attr("id")) {
                    case id0: return id1;
                    case id1: return id0;
                }
            })
            .call(endall, function(){
                var next = steps.pop();
                var f = Object.keys(next)[0];
                self[f](next[f], steps);
            })
    }

    pick(params, steps){
        var [selected_0, selected_1] = params;
        var self = this;
        self.container
            .selectAll('g')
            .selectAll('rect')
            .transition()
            .delay(self.delay)
            .style("fill", function (d, i) {
                switch (d3.select(this.parentNode).attr("id")) {
                    case self.get_id(selected_0): return self.main_pick_color;
                    case self.get_id(selected_1): return self.side_pick_color;
                    default: return self.get_color(d, i);
                }
            })
            .call(endall, function(){
                var next = steps.pop();
                var f = Object.keys(next)[0];
                self[f](next[f], steps);
            })
    }

    move_to_level(level, steps){
        var self = this;
        self.geez()
            .transition()
            .delay(self.delay)
            .attr("transform", function () {
                var id = d3.select(this).attr("id");
                return "translate(" + self.get_x_y(self.get_index_level(id)) + ")"
            })
            .call(endall, function(){
                var next = steps.pop();
                var f = Object.keys(next)[0];
                self[f](next[f], steps);
            })
    }

    slide(params, steps) {
        var [selected, x_index, y_index, group_index] = params;
        var self = this;

        var [x, y] = d3.select("#"+self.get_id(selected)).attr("transform").match(/\d+/g).map(Number);

        self.container
            .select("#"+self.get_id(selected))
            .transition()
            .attr("transform", function () {
                return "translate(" + (self.group_distance * group_index + self.bar_width * x_index).toString() + ", " +
                    (self.level_0 + y_index * self.level_distance).toString() + ")"
            })
            .attr("id", self.get_id(x_index, y_index))
            .call(endall, function(){
                var next = steps.pop();
                var f = Object.keys(next)[0];
                self[f](next[f], steps);
            })
    }
}

function endall(transition, callback) {
    if (typeof callback !== "function") throw new Error("Wrong callback in endall");
    if (transition.size() === 0) { callback() }
    var n = 0;
    transition
        .each(function() { ++n; })
        .on("end", function() { if (!--n) callback.apply(this, arguments); });
}