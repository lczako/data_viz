
class QuickSort extends SortBase {

    run(dataset, flow){
        if (dataset.length > 0) {
                var center = dataset.slice(-1)[0];
                var left = dataset.slice(0, -1).filter(item => item.item < center.item);
                var right = dataset.slice(0, -1).filter(item => item.item >= center.item);

                flow["left"] = {"root": left};
                flow["center"] = center;
                flow["right"] = {"root": right};

                left = (left.length > 1) ? this.run(left, flow["left"]): left;
                right = (right.length > 1) ? this.run(right, flow["right"]): right;

                return left.concat([center]).concat(right).filter(item => item !== null)
        } else {
            return [null];
        }
    }

    translate(flow){

    }

    steps(dataset){
        var datas = dataset.map(function (item, index) {
            return {"item": item, "index": index}
        });
        var flow = {"root": datas};

        console.log(this.run(datas, flow));
        console.log(flow);
    }
}