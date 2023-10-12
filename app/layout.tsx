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

// export const setScreenHeight = () => {
//   const vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty('--vh', `${vh}px`);
// };

const inter = Inter({ subsets: ['latin'] });

export const browserPreventEvent = (e: () => void) => {
  history.pushState(null, '', location.href);
  e();
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const vh = useVh();
  const router = useRouter();

  const alertModal = () => {
    alert('뒤로가기가 금지되어 있습니다. 상단 로고를 사용하여 홈으로 이동하거나 화면의 버튼을 사용해 주세요.');
  };

  // useEffect(() => {
  //   setScreenHeight();
  //   window.addEventListener('resize', setScreenHeight);
  //   return () => window.removeEventListener('resize', setScreenHeight);
  // }, []);

  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', () => {
      browserPreventEvent(alertModal);
    });
    return () => {
      window.removeEventListener('popstate', () => {
        browserPreventEvent(alertModal);
      });
    };
  }, []);

  return (
    <html lang='ko'>
      <ThemeProvider theme={theme}>
        <Head>
          <title>PABLOS 테스트</title>
        </Head>
        <body
          className={inter.className}
          style={{ backgroundColor: '#F8FCFF', width: '100%', height: `${100 * vh}px`, margin: 0, padding: 0 }}
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
