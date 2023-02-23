import { Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import '../publish-section.styles.css';
import { LoadingComponent } from '../../../components';

type PropsDialog = {
  open: boolean;
  handleClose: () => void;
  idPublicacion: string;
};

export const DisabledPublish = ({
  open,
  handleClose,
  idPublicacion
}: PropsDialog) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [loading, setLoading] = useState(false);

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

  const handleDisabled = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ActualizarEstado`,
        { idPublicacion },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => {
        console.log('Deshabilitar', response);
        closeModal();
      })
      .catch((error: any) => console.log('Error => ', error))
      .finally(() => setLoading(false));
  };

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
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <p className="text-2xl">Deshabilitar Publicación</p>
            <p className="pt-5 pb-2">
              ¿Está seguro que desea deshabilitar su publicación?.
            </p>
            <p className="text-[#D5278F] font-thin pb-5">
              {' '}
              (*) Otros usuarios ya no podrán ver mas esto
            </p>
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
                onClick={handleDisabled}
              >
                Deshabilitar
              </button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};
