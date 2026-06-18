import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LoginForm } from '@/components/auth/LoginForm';
import { makeStore } from '@/store/store';

describe('LoginForm', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

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
    expect(
      screen.getByText('Пароль должен содержать минимум 4 символа')
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits login requests to the configured API origin', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.inventory.test');
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'demo-token' })
    } as Response);
    const user = userEvent.setup();

    render(
      <Provider store={makeStore()}>
        <LoginForm />
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: 'Получить JWT' }));

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.inventory.test/api/auth/login',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
