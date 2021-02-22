import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "urql";
import BalloonDetailsContainer from "../BalloonDetailsContainer";

const BalloonQuery = `
query balloon($id: String!){
  balloon(id:$id){
    id
    imageUrl
    name
    price
    variant
    color
    description
    availableSince
  }
}
`;
export default function BalloonDetails() {
  // get the state
  const initialState: InitialState | undefined = useSelector(
    (initialState: InitialState) => initialState
  );

  // the the states that we need
  const {
    balloonDetails: { balloonId },
  } = initialState;

  // fetch the query
  const [result] = useQuery({
    query: BalloonQuery,
    variables: { id: balloonId },
  });

  const { data, fetching, error } = result;
  return (
    <BalloonDetailsContainer data={data} fetching={fetching} error={error} />
  );
}
