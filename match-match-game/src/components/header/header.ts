import './header.scss';
import BaseComponent from '../base-component';
import Navigation from '../nav/nav';
import Registration from '../registration/registration';

class Header extends BaseComponent {
  private nav: Navigation;

  private registration: Registration;

  constructor() {
    super('div', ['header']);

    this.nav = new Navigation();
    this.registration = new Registration();

    this.element.innerHTML = `
      <div class="header__logo"></div>
    `;
    this.element.appendChild(this.nav.element);
    this.element.appendChild(this.registration.element);
  }
}

export default Header;
