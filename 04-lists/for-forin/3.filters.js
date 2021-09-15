const { getPeople } = require('./service');

/* 
    const item = {
        nome: 'Erick',
        idade: 12,
    };

    const { nome, idade } = item;
    console.log(nome, idade);
*/

Array.prototype.myFilter = (callback) => {
    const list = [];

    for(index in this) {
        const item = this[index];
        const result = callback(item, index, this);
        // 0, "", null, undefined === false;
        if(!result) continue;
        list.push(item);
    };

    return list;
};

async function main() {
    try {
        const { results } = await getPeople(`a`);

        // const familyLars = results.filter((item) => {
        //     // por padrão precida retornar um booleano;
        //     // para informar se deve manter ou remover da lista;
        //     // false > remove da lista;
        //     // true > mantem na lista;
        //     // não encontrou = -1;
        //     // encontrou = posicaoNoArray;

        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
        //     return result;
        // });

        const familyLars = results.filter((item, index, list) => {
            console.log(`index: ${index}`, list.length);
            return item.name.toLowerCase().indexOf('lars') !== -1;
        });

        const names = familyLars.map((people) => people.name);
        console.log(names);
    } catch(error) {
        console.error('DEU RUIM', error);
    };
};

main();