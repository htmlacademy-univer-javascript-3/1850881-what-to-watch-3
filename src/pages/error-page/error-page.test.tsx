import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ErrorPage} from './error-page.tsx';
import {withStore} from '../../utils/tests/mock-component.tsx';
import {extractActionsTypes} from '../../utils/tests/mock-hook.ts';
import {fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoFilmAction} from '../../store/api-actions.ts';

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const firstExpectedText = 'Не удалось загрузить страницу';
    const {withStoreComponent} = withStore(<ErrorPage/>, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "fetchFilmsAction", "fetchPromoFilmAction", "fetchFavoriteFilmsAction" when user clicked replay button', async () => {
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(<ErrorPage/>, {});
    mockAxiosAdapter.onGet('/films').reply(200, []);
    mockAxiosAdapter.onGet('/promo').reply(200, []);
    mockAxiosAdapter.onGet('/favorite').reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchPromoFilmAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type,
      fetchPromoFilmAction.fulfilled.type,
      fetchFavoriteFilmsAction.fulfilled.type,
    ]);
  });
});
