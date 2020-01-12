class BubbleSort extends SortBase{
    *steps(dataset){
        for (let i = dataset.length - 1; i >= 0; i--){
            yield this.pick(i, -1, dataset);
            for (let j=0; j < i ; j++){
                yield this.pick(i, j, dataset);

                if (dataset[i].value < dataset[j].value) {
                    console.log('switch');
                    var t = dataset[i];
                    dataset[i] = dataset[j];
                    dataset[j] = t;
                    yield this.pick(i, j, [...dataset]);
                }
            }
        }
        yield this.pick(-1, -1, dataset)
    }

    pick(index_1, index_2, dataset){
        dataset.forEach(function(value, i) {
            switch (i){
                case index_1: dataset[i]['class'] = 'pick_1'; break;
                case index_2: dataset[i]['class'] = 'pick_2'; break;
                default: dataset[i]['class'] = 'default';
            }
        });

        return dataset
    }
}
