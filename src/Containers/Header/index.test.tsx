import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Header from "./Header";

Enzyme.configure({ adapter: new Adapter() });

describe("Header render without crashes", () => {
  test("renders title", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("h1").text()).toContain("Balloons Inc.");
  });
  test("renders info", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("span").text()).toContain(
      "Shop from the best balloons store"
    );
  });
});
