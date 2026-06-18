'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { formatClock, formatHeaderDate, formatWeekday } from '@/lib/format';
import { dictionary } from '@/lib/i18n';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveSessions } from '@/store/sessionSlice';

export function TopMenu() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((state) => state.session.activeSessions);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    const socket = socketUrl
      ? io(socketUrl, { path: '/socket.io' })
      : io({ path: '/socket.io' });
    socket.on('sessions:count', (count: number) =>
      dispatch(setActiveSessions(count))
    );
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <header className="top-menu">
      <Link
        className="top-menu__brand"
        href="/orders"
        aria-label="Inventory home"
      >
        <span className="top-menu__logo" aria-hidden="true" />
        <span>Inventory</span>
      </Link>
      <label className="top-menu__search">
        <span className="visually-hidden">{dictionary.ru.search}</span>
        <input placeholder={dictionary.ru.search} />
      </label>
      <div className="top-menu__meta">
        <span>{mounted ? formatWeekday(now) : ''}</span>
        <strong>{mounted ? formatHeaderDate(now) : ''}</strong>
        <time
          className="top-menu__clock"
          dateTime={mounted ? now.toISOString() : undefined}
        >
          {mounted ? formatClock(now) : ''}
        </time>
        <span className="top-menu__sessions" title={dictionary.ru.sessions}>
          {sessions}
        </span>
      </div>
    </header>
  );
}
