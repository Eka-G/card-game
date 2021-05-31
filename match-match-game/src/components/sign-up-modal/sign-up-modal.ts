import './sign-up-modal.scss';
import Modal from '../modal';
import Form from '../form';
import Input from '../input';
import Button from '../button';
import Avatar from '../avatar/avatar';
import { auth } from '../../lib';

// const emailRegExp = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$)';
const namePattern = '^[^~!\\s\\d@#$%*\\(\\)_—+=:;"\'`<>,\\.\\?/\\^\\|][^~!\\s@#$%*\\(\\)_—+=:;"\'`<>,\\.\\?/\\^\\|]+$';
class SignUpModal extends Modal {
  private signUpForm = new Form();

  private submitBtn = new Button('Add user');

  private cancelBtn = new Button('Cancel');

  private avatar = new Avatar();

  constructor() {
    super('Register new Player');

    this.content?.appendChild(this.avatar.element);

    const inputs = [
      new Input({
        className: 'sign-up-form__input',
        name: 'name',
        type: 'text',
        placeholder: 'First name',
        required: true,
        pattern: namePattern,
      }),
      new Input({
        className: 'sign-up-form__input',
        name: 'lastName',
        type: 'text',
        placeholder: 'Last name',
        required: true,
        pattern: namePattern,
      }),
      new Input({
        className: 'sign-up-form__input',
        name: 'email',
        type: 'email',
        placeholder: 'E-mail',
        required: true,
      }),
    ];

    inputs.forEach((input) => this.signUpForm.element.append(input.element));

    this.cancelBtn.element.addEventListener('click', () => this.close());
    this.submitBtn.element.setAttribute('type', 'submit');
    this.submitBtn.element.disabled = true;
    this.signUpForm.element.append(this.submitBtn.element, this.cancelBtn.element);
    this.addSubmitListener();
    this.addInputListener();
    this.content?.appendChild(this.signUpForm.element);
  }

  private addSubmitListener() {
    this.signUpForm.element.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(this.signUpForm.element);
      const user = {
        firstName: formData.get('name') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
      };

      this.submitBtn.element.disabled = true;

      auth.createUser(user).then(() => {
        this.close();
      });
    });
  }

  private addInputListener() {
    this.signUpForm.element.addEventListener('input', (event) => {
      if (event.target instanceof HTMLInputElement) {
        event.target?.classList.add('changed');
      }

      this.submitBtn.element.disabled = !this.signUpForm.element.checkValidity();
    });
  }
}

export default SignUpModal;
