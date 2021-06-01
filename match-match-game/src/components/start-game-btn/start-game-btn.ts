import Buttom from '../button';
import { router } from '../../lib';

class StartGameBtn extends Buttom {
  constructor() {
    super('Start new game');

    this.element.addEventListener('click', () => {
      window.history.pushState({ path: '/' }, '', router.getHistoryPath('/'));
      router.execute('/', false);
    });
  }
}

export default StartGameBtn;
