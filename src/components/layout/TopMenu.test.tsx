import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TopMenu } from '@/components/layout/TopMenu';
import { makeStore } from '@/store/store';

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => ({
    on: vi.fn(),
    disconnect: vi.fn()
  }))
}));

const renderTopMenu = () => {
  render(
    <Provider store={makeStore()}>
      <TopMenu />
    </Provider>
  );
};

describe('TopMenu', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('connects Socket.io to the configured backend origin', () => {
    vi.stubEnv('NEXT_PUBLIC_SOCKET_URL', 'https://api.inventory.test');

    renderTopMenu();

    expect(io).toHaveBeenCalledWith('https://api.inventory.test', {
      path: '/socket.io'
    });
  });

  it('keeps the local Socket.io endpoint when no backend origin is configured', () => {
    renderTopMenu();

    expect(io).toHaveBeenCalledWith({ path: '/socket.io' });
  });
});
