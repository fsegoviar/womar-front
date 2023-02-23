import React, { useLayoutEffect, useRef } from 'react';
import '../styles-home.css';
import { Box } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

interface PropsContactanos {
  open: boolean;
  handleClose: () => void;
}

type FormContactType = {
  emailOrigen: string;
  observaciones: string;
  nombre: string;
  telefono: string;
  asunto: string;
};

export const Contactanos = (props: PropsContactanos) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { register, handleSubmit } = useForm<FormContactType>();

  useLayoutEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';
  }, [props.open]);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.handleClose();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  const onSubmit: SubmitHandler<FormContactType> = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_URL_BACKEND}/Misc/Contacto`, data)
      .then(() => closeModal())
      .catch((error: AxiosError) => console.log('error =>', error));
  };

  return (
    <div className="window-background-contact" ref={modalRef}>
      <div
        className="window-container-contact w-11/12 md:w-3/12 z-50"
        ref={containerRef}
      >
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <p className="py-2 text-xl">Formulario de contacto</p>
          <div className="w-full">
            <input
              type="text"
              placeholder="Nombre"
              className="border-2 rounded-md border-gray-500 p-1 w-full"
              {...register('nombre')}
            />
          </div>
          <div className="w-full mt-2">
            <input
              type="text"
              placeholder="Asunto"
              className="border-2 rounded-md border-gray-500 p-1 w-full"
              {...register('asunto')}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              type="text"
              placeholder="Correo electrónico"
              className="border-2 rounded-md border-gray-500 p-1"
              {...register('emailOrigen')}
            />
            <input
              type="number"
              placeholder="Teléfono"
              className="border-2 rounded-md border-gray-500 p-1"
              {...register('telefono')}
            />
          </div>
          <div className="w-full mt-2">
            <textarea
              rows={6}
              className="w-full border-2 rounded-md border-gray-500 p-1"
              placeholder="Mensaje"
              {...register('observaciones')}
            ></textarea>
          </div>
          <Box
            className="flex justify-center"
            sx={{ '& > :not(style)': { m: 1 }, py: 1 }}
          >
            <button
              className="text-white text-sm rounded-full py-2 px-6 cursor-pointer bg-[#D5278F]"
              onClick={props.handleClose}
            >
              Cancelar
            </button>
            <button
              className="text-white text-sm rounded-full py-2 px-10 cursor-pointer"
              type={'submit'}
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
              }}
            >
              Enviar
            </button>
          </Box>
        </form>
      </div>
    </div>
  );
};
