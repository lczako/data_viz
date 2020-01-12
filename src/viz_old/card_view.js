class CardView extends VBase{
    constructor(container, sid, bar_width){
        super(container, sid, bar_width);
        this.stroke_color = "black";
        this.stroke_width = "1";
        this.text_x = this.bar_width / 2.0;
        this.text_y = this.bar_height / 2.0 + 3;
    }

    get_stroke_color(){
        return this.stroke_color;
    }

    get_stroke_width(){
        return this.stroke_width;
    }

    create_display(dataset) {
        var self = this;
        super.create_display(dataset);

        self.rex()
            .attr("stroke", self.get_stroke_color())
            .attr("stroke-width", self.get_stroke_width());

        self.geez()
            .append('text')
            .text(function (d) {
                return d.toString()
            })
            .attr('dx', self.text_x)
            .attr('dy', self.text_y);
    }
}