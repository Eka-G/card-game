import './about.scss';
import template from './about.ejs';

class AboutContent {
  element: HTMLElement = document.createElement('section');

  constructor() {
    this.element.classList.add('about');
    this.element.innerHTML = template;
  }
}

export default AboutContent;
