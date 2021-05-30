import BaseComponent from '../base-component';

interface InputAttributes {
  name: string;
  type: string;
  placeholder: string;
  pattern: string;
}

class Input extends BaseComponent {
  constructor(tag: keyof HTMLElementTagNameMap = 'input', styles: string[] = [], attributes: InputAttributes) {
    super('input', ['input']);

    for (let key in attributes) {
      this.element.setAttribute(key, attributes[key]);
    }
  }
}

export default Input;
