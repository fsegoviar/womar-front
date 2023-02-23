import React, { useLayoutEffect, useRef } from 'react';
import '../styles-home.css';
import { Box } from '@mui/material';

interface PropsContactanos {
  open: boolean;
  handleClose: () => void;
}

export const Contactanos = (props: PropsContactanos) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

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

  return (
    <div className="window-background-contact" ref={modalRef}>
      <div
        className="window-container-contact w-11/12 md:w-3/12"
        ref={containerRef}
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Nombre"
            className="border-2 rounded-md border-gray-500 p-1 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input
            type="text"
            placeholder="Correo electrónico"
            className="border-2 rounded-md border-gray-500 p-1"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="border-2 rounded-md border-gray-500 p-1"
          />
        </div>
        <div className="w-full mt-2">
          <textarea
            rows={6}
            className="w-full border-2 rounded-md border-gray-500 p-1"
            placeholder="Mensaje"
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
      </div>
    </div>
  );
};
