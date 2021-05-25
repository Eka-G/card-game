import './nav.scss';
import BaseComponent from '../base-component';

class Navigation extends BaseComponent {
  constructor() {
    super('nav', ['nav']);

    this.element.innerHTML = `
      <ul class="nav__list">
        <li class="nav__item">About game</li>
        <li class="nav__item">Best score</li>
        <li class="nav__item">Game settings</li>
      </ul>
    `;
  }
}

export default Navigation;
