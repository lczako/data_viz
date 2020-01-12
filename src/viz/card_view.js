
class CardView extends View{
    constructor(container, sid){
        super(container, sid);
        this.stroke_color = "black";
        this.stroke_width = "1";
        this.rect_color = "white";
    }

    init(dataset) {
        super.init(dataset);
        var self = this;
        self.geez()
            .append('text')
            .text(d => d.value)
            .attr("dx", 10)
            .attr("dy", 20);
    }

    get_stroke_color(d) {
        console.log(this);
        return this.stroke_color;
    }

    get_stroke_width() {
        return this.stroke_width;
    }

    get_color(d){
        if (d["class"] === "default") {
            return this.rect_color;
        }
    }
}