import React, { useRef } from "react";
import { useSelector } from "react-redux";
import BalloonDetails from "./Containers/BalloonDetails";
import BalloonsContainer from "./Containers/BalloonsContainer";
import Cart from "./Containers/Cart";
import Filter from "./Containers/Filter";
import Header from "./Containers/Header";

const App = () => {
  // get the state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // get the parameters from state
  const {
    balloonDetails: { isDetailsOpen },
  } = initialState;
  // on back to top handler
  const backToTop = useRef<HTMLDivElement | null>(null);
  // when the pagination changed scroll to top
  const onScroll = () => {
    backToTop?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main>
      <Header />
      <Cart />
      <div className="content">
        <div ref={backToTop}></div>
        <div className="grid">
          <div className="grid__item">
            <Filter />
          </div>
          <BalloonsContainer onScroll={onScroll} />
        </div>
      </div>
      {isDetailsOpen && <BalloonDetails />}
    </main>
  );
};

export default App;
