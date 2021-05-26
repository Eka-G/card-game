import './container.scss';
import BaseComponent from '../base-component';

class PageContainer extends BaseComponent {
  constructor() {
    super('div', ['container']);
    this.element.setAttribute('id', `app`);
  }

  clearPage() {
    this.element.innerHTML = '';
  }
}

export default PageContainer;
