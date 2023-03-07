import { useState } from 'react';
import {
  CategoriesResponsive,
  ContainCategories,
  PageBase
} from '../../components';
import { ItemFooter } from '../home/components/ItemFooter';
import { Contactanos } from '../home/components/Contactanos';
import { AiFillAlert } from 'react-icons/ai';

export const OtherSectionsPage = () => {
  const [openContact, setOpenContact] = useState(false);

  const handleOpenContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  return (
    <PageBase>
      <div>
        <div className="h-[40vh] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <AiFillAlert size={48} className="text-gray-500" />
            <p className="text-xl text-gray-500">
              En estos momentos no se posee contenido para esta sección
            </p>
          </div>
        </div>
      </div>
      <section className="my-10 justify-center hidden sm:flex ">
        <ContainCategories />
      </section>
      <section className="my-10 flex justify-center  sm:hidden">
        <CategoriesResponsive />
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
