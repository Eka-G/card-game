import './avatar.scss';
import BaseComponent from '../base-component';

class Avatar extends BaseComponent {
  constructor() {
    super('div', ['avatar']);

    this.element.innerHTML = ``;
  }
}

export default Avatar;
