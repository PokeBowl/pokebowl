import Component from '../Component.js';

class HomepageApp extends Component {
    renderHTML() {
        return /*html*/`
            <div class="home-main-container">
                <div id="home-logo-container">
                    <img id="home-logo" src="./assets/pokebowl-header.png" alt="pokebowl-logo">
                </div>
                <a href="./auth.html" id="enter-app">Enter the PokéBowl</a>
            </div>
        `;
    }
}

export default HomepageApp;