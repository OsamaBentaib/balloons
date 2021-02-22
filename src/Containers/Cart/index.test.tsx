import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./../../store/reducer";
import Cart from "./Cart";
import { siteURL } from "../../utils";

const initialState: InitialState = {
  balloonDetails: {
    isDetailsOpen: false, // as default the balloon details won't be displayed
    balloonId: null, // the id should be null as default
  },
  cart: {
    isCartOpen: false, // as default the cart won't be displayed
    items: [], // as default the cart would be empty or they fetch from storage
  },
  paramsQueryVariables: {
    filter: {}, // as default it's won't be any filter with balloons
    sort: "ID", // as dafault we will fetch
  },
};
// use this when we want to pass a items in card as default state
const state: InitialState = {
  balloonDetails: {
    isDetailsOpen: false, // as default the balloon details won't be displayed
    balloonId: null, // the id should be null as default
  },
  cart: {
    isCartOpen: false, // as default the cart won't be displayed
    items: [
      {
        quantity: 4,
        balloon: {
          id: "green",
          imageUrl: "/balloons/normal-green.jpg",
          name: "Green Balloon",
          price: 15,
          variant: "NORMAL",
          color: "GREEN",
          description:
            "A message is written in small text on the golden balloon in this photo. It seems to read 'send help I have been trapped in this balloon factory for 3 years'. Spooky.",
          availableSince: "2020-12-23T13:00:00Z",
        },
      },
      {
        quantity: 4,
        balloon: {
          id: "blue",
          imageUrl: "/balloons/heart-blue.jpg",
          name: "Light Blue Heart Balloon",
          price: 10,
          variant: "HEART",
          color: "BLUE",
          description: "A blue balloon, great for occasions involving hearts.",
          availableSince: "2020-05-13T13:00:00Z",
        },
      },
      {
        quantity: 2,
        balloon: {
          id: "starwooo",
          imageUrl: "/balloons/star-purple.jpg",
          name: "Purple Star Balloon",
          price: 55,
          variant: "STAR",
          color: "PURPLE",
          description: "The image isn't so great, but the balloon is!",
          availableSince: "2020-08-07T13:00:00Z",
        },
      },
    ], // as default the cart would be empty or they fetch from storage
  },
  paramsQueryVariables: {
    filter: {}, // as default it's won't be any filter with balloons
    sort: "ID", // as dafault we will fetch
  },
};
Enzyme.configure({ adapter: new Adapter() });

describe("<Card /> unit test", () => {
  const mockStore = createStore(reducer, initialState);
  const getWrapper = () =>
    mount(
      <Provider store={mockStore}>
        <Cart />
      </Provider>
    );
  it("before open the card the card", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".close").exists()).toEqual(false);
    expect(wrapper.find(".bage__badge").exists()).toEqual(true);
    expect(wrapper.find(".cart--open").exists()).toEqual(false);
  });
  it("open and close the card", () => {
    const wrapper = getWrapper();
    wrapper.find(".dummy-menu").simulate("click");
    expect(wrapper.find(".close").exists()).toEqual(true);
    expect(wrapper.find(".bage__badge").exists()).toEqual(false);
    expect(wrapper.find(".cart--open").exists()).toEqual(true);
    wrapper.find(".dummy-menu").simulate("click");
    expect(wrapper.find(".close").exists()).toEqual(false);
    expect(wrapper.find(".bage__badge").exists()).toEqual(true);
    expect(wrapper.find(".cart--open").exists()).toEqual(false);
  });
  it("The card should be empty", () => {
    const wrapper = getWrapper();
    wrapper.find(".dummy-menu").simulate("click");
    expect(wrapper.find(".cart__empty").exists()).toEqual(true);
  });
  it("The card grid list should be empty", () => {
    const wrapper = getWrapper();
    wrapper.find(".dummy-menu").simulate("click");
    expect(wrapper.find(".cart__grid").children().length).toEqual(0);
  });
  it("The card grid list should be not empty", () => {
    const store = createStore(reducer, state);
    const wrapper = () =>
      mount(
        <Provider store={store}>
          <Cart />
        </Provider>
      );
    wrapper().find(".dummy-menu").simulate("click");
    expect(wrapper().find(".cart__grid").children().length).toEqual(3);
    expect(wrapper().find(".cart__item__grid").exists()).toEqual(true);
    expect(wrapper().find(".cart__empty").exists()).toEqual(false);
  });
  it("The cart item remove from cart", () => {
    const store = createStore(reducer, state);
    const wrapper = () =>
      mount(
        <Provider store={store}>
          <Cart />
        </Provider>
      );
    wrapper().find(".dummy-menu").simulate("click");
    wrapper().find(".close--1").simulate("click");
    expect(wrapper().find(".cart__grid").children().length).toEqual(2);
  });
  it("The cart items renders correctly", () => {
    const store = createStore(reducer, state);
    const wrapper = () =>
      mount(
        <Provider store={store}>
          <Cart />
        </Provider>
      );
    wrapper().find(".dummy-menu").simulate("click");
    state.cart.items.map((e: CartItem, i) => {
      expect(wrapper().find(`#image--${i}`).prop("src")).toEqual(
        siteURL + e.balloon.imageUrl
      );
      expect(wrapper().find(`.name--${i}`).text()).toEqual(e.balloon.name);
      expect(wrapper().find(`.cart__item__price--${i}`).text()).toEqual(
        `$${e.balloon.price ? e.balloon.price * e.quantity : 0}`
      );
      expect(wrapper().find(`.cart__item__quantity--${i}`).text()).toEqual(
        `Quantity: ${e.quantity}`
      );
    });
  });
});
