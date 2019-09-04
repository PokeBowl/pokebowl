const client = require('../lib/client');



client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS user_pokemon_stats;
    DROP TABLE IF EXISTS history;

`)
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });