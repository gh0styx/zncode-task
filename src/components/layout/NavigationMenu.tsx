'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dictionary } from '@/lib/i18n';

const links = [
  { href: '/orders', label: dictionary.ru.orders },
  { href: '#groups', label: dictionary.ru.groups },
  { href: '/products', label: dictionary.ru.products },
  { href: '#users', label: dictionary.ru.users },
  { href: '#settings', label: dictionary.ru.settings }
];

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <aside className="nav-menu">
      <div className="nav-menu__profile">
        <div className="nav-menu__avatar" />
        <button
          className="nav-menu__settings"
          type="button"
          aria-label="settings"
        >
          ⚙
        </button>
      </div>
      <nav className="nav-menu__links" aria-label="Main navigation">
        {links.map((link) =>
          link.href.startsWith('#') ? (
            <span className="nav-menu__link" key={link.href}>
              {link.label}
            </span>
          ) : (
            <Link
              className={clsx(
                'nav-menu__link',
                pathname === link.href && 'nav-menu__link--active'
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
