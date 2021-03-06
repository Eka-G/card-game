import { template } from 'lodash-es';
import templateHTML from './modal.ejs';
import './modal.scss';
import BaseComponent from '../base-component';

class Modal extends BaseComponent {
  public readonly content: HTMLDivElement | null;

  constructor(title?: string) {
    super('div', ['modal-container']);

    this.element.innerHTML = template(templateHTML)({ title });

    this.content = this.element.querySelector('.modal__content');

    const overlay = this.element.querySelector('.modal-overlay');

    overlay?.addEventListener('click', (event) => {
      if (event.target === overlay) {
        this.close();
      }
    });

    const modal = document.querySelector('.modal-container');

    if (modal) {
      document.body.removeChild(modal);
    }

    document.body.appendChild(this.element);
  }

  public close() {
    document.body.removeChild(this.element);
  }
}

export default Modal;
