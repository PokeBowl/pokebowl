import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
            <div class="header-div">
                <header>
                    <div class="header-img-container">
                        <img class="header-image" src="./assets/pokebowl-header.png" alt="pokebowl-logo">
                        <button class="log-out-button">Log Out</button>
                    </div>


                    <nav class="head-nav">
                        <a href="./locker-room.html">Locker Room</a>
                        <a href="./about-us.html">About Us</a>
                    </nav>
                </header>
            </div>
        `;
    }
}

export default Header;