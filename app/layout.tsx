'use client';

import { Box, CircularProgress, ThemeProvider, Typography } from '@mui/material';
import '../style/globals.css';
import { Inter } from 'next/font/google';
import theme from '@/style/theme';
import RecoilProvider from './RecoilProvider';
import Header from '@/components/layout/Header';
import { useEffect, useState } from 'react';
import { useVh } from '@/hooks/useVh';
import router from 'next/router';
import { FlexBoxCol } from '@/style/style';

const inter = Inter({ subsets: ['latin'] });

const preventBack = () => {
  history.pushState(null, '', location.href);
  alert(
    '뒤로가기가 금지되어 있습니다. 상단 로고를 사용하여 홈으로 이동하거나 화면의 버튼을 사용해 주세요.',
  );
};

const preventRefresh = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = '';
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const vh = useVh();
  // const router = useRouter();

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventRefresh);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, []);

  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventBack);
    return () => {
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    // Register event listeners to show/hide the loading component
    // addEventListener : documen의 특정 요소 (id, class, tag ... ) event(클릭하면 함수를 실행하라.)
    window.addEventListener('beforeunload', startLoading);
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    router.events.on('routeChangeError', stopLoading);

    // Unregister event listeners during cleanup
    // window.removeEventListener 이벤트 제거할 경우
    return () => {
      window.removeEventListener('beforeunload', startLoading);
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
      router.events.off('routeChangeError', stopLoading);
    };
  }, []);

  return (
    <html lang='ko'>
      <ThemeProvider theme={theme}>
        <head>
          <title>PABLOS 테스트</title>
          <meta
            property='og:description'
            content='ARTMOSPHERE 사용자의 PABLOS 유형을 검사합니다.'
          />
          <meta property='og:image' content='pablos-mbit.vercel.app/public/imgs/ogImage.png' />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='27' />
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
            {loading ? (
              <Box sx={{ ...FlexBoxCol, gap: '40px', marginTop: '200px' }}>
                <CircularProgress />
                <Typography variant='h4'>페이지 로드 중입니다.</Typography>
              </Box>
            ) : (
              <>
                <Header />
                {children}
              </>
            )}
          </RecoilProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
