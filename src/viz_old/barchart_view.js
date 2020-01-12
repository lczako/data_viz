class BarChartView extends VBase{

    constructor(container, sid, bar_width) {
        super(container, sid, bar_width);
        this.color_distance;
    }

    get_color(d) {
        return "rgb(40,"+((d-1)*this.color_distance)+","+((d-1)*this.color_distance)+")";
    }

    get_height(d, i) {
        return d * this.bar_width;
    }

    create_display(dataset) {
        this.color_distance = 255.0 / dataset.length;
        this.bar_height = Math.min(this.container_y / dataset.length, this.bar_height);
        super.create_display(dataset);
    }
}