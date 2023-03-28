import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import '../publish-section.styles.css';

type PropsDialog = {
  open: boolean;
  handleClose: () => void;
  isActive: boolean;
  handleDisabled: (isEnabled: boolean) => void;
};

export const DisabledPublish = ({
  open,
  handleClose,
  handleDisabled,
  isActive
}: PropsDialog) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (open) modalRef.current.style.display = 'flex';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      handleClose();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  return (
    <div
      className="window-background-disabled"
      id="window-background-disabled"
      ref={modalRef}
    >
      <div
        className="window-container-disabled"
        id="window-container-disabled"
        ref={containerRef}
      >
        <>
          <p className="text-2xl">
            {!isActive ? 'Deshabilitar' : 'Habilitar'} Publicación
          </p>
          <p className="pt-5 pb-2">
            ¿Está seguro que desea {!isActive ? 'deshabilitar' : 'habilitar'} su
            publicación?.
          </p>
          {!isActive && (
            <p className="text-[#D5278F] font-thin pb-5">
              {' '}
              (*) Otros usuarios ya no podrán ver mas esto
            </p>
          )}
          <Box
            className="flex justify-end"
            sx={{ '& > :not(style)': { m: 1 }, py: 1 }}
          >
            <button
              className="text-white rounded-full py-2 px-10 cursor-pointer bg-[#D5278F]"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              className="text-white rounded-full py-2 px-10 cursor-pointer"
              type={'submit'}
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
              }}
              onClick={() => {
                isActive ? handleDisabled(false) : handleDisabled(true);
                closeModal();
              }}
            >
              {isActive ? 'Habilitar' : 'Deshabilitar'}
            </button>
          </Box>
        </>
      </div>
    </div>
  );
};
