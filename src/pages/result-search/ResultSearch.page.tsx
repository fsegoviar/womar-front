import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CategoriesResponsive,
  ContainCategories,
  DetailPublish,
  PageBase,
  SkeletonLoaderSections,
  SmartPreviewService
} from '../../components';
import { Box, Grid } from '@mui/material';
import { DetailService } from '../../interfaces';
import { DialogSuccess } from '../../components/navbar/components/DialogSuccess';

export const ResultSearch = () => {
  const { state } = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<DetailService>();
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(true);
  const [filter, setFilter] = useState({
    categorias: [1],
    orderBy: true,
    search: '',
    tipoPublicacion: 1
  });
  const [load] = useState(false);

  const openModalContact = (service: DetailService) => {
    setOpenModal(true);
    setServiceSelected(service);
  };

  const handleCloseDialogSuccess = () => {
    setTimeout(() => {
      setOpenMessage(false);
    }, 500);
  };

  return (
    <PageBase>
      <Box className="">
        <Grid container>
          {/* Filtros */}
          <Grid
            item
            xs={12}
            className="w-full h-auto relative"
            sx={{
              height: 'auto',
              background:
                'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
            }}
          >
            <Grid container className="h-full">
              <Grid item xs={12} sm={3} className="pt-5">
                <div className="flex  justify-center items-center w-full h-full">
                  <p className="text-xl font-thin pr-5 text-white">Filtros</p>
                  <Box
                    className="rounded-full bg-white"
                    style={{ border: '1px solid #000aff' }}
                  >
                    <button
                      className="text-[#000aff] w-[50%] px-5 py-1 text-lg rounded-full"
                      style={{
                        backgroundColor: selectedOffer ? '#00e9ba' : 'white'
                      }}
                      onClick={() => {
                        setSelectedOffer(true);
                        setFilter({ ...filter, tipoPublicacion: 1 });
                      }}
                    >
                      Buscan
                    </button>
                    <button
                      className="text-[#000aff] w-[50%] px-5 py-1 text-lg rounded-full"
                      style={{
                        backgroundColor: !selectedOffer ? '#00e9ba' : 'white'
                      }}
                      onClick={() => {
                        setSelectedOffer(false);
                        setFilter({ ...filter, tipoPublicacion: 4 });
                      }}
                    >
                      Ofrecen
                    </button>
                  </Box>
                </div>
              </Grid>

              <Grid item xs={3} sm={9} className="hidden sm:grid ">
                <div className="flex justify-end items-center w-full h-full">
                  <p className="text-white font-bold text-3xl">Resultados</p>
                  <div
                    className="bg-contain bg-no-repeat bg-center w-16 h-16 ml-2"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/ico-embarcaciones-blanco.png')})`
                    }}
                  ></div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} className="px-10">
            <Grid container sx={{ my: 5 }} spacing={2}>
              {load && (
                <Grid item xs={12}>
                  <SkeletonLoaderSections />
                </Grid>
              )}
              {state!.length > 0 &&
                !load &&
                state!.map((state: any, index: any) => (
                  <Grid item xs={12} key={index} lg={4}>
                    <SmartPreviewService
                      key={index}
                      title={state.titulo}
                      price={state.precio}
                      direccion={state.direccion}
                      urlImgCover={state.urlImagenPrincipal}
                      openContact={() => openModalContact(state)}
                    />
                  </Grid>
                ))}
              {state!.length === 0 && !load && (
                <h1>No existen publicaciones para esta sección</h1>
              )}
              <section className="hidden sm:flex my-10 flex-col justify-center items-center w-full md:flex-row ">
                <ContainCategories />
              </section>
              <section className="my-5 flex sm:hidden justify-center w-full ">
                <CategoriesResponsive />
              </section>
            </Grid>
          </Grid>
        </Grid>
        {openModal && (
          <DetailPublish
            open={openModal}
            service={serviceSelected!}
            closeModal={() => setOpenModal(false)}
            openMessage={() => setOpenMessage(true)}
          />
        )}
        {openMessage && (
          <DialogSuccess
            open={openMessage}
            handleClose={handleCloseDialogSuccess}
          />
        )}
      </Box>
    </PageBase>
  );
};
