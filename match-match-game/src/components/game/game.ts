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

    this.element.appendChild(this.cardsField.element);
  }

  startGame(images: string[]) {
    this.cardsField.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', (event: MouseEvent) => this.cardHendler(event, card));
    });

    this.cardsField.respawnCards(cards);
  }

  private async cardHendler(event: MouseEvent, card: Card) {
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
