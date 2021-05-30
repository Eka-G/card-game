import './button.scss';
import BaseComponent from '../base-component';

class Button extends BaseComponent<HTMLButtonElement> {
  constructor(text: string, id?: string) {
    super('button', ['button']);

    this.element.innerHTML = `
      ${text}
    `;

    if (id) this.element.setAttribute('id', `${id}`);
  }
}

export default Button;
