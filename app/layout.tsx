import { Box, Container, Paper, ThemeProvider, Typography } from '@mui/material';
import '../style/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import theme from '@/style/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artmosphere 유저 성향 테스트',
  description: '공간을 소비하는 유저의 성향을 테스트합니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <ThemeProvider theme={theme}>
        <body className={inter.className}>
          <Container
            sx={{
              width: '390px',
              height: '844px',
              p: 0,
            }}
          >
            <Paper
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
              }}
            >
              {children}
            </Paper>
          </Container>
        </body>
      </ThemeProvider>
    </html>
  );
}
