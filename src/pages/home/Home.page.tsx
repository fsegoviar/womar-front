import { useState } from 'react';
import {
  CategoriesResponsive,
  ContainCategories,
  PageBase
} from '../../components';
import { SimpleCarousel } from './components/SimpleCarousel';
import Carousel from 'react-multi-carousel';
import { Carousel as Carousel3D } from '3d-react-carousal';
import { CardItem } from './components/CardItem';
import { ItemFooter } from './components/ItemFooter';
import { Contactanos } from './components/Contactanos';

export const HomePage = () => {
  let slides = [
    <img
      className="rounded-3xl"
      src={`${require('../../assets/images/comofunciona-1.png')}`}
      alt="1"
    />,
    <img
      className="rounded-3xl"
      src={`${require('../../assets/images/comofunciona-2.png')}`}
      alt="2"
    />,
    <img
      className="rounded-3xl"
      src={`${require('../../assets/images/comofunciona-3.png')}`}
      alt="3"
    />
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [openContact, setOpenContact] = useState(false);

  const handleOpenContact = () => {
    console.log('Open modal');
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  return (
    <PageBase>
      {/* <ButtonInfo /> */}

      <SimpleCarousel />
      {/* Categorías */}
      <section className="my-10 justify-center hidden sm:flex ">
        <ContainCategories />
      </section>
      <section className="my-10 flex justify-center  sm:hidden">
        <CategoriesResponsive />
      </section>
      {/* Servicios maritimos más populares */}
      <section
        style={{
          background:
            'linear-gradient(90deg, rgba(0,233,186,1) 0%, rgba(0,191,232,1) 50%, rgba(0,10,255,1) 100%)'
        }}
        className="flex flex-col justify-center items-center h-[600px]"
      >
        <h1 className="font-light text-white mt-10 text-lg text-center sm:text-2xl tracking-[.40em]">
          SERVICIOS MARÍTIMOS MÁS RECIENTES
        </h1>
        <Carousel className=" z-0 w-[80%] h-[550px]" responsive={responsive}>
          <CardItem
            img={require('../../assets/images/img-servicio1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="300.000"
          />
          <CardItem
            img={require('../../assets/images/naves-1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="250.000"
          />
          <CardItem
            img={require('../../assets/images/naves-2.png')}
            title="Servicio de transporte"
            direction="Dirección 2"
            price="2.050.000"
          />
          <CardItem
            img={require('../../assets/images/img-servicio1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="300.000"
          />
          <CardItem
            img={require('../../assets/images/img-servicio1.png')}
            title="Servicio de turismo"
            direction="Dirección 1"
            price="300.000"
          />
        </Carousel>
      </section>
      {/*Como funciona womar y Carrusel 3D */}
      <section className="hidden sm:flex flex-col items-center py-4">
        <h2
          style={{ color: '#003BE9' }}
          className="my-10 font-bold sm:text-4xl tracking-[.30em] text-lg text-center"
        >
          ¿CÓMO FUNCIONA WOMAR?
        </h2>
        <div className="w-[1000px] h-[300px]">
          <Carousel3D
            className="w-full h-full"
            autoplay={true}
            interval={4000}
            arrows={false}
            slides={slides}
          />
        </div>
      </section>
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
