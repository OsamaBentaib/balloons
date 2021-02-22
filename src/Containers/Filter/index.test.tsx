import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./../../store/reducer";
import Filter from "./Filter";
import { colors, sortInput, Variant } from "../../store/paramsTypes";

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
Enzyme.configure({ adapter: new Adapter() });

describe("<Card /> unit test", () => {
  const mockStore = createStore(reducer, initialState);
  const getWrapper = () =>
    mount(
      <Provider store={mockStore}>
        <Filter />
      </Provider>
    );
  it("render the filters with sort", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".filter__sort--id").hasClass("active")).toEqual(true);
    Object.values(sortInput).map((e) => {
      expect(
        wrapper.find(`.filter__sort--${e.toLowerCase()}`).exists()
      ).toEqual(true);
    });
  });
  it("render the filters with colors", () => {
    const wrapper = getWrapper();
    Object.values(colors).map((e) => {
      expect(
        wrapper.find(`.filter__color--${e.toLowerCase()}`).exists()
      ).toEqual(true);
      expect(
        wrapper.find(`.filter__color--${e.toLowerCase()}`).prop("style")
          ?.background
      ).toEqual(e.toLowerCase());
      expect(wrapper.find(`.filter__color--${e.toLowerCase()}`).text()).toEqual(
        e.toLowerCase()
      );
    });
  });
  it("render the filters with variant", () => {
    const wrapper = getWrapper();
    Object.values(Variant).map((e) => {
      expect(
        wrapper.find(`.filter__Variant--${e.toLowerCase()}`).exists()
      ).toEqual(true);
    });
  });
  it("Filter sort by color click", () => {
    const wrapper = getWrapper();
    Object.values(colors).map((e) => {
      wrapper.find(`.filter__color--${e.toLowerCase()}`).simulate("click");
      expect(
        wrapper.find(`.filter__color--${e.toLowerCase()}`).hasClass("active")
      ).toEqual(true);
      expect(
        wrapper.find(`.filter__color--${e.toLowerCase()}`).prop("style")
          ?.background
      ).toEqual(e.toLowerCase());
      expect(wrapper.find(`.filter__color--${e.toLowerCase()}`).text()).toEqual(
        e.toLowerCase()
      );
    });
  });
  it("Filter sort by varient click", () => {
    const wrapper = getWrapper();
    Object.values(Variant).map((e) => {
      wrapper.find(`.filter__Variant--${e.toLowerCase()}`).simulate("click");
      expect(
        wrapper.find(`.filter__Variant--${e.toLowerCase()}`).hasClass("active")
      ).toEqual(true);
    });
  });
  it("Filter sort by sortInput click", () => {
    const wrapper = getWrapper();
    Object.values(sortInput).map((e) => {
      wrapper.find(`.filter__sort--${e.toLowerCase()}`).simulate("click");
      expect(
        wrapper.find(`.filter__sort--${e.toLowerCase()}`).hasClass("active")
      ).toEqual(true);
    });
  });
});
