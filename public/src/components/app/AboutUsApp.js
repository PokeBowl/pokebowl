import Component from '../Component.js';
import Header from './Header.js';
import AboutUsListItem from '../about-us/AboutUsListItem.js';
import aboutUsData from '../../../data/aboutUsData.js';

class AboutUsApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
        
        aboutUsData.forEach(person => {
            const props = { person };
            const aboutUsListItem = new AboutUsListItem(props);
            dom.appendChild(aboutUsListItem.renderDOM());
        });
    }
    renderHTML() {
        return /*html*/`
            <ul id="about-us-list"></ul>
        `;
    }
}

export default AboutUsApp;