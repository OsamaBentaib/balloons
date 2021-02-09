type Balloon = {
  id?: string;
  name?: string;
  imageUrl?: string;
  description?: string;
  color?: string;
  variant?: string;
  price?: number;
  availableSince?: string;
};

type Color = string;
type SortInput = string;
type Variant = string;

type BalloonEdge = {
  node: Balloon;
  cursor?: string;
};

type PageInfo = {
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  startCursor?: string;
  endCursor?: string;
};

type FilterInput = {
  variant?: Variant;
  color?: Color;
};

type BalloonConnection = {
  edges?: BalloonEdge[];
  pageInfo?: PageInfo;
};

type ParamsQueryVariables = {
  filter: FilterInput;
  sort: SortInput;
  before?: string;
  after?: string;
};
