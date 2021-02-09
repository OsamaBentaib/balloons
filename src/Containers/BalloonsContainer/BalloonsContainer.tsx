import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";
import { SET_PAGINATION } from "../../store/actionTypes";
import BalloonItem from "../BalloonItem";

// the query schema
const BalloonsQuery = `
query balloons($filter:FilterInput, $sort: SortInput, $before: ID, $after: ID){
  balloons(
    filter: $filter,
    sort: $sort, 
    before: $before, 
    after: $after
  ){
    edges{
      node{
        id
        name
        imageUrl
        description
        color
        variant
        price
        availableSince
      }
      cursor
    }
    pageInfo{
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
`;

interface IProps {
  onScroll: any;
}
export default function BalloonsContainer(props: IProps) {
  // selector state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );
  // dispatch the state
  const dispatch = useDispatch<DispatchType>();
  // get the parameters from the state
  const { paramsQueryVariables } = initialState;
  // fetch query
  const [result, reexecuteQuery] = useQuery({
    query: BalloonsQuery,
    variables: paramsQueryVariables,
  });
  // execute query when never the parameters changes with filter and default
  useEffect(() => {
    reexecuteQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsQueryVariables]);

  const { data, error } = result;

  if (data) {
    // the's a data and the query succed
    const edges: BalloonEdge[] = data.balloons.edges;
    const pageInfo: PageInfo = data.balloons.pageInfo;

    // navigate on the pagination
    const noNextPrevPage = () => {
      let before = pageInfo.endCursor;
      let after = pageInfo.startCursor;
      // dispatch the parameters changes
      dispatch({
        type: SET_PAGINATION,
        payload: {
          before: before,
          after: after,
        },
      });
      // scroll the page to the top of the list
      props.onScroll();
    };
    return (
      <>
        {edges?.map((edge: BalloonEdge, index: number) => (
          <BalloonItem balloon={edge.node} key={index} />
        ))}
        {
          <div className="grid__item">
            <div className="pagination">
              <button
                className={`btn prev ${
                  !pageInfo.hasPreviousPage ? "disabled" : ""
                }`}
                onClick={() => {
                  if (pageInfo.hasPreviousPage) noNextPrevPage();
                }}
              >
                Prev
              </button>
              <button
                className={`btn next ${
                  !pageInfo.hasNextPage ? "disabled" : ""
                }`}
                onClick={() => {
                  if (pageInfo.hasNextPage) noNextPrevPage();
                }}
              >
                Next
              </button>
            </div>
          </div>
        }
      </>
    );
  }
  if (error) {
    // there's an error with the query
    return (
      <div className="grid__item">
        <div className="product">
          <div className="product__bg">
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
          <h2 className="product__title">Oops..</h2>
          <p>Something went wrong, Please Try again later</p>
        </div>
      </div>
    );
  }
  return <p>Loading ....</p>;
}
