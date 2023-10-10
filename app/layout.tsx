import { Container, ThemeProvider } from '@mui/material';
import '../style/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import theme from '@/style/theme';
import RecoilProvider from './RecoilProvider';
import Script from 'next/script';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artmosphere 유저 성향 테스트',
  description: '공간을 소비하는 유저의 성향을 테스트합니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <ThemeProvider theme={theme}>
        <body className={inter.className} style={{ backgroundColor: '#F8FCFF' }}>
          <RecoilProvider>
            <Container
              sx={{
                width: '100%',
                height: '100vh',
                p: 0,
              }}
            >
              <Header />
              {children}
            </Container>
          </RecoilProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
