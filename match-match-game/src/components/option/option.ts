import BaseComponent from '../base-component';

class Option extends BaseComponent<HTMLOptionElement> {
  constructor(value: string, text: string) {
    super('option', ['option']);

    this.element.setAttribute('value', value);
    this.element.innerText = text;
  }
}

export default Option;
