class BaseComponent<ElementType extends HTMLElement = HTMLElement> {
  readonly element: ElementType;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.element = document.createElement(tag) as ElementType;
    this.element.classList.add(...styles);
  }
}

export default BaseComponent;
