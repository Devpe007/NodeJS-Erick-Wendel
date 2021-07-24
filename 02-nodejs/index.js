/*
    0- Obter um usuario. 
    1- Obter o numero de telefone de um usuario apartir de seu id.
    2- Obter o endereço do usuario pelo id.
*/

// Importamos um módulo interno do node.js

const util = require('util');

const getLocationAsync = util.promisify(getLocation);

function getUser() {
    // Quando der algum problema -> reject
    // Quando for sucesso -> resolve

    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            // return reject(new Error('DEU RUIM DE VERDADE'));

            return resolve({
                id: 1,
                name: 'Aladin',
                date: new Date(),
            });
        }, 1000);
    });
};

function getNumber(id_user) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                number: '1199002',
                ddd: 11,
            });
        }, 2000);
    });
};

function getLocation(id_user, callback) {
    setTimeout(() => {
        return callback( null, {
            rua: 'rua dos bobos',
            numero: 0,
        });
    }, 2000);
};

const userPromise = getUser();

// Para manipular o sucesso usamos a função .then()
// Para manipular error usamos o .catch()

// Usuario -> telefone -> telefone

userPromise
    .then((user) => {
        return getNumber(user.id)
        .then(function resolveNumber(result) {
            return {
                user: {
                    name: user.name,
                    id: user.id,
                },
                number: result,
            }
        });
    })
    .then((resultado) => {
        const location = getLocationAsync(resultado.user.id);

        return location.then(function resolveLocation(result) {
            return {
                user: resultado.user,
                number: resultado.number,
                location: result,
            }
        });
    })
    .then((result) => {
        console.log(`
            Name: ${result.user.name}
            Location: ${result.location.rua}, ${result.location.numero}
            Number: (${result.number.ddd}) ${result.number.number}
        `);
    })
    .catch((error) => {
        console.error('DEU RUIM', error);
    });

// getUser(function resolveUser(error, user) {
//     // null || "" || 0 === false
//     if(error) {
//         console.error('DEU RUIM em USUARIO', error);
//         return;
//     };

//     getNumber(user.id, function resolverNumber(error1, number) {
//         if(error1) {
//             console.error('DEU RUIM em TELEFONE');
//             return;
//         };

//         getLocation(user.id, function resolveLocation(error2, location) {
//             if(error2) {
//                 console.error('DEU RUIM em ENDEREÇO');
//                 return;
//             };

//             console.log(`
//                 Name: ${user.name},
//                 Location: ${location.rua}, ${location.numero}
//                 Number: (${number.ddd})${number.number}
//             `);
//         });
//     });
// });
// const number = getNumber(user.id);

// console.log('number', number);