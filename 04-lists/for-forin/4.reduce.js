const { getPeople } = require('./service');

Array.prototype.myReduce = (callback, initialValue) => {
    let finalValue = typeof initialValue !== undefined ? initialValue : this[0];
    for(let index = 0; index <= this.length -1; index++) {
        finalValue = callback(finalValue, this[index], this);
    };

    return finalValue;
};

async function main() {
    try {
        const { results } = await getPeople(`a`);
        const weights = results.map(item => parseInt(item.height));
        console.log(weights);
        // [20.2, 30.3, 40.5] = 0;

        // const total = weights.reduce((previous, next) => {
        //     return previous + next;
        // }, 0);

        const myList = [
            ['Erick', 'Wendel'],
            ['NodeBR', 'Nerdzão']
        ];

        const total = myList.myReduce((previous, next) => {
            return previous.concat(next);
        }, [])
        .join(', ');

        console.log('total', total);
    } catch(error) {
        console.error('DEU RUIM', error);
    };
};

main();