import { Paper, Typography } from '@mui/material';
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
        borderRadius: 5,
        height: '125px'
      }}
    >
      <Box sx={{ display: 'flex', mb: 2 }}>
        {props.icon}
        <Typography variant="h5">{props.title}</Typography>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {props.numberData}
      </Typography>
    </Paper>
  );
};
