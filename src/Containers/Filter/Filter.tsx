import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_FILTERS,
  SET_FILTER_WITH_COLOR,
  SET_FILTER_WITH_VARIANT,
  SET_SORT_BY,
} from "../../store/actionTypes";
import { colors, sortInput, Variant } from "../../store/paramsTypes";

export default function Filter() {
  // convert objects to a string
  const filterColors = Object.values(colors);

  const sortBy = Object.values(sortInput);

  const filterVariant = Object.values(Variant);
  // get state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // get state params
  const {
    paramsQueryVariables: {
      filter: { variant, color },
      sort,
    },
  } = initialState;
  // dispatch
  const dispatch = useDispatch<DispatchType>();
  // when filter with sort
  const onFilterWithSort = (sort: string) => {
    dispatch({ type: SET_SORT_BY, payload: sort });
  };
  // when filter with variant
  const onFilterWithVariant = (varient: string) => {
    dispatch({ type: SET_FILTER_WITH_VARIANT, payload: varient });
  };
  // when filter with color
  const onFilterWithColor = (color: string) => {
    dispatch({ type: SET_FILTER_WITH_COLOR, payload: color });
  };
  // when reset filters
  const onResetFilters = () => {
    dispatch({ type: RESET_FILTERS, payload: {} });
  };
  return (
    <div className="filter">
      <div className="filter__header">
        <div>
          <h4>Filter By</h4>
        </div>
        <div onClick={() => onResetFilters()}>
          <small>Reset filters</small>
        </div>
      </div>
      <div className="filter__header_item border">
        <div className="filter__header_item_grid">
          <div className="filter_title">
            <h4>Color</h4>
          </div>
        </div>
        <div className="filter__color__item">
          {filterColors.map((e: string, i: number) => (
            <div
              key={i}
              onClick={() => onFilterWithColor(e)}
              className={`filter__color${
                color === e ? " active" : ""
              } filter__color--${e.toLowerCase()}`}
              style={{ background: e.toLowerCase() }}
            >
              {e.toLowerCase()}
            </div>
          ))}
        </div>
      </div>
      <div className="filter__header_item border">
        <div className="filter__header_item_grid">
          <div className="filter_title">
            <h4>Sort</h4>
          </div>
        </div>
        <div className="filter__sort__item">
          {sortBy.map((e: string, i: number) => (
            <div
              key={i}
              onClick={() => onFilterWithSort(e)}
              className={`filter__sort${
                sort === e ? " active" : ""
              } filter__btn filter__sort--${e.toLowerCase()}`}
            >
              {e.toLowerCase()}
            </div>
          ))}
        </div>
      </div>
      <div className="filter__header_item">
        <div className="filter__header_item_grid">
          <div className="filter_title">
            <h4>Variant</h4>
          </div>
        </div>
        <div className="filter__sort__item">
          <div className="filter__variant__item">
            {filterVariant.map((e: string, i: number) => (
              <div
                key={i}
                onClick={() => onFilterWithVariant(e)}
                className={`filter__Variant ${
                  variant === e ? " active" : ""
                } filter__btn filter__Variant--${e.toLowerCase()}`}
              >
                {e.toLowerCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
