import RatingItem from '../rating-item';
import BaseComponent from '../base-component';
import { dataBase, Collection } from '../../lib';

class RatingTable extends BaseComponent {
  constructor() {
    super('ul');
    this.createList();
  }

  async createList() {
    const record = await dataBase.getAll<{ firstName: string; lastName: string; email: string; score: string }>(
      Collection.Users,
    );

    record
      .sort((a, b) => parseInt(b.data.score || '0', 10) - parseInt(a.data.score || '0', 10))
      .forEach((element) => {
        const user = element.data;

        if (!user.score) user.score = '0';

        const newScore = new RatingItem(user);
        this.element.appendChild(newScore.element);
      });
  }
}

export default RatingTable;
