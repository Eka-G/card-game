import { router } from '../../lib';

interface LinkProps {
  title: string;
  to: string;
  className?: string;
}

class Link {
  public readonly elem: HTMLAnchorElement;

  constructor(props: LinkProps) {
    this.elem = Link.createElem(props);
  }

  private static createElem({ title, to, className = '' }: LinkProps) {
    const link = document.createElement('a');

    link.setAttribute('href', to);
    if (className) link.classList.add(...className.split(' '));
    link.innerText = title;

    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (!(event.currentTarget instanceof HTMLAnchorElement)) return;

      Link.forawrdTo(to);
    });

    return link;
  }

  private static forawrdTo(to: string) {
    if (window.location.pathname === to) return;

    window.history.pushState({}, '', to);
    router.execute(to);
  }
}

export default Link;
