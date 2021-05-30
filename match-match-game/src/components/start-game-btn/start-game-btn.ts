import Buttom from '../button';
// import App from '../../app';

class StartGameBtn extends Buttom {
  constructor() {
    super('Start new game');

    this.element.addEventListener('click', () => {
      console.log('startGameBtn');
      // const root = document.querySelector('.body');

      // if (!root) throw Error('App root element not found');

      // new App(root).start();
    });
  }
}

export default StartGameBtn;
