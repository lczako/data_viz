
class Animation {
    constructor(sort, view, presteps=[]) {
        this.sort = sort;
        this.view = view;
        this.presteps = presteps;
    }

    init(dataset){
        dataset = [...dataset];
        this.view.create_display(dataset);
        var s = this.sort.steps(dataset);
        this.steps = [...s.reverse()].concat(this.presteps.reverse());
    }

    run() {
        var steps = [...this.steps];
        var first_step = steps.pop();
        var first_method = Object.keys(first_step)[0];

        this.view[first_method](first_step[first_method], steps);
    }
}