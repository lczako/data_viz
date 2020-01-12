class Display {
    constructor() {
        this.margin_x = 50;
        this.margin_y = 50;
        this.width = 1000;
        this.height = 1000;
        this.svg;
        this.animation1;
        this.animation2;
        this.animation3;
        this.animation4;
    }

    get_translate(d, i) {
        return "translate(" + (this.margin_x + d[1] * (this.width / 2.0)).toString() + ", " +
            (this.margin_y + d[0] * (this.height / 2.0)).toString() + ")"
    }


    init(dataset) {
        var self = this;
        this.svg = d3.select('body')
            .append('svg')
            .attr("height", self.height)
            .attr("width", self.width)
            .selectAll('g')
            .data([[0, 0], [1, 0], [0, 1], [1, 1]])
            .enter()
            .append('g')
            .attr("height", self.height / 2.0 - 50.0)
            .attr("width", self.width / 2.0 - 50.0)
            .attr("transform", function (d, i) {
                return self.get_translate(d, i)
            })
            .attr("id", function (d) {
                return "container" + d[0].toString() + d[1].toString();
            });

        // var animation1 = new Animation(
        //     new QuickSort(),
        //     new CardView(d3.select("#container00"), 'card-quick', self.bar_width));

        var animation2 = new Animation(
            new BubbleSort(),
            new BarChartView(d3.select("#container01"), 'bar-bubble', self.bar_width));

        // animation1.init(dataset);
        animation2.init(dataset);

        // animation1.run();
        animation2.run();
    }
}
