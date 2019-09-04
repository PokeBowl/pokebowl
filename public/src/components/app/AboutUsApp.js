import Component from '../Component.js';
import Header from './Header.js';
import AboutUsListItem from '../about-us/AboutUsListItem.js';
import aboutUsData from '../../../data/aboutUsData.js';

class AboutUsApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const aboutUsList = dom.querySelector('#about-us-list');
        
        aboutUsData.forEach(person => {
            const props = { person };
            const aboutUsListItem = new AboutUsListItem(props);
            aboutUsList.appendChild(aboutUsListItem.renderDOM());
        });
    }
    renderHTML() {
        return /*html*/`
            <div>
                <ul id="about-us-list"></ul>
            </div>
        `;
    }
}

export default AboutUsApp;