import './button.scss';
import BaseComponent from '../base-component';

class Button extends BaseComponent {
  constructor(text: string, id: string) {
    super('button', ['button']);

    this.element.innerHTML = `
      ${text}
    `;
    this.element.setAttribute('id', `${id}`);
  }
}

export default Button;
