import Component from '../Component.js';


class AboutUsListItem extends Component {
    
    renderHTML() {
        const person = this.props.person;
        return /*html*/`
            <li class="person">
                <div id="person-name-container">
                    <img class="person-name" src="${person.nameText}" alt="${person.name} picture">
                </div>
                <div id="person-pokemon-container">
                    <img class="person-pokemon" src="${person.pokemonImg}">
                </div>
                <div class="blurb">
                    <p>${person.blurb}</p>
                </div>
            </li>
        `;
    }
}

export default AboutUsListItem;