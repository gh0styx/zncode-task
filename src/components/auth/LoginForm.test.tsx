import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { LoginForm } from '@/components/auth/LoginForm';
import { makeStore } from '@/store/store';

describe('LoginForm', () => {
  it('shows field validation messages and does not submit invalid credentials', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const user = userEvent.setup();

    render(
      <Provider store={makeStore()}>
        <LoginForm />
      </Provider>
    );

    await user.clear(screen.getByLabelText('Email'));
    await user.clear(screen.getByLabelText('Password'));
    await user.type(screen.getByLabelText('Password'), '123');
    await user.click(screen.getByRole('button', { name: 'Получить JWT' }));

    expect(screen.getByText('Введите корректный email')).toBeInTheDocument();
    expect(screen.getByText('Пароль должен содержать минимум 4 символа')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();

    fetchMock.mockRestore();
  });
});
