import React, { useState } from 'react';
import { ObtenerPublicacionesPorEstado } from '../../../services';
import { Grid } from '@mui/material';
import { CardPublish } from './CardPublish';
import { DetailService } from '../../../interfaces';
import { DialogDetailPublish } from './DialogDetailPublish';

export const PublishAdmin = () => {
  const { publish } = ObtenerPublicacionesPorEstado(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedPublish, setSelectedPublish] = useState<DetailService>(null!);

  const handleOpenModal = (item: DetailService) => {
    setOpenDetail(true);
    setSelectedPublish(item);
  };

  return (
    <>
      <Grid container>
        {publish.map((item, index) => (
          <Grid item xs={12} md={4} key={index} className="sm:px-3 py-2">
            <CardPublish
              publish={item}
              openCard={() => handleOpenModal(item)}
            />
          </Grid>
        ))}
      </Grid>
      {openDetail && (
        <DialogDetailPublish
          publish={selectedPublish}
          open={openDetail}
          closeModal={() => setOpenDetail(false)}
        />
      )}
    </>
  );
};
