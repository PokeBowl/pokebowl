import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
            <div>
                <header>
                    <img src="./assets/pokebowl-header.png" alt="pokebowl-logo">

                    <button>Log Out</button>

                    <nav>
                        <a href="./locker-room.html">Locker Room</a>
                        <a href="./about-us.html">About Us</a>
                    </nav>
                </header>
            </div>
        `;
    }
}

export default Header;