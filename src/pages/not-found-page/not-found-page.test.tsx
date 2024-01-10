import {render, screen} from '@testing-library/react';
import {NotFoundPage} from './not-found-page';
import {withHistory} from '../../utils/tests/mock-component.tsx';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedText = '404 Not Found';
    const expectedLinkText = 'To Main Page';

    render(withHistory(<NotFoundPage/>));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
