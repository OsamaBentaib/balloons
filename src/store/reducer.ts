import {
  ADD_REMOVE_CART,
  CLOSE_CART,
  CLOSE_DETAILS,
  OPEN_CART,
  OPEN_DETAILS,
  RESET_FILTERS,
  SET_FILTER_WITH_COLOR,
  SET_FILTER_WITH_VARIANT,
  SET_PAGINATION,
  SET_SORT_BY,
} from "./actionTypes";
import { sortInput } from "./paramsTypes";

/**
 * as default we need to check on localstorage if there's a cart 
 * and get the cart string and convert it to a JSON object
 */
const storedItems = localStorage.getItem("_cart");
let cartItems: CartItem[] = [];
// check for the type of storedItems
if (typeof storedItems === "string") {
  // convert the storedItems string to a json object
  cartItems = JSON.parse(storedItems);
}
const initialState: InitialState = {
  balloonDetails: {
    isDetailsOpen: false, // as default the balloon details won't be displayed
    balloonId: null, // the id should be null as default
  },
  cart: {
    isCartOpen: false, // as default the cart won't be displayed
    items: cartItems, // as default the cart would be empty or they fetch from storage
  },
  paramsQueryVariables: {
    filter: {}, // as default it's won't be any filter with balloons
    sort: sortInput.ID, // as dafault we will fetch
  },
};


const reducer = (
  state: InitialState = initialState,
  action: Action
): InitialState => {
  // set the right action to update the state
  switch (action.type) {
    case ADD_REMOVE_CART:
      // remove the previews cart and replace it
      localStorage.removeItem("_cart");
      const items = action.payload.cart.items;
      // save the json object as string inside the localstorage
      localStorage.setItem("_cart", JSON.stringify(items));
      return {
        ...state,
        cart: { ...state.cart, items: items },
      };
    case OPEN_CART:
      return {
        ...state,
        cart: { ...state.cart, isCartOpen: true },
      };
    case CLOSE_CART:
      return {
        ...state,
        cart: { ...state.cart, isCartOpen: false },
      };
    case OPEN_DETAILS:
      return {
        ...state,
        balloonDetails: action.payload.balloonDetails,
      };
    case CLOSE_DETAILS:
      return {
        ...state,
        balloonDetails: action.payload.balloonDetails,
      };
    case SET_SORT_BY:
      return {
        ...state,
        paramsQueryVariables: {
          ...state.paramsQueryVariables,
          sort: action.payload,
        },
      };
    case SET_FILTER_WITH_COLOR:
      return {
        ...state,
        paramsQueryVariables: {
          ...state.paramsQueryVariables,
          filter: {
            ...state.paramsQueryVariables.filter,
            color: action.payload,
          },
        },
      };
    case SET_FILTER_WITH_VARIANT:
      return {
        ...state,
        paramsQueryVariables: {
          ...state.paramsQueryVariables,
          filter: {
            ...state.paramsQueryVariables.filter,
            variant: action.payload,
          },
        },
      };
    case RESET_FILTERS:
      return {
        ...state,
        paramsQueryVariables: {
          filter: {}, // as default it's won't be any filter with balloons
          sort: sortInput.ID, // as dafault we will fetch
        },
      };
    case SET_PAGINATION:
      return {
        ...state,
        paramsQueryVariables: {
          ...state.paramsQueryVariables,
          before: action.payload.before,
          after: action.payload.after,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;
