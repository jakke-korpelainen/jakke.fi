export interface ContentfulQueryError {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
  extensions: {
    contentful: {
      code: string;
      requestId: string;
    };
  };
}

export interface ContentfulResult<TQuery> {
  data: TQuery;
  errors: ContentfulQueryError[];
}

export interface ContentfulCollection<T> {
  items: T[];
}

export interface ContentfulSys {
  sys: {
    id: string;
    publishedAt: string;
    firstPublishedAt: string;
  };
}
