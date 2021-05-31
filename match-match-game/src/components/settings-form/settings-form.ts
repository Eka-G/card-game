import Form from '../form';
import Select from '../select';
import { dataBase, Collection } from '../../lib';

class SettingsForm extends Form {
  constructor() {
    super();

    this.renderSelects();
  }

  private async renderSelects() {
    const settings = (await SettingsForm.getData()) || { difficulty: '4', cardType: 'animal' };

    const difficultySelect = new Select({
      title: 'Choose difficulty:',
      placeholder: 'select game size',
      options: [
        { value: '2', text: '2 x 2' },
        { value: '4', text: '4 x 4' },
        { value: '6', text: '6 x 6' },
      ],
      value: settings.difficulty,
      listener: (event: Event) => {
        if (!(event.target instanceof HTMLSelectElement)) return;

        settings.difficulty = event.target.value;
        SettingsForm.setData(settings);
      },
    });

    const categorySelect = new Select({
      title: 'Game cards:',
      placeholder: 'select cards type',
      options: [{ value: 'animal', text: 'animal' }],
      value: settings.cardType,
      listener: (event: Event) => {
        if (!(event.target instanceof HTMLSelectElement)) return;

        settings.cardType = event.target.value;
        SettingsForm.setData(settings);
      },
    });

    this.element.append(difficultySelect.element, categorySelect.element);
  }

  private static async getData() {
    const record = await dataBase.get<{ difficulty: string; cardType: string }>(Collection.Settings, '');

    return record?.data;
  }

  static async setData(settings: { difficulty: string; cardType: string }) {
    return dataBase.set(Collection.Settings, '', settings);
  }
}

export default SettingsForm;
