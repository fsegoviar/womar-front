import React, { useState, useEffect } from 'react';
import { ObtenerPublicacionesPorEstado } from '../../../services';
import { Grid } from '@mui/material';
import { CardPublish } from './CardPublish';
import { DetailService } from '../../../interfaces';
import { DialogDetailPublish } from './DialogDetailPublish';

export const PublishAdmin = () => {
  const { result: publishFetch } = ObtenerPublicacionesPorEstado(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [listPublish, setListPublish] = useState<any[]>([]);
  const [selectedPublish, setSelectedPublish] = useState<DetailService>(null!);

  const handleOpenModal = (item: DetailService) => {
    setOpenDetail(true);
    setSelectedPublish(item);
  };

  const removePublish = () => {
    setListPublish(
      listPublish.filter((publish) => publish !== selectedPublish)
    );
  };

  useEffect(() => {
    setListPublish(publishFetch);
  }, [publishFetch]);

  return (
    <>
      {listPublish.length > 0 ? (
        <>
          <Grid container>
            {listPublish.map((item, index) => (
              <Grid item xs={12} md={4} key={index} className="sm:px-3 py-2">
                <CardPublish
                  publish={item}
                  openCard={() => handleOpenModal(item)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <p className="font-bold text-lg">sin publicaciones pendientes</p>
      )}
      {openDetail && (
        <DialogDetailPublish
          publish={selectedPublish}
          open={openDetail}
          closeModal={() => setOpenDetail(false)}
          removePublish={() => removePublish()}
        />
      )}
    </>
  );
};
