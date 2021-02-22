import Enzyme, { mount, shallow } from "enzyme";
import { Provider as URQLProvider } from "urql";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { never } from "wonka";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../../store/reducer";
import { makeSubject } from "wonka";
import { siteURL } from "../../utils";
import BalloonsContainer from "./BalloonsContainer";

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
          <BalloonsContainer onScroll={() => {}} />
        </Provider>
      </URQLProvider>
    );
  it("call the query once when it's renders", () => {
    getWrapper();
    expect(mockClient.executeQuery).toBeCalledTimes(2);
  });
  it("matches snapshot", () => {
    const responseState = {
      executeQuery: () =>
        fromValue({
          data: {
            balloons: {
              __typename: "BalloonConnection",
              edges: [
                {
                  __typename: "BalloonEdge",
                  node: {
                    __typename: "Balloon",
                    id: "blue",
                    name: "Light Blue Heart Balloon",
                    imageUrl: "/balloons/heart-blue.jpg",
                    description:
                      "A blue balloon, great for occasions involving hearts.",
                    color: "BLUE",
                    variant: "HEART",
                    price: 10,
                    availableSince: "2020-05-13T13:00:00Z",
                  },
                  cursor: "Ymx1ZQ==",
                },
              ],
              pageInfo: {
                __typename: "PageInfo",
                hasPreviousPage: false,
                hasNextPage: true,
                startCursor: "Ymx1ZQ==",
                endCursor: "Z3JlZW4=",
              },
            },
          },
        }),
    };
    const wrapper = shallow(
      //@ts-ignore
      <URQLProvider value={responseState}>
        <Provider store={mockStore}>
          <BalloonsContainer onScroll={() => {}} />
        </Provider>
      </URQLProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
function fromValue(arg0: {
  data: {
    balloons: {
      __typename: string;
      edges: [
        {
          __typename: string;
          node: {
            __typename: string;
            id: string;
            name: string;
            imageUrl: string;
            description: string;
            color: string;
            variant: string;
            price: number;
            availableSince: string;
          };
          cursor: string;
        }
      ];
      pageInfo: {
        __typename: string;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
  };
}) {
  throw new Error("Function not implemented.");
}
