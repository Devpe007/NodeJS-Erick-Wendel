/*
    0- Obter um usuario. 
    1- Obter o numero de telefone de um usuario apartir de seu id.
    2- Obter o endereço do usuario pelo id.
*/

function getUser(callback) {
    setTimeout(() => {
        return callback( null, {
            id: 1,
            name: 'Aladin',
            date: new Date(),
        });
    }, 1000);
};

function getNumber(id_user, callback) {
    setTimeout(() => {
        return callback( null, {
            number: '1199002',
            ddd: 11,
        });
    }, 2000);
};

function getLocation(id_user, callback) {
    setTimeout(() => {
        return callback( null, {
            rua: 'rua dos bobos',
            numero: 0,
        });
    }, 2000);
};

function resolveUser(error, user) {
    console.log('user', user);
};

getUser(function resolveUser(error, user) {
    // null || "" || 0 === false
    if(error) {
        console.error('DEU RUIM em USUARIO', error);
        return;
    };

    getNumber(user.id, function resolverNumber(error1, number) {
        if(error1) {
            console.error('DEU RUIM em TELEFONE');
            return;
        };

        getLocation(user.id, function resolveLocation(error2, location) {
            if(error2) {
                console.error('DEU RUIM em ENDEREÇO');
                return;
            };

            console.log(`
                Name: ${user.name},
                Location: ${location.rua}, ${location.numero}
                Number: (${number.ddd})${number.number}
            `);
        });
    });
});
// const number = getNumber(user.id);

// console.log('number', number);