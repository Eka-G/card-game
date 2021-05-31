import Header from './components/header/header';
import PageContainer from './components/container/container';
import AboutContent from './pages/about/about';
import RatingContent from './pages/rating';
import Game from './components/game/game';
import { router, auth, dataBase, Collection } from './lib';

class App {
  private readonly header = new Header();

  private readonly container = new PageContainer();

  private readonly about = new AboutContent();

  private readonly game = new Game();

  constructor(private readonly rootElement: Element) {
    router.add(
      {
        // redirect to About page
        path: '/',
        enter: () => {
          if (!auth.currentUser) {
            window.history.pushState({}, '', '/about');
            router.execute('/about');

            return;
          }

          this.container.element.innerHTML = '';
          this.container.element.appendChild(this.game.element);

          dataBase.get<{ difficulty: number; cardType: string }>(Collection.Settings, '').then(async (record) => {
            const settings = record?.data || { difficulty: 8, cardType: 'animal' };

            if (!record) {
              dataBase.set(Collection.Settings, '', settings);
            }

            this.game.startGame(settings);
          });
        },
      },
      {
        path: '/about',
        enter: () => {
          this.container.element.innerHTML = '';
          this.container.element.appendChild(this.about.element);
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
          this.container.element.innerHTML = `
            <p>Here will be SETTINGS soon =)</p>
          `;
        },
      },
    );

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.container.element);
  }
}

export default App;
