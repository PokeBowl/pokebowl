import Component from '../Component.js';

class HomepageApp extends Component {
    onRender(dom) {
        const enterButton = dom.querySelector('#enter-app');
        enterButton.addEventListener('click', () => { 
            window.location = `./auth.html`;
        });
    }
    renderHTML() {
        return /*html*/`
            <div class="home-main-container">
                <div id="home-logo-container">
                    <img id="home-logo" src="./assets/pokebowl-header.png" alt="pokebowl-logo">
                </div>
                <button id="enter-app">Enter the PokéBowl</button>
            </div>
        `;
    }
}

export default HomepageApp;