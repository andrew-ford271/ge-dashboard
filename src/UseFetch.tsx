import React from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const useFetch = <T,>(
  config: AxiosRequestConfig,
  resolver?: (data: any) => T
) => {
  if (resolver) {
    const parseString = (data: string) => JSON.parse(data);
    config.transformResponse = [parseString, resolver];
  }
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<AxiosError<T> | null>(null);

  let mounted = React.useRef(true);
  const fetchData = async () => {
    try {
      const response = await axios.request<T>(config);
      if (mounted.current) {
        setData(response.data);
      }
    } catch (error) {
      setError(error as AxiosError<T>);
    }
  };
  React.useEffect(() => {
    fetchData();
    return () => {
      mounted.current = false;
    };
  }, []);
  return { loading, data, error };
};
