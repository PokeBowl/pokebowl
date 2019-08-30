import AuthApp from './components/app/AuthApp.js';

const authApp = new AuthApp();
document.body.prepend(authApp.renderDOM());