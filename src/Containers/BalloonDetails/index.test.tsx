import Enzyme, { mount, shallow } from "enzyme";
import { Provider as URQLProvider } from "urql";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { never } from "wonka";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../store/reducer";
import BalloonDetails from "./BalloonDetails";

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

describe("<BalloonDetails /> renders unit test", () => {
  const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
  };
  const mockStore = createStore(reducer, initialState);
  const getWrapper = () =>
    mount(
      //@ts-ignore
      <URQLProvider value={mockClient}>
        <Provider store={mockStore}>
          <BalloonDetails />
        </Provider>
      </URQLProvider>
    );
  it("call the query once when it's renders", () => {
    getWrapper();
    expect(mockClient.executeQuery).toBeCalledTimes(1);
  });
  it("matches snapshot", () => {
    const responseState = {
      executeQuery: () =>
        fromValue({
          data: {
            balloon: {
              __typename: "Balloon",
              id: "blue",
              imageUrl: "/balloons/heart-blue.jpg",
              name: "Light Blue Heart Balloon",
              price: 10,
              variant: "HEART",
              color: "BLUE",
              description:
                "A blue balloon, great for occasions involving hearts.",
              availableSince: "2020-05-13T13:00:00Z",
            },
          },
        }),
    };
    const wrapper = shallow(
      //@ts-ignore
      <URQLProvider value={responseState}>
        <Provider store={mockStore}>
          <BalloonDetails />
        </Provider>
      </URQLProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
function fromValue(arg0: {
  data: {
    balloon: {
      __typename: string;
      id: string;
      imageUrl: string;
      name: string;
      price: number;
      variant: string;
      color: string;
      description: string;
      availableSince: string;
    };
  };
}) {
  throw new Error("Function not implemented.");
}
