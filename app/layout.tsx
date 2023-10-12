'use client';

import { Container, ThemeProvider } from '@mui/material';
import '../style/globals.css';
import { Inter } from 'next/font/google';
import theme from '@/style/theme';
import RecoilProvider from './RecoilProvider';
import Header from '@/components/layout/Header';
import { useEffect } from 'react';
import { useVh } from '@/hooks/useVh';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

const preventBack = () => {
  history.pushState(null, '', location.href);
  alert('뒤로가기가 금지되어 있습니다. 상단 로고를 사용하여 홈으로 이동하거나 화면의 버튼을 사용해 주세요.');
};

const preventRefresh = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = '';
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const vh = useVh();
  const router = useRouter();

  // useEffect(() => {
  //   (() => {
  //     window.addEventListener('beforeunload', preventRefresh);
  //   })();

  //   return () => {
  //     window.removeEventListener('beforeunload', preventRefresh);
  //   };
  // }, []);

  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventBack);
    return () => {
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  return (
    <html lang='ko'>
      <ThemeProvider theme={theme}>
        <head>
          <title>PABLOS 테스트</title>
        </head>
        <body
          className={inter.className}
          style={{
            backgroundColor: '#F8FCFF',
            width: '100%',
            height: `${100 * vh}px`,
            padding: 0,
          }}
        >
          <RecoilProvider>
            <>
              <Header />
              {children}
            </>
          </RecoilProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
