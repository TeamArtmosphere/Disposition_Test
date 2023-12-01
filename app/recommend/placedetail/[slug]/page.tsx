'use client';

import React from 'react';

const Page = ({ params }: { params: { slug: string } }) => {
  return <div>{params.slug}</div>;
};

export default Page;
