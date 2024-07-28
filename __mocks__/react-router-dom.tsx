export * from 'react-router-dom';
import { vi } from 'vitest';

export const useLoaderData = vi.fn();
export const useParams = vi.fn();
const mockedUseNavigate = vi.fn();
export const useNavigate = vi.fn(() => mockedUseNavigate);
const mockedUseNavigation = vi.fn();
export const useNavigation = vi.fn(() => mockedUseNavigation);
