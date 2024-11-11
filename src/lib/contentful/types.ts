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
  total: number;
  items: T[];
}

export interface ContentfulSys {
  sys: {
    id: string;
    publishedAt: string;
    firstPublishedAt: string;
  };
}

export interface ContentfulQueryParams {
  locale: string;
  skip: number;
  limit: number;
}
