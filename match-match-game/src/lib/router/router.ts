type Func = (href: string) => void;

interface Route {
  path: string;
  enter?: Func;
  leave?: Func;
}

class Router {
  private list = new Map<string, Route>();

  constructor() {
    window.onpopstate = () => {
      this.execute(window.location.pathname);
    };
  }

  public execute(pathName: string) {
    const route = this.list.get(pathName);

    if (!route?.enter) return;

    route.enter(pathName);
  }

  public add(...routes: Route[]) {
    routes.forEach((item) => this.list.set(item.path, item));

    this.execute(window.location.pathname);
  }
}

export default new Router();
