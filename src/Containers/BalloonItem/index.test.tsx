import BalloonItem from "./BalloonItem";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./../../store/reducer";
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
const balloon: Balloon = {
  id: "blue",
  name: "Light Blue Heart Balloon",
  imageUrl: "/balloons/heart-blue.jpg",
  description: "A blue balloon, great for occasions involving hearts.",
  color: "BLUE",
  variant: "HEART",
  price: 10,
  availableSince: "2020-05-13T13:00:00Z",
};
Enzyme.configure({ adapter: new Adapter() });

describe("<BalloonItem /> unit test", () => {
  const mockStore = createStore(reducer, initialState);
  const getWrapper = () =>
    mount(
      <Provider store={mockStore}>
        <BalloonItem balloon={balloon} />
      </Provider>
    );
  it(".product__img should have a correct src", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".product__img").prop("src")).toEqual(
      siteURL + balloon.imageUrl
    );
  });
  it(".grid__item should have a correct id", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".grid__item").prop("id")).toEqual(balloon.id);
  });
  it(".grid__item should should be clicked correctly", () => {
    const wrapper = getWrapper();
    wrapper.find(".grid__item").simulate("click");
    expect(
      wrapper.find(".grid__item").hasClass("grid__item isOpen")
    ).toBeTruthy();
  });
  it(".product__title should have a correct text", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".product__title").text()).toEqual(balloon.name);
  });
  it(".product__price should have a correct text", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".product__price").text()).toEqual("$" + balloon.price);
  });
  it(".product__bg should have a correct text", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".product__bg").text()).toEqual("");
  });
});
