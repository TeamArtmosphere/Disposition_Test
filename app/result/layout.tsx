import React, { Suspense } from 'react';
import LoadingResult from './loading';
import Page from './page';

const ResultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<LoadingResult />}>{children}</Suspense>
    </div>
  );
};

export default ResultLayout;
