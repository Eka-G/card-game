import './scss/styles.scss';
import App from './app';

window.onload = () => {
  const root = document.querySelector('.body');

  if (!root) throw Error('App root element not found');

  new App(root).start();
};
