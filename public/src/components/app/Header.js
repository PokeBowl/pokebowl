import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
            <div class="header-div">
                <header>
                    <div class="header-img-container">
                        <img class="header-image" src="./assets/pokebowl-header.png" alt="pokebowl-logo">
                    </div>

                    <div id="button-container">
                        <div class="log-out-container">
                            <button class="log-out-button"><a href="./auth.html">Log Out</a></button>
                        </div>
                        
                        <nav class="head-nav">
                            <a class="locker-room-nav lock-hide" href="./locker-room.html">Locker Room</a>
                            <a class="locker-room-nav" href="./about-us.html">About Us</a>
                        </nav>
                    </div>
                </header>
            </div>
        `;
    }
}

export default Header;