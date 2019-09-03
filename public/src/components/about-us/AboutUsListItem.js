import Component from '../Component.js';


class AboutUsListItem extends Component {
    
    renderHTML() {
        const person = this.props.person;
        return /*html*/`
                <li>
                    <img href="${person.nameText}" alt="${person.name} picture">
                    <img href="${person.PokemonImg}"
                    <p>"${person.blurb}</p>
                </li>
            `;
    }
}

export default AboutUsListItem;