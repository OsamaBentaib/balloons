import React from 'react'
import BalloonItem from '../BalloonItem';

interface IProps {
  onNextPrevPage: any;
  pageInfo: PageInfo;
  edges: BalloonEdge[];
}
export default function BalloonsListContainer(props: IProps) {
    const { onNextPrevPage, edges, pageInfo } = props;
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
                  if (pageInfo.hasPreviousPage) onNextPrevPage();
                }}
              >
                Prev
              </button>
              <button
                className={`btn next ${
                  !pageInfo.hasNextPage ? "disabled" : ""
                }`}
                onClick={() => {
                  if (pageInfo.hasNextPage) onNextPrevPage();
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
