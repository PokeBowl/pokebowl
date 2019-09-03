import Component from '../Component.js';
import Header from './Header.js';

class PokebowlApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());


    }

    renderHTML() {
        return /*html*/`
            <div>
            
            </div>
        `;
    }
}

export default PokebowlApp;