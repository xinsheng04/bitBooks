import { useState, useEffect } from 'react';
const defaultConfig = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}
export default function useHttp(url, config=defaultConfig, errorMessage='An error occurred') {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          throw new Error(errorMessage);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config, errorMessage]);

  return { data, error, loading };
}