import './registration.scss';
import BaseComponent from '../base-component';
import Button from '../button/button';
import User from '../user/user';

class Registration extends BaseComponent {
  private button = new Button('Sing up', 'reg-btn');

  private user = new User();

  constructor() {
    super('div', ['registration']);

    this.element.appendChild(this.button.element);
  }

  acceptUser() {
    this.element.innerHTML = ``;
    this.element.appendChild(this.user.element);
  }
}

export default Registration;
