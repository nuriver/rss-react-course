import Pagination from '../../src/components/Pagination';
import { createRemixStub } from '@remix-run/testing';
import { pagination } from '../helpers/testData';
import { renderWithProviders } from '../helpers/customRender';

vi.mock('/src/utilities/createPagination.tsx', () => ({
  default: vi.fn(() => pagination),
}));

describe('Pagination', () => {
  it('should return null if count undefined or <=10', () => {
    const count = [0, 1, 10, undefined];

    count.forEach((value) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          Component: () => <Pagination theme="light" count={value} />,
        },
      ]);
      const { container } = renderWithProviders(<RemixStub />);
      expect(container.firstChild).toBeNull();
    });
  });

  it('should have correct class name when theme is light', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination theme="light" count={60} />,
      },
    ]);
    const { container } = renderWithProviders(<RemixStub />);
    expect(container.firstChild).toHaveClass('pagination-wrapper');
  });

  it('should have correct class name when theme is dark', () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Pagination theme="dark" count={60} />,
      },
    ]);
    const { container } = renderWithProviders(<RemixStub />);
    expect(container.firstChild).toHaveClass(
      'pagination-wrapper pagination-wrapper-dark'
    );
  });
});
