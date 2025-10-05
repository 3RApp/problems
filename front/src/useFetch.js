import { useState, useEffect } from 'react';

export const useFetch = (url, ...dependencies) => {

  const [problems, setProblems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
            setError(data.error);
            setProblems(null);
            setLoading(false);
            } else {
            setProblems(data);
            setError(null);
            setLoading(false);
            }
        });
    }, dependencies);

    return {
        problems: [problems, setProblems],
        loading: [loading, setLoading],
        error: [error, setError]
    }
};