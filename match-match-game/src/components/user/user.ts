import './user.scss';
import BaseComponent from '../base-component';
import Button from '../button/button';
import Avatar from '../avatar/avatar';

class User extends BaseComponent {
  private button = new Button('Start new game', 'start-btn');

  private avatar = new Avatar();

  constructor() {
    super('div', ['user']);

    this.element.appendChild(this.button.element);
    this.element.appendChild(this.avatar.element);
  }
}

export default User;
