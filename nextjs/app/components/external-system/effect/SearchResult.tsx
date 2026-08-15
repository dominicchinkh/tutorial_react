import React, { useState, useEffect } from 'react';

// 1. Define the shape of the data you expect from the API
interface SearchResponse {
  results: Array<{ id: string; title: string }>;
}

// 2. Simple custom hook

//    If you don’t use a framework (and don’t want to build your own) but would like
//    to make data fetching from Effects more ergonomic, consider extracting your 
//    fetching logic into a custom Hook

function useData<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let ignore = false;
    
    fetch(url)
      .then((res) => res.json())
      .then((json: T) => {
        if (!ignore) {
          setData(json);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
}

// 3. Component consuming the hook
export function SearchResults({ query }: { query: string }): React.ReactElement {
  const [page, setPage] = useState<number>(1);

  // Reset page to 1 when query changes
  const [prevQuery, setPrevQuery] = useState<string>(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setPage(1);
  }

  // Call the hook with the generic type <SearchResponse>
  const params = new URLSearchParams({ query, page: String(page) });
  const data = useData<SearchResponse>(`/api/search?${params}`);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Results for &quot;{query}&quot;</h2>

      <ul>
        {data.results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <div>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}