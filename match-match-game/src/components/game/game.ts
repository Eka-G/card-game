import BaseComponent from '../base-component';
import Card from '../card/card';
import CardsField from '../cards-field/cards-field';
import delay from '../../shared/delay';
import Scores from './scores';
import FinishModal from '../finish-modal';
import { auth, dataBase, Collection } from '../../lib';

const FLIP_DELAY = 1.5;

interface Settings {
  difficulty: string;
  cardType: string;
}
class Game extends BaseComponent {
  private readonly cardsField = new CardsField();

  private categories: Promise<{ [key: string]: string[] }>;

  private activeCard?: Card;

  private inAnimation = false;

  private score?: Scores;

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
    let imagesList = images;
    const difficulty = parseInt(settings.difficulty, 10);
    const size = difficulty ** 2 / 2;

    if (size <= imagesList.length) {
      imagesList = imagesList.slice(0, size);
    } else {
      const different = size - imagesList.length;

      for (let i = 0; i < different; i += 1) {
        imagesList.push(imagesList[i % (imagesList.length - 1)]);
      }
    }

    const cards = imagesList
      .concat(imagesList)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHendler(card));
    });

    this.cardsField.respawnCards(cards);
    this.score = new Scores();
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

    this.score?.increment(this.activeCard.image !== card.image);

    if (this.activeCard.image !== card.image) {
      changeStatus(firstCard, secondCard, 'miss');

      await delay(FLIP_DELAY * 1000);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack(), changeStatus(firstCard, secondCard, 'miss')]);
    } else {
      changeStatus(firstCard, secondCard, 'match');
    }

    const isFinished = this.cardsField.cards.every((item) => item.isFlipped);

    if (isFinished) await Game.finishGame(this.score!.stop());

    this.activeCard = undefined;
    this.inAnimation = false;
  }

  private static async finishGame(score: number) {
    const user = auth.currentUser;

    if (user) {
      await dataBase.set(Collection.Users, user.email, { ...user, score });
    }

    new FinishModal(score);
  }
}

export default Game;
