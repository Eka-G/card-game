import './form.scss';
import BaseComponent from '../base-component';

class Form extends BaseComponent<HTMLFormElement> {
  constructor() {
    super('form', ['form']);
  }
}

export default Form;
