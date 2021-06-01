type Func = (href: string) => void;

interface Route {
  path: string;
  enter?: Func;
  leave?: Func;
}

class Router {
  private list = new Map<string, Route>();

  private base: string = window.location.pathname;

  constructor() {
    window.onpopstate = (event: PopStateEvent) => {
      const path = event.state.path || window.location.pathname;
      const withoutBase = !event.state.path;

      this.execute(path, withoutBase);
    };
  }

  set basePath(value: string) {
    this.base = Router.normalizePath(value);
  }

  private static normalizePath(value: string) {
    let normalizedPath = value;

    if (normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, normalizedPath.length - 1);
    }

    return normalizedPath;
  }

  public getPath(pathName: string) {
    return pathName.replace(this.base, '');
  }

  public getHistoryPath(pathnName: string) {
    return Router.normalizePath(this.base) + pathnName;
  }

  public execute(pathName: string, withoutBase: boolean = true) {
    let path = pathName;

    if (withoutBase) {
      path = this.getPath(pathName);
    }

    const route = this.list.get(path);

    if (!route?.enter) return;

    route.enter(path);
  }

  public add(...routes: Route[]) {
    routes.forEach((item) => this.list.set(item.path, item));

    this.execute(window.location.pathname);
  }
}

export default new Router();
