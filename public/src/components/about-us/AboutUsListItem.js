import Component from '../Component.js';


class AboutUsListItem extends Component {
    
    renderHTML() {
        const person = this.props.person;
        return /*html*/`
                <li class="person">
                    <img class="person-name" src="${person.nameText}" alt="${person.name} picture">
                    <img class="person-pokemon" src="${person.pokemonImg}">
                    <p>${person.blurb}</p>
                </li>
            `;
    }
}

export default AboutUsListItem;