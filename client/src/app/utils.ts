const typeCache: {[label: string]: boolean} = {};
//const store = new Store(fromRoot.State);

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type ${label} is not unique`);
  }
  typeCache[<string>label] = true;
  return <T>label;
};

export function requireAdmin(transition) {
  let $state = transition.router.stateService;
  //TODO
  //get app state
  return $state.target('login');

};export function requireLogged(transition) {
  let $state = transition.router.stateService;
  //TODO
  //get app state
  return $state.target('login');
};