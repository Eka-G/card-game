import './nav.scss';
import template from './nav.ejs';
import BaseComponent from '../base-component';
import router from '../../router';

class Navigation extends BaseComponent {
  constructor() {
    super('nav', ['nav']);

    this.element.innerHTML = template;

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
