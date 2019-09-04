const client = require('../lib/client');

client.query(`

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(256) NOT NULL,
        hash VARCHAR(256) NOT NULL,
        display_name VARCHAR(256) NOT NULL
    );
    
    CREATE TABLE history (
        id INTEGER NOT NULL,
        user_char VARCHAR(256) NOT NULL,
        opponent VARCHAR(256) NOT NULL,
        result VARCHAR(256) NOT NULL,
        CONSTRAINT history_user_id_fkey FOREIGN KEY (id)
            references users (id) MATCH SIMPLE
            ON UPDATE NO ACTION ON DELETE NO ACTION
    )

`)
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });