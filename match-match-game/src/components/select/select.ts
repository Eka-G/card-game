import { template } from 'lodash-es';
import templateHTML from './select.ejs';
import Option from '../option';
import BaseComponent from '../base-component';

interface Params {
  options: { value: string; text: string }[];
  title: string;
  placeholder: string;
  value?: string;
  listener: (event: Event) => void;
}

class Select extends BaseComponent {
  constructor(params: Params) {
    super('div', ['select']);

    this.element.innerHTML = template(templateHTML)({ title: params.title });

    const select = this.element.querySelector('select');

    select?.addEventListener('change', params.listener);

    params.options.forEach((option) => {
      const newOption = new Option(option.value, option.text);

      if (params.value === option.value) {
        newOption.element.selected = true;
      }

      select?.append(newOption.element);
    });
  }
}

export default Select;
