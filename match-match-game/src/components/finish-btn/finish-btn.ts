import './finish-btn.scss';
import Button from '../button';
import { router } from '../../lib';

class FinishGameBtn extends Button {
  constructor() {
    super('Cansel');

    this.element.classList.add('finish-btn');

    this.element.addEventListener('click', () => {
      router.execute('/rating');
    });
  }
}

export default FinishGameBtn;
