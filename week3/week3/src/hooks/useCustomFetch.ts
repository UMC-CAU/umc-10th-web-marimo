import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../Api/api';

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

interface UseCustomFetchOptions {
  params?: QueryParams;
  enabled?: boolean;
}

interface UseCustomFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const DEFAULT_ERROR_MESSAGE = '데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';

export const useCustomFetch = <T>(
  url: string,
  options?: UseCustomFetchOptions
): UseCustomFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = options?.params;
  const enabled = options?.enabled ?? true;

  const serializedParams = useMemo(() => JSON.stringify(params ?? {}), [params]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<T>(url, {
          params,
        });

        if (!isMounted) return;
        setData(response.data);
        setError(null);
      } catch {
        if (!isMounted) return;
        setError(DEFAULT_ERROR_MESSAGE);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, serializedParams, enabled]);

  return {
    data,
    loading,
    error,
  };
};
