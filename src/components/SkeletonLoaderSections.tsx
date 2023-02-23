import Skeleton from '@mui/material/Skeleton';
import React from 'react';

export const SkeletonLoaderSections = () => {
  return (
    <div className="grid gap-4 grid-cols-4">
      <Skeleton
        variant="rectangular"
        className="w-full rounded-2xl col-span-2"
        height={250}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-2xl col-span-2"
        height={250}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-2xl col-span-2"
        height={250}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-2xl col-span-2"
        height={250}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-2xl col-span-2"
        height={250}
      />
      <Skeleton
        variant="rectangular"
        className="w-full rounded-2xl col-span-2"
        height={250}
      />
    </div>
  );
};
