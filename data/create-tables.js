const client = require('../lib/client');

client.query(`

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(256) NOT NULL,
        hash VARCHAR(256) NOT NULL,
        display_name VARCHAR(256) NOT NULL
    );
    
    CREATE TABLE history (

        id SERIAL PRIMARY KEY,
        user_char VARCHAR(256) NOT NULL,
        opponent VARCHAR(256) NOT NULL,
        result VARCHAR(256) NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id)
    )

    CREATE TABLE user-pokemon-stats (
        id SERIAL PRIMARY KEY NOT NULL,
        pokemon VARCHAR(256) NOT NULL,
        attack INTEGER NOT NULL,
        defense INTEGER NOT NULL,
        hp INTEGER NOT NULL,
        url_image VARCHAR(512) NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id)
    )
`)
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });