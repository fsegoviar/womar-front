import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type PropsCard = {
  title: string;
  icon: any;
  numberData: number;
  bgCard: string;
};

export const CardInfor = (props: PropsCard) => {
  return (
    <Paper
      sx={{
        textAlign: 'center',
        p: 3,
        backgroundColor: props.bgCard,
        color: '#FFFFFF',
        borderRadius: '50px',
        maxWidth: '250px',
        height: '125px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <p className="text-[48px] inline">{props.numberData}</p>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <p className="text-2xl text-left pl-2">{props.title}</p>
      </Box>
    </Paper>
  );
};
