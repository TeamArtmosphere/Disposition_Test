import CommonButton from '@/components/common/CommonButton';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Box>
        <Typography>artmosphere 유저 성향 테스트</Typography>
      </Box>
      <CommonButton name='테스트 시작하기' />
    </div>
  );
}
