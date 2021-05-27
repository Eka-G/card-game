import './nav.scss';
import template from './nav.ejs';
import BaseComponent from '../base-component';
import Link from '../link/link';

class Navigation extends BaseComponent {
  constructor() {
    super('nav', ['nav']);

    this.element.innerHTML = template;

    const links = [
      new Link({ title: 'About game', to: '/about', className: 'nav__link' }),
      new Link({ title: 'Best score', to: '/rating', className: 'nav__link' }),
      new Link({ title: 'Game settings', to: '/settings', className: 'nav__link' }),
    ];
    const linksWrapper: NodeList = this.element.querySelectorAll('.nav__item');

    linksWrapper.forEach((linkWrapper, index) => links[index] && linkWrapper.appendChild(links[index].elem));
  }
}

export default Navigation;
