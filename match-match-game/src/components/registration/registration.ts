import './registration.scss';
import BaseComponent from '../base-component';
import Button from '../button/button';
import User from '../user/user';

class Registration extends BaseComponent {
  private button: Button;

  private user: User;

  constructor() {
    super('div', ['registration']);
    this.button = new Button('Sing up', 'reg-btn');
    this.user = new User();

    this.element.appendChild(this.button.element);
  }

  acceptUser() {
    this.element.innerHTML = ``;
    this.element.appendChild(this.user.element);
  }
}

export default Registration;
