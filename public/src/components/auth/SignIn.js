import Component from '../Component.js';

class SignIn extends Component {

    onRender(form) {
        const onSignIn = this.props.onSignIn;

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignIn(credentials);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form">
                <div>
                    <label for="signin-email">Email</label>
                    <input id="signin-email" type="email" name="email" required placeholder="Your Email">
                </div>
                
                <div>
                    <label for="signin-password">Password</label>
                    <input id="signin-password" type="password" name="password" required placeholder="********">
                </div>

                <div class="sign-in-button">
                    <button>Sign In</button>
                </div>
            </form>
        `;
    }
}

export default SignIn;