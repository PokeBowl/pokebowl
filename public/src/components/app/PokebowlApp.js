import Component from '../Component.js';
import Field from '../pokebowl/Field.js';
import UserConsole from '../pokebowl/UserConsole.js';

class PokebowlApp extends Component {
    onRender(dom) {
        
        const field = new Field();
        dom.appendChild(field.renderDOM());

        const userConsole = new UserConsole();
        dom.appendChild(userConsole.renderDOM());
        
    }

    renderHTML() {
        return /*html*/`
            <div></div>
        `;
    }
}

export default PokebowlApp;