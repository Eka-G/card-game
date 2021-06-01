import './finish-btn.scss';
import Button from '../button';
import { router } from '../../lib';

class FinishGameBtn extends Button {
  constructor() {
    super('OK');

    this.element.classList.add('finish-btn');

    this.element.addEventListener('click', () => {
      window.history.pushState({ path: '/rating' }, '', router.getHistoryPath('/rating'));
      router.execute('/rating', false);
    });
  }
}

export default FinishGameBtn;
