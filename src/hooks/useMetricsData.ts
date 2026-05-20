import { useQuery } from '@tanstack/react-query';
import { fetchAndParseParquet } from '../lib/parquetReader';

const DATA_URLS = {
  cars_2025: '/data/cars_2025_clean.parquet',
  cars_2026: '/data/cars_2026_clean.parquet',
  summary: '/data/summary_stats.json',
};

const MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30;

export function useSummaryStats() {
  return useQuery({
    queryKey: ['summary_stats'],
    queryFn: async () => {
      const res = await fetch(DATA_URLS.summary);
      if (!res.ok) throw new Error('Failed to load summary stats');
      return res.json();
    },
    staleTime: MONTH_IN_MS,
  });
}

export function useRegistrations2025() {
  return useQuery({
    queryKey: ['registrations_2025'],
    queryFn: () => fetchAndParseParquet(DATA_URLS.cars_2025),
    staleTime: MONTH_IN_MS,
  });
}

export function useRegistrations2026() {
  return useQuery({
    queryKey: ['registrations_2026'],
    queryFn: () => fetchAndParseParquet(DATA_URLS.cars_2026),
    staleTime: MONTH_IN_MS,
  });
}
