import Component from '../Component.js';

class HomepageApp extends Component {
    renderHTML() {
        return /*html*/`
            <div class="home-main-container">
                <div id="home-logo-container">
                    <img id="home-logo" src="./assets/pokebowl-header.png" alt="pokebowl-logo">
                </div>
                <button id="enter-app"><a href="./auth.html">Enter the PokéBowl</a></button>
            </div>
        `;
    }
}

export default HomepageApp;