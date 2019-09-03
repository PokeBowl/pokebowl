import Component from '../Component.js';


class AboutUsListItem extends Component {
    
    renderHTML() {
        const person = this.props.person;
        return /*html*/`
                <li>
                    <img src="${person.nameText}" alt="${person.name} picture">
                    <img src="${person.pokemonImg}"
                    <p>${person.blurb}</p>
                </li>
            `;
    }
}

export default AboutUsListItem;