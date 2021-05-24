import './scss/styles.scss';
import App from './app';

window.onload = () => {
  const appElem = document.getElementById('app');

  if (!appElem) throw Error('App root element not found');

  new App(appElem).start();
};
