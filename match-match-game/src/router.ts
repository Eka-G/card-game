type Func = (href: string) => void;

interface RouterData {
  name: string;
  enter?: Func;
  leave?: Func;
}

class Router {
  private list = new Map<string, RouterData>();

  constructor() {
    window.onpopstate = () => {
      window.location.hash = '/rating';
      console.log(window.location.hash);
    };
  }

  public add(data: RouterData) {
    this.list.set(data.name, data);
  }
}

export default Router;
