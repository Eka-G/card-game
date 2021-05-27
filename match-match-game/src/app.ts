import Header from './components/header/header';
import PageContainer from './components/container/container';
import AboutContent from './pages/about/about';
import Game from './components/game/game';
import { ImgCategoryModal } from './models/img-category-modal';
import router from './router';

class App {
  private readonly header = new Header();

  private readonly container = new PageContainer();

  private readonly about = new AboutContent();

  private readonly game = new Game();

  constructor(private readonly rootElement: Element) {
    router.add(
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
          this.container.element.innerHTML = `
            <p>Here will be RATING soon =)</p>
          `;
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
    this.container.element.appendChild(this.game.element);
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImgCategoryModal[] = await res.json();
    const choosenCategory = categories[0];
    const image = choosenCategory.images.map((name: string) => `${choosenCategory.category}/${name}`);
    this.game.startGame(image);
  }
}

export default App;
