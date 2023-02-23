import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Navbar } from './navbar/Navbar';

export const PageBase = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="h-24"></div>
      <main className="w-screen relative">{children}</main>
    </Box>
  );
};
