import Header from './components/header/header';
import PageContainer from './components/container/container';
import Game from './components/game/game';
import { ImgCategoryModal } from './models/img-category-modal';

class App {
  private readonly header: Header;

  private readonly container: PageContainer;

  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);

    this.container = new PageContainer();
    this.rootElement.appendChild(this.container.element);

    this.game = new Game();
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
