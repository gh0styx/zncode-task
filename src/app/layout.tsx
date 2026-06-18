import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@/styles/globals.scss';
import { AppProviders } from '@/components/providers/AppProviders';
import { NavigationMenu } from '@/components/layout/NavigationMenu';
import { TopMenu } from '@/components/layout/TopMenu';
import { PwaRegister } from '@/components/system/PwaRegister';

export const metadata: Metadata = {
  title: 'Inventory | Orders & Products',
  description: 'Frontend test task SPA for orders and products',
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <AppProviders>
          <PwaRegister />
          <TopMenu />
          <div className="app-shell">
            <NavigationMenu />
            <main className="app-shell__content">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
