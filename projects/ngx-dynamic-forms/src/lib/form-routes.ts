import { Route } from '@angular/router';

export type FormRoutesDict = { [key: string]: Route };

// build a route dictionary from an array of routes
export function routesDictFromChildrenRoutes(routes: Route[]): FormRoutesDict {
  const dict: FormRoutesDict = {};
  routes.forEach((route) => {
    if (route.path !== undefined) {
      dict[route.path] = route;
    }
  });
  return dict;
}

// returns an array of routes from a dictionary of routes
export function childrenRoutesFromDict(dict: FormRoutesDict): Route[] {
  const routes: Route[] = [];
  Object.keys(dict).forEach((key) => {
    routes.push(dict[key]);
  });
  return routes;
}
