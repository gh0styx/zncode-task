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
    expect(await screen.findByText('Добавить продукт')).toBeInTheDocument();
  });
});
