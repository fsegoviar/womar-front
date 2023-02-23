import { Skeleton } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export const SkeletonLoader = () => {
  return (
    <Container>
      <div className="flex justify-center">
        <Skeleton variant="circular" width={150} height={150} />
      </div>
      <div className="w-full mt-5">
        <Skeleton
          variant="rectangular"
          className="w-full rounded-xl"
          height={60}
        />
      </div>
      <div className="grid gap-4 grid-cols-2 mt-5">
        <Skeleton variant="rectangular" className="rounded-xl" height={60} />
        <Skeleton variant="rectangular" className="rounded-xl" height={60} />
      </div>
      <div className="grid gap-4 grid-cols-2 mt-5">
        <Skeleton variant="rectangular" className="rounded-xl" height={60} />
        <Skeleton variant="rectangular" className="rounded-xl" height={60} />
      </div>
    </Container>
  );
};
