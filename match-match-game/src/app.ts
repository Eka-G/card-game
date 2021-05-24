import Game from './components/game/game';
import { ImgCategoryModal } from './models/img-category-modal';

class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
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
