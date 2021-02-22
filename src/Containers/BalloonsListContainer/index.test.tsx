import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./../../store/reducer";
import { siteURL } from "../../utils";
import BalloonsListContainer from "./BalloonsListContainer";

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
const dataAsProps = {
  edges: [
    {
      __typename: "BalloonEdge",
      node: {
        __typename: "Balloon",
        id: "blue",
        name: "Light Blue Heart Balloon",
        imageUrl: "/balloons/heart-blue.jpg",
        description: "A blue balloon, great for occasions involving hearts.",
        color: "BLUE",
        variant: "HEART",
        price: 10,
        availableSince: "2020-05-13T13:00:00Z",
      },
      cursor: "Ymx1ZQ==",
    },
    {
      __typename: "BalloonEdge",
      node: {
        __typename: "Balloon",
        id: "blue-2",
        name: "Blue Heart Balloon",
        imageUrl: "/balloons/heart-blue2.jpg",
        description: "A dark blue balloon in the shape of a heart.",
        color: "BLUE",
        variant: "HEART",
        price: 25,
        availableSince: "2020-06-18T13:00:00Z",
      },
      cursor: "Ymx1ZS0y",
    },
    {
      __typename: "BalloonEdge",
      node: {
        __typename: "Balloon",
        id: "blue-normal",
        name: "Blue Balloon",
        imageUrl: "/balloons/normal-blue.jpg",
        description: "An ordinary blue balloon.",
        color: "BLUE",
        variant: "NORMAL",
        price: 10,
        availableSince: "2020-06-16T13:00:00Z",
      },
      cursor: "Ymx1ZS1ub3JtYWw=",
    },
    {
      __typename: "BalloonEdge",
      node: {
        __typename: "Balloon",
        id: "blue-normal2",
        name: "Blue Balloon",
        imageUrl: "/balloons/normal-blue2.jpg",
        description: "An extraordinary blue balloon.",
        color: "BLUE",
        variant: "NORMAL",
        price: 9,
        availableSince: "2020-07-26T13:00:00Z",
      },
      cursor: "Ymx1ZS1ub3JtYWwy",
    },
    {
      __typename: "BalloonEdge",
      node: {
        __typename: "Balloon",
        id: "green",
        name: "Green Balloon",
        imageUrl: "/balloons/normal-green.jpg",
        description:
          "A message is written in small text on the golden balloon in this photo. It seems to read 'send help I have been trapped in this balloon factory for 3 years'. Spooky.",
        color: "GREEN",
        variant: "NORMAL",
        price: 15,
        availableSince: "2020-12-23T13:00:00Z",
      },
      cursor: "Z3JlZW4=",
    },
  ],
  pageInfo: {
    __typename: "PageInfo",
    hasPreviousPage: false,
    hasNextPage: true,
    startCursor: "Ymx1ZQ==",
    endCursor: "Z3JlZW4=",
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
        <BalloonsListContainer
          edges={dataAsProps.edges}
          onNextPrevPage={() => {}}
          pageInfo={dataAsProps.pageInfo}
        />
      </Provider>
    );
  it(".grid__item should should render correct", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(".grid__item").exists()).toEqual(true);
  });
  it("navigate .prev should be not active active", () => {
    const wrapper = getWrapper();
    wrapper.find(".prev").simulate("click");
    expect(wrapper.find(".prev").hasClass("active")).toEqual(false);
    expect(wrapper.find(".next").hasClass("active")).toEqual(true);
  });
  it("navigate .next should be not active active", () => {
    const wrapper = getWrapper();
    wrapper.find(".next").simulate("click");
    expect(wrapper.find(".prev").hasClass("active")).toEqual(false);
    expect(wrapper.find(".next").hasClass("active")).toEqual(true);
  });
  it("navigate .prev/.next should be able to click correct", () => {
    const wrapper = getWrapper();
    wrapper.find(".prev").simulate("click");
    wrapper.find(".next").simulate("click");
  });
});
