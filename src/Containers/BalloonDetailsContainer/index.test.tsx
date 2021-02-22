import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../store/reducer";
import BalloonDetailsContainer from "../BalloonDetailsContainer/BalloonDetailsContainer";
import { siteURL } from "../../utils";
import { CombinedError } from "urql";

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
const data = {
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
};
describe("<BalloonDetailsContainer /> unit test", () => {
  const mockStore = createStore(reducer, initialState);
  const getWrapper = (children: any) =>
    mount(<Provider store={mockStore}>{children}</Provider>);

  it("init test with fetching", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={null} fetching={true} />
    );
    expect(wrapper.find("._errors").exists()).toBe(false);
    expect(wrapper.find("._loading").exists()).toBe(true);
    expect(wrapper.find(".details-info").exists()).toBe(false);
  });
  it("init test with errors", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer
        data={null}
        fetching={false}
        error={new CombinedError({ response: "Error" })}
      />
    );
    expect(wrapper.find("._errors").exists()).toBe(true);
    expect(wrapper.find("._loading").exists()).toBe(false);
    expect(wrapper.find(".details-info").exists()).toBe(false);
  });
  it("init test with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find("._errors").exists()).toBe(false);
    expect(wrapper.find("._loading").exists()).toBe(false);
    expect(wrapper.find(".details-info").exists()).toBe(true);
  });
  it("it's render image correctly with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__img").prop("src")).toEqual(
      siteURL + data.balloon.imageUrl
    );
  });
  it("it's render details__title correctly with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__title").text()).toEqual(data.balloon.name);
  });
  it("it's render details__deco correctly with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__deco").prop("style")?.background).toEqual(
      data.balloon.color.toLocaleLowerCase()
    );
  });
  it("it's render details__subtitle correctly with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__subtitle").text()).toContain(
      data.balloon.color
    );
    expect(wrapper.find(".details__subtitle").text()).toContain(
      data.balloon.variant
    );
  });
  it("it's render details__price correctly with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__price").text()).toContain(
      data.balloon.price
    );
  });
  it("it's render details__description correctly with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__description").text()).toContain(
      data.balloon.description
    );
  });
  it("it's render details__description correctly with data", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__description").text()).toContain(
      data.balloon.description
    );
  });
  it("incremment the quantity correctly", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find("input").prop("value")).toEqual(1);
    wrapper.find(".add1").simulate("click");
    expect(wrapper.find("input").prop("value")).toEqual(2);
    wrapper.find(".add1").simulate("click");
    expect(wrapper.find("input").prop("value")).toEqual(3);
  });
  it("decremment the quantity correctly", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find("input").prop("value")).toEqual(1);
    wrapper.find(".minus1").simulate("click");
    expect(wrapper.find("input").prop("value")).toEqual(1);
    wrapper.find(".add1").simulate("click");
    expect(wrapper.find("input").prop("value")).toEqual(2);
    wrapper.find(".minus1").simulate("click");
    expect(wrapper.find("input").prop("value")).toEqual(1);
  });
  it("disable the button after adding to cart", () => {
    const wrapper = getWrapper(
      <BalloonDetailsContainer data={data} fetching={false} />
    );
    expect(wrapper.find(".details__addtocart").text()).toEqual("Add to cart");
    wrapper.find(".details__addtocart").simulate("click");
    expect(wrapper.find(".details__addtocart").text()).toEqual("Added to cart");
  });
});
