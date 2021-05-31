import Modal from '../modal';
import FinishGameBtn from '../finish-btn';

class FinishModal extends Modal {
  private finishGameBtn = new FinishGameBtn();

  constructor(score: number) {
    super('You successfully found all matches');

    const message = document.createElement('span');

    message.innerText = `Your result is ${score}`;

    this.content?.appendChild(this.finishGameBtn.element);
    this.content?.appendChild(message);

    this.finishGameBtn.element.addEventListener('click', () => this.close());
  }
}

export default FinishModal;
