
class View {
    constructor(container, sid) {
        this.container = container.attr("class", sid);
        this.bar_width = 30;
        this.default_y = 30;
        this.t = d3.transition().duration(500);
    }

    get_height(d){}

    get_x(d, i){
        return (i + 1) * this.bar_width;
    }

    get_y(d, i){
        return d.y * this.default_y;
    }

    get_translate(d, i){
        return "translate("+ [this.get_x(d, i), this.get_y(d, i)].join(",") + ")"
    }

    get_color(d){}

    get_stroke_color(d){}

    get_stroke_width(){}

    geez(){
        return this.container.selectAll('g')
    }

    init(dataset){
        var self = this;
        self.geez()
            .data(dataset)
            .enter()
            .append('g')
            .attr("transform", (d, i) => self.get_translate(d, i))
            .append('rect')
            .attr("height", (d) => self.get_height(d))
            .attr("class", (d) => d.class)
            .style("fill", (d) => self.get_color(d))
            .attr("stroke-width", (d) => self.get_stroke_width(d))
            .attr("stroke", (d) => self.get_stroke_color(d));
    }

    update(dataset){
        var self = this;
        console.log(self)
        self.geez()
            .data(dataset, d => d.id)
            .join(
                enter => enter.call(enter => enter.transition(self.t)
                    .attr("transform", (d, i) => self.get_translate(d, i))
                    .select('rect')
                    .attr("height", d => self.get_height(d))
                    .style("fill", (d) => self.get_color(d))
                    .attr("stroke-width", (d) => self.get_stroke_width(d))
                    .attr("stroke", (d) => self.get_stroke_color(d))),
                update => update
                    .call(update => update.transition(self.t)
                        .attr("transform", (d, i) => self.get_translate(d, i))
                        .select('rect')
                        .attr("class", (d) => d.class)
                        .attr("height", d => self.get_height(d))
                        .style("fill", (d) => self.get_color(d))
                        .attr("stroke-width", (d) => self.get_stroke_width(d))
                        .attr("stroke", (d) => self.get_stroke_color(d)))
            );
    }

}