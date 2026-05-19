import { useQuery } from '@tanstack/react-query';
import { fetchAndParseParquet } from '../lib/parquetReader';

const DATA_URLS = {
  cars_2025: '/transportation/cars_2025.parquet',
  cars_2026: '/transportation/cars_2026.parquet',
  fuel_types: '/transportation/registrations_type_fuel.parquet',
};

export function useRegistrations2025() {
  return useQuery({
    queryKey: ['registrations_2025'],
    queryFn: () => fetchAndParseParquet(DATA_URLS.cars_2025),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useRegistrations2026() {
  return useQuery({
    queryKey: ['registrations_2026'],
    queryFn: () => fetchAndParseParquet(DATA_URLS.cars_2026),
    staleTime: 1000 * 60 * 60,
  });
}

export function useFuelTypes() {
  return useQuery({
    queryKey: ['fuel_types'],
    queryFn: () => fetchAndParseParquet(DATA_URLS.fuel_types),
    staleTime: 1000 * 60 * 60,
  });
}
