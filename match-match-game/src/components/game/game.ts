import BaseComponent from '../base-component';
import Card from '../card/card';
import CardsField from '../cards-field/cards-field';
import { delay } from '../../shared/delay';

const FLIP_DELAY = 1.5;

class Game extends BaseComponent {
  private readonly cardsField = new CardsField();

  private activeCard?: Card;

  private inAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  startGame(images: string[]) {
    this.cardsField.clear();

    const cards = images
      .concat(images)
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

    this.inAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.inAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await delay(FLIP_DELAY * 1000);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }

    this.activeCard = undefined;
    this.inAnimation = false;
  }
}

export default Game;
