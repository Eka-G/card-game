import './nav.scss';
import BaseComponent from '../base-component';
import router from '../../router';

class Navigation extends BaseComponent {
  constructor() {
    super('nav', ['nav']);

    this.element.innerHTML = `
      <ul class="nav__list">
        <li class="nav__item">
          <a class="nav__link" href="/">About game</a>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="/rating">Best score</a>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="/settings">Game settings</a>
        </li>
      </ul>
    `;

    const links: NodeList = this.element.querySelectorAll('.nav__link');

    links.forEach((item) =>
      item.addEventListener('click', (event) => {
        event.preventDefault();

        if (!(event.currentTarget instanceof HTMLAnchorElement)) return;

        const { href } = event.currentTarget;
        const url = new URL(href);
        window.history.pushState({}, '', url.pathname);
        router.execute(url.pathname);
      }),
    );
  }
}

export default Navigation;
