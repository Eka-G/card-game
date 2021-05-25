import './user.scss';
import BaseComponent from '../base-component';
import Button from '../button/button';
import Avatar from '../avatar/avatar';

class User extends BaseComponent {
  private button: Button;

  private avatar: Avatar;

  constructor() {
    super('div', ['user']);
    this.button = new Button('Start new game', 'start-btn');
    this.avatar = new Avatar();

    this.element.appendChild(this.button.element);
    this.element.appendChild(this.avatar.element);
  }
}

export default User;
