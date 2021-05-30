import './header.scss';
import BaseComponent from '../base-component';
import Navigation from '../nav/nav';
import UserInfo from '../user-info';

class Header extends BaseComponent {
  private nav: Navigation;

  private userInfo = new UserInfo();

  constructor() {
    super('div', ['header']);

    this.nav = new Navigation();

    this.element.innerHTML = `
      <div class="header__logo"></div>
    `;
    this.element.appendChild(this.nav.element);
    this.element.appendChild(this.userInfo.element);
  }
}

export default Header;
