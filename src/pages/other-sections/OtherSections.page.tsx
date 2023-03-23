import { Grid } from '@mui/material';
import Box from '@mui/material/Box/Box';
import {
  CategoriesResponsive,
  ContainCategories,
  PageBase
} from '../../components';
import { useState } from 'react';
import { ItemFooter } from '../home/components/ItemFooter';
import { Contactanos } from '../home/components/Contactanos';
import { CardSection } from './CardSection';

export const OtherSectionsPage = () => {
  const [openContact, setOpenContact] = useState(false);

  const handleOpenContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const [filter, setFilter] = useState({
    categorias: [1],
    orderBy: true,
    search: '',
    tipoPublicacion: 1
  });

  const [selectedOffer, setSelectedOffer] = useState(true);

  return (
    <PageBase>
      {/* header */}
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
          <Grid item xs={12} className="grid sm:hidden">
            <div className="flex justify-center items-center w-full h-full pt-5">
              <p className="text-white font-bold text-xl">Otros Servicios</p>
              <div
                className="bg-contain bg-no-repeat bg-center w-12 h-12 ml-2"
                style={{
                  backgroundImage: `url(${require('../../assets/images/ico-embarcaciones-blanco.png')})`
                }}
              ></div>
            </div>
          </Grid>
          <Grid item xs={12} sm={3} className="pt-5">
            <div className="flex  justify-center items-center w-full h-full">
              <p className="text-xl font-thin pr-5 text-white">Filtros</p>
              <Box
                className="rounded-full bg-white"
                style={{ border: '1px solid #000aff' }}
              >
                <button
                  className="text-[#000aff] px-5 sm:px-10 py-1 text-xl rounded-full"
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
                  className="text-[#000aff] px-5 sm:px-10 py-1 text-xl rounded-full"
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
          <Grid item xs={12} sm={6} className="flex justify-center py-5">
            <div className="flex flex-col h-full justify-center ">
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-thin text-white"
                >
                  Default checkbox
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-thin text-white"
                >
                  Checked state
                </label>
              </div>
            </div>
            <div className="flex flex-col h-full justify-center ml-4">
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-thin text-white"
                >
                  Default checkbox
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-thin text-white"
                >
                  Checked state
                </label>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} className="hidden sm:grid">
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-white font-bold text-3xl">Otros servicios</p>
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
      <Grid item xs={12} md={12} className="px-5 sm:px-10">
        <Grid container sx={{ my: 5 }} spacing={2}>
          <Grid item xs={12} lg={4}>
            <CardSection bgImage={''} title={'Redes'} urlNavigate={'redes'} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardSection bgImage={''} title={'Fondeo'} urlNavigate={'fondeo'} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardSection bgImage={''} title={'Rovs'} urlNavigate={'rovs'} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardSection
              bgImage={''}
              title={'Habiltabilidad'}
              urlNavigate={'habiltabilidad'}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardSection
              bgImage={''}
              title={'Cabotaje'}
              urlNavigate={'cabotaje'}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <CardSection
              bgImage={''}
              title={'Transporte de personal'}
              urlNavigate={'transporte'}
            />
          </Grid>
          <section className="hidden sm:flex my-10 flex-col justify-center items-center w-full md:flex-row ">
            <ContainCategories />
          </section>
          <section className="my-5 flex sm:hidden justify-center">
            <CategoriesResponsive />
          </section>
        </Grid>
      </Grid>
      <footer
        className="relative bg-center bg-cover bg-no-repeat w-full h-72 mt-10"
        style={{
          backgroundImage: `url(${require('../../assets/images/footer.jpg')})`
        }}
      >
        {/* Footer Versión escritorio */}
        <div
          className="relative grid-cols-3 hidden sm:grid"
          style={{ zIndex: '9999' }}
        >
          <div className="grid-span-1 flex flex-col items-center pt-10">
            <h2
              className="text-white font-bold text-[2.8rem]"
              style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
            >
              ¿AÚN
            </h2>
            <h2
              className="text-white font-medium text-[2.8rem] pl-40"
              style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
            >
              TIENES
            </h2>
            <h2
              className="text-white font-medium text-[2.8rem] pl-60"
              style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
            >
              DUDAS?
            </h2>
          </div>
          <div className="grid-span-2 flex items-center">
            <div className="flex flex-col justify-center items-center mx-7">
              <div
                className="bg-center bg-contain bg-no-repeat w-16 h-16 cursor-pointer z-40"
                style={{
                  backgroundImage: `url(${require('../../assets/images/ico-avion.png')})`
                }}
                onClick={handleOpenContact}
              ></div>
              {/* Texto */}
              <p
                style={{ width: '100px' }}
                className="text-center text-white pt-5"
              >
                Contáctanos
              </p>
            </div>
            <ItemFooter
              img={require('../../assets/images/ico_wsp.png')}
              text="Envianos un WhatsApp"
            />
          </div>
        </div>
        {/* Footer version mobil */}
        <div className="flex sm:hidden flex-col">
          <h2 className="p-5 text-2xl text-white">¿Aún tienes dudas?</h2>
          <div className="flex justify-center">
            <div
              className="flex flex-col justify-center items-center mx-7"
              onClick={handleOpenContact}
            >
              <div
                className="bg-center bg-contain bg-no-repeat w-16 h-16"
                style={{
                  backgroundImage: `url(${require('../../assets/images/ico-avion.png')})`
                }}
              ></div>
              {/* Texto */}
              <p
                style={{ width: '100px' }}
                className="text-center text-white pt-5"
              >
                Contáctanos
              </p>
            </div>
            <ItemFooter
              img={require('../../assets/images/ico_wsp.png')}
              text="Envianos un WhatsApp"
            />
          </div>
        </div>
      </footer>
      {openContact && (
        <Contactanos open={openContact} handleClose={handleCloseContact} />
      )}
    </PageBase>
  );
};
