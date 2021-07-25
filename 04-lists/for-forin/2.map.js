const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const newArray = [];

    for(let indice=0 ; indice <= this.length -1 ; indice++ ) {
        const result = callback(this[indice], indice);

        newArray.push(result);
    };

    return newArray;
};

async function main() {
    try {
        const results = await service.getPeople('a');
        // const names = [];

        // results.results.forEach((item) => {
        //     names.push(item.name);
        // });

        // const names = results.results.map((people) => {
        //     return people.name;
        // });

        // const names = results.results.map((people) => people.name);

        const names = results.results.meuMap((people, indice) => {
            return `[${indice}]${people.name}`;
        });

        console.log('names', names);
    } catch(error) {
        console.error('DEU RUIM', error);
    };
};

main();