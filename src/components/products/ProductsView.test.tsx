import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { ProductsView } from '@/components/products/ProductsView';
import { makeStore } from '@/store/store';

describe('ProductsView', () => {
  it('filters products by selected type', async () => {
    render(
      <Provider store={makeStore()}>
        <ProductsView initialCount={16} />
      </Provider>
    );

    await userEvent.selectOptions(screen.getByLabelText('Тип:'), 'Laptops');
    expect(screen.getAllByText('Laptops').length).toBeGreaterThan(0);
  });
});
