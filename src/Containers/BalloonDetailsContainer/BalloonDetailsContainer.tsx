import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import { ADD_REMOVE_CART, CLOSE_DETAILS } from "../../store/actionTypes";
import { siteURL } from "../../utils";
import { CombinedError } from "urql";

interface IProps {
  data: any;
  fetching: boolean;
  error?: CombinedError;
}
export default function BalloonDetailsContainer(props: IProps) {
  const { data, fetching, error } = props;
  // get the state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // the the states that we need
  const {
    cart: { items },
  } = initialState;

  // dispatch
  const dispatch = useDispatch<DispatchType>();
  // the state for the quantity input
  const [quantity, setQuantity] = useState(1);
  // the state to check if added to cart or not
  const [addedToCard, setAddedToCart] = useState(false);
  const onCloseDetails = () => {
    /***
     *  The function will close the details so it's can be viewd
     *  This will update the state for the details and display the item that we need
     */
    dispatch({
      type: CLOSE_DETAILS, // the action type that we need for reducer
      payload: {
        // the state the we need to change
        balloonDetails: {
          isDetailsOpen: false, // Close the details
          balloonId: null, // the balloon id we don't need it anymore
        },
      },
    });
  };

  // add to cart the balloon and quantity
  const onAddToCart = (balloon: Balloon) => {
    // set a list with the new opject
    const newCartItem: CartItem[] = [
      {
        quantity: quantity,
        balloon: balloon,
      },
    ];

    // contact the two arrays
    const cartItems: CartItem[] = items.concat(newCartItem);

    // dispatch the cart
    dispatch({
      type: ADD_REMOVE_CART, // the action type that we need for reducer
      payload: {
        // the state the we need to change
        cart: {
          items: cartItems, // the cart list would be updated
        },
      },
    });

    // update the button to set added to cat
    setAddedToCart(true);
  };
  if (fetching)
    // the Data is being fetching
    return (
      <div className="details details--open">
        <div className="details__bg details__bg--up"></div>
        <div className="details__bg details__bg--down"></div>
        <p className="_loading">Loading....</p>
      </div>
    );
  if (error)
    // there's an error with the apis
    return (
      <div className="details details--open">
        <div className="details__bg details__bg--up"></div>
        <div className="details__bg details__bg--down"></div>
        <h2 className="details__title _errors">Ooops...</h2>
        <div className="details__deco">
          <div className="__emoji">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
          </div>
        </div>
        <p className="details__description">
          Something went wrong, Please try again later
        </p>
        <button
          className={`details__addtocart`}
          onClick={() => onCloseDetails()}
        >
          Back to home
        </button>
      </div>
    );
  // set balloon data to a value
  const balloon: Balloon = data ? data.balloon : null;
  // return the detail list
  return (
    <div className="details details-info details--open">
      <div className="details__bg details__bg--up"></div>
      <div className="details__bg details__bg--down"></div>
      <img
        className="details__img"
        src={siteURL + balloon?.imageUrl}
        alt="...."
      />
      <h2 className="details__title">{balloon?.name}</h2>
      <div
        className="details__deco"
        style={{ background: balloon?.color?.toLocaleLowerCase() }}
      ></div>
      <h3 className="details__subtitle">
        {balloon?.color}
        <BsDot /> {balloon?.variant}
      </h3>
      <div className="details__price">${balloon?.price}</div>
      <p className="details__description">{balloon?.description}</p>
      <div className="quantity">
        <button
          className="btn minus1"
          onClick={() => setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)}
        >
          -
        </button>
        <input
          className="quantity"
          min={1}
          name="form-0-quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          type="number"
        />
        <button className="btn add1" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>
      <button
        className={`details__addtocart${addedToCard ? " active" : ""}`}
        onClick={() => {
          if (balloon && !addedToCard) {
            onAddToCart(balloon);
          }
        }}
      >
        {addedToCard ? "Added to cart" : "Add to cart"}
      </button>
      <button className="details__close" onClick={() => onCloseDetails()}>
        <FiX />
      </button>
    </div>
  );
}
