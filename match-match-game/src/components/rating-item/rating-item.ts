import { template } from 'lodash-es';
import templateHTML from './rating-item.ejs';
import './rating-item.scss';
import BaseComponent from '../base-component';

class RatingItem extends BaseComponent {
  constructor(user: { firstName: string; lastName: string; email: string; score: string }) {
    super('li', ['rating__item']);

    this.element.innerHTML = template(templateHTML)(user);
  }
}

export default RatingItem;
