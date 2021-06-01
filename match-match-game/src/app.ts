import Header from './components/header/header';
import PageContainer from './components/container/container';
import AboutContent from './pages/about/about';
import RatingContent from './pages/rating';
import SettingsContent from './pages/settings';
import Game from './components/game/game';
import { router, auth, dataBase, Collection } from './lib';

class App {
  private readonly header = new Header();

  private readonly container = new PageContainer();

  private readonly game = new Game();

  constructor(private readonly rootElement: Element) {
    router.basePath = window.location.pathname;

    router.add(
      {
        // redirect to About page
        path: '/',
        enter: () => {
          if (!auth.currentUser) {
            window.history.pushState({ path: '/about' }, '', router.getPath('/about'));
            router.execute('/about', false);

            return;
          }

          this.container.element.innerHTML = '';
          this.container.element.appendChild(this.game.element);

          dataBase.get<{ difficulty: string; cardType: string }>(Collection.Settings, '').then(async (record) => {
            const settings = record?.data || { difficulty: '4', cardType: 'animal' };

            if (!record) {
              dataBase.set(Collection.Settings, '', settings);
            }

            document.documentElement.style.setProperty('--grid-size', settings.difficulty);

            this.game.startGame(settings);
          });
        },
      },
      {
        path: '/about',
        enter: () => {
          const about = new AboutContent();

          this.container.element.innerHTML = '';
          this.container.element.appendChild(about.element);
        },
      },
      {
        path: '/rating',
        enter: () => {
          const rating = new RatingContent();

          this.container.element.innerHTML = '';
          this.container.element.appendChild(rating.element);
        },
      },
      {
        path: '/settings',
        enter: () => {
          const settings = new SettingsContent();

          this.container.element.innerHTML = '';
          this.container.element.appendChild(settings.element);
        },
      },
    );

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.container.element);
  }

  public static getPath(pathName: string) {
    let normalizeLocation = window.location.pathname;

    if (normalizeLocation.endsWith('/')) {
      normalizeLocation = normalizeLocation.slice(0, normalizeLocation.length - 1);
    }

    return normalizeLocation + pathName;
  }
}

export default App;
