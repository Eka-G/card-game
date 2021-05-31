import SettingsForm from '../../components/settings-form';

class SettingsContent {
  element: HTMLElement = document.createElement('section');

  private settingsForm = new SettingsForm();

  constructor() {
    this.element.classList.add('settings');
    this.element.appendChild(this.settingsForm.element);
  }
}

export default SettingsContent;
