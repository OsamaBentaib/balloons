import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_DETAILS } from "../../store/actionTypes";
import { siteURL } from "../../utils";

interface IProps {
  balloon: Balloon;
}
const BalloonItem: React.FC<IProps> = (props: IProps) => {
  const {
    balloon: { id, name, price, imageUrl },
  } = props;
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // dispatch the changes
  const dispatch = useDispatch<DispatchType>();

  const onViewDetails = () => {
    /***
     *  The function will open the details so it's can be viewd
     *  This will update the state for the details and desplay the item that we need
     */
    dispatch({
      type: OPEN_DETAILS, // the action type that we need for reducer
      payload: {
        // the state the we need to change
        balloonDetails: {
          isDetailsOpen: true, // the balloon should be true do it's can view the details
          balloonId: id, // the balloon id that we need to fetch on the details
        },
      },
    });
  };
  return (
    <div
      className={`grid__item${
        initialState.balloonDetails.isDetailsOpen ? " isOpen" : ""
      }`}
      id={id}
      onClick={() => onViewDetails()}
    >
      <div className="product">
        <div className="product__bg"></div>
        <img className="product__img" src={siteURL + imageUrl} alt="...." />
        <h2 className="product__title">{name}</h2>
        <span className="product__price">${price}</span>
      </div>
    </div>
  );
};
export default BalloonItem;
