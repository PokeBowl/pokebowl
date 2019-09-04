import Component from '../Component.js';
import { getUserPokemonApi } from '../../services/pokemon-api.js';
import { addUserPkmnStats } from '../../services/database-api.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignUp(user);
            getUserPokemonApi()
                .then(options => {
                    const i = Math.floor(Math.random() * 25);
                    const pokemon = options.results[i];
                    const userPokemon = {
                        pokemon: pokemon.pokemon,
                        attack: pokemon.attack,
                        defense: pokemon.defense,
                        hp: pokemon.hp,
                        url_image: pokemon.url_image
                    };
                    console.log(addUserPkmnStats(userPokemon));
                });
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form">
                <div>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Your Name">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" required placeholder="Your Email">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" required placeholder="********">
                </div>
                <div>
                    <button>Sign Up</button>
                </div>
            </form>
        `;
    }
}

export default SignUp;