import Component from '../Component.js';

class HomepageApp extends Component {
    renderHTML() {
        return /*html*/`
        <div>
            <body>
                <img src="./assets/pokebowl-header.png" alt="pokebowl-logo">
                <button>Enter the PokéBowl</button>
            </body>
        </div>
           
        `;
    }
}

export default HomepageApp;