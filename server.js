require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const client = require('./lib/client');

const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email){
        return client.query(`
            SELECT id, email, hash, display_name as displayName
            FROM users
            WHERE email = $1;
        `, 
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash){
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as displayName;
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/', ensureAuth);

app.get('/api/test', (req, res) => {
    res.json({
        message: `The user's id is ${req.userId}`
    });
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});

app.get('/api/user-pokemon-stats', (req, res) => {
    client.query(`
        SELECT
             id,
             pokemon,
             attack,
             defense,
             hp,
             url_image
        FROM user-pokemon-stats
        WHERE user_id = $1;
    `,
    [req.userId]
    )
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/user-pokemon-stats', (req, res) => {
    const pokemon = req.body;
    client.query(`
        INSERT INTO user-pokemon-stats (pokemon, attack, defense, hp, url_image, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `,
    [pokemon.pokemon, pokemon.attack, pokemon.defense, pokemon.hp, pokemon.url_image, req.userId]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.put('/api/user-pokemon-stats/:id', (req, res) => {
    const id = req.params.id;

    const pokemon = req.body;

    client.query(`
        UPDATE user-pokemon-stats
        SET    attack = $2,
               defense = $3,
               hp = $4
        WHERE  id = $1
        AND    user_id = $5
        RETURNING *;
    `,
    [id, pokemon.attack, pokemon.defense, pokemon.hp, req.userId]
    )
        .then(result => {
            console.log(result);
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.delete('/api/user-pokemon-stats/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM user-pokemon-stats
        WHERE  id = $1
        AND    user_id = $2
        RETURNING *;
    `,
    [id, req.userId]
    )
        .then(result => {
            console.log(result);
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.get('/api/battle-results', (req, res) => {
    client.query(`
        SELECT
             id,
             user_char AS userChar,
             opponent,
             result,
        FROM history
        WHERE user_id = $1;
    `,
    [req.userId]
    )
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/battle-results', (req, res) => {
    const history = req.body;
    client.query(`
        INSERT INTO history (user_char, opponent, result, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
    [history.user_char, history.opponent, history.result, req.userId]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});



app.delete('/api/battle-results/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM history
        WHERE  id = $1
        AND    user_id = $2
        RETURNING *;
    `,
    [id, req.userId]
    )
        .then(result => {
            console.log(result);
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});