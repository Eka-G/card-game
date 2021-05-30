import BaseComponent from '../base-component';
import { auth } from '../../lib';
import SignUpButton from '../sign-up-btn';

class UserInfo extends BaseComponent {
  private signUpBtn = new SignUpButton();

  constructor() {
    super();

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
    }
  }
}

export default UserInfo;
