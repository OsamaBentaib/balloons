type Details = {
  isDetailsOpen: boolean;
  balloonId: string | null;
};
type CartItem = {
  balloon: Balloon;
  quantity: number;
};
type ShoppingCart = {
  isCartOpen: Boolean;
  items: CartItem[];
};
type InitialState = {
  balloonDetails: Details;
  cart: ShoppingCart;
  paramsQueryVariables: ParamsQueryVariables;
};
type Action = {
  type: string;
  payload: IniteState;
};

type DispatchType = (args: Action) => Action;
