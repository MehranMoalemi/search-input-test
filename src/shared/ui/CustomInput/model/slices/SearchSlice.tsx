import { useDebounce } from '@/src/lib/debounce';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SearchContextProps {
  query: string;
  results: string[];
  setQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const fetchResults = async (searchQuery: string) => {
    const response = await fetch(`/api/search?query=${searchQuery}`);
    const data = await response.json();
    setResults(data.results);
  };

  const debouncedFetchResults = useDebounce(() => fetchResults(query));

  const handleSetQuery = (newQuery: string) => {
    setQuery(newQuery);
    debouncedFetchResults();
  };

  useEffect(() => {
    if (query) {
      debouncedFetchResults();
    } else {
      setResults([]);
    }
  }, [query, debouncedFetchResults]);

  return (
    <SearchContext.Provider value={{ query, results, setQuery: handleSetQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
