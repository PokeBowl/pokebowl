import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
            <header>
            <img src="./assets/pokebowl-header.png" alt="pokebowl-logo">
            </header>
        `;
    }
}

export default Header;