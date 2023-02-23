import Skeleton from '@mui/material/Skeleton';
import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="w-full grid gap-5 row-span-4">
      <Skeleton
        variant="rectangular"
        className="w-full rounded-xl"
        height={200}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-xl"
        height={200}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-xl"
        height={200}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-xl"
        height={200}
      />
    </div>
  );
};
