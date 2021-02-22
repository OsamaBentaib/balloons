import React from "react";
import { FiX } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_CART,
  OPEN_CART,
  ADD_REMOVE_CART,
} from "../../store/actionTypes";
import { siteURL } from "../../utils";

export default function Cart() {
  // the selector state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  const {
    cart: { isCartOpen, items },
  } = initialState;

  // dispatch state
  const dispatch = useDispatch<DispatchType>();

  // open or close the cart
  const cartAction = (action: boolean) => {
    // open cart
    dispatch({
      type: action ? OPEN_CART : CLOSE_CART,
      payload: {},
    });
  };
  // remove item from cart
  const onRemoveFromCart = (item: CartItem) => {
    const cartItems: CartItem[] = items.filter((e) => e !== item);
    dispatch({
      type: ADD_REMOVE_CART, // the action type that we need for reducer
      payload: {
        // the state the we need to change
        cart: {
          items: cartItems, // the cart list would be updated
        },
      },
    });
  };
  let total = 0;
  items.map((e) => {
    total += e.balloon.price ? e.balloon.price * e.quantity : 0;
    return true;
  });
  return (
    <div>
      <button onClick={() => cartAction(!isCartOpen)} className="dummy-menu">
        {isCartOpen ? (
          <FiX className="close" />
        ) : (
          <div className="bage__badge">
            <BsBag />
            <div>
              <span>{items.length}</span>
            </div>
          </div>
        )}
      </button>
      {isCartOpen && (
        <div className="cart cart--open">
          <div className="cart__bg cart__bg--left">
            <div className="cart__header">
              <h3>Shopping Cart</h3>
            </div>
            <div className="cart__items">
              {items.length === 0 && (
                <p className="cart__empty">Cart is Empty</p>
              )}
              <div className="cart__grid">
                {items.map((item: CartItem, i: number) => (
                  <div key={i} className="cart__item__grid">
                    <div className="cart__item__image">
                      <img
                        id={"image--" + i}
                        className="cart__image"
                        src={siteURL + item.balloon.imageUrl}
                        alt={"..."}
                      />
                    </div>
                    <div className="cart__item__details">
                      <h4 className={`name--${i}`}>{item.balloon.name}</h4>
                      <h5 className={`cart__item__price--${i}`}>
                        $
                        {item.balloon.price
                          ? item.balloon.price * item.quantity
                          : 0}
                      </h5>
                      <small className={`cart__item__quantity--${i}`}>
                        Quantity: {item.quantity}
                      </small>
                    </div>
                    <div
                      onClick={() => onRemoveFromCart(item)}
                      className={`cart__item__action  close--${i}`}
                    >
                      <span>
                        <FiX />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cart__footer">
              <button className={`cart__purchase`}>
                ${total} Place an order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
