import Header from './components/header/header';
import PageContainer from './components/container/container';
import Game from './components/game/game';
import { ImgCategoryModal } from './models/img-category-modal';
import router from './router';

class App {
  private readonly header = new Header();

  private readonly container = new PageContainer();

  private readonly game = new Game();

  constructor(private readonly rootElement: Element) {
    router.add(
      {
        path: '/',
        enter: () => {
          console.log('enter');
        },
      },
      {
        path: '/rating',
        enter: () => {
          console.log('enter rating');
        },
      },
      {
        path: '/settings',
        enter: () => {
          console.log('enter settings');
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
