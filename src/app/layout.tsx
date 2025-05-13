"use client";

import { Inter } from 'next/font/google';
import { AppProvider } from './context/AppContext';
import TabNavigation from './components/ArmHealthApp/TabNavigation';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.className}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <AppProvider>
          <div className={`h-screen flex flex-col overflow-hidden relative`}>
            {children}
            <TabNavigation />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
