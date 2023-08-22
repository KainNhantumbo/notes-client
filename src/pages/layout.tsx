import '../styles/global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { FC, ReactNode } from 'react';
import AppContext from '../context/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'Simple but enriched and features notes application.',
  themeColor: '#000',
};

type TProps = { children: ReactNode };

const RootLayout: FC<TProps> = ({ children }) => {
  return (
    <html lang='en'>
      <AppContext>
        <body className={inter.className}>{children}</body>
      </AppContext>
    </html>
  );
};

export default RootLayout;
