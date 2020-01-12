

class BarchartView extends View{
    constructor(container, sid) {
        super(container, sid);
        this.color_map = {};
    }

    init(dataset) {
        this.set_colormap(dataset);
        super.init(dataset);
    }

    set_colormap(dataset){
        var min_v = 10000;
        var max_v = 0;

        dataset.forEach(function (item) {
            max_v = (max_v < item.value) ? item.value: max_v;
            min_v = (min_v > item.value) ? item.value: min_v;
        });

        var color_distance = (255 - 40) / (max_v - min_v);

        var self = this;
        dataset.forEach(function (item) {
            var c = (item.value - min_v) * color_distance + 40;
            self.color_map[item.value] = "rgb(40," + c + "," + c + ")";
        });
    }

    get_height(d) {
        return this.bar_width * d.value * 0.75;
    }

    get_color(d) {
        if (d.class === 'default'){
            return this.color_map[d.value];
        }
    }

}