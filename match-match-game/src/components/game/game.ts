import BaseComponent from '../base-component';
import Card from '../card/card';
import CardsField from '../cards-field/cards-field';
import delay from '../../shared/delay';

const FLIP_DELAY = 1.5;

interface Settings {
  difficulty: number;
  cardType: string;
}
class Game extends BaseComponent {
  private readonly cardsField = new CardsField();

  private categories: Promise<{ [key: string]: string[] }>;

  private activeCard?: Card;

  private inAnimation = false;

  constructor() {
    super();

    this.categories = Game.loadImages();
    this.element.appendChild(this.cardsField.element);
  }

  static async loadImages(): Promise<{ [key: string]: string[] }> {
    const res = await fetch('./images.json');

    return res.json();
  }

  async startGame(settings: Settings) {
    this.cardsField.clear();

    const categories = await this.categories;
    const images = categories[settings.cardType];
    const slicedImages = images.slice(images.length - settings.difficulty);
    const cards = slicedImages
      .concat(slicedImages)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHendler(card));
    });

    this.cardsField.respawnCards(cards);
  }

  private async cardHendler(card: Card) {
    if (this.inAnimation) return;
    if (card.isFlipped) return;

    function changeStatus(first: Element, second: Element, classValue: string) {
      first.classList.toggle(`${classValue}`);
      second.classList.toggle(`${classValue}`);
    }

    this.inAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.inAnimation = false;
      return;
    }

    const firstCard = this.activeCard.element.lastElementChild?.firstElementChild;
    const secondCard = card.element.lastElementChild?.firstElementChild;

    if (!(firstCard && secondCard)) return;

    if (this.activeCard.image !== card.image) {
      changeStatus(firstCard, secondCard, 'miss');

      await delay(FLIP_DELAY * 1000);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack(), changeStatus(firstCard, secondCard, 'miss')]);
    } else {
      changeStatus(firstCard, secondCard, 'match');
    }

    this.activeCard = undefined;
    this.inAnimation = false;
  }
}

export default Game;
