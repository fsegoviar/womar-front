import { ProgressSpinner } from 'primereact/progressspinner';

export const LoadingComponent = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ProgressSpinner
        style={{ width: '80px', height: '80px' }}
        strokeWidth="3"
        fill="var(--surface-ground)"
        animationDuration="1s"
      />
    </div>
  );
};
