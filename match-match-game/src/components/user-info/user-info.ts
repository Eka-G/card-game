import './user-info.scss';
import BaseComponent from '../base-component';
import { auth } from '../../lib';
import SignUpButton from '../sign-up-btn';
import StartGameBtn from '../start-game-btn';
import Avatar from '../avatar/avatar';

class UserInfo extends BaseComponent<HTMLDivElement> {
  private signUpBtn = new SignUpButton();

  private startGameBtn = new StartGameBtn();

  private avatar = new Avatar();

  constructor() {
    super('div', ['user-info']);

    this.changeContent();
    auth.addListener(() => this.changeContent());
  }

  private clearContent() {
    this.element.innerHTML = '';
  }

  private changeContent() {
    this.clearContent();

    if (!auth.currentUser) {
      this.element.appendChild(this.signUpBtn.element);

      return;
    }

    this.element.appendChild(this.startGameBtn.element);
    this.element.appendChild(this.avatar.element);
  }
}

export default UserInfo;
