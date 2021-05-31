import Buttom from '../button';
import { router } from '../../lib';

class StartGameBtn extends Buttom {
  constructor() {
    super('Start new game');

    this.element.addEventListener('click', () => {
      window.history.pushState({}, '', '/');
      router.execute('/');
    });
  }
}

export default StartGameBtn;
