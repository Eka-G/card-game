import BaseComponent from '../base-component';

interface InputAttributes {
  name: string;
  type: string;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  className?: string;
}

class Input extends BaseComponent {
  constructor({ className = '', ...attributes }: InputAttributes) {
    super('input', ['input']);

    Object.entries(attributes).forEach(([attrName, attrValue]) => this.element.setAttribute(attrName, attrValue));
    this.element.classList.add(...className.split(' '));
  }
}

export default Input;
