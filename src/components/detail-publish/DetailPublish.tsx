import { useEffect, useRef, useState } from 'react';
import './detail-publish.style.css';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { Grid } from '@mui/material';
import { FormContact } from './components/FormContact';
import { SiCashapp } from 'react-icons/si';
import { MdLocationOn } from 'react-icons/md';
import { DetailService } from '../../interfaces';
import { LoadingComponent } from '../LoadingComponent';

type DetailPublishType = {
  service: DetailService;
  open: boolean;
  closeModal: () => void;
  openMessage: () => void;
};

export const DetailPublish = (props: DetailPublishType) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';
  }, [props.open]);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.closeModal();
    }, 1000);
  };

	const openMessage = () => {
		props.openMessage()
	}

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  //Event slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? props.service.imagenes.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === props.service.imagenes.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div
      className="window-background-detail"
      id="window-background-detail"
      ref={modalRef}
    >
      <div
        className="window-container-detail"
        id="window-container-login"
        ref={containerRef}
      >
        <div className="flex justify-center md:block">
          <div className="hidden w-7/12 h-[550px] bg-no-repeat bg-center bg-cover sm:flex justify-start">
            {/* Aqui va el slider */}
            <div
              style={{
                backgroundImage: `url(${props.service.imagenes[currentIndex]})`,
                borderRadius: '70px 0 0 70px'
              }}
              className="w-full h-full bg-center bg-no-repeat bg-contain duration-500 lg:bg-cover"
            ></div>
            {props.service.imagenes.length > 1 && (
              <>
                {/* Flecha izquierda */}
                <div className=" absolute top-[40%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactLeft onClick={prevSlide} size={40} />
                </div>
                {/* Flecha derecha */}
                <div className=" group-hover:block absolute top-[40%] -translate-x-[-25rem] translate-y-[50%]  text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactRight onClick={nextSlide} size={40} />
                </div>
              </>
            )}
          </div>
          <div
            className="relative sm:absolute top-0 right-0 w-10/12 sm:w-6/12 mt-16 sm:mt-0 h-full border-2 border-[#000aff] bg-white p-10"
            style={{ borderRadius: '70px' }}
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <Grid container className="gap-4">
                <Grid item xs={7}>
                  <p className="text-2xl">{props.service.titulo}</p>
                  <p className="font-thin text-sm mt-2">
                    {props.service.descripcion}
                  </p>
                </Grid>
                <Grid item xs={4} className="pt-5">
                  <p className="text-sm font-thin flex">
                    <SiCashapp size={16} color="gray" />
                    <span className="pl-1">{props.service.precio}</span>
                  </p>
                  <p className="text-sm font-thin flex">
                    <MdLocationOn size={32} color="gray" />
                    <span className="pl-1">{props.service.direccion}</span>
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <FormContact
                    idService={String(props.service.id)}
                    closeModal={closeModal}
                    openMessage={openMessage}
                    loading={setLoading}
                  />
                </Grid>
              </Grid>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
