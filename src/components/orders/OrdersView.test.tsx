import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { OrdersView } from '@/components/orders/OrdersView';
import { makeStore } from '@/store/store';

describe('OrdersView', () => {
  it('renders orders and opens details on click', async () => {
    render(
      <Provider store={makeStore()}>
        <OrdersView />
      </Provider>
    );

    await userEvent.click(screen.getAllByText(/Длинное/)[0]);
    expect(
      await screen.findAllByText(
        'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3'
      )
    ).toHaveLength(4);
  });

  it('validates delete confirmation before removing an order', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={makeStore()}>
        <OrdersView />
      </Provider>
    );

    await user.click(
      screen.getByRole('button', { name: /delete Длинное название прихода/ })
    );
    await user.click(screen.getByRole('button', { name: /Удалить/ }));

    expect(
      screen.getByText('Подтвердите удаление прихода')
    ).toBeInTheDocument();

    await user.click(screen.getByLabelText('Подтвердить удаление прихода'));
    await user.click(screen.getByRole('button', { name: /Удалить/ }));

    expect(
      screen.queryByText('Подтвердите удаление прихода')
    ).not.toBeInTheDocument();
  });
});
