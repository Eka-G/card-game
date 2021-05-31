import './rating.scss';
import RatingTable from '../../components/rating-table';

class RatingContent {
  element: HTMLElement = document.createElement('section');

  private ratingTable = new RatingTable();

  constructor() {
    this.element.classList.add('rating');
    this.element.appendChild(this.ratingTable.element);
  }
}

export default RatingContent;
