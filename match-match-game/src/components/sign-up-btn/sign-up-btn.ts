import Button from '../button';
import SignUpModal from '../sign-up-modal';

class SignUpButton extends Button {
  constructor() {
    super('Sign Up');

    this.element.addEventListener('click', () => new SignUpModal());
  }
}

export default SignUpButton;
