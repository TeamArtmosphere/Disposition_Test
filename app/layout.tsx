'use client';

import { ThemeProvider, useMediaQuery } from '@mui/material';
import './globals.css';
import { Inter } from 'next/font/google';
import theme from '@/style/theme';
import RecoilProvider from './RecoilProvider';
import Header from '@/components/layout/Header';
import { Suspense, useState } from 'react';
import { useVh } from '@/hooks/useVh';
import Loading from './loading';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    Kakao: any;
  }
}

// const preventBack = () => {
//   history.pushState(null, '', location.href);
//   alert(
//     '뒤로가기가 금지되어 있습니다. 상단 로고를 사용하여 홈으로 이동하거나 화면의 버튼을 사용해 주세요.',
//   );
// };

// const preventRefresh = (e: BeforeUnloadEvent) => {
//   e.preventDefault();
//   e.returnValue = '';
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const vh = useVh();
  const onMobile = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
  const onTablet = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'));
  const onDesktop = useMediaQuery(theme.breakpoints.up('laptop'));

  console.log(onMobile, onTablet, onDesktop, 'onMobile, onTablet, onDesktop');

  const kakaoInit = () => {
    // 페이지가 로드시 실행
    if (!window.Kakao.isInitialized())
      // 선언되지 않았을 때만 실행하도록 if문 추가
      window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
  };

  return (
    <html lang='ko'>
      <ThemeProvider theme={theme}>
        <head>
          <title>PABLOS 테스트</title>
          <meta
            property='og:description'
            content='ARTMOSPHERE 사용자의 PABLOS 유형을 검사합니다.'
          />
        </head>
        <body
          className={inter.className}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: `${100 * vh}px`,
            padding: 0,
          }}
        >
          <RecoilProvider>
            <>
              <Header />
              <Suspense fallback={<Loading />}> {children}</Suspense>
            </>
          </RecoilProvider>
        </body>
        {/* <Script src='https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js' onLoad={kakaoInit} /> */}
      </ThemeProvider>
    </html>
  );
}
