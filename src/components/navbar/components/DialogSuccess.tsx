import { useEffect, useRef } from 'react';

interface PropsLogin {
  open: boolean;
  handleClose: () => void;
}

export const DialogSuccess = (props: PropsLogin) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
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
    <>
      {/* Contendor Dialog */}
      <div
        className="window-background-login"
        id="window-background-login"
        ref={modalRef}
      >
        <div
          className="window-container-success"
          id="window-container-login"
          ref={containerRef}
        >
          <div>
            <div
              className="top-0 right-0  h-full border-2 border-[#000aff] bg-white p-10 sm:w-12/12 mr-4 text-center"
              style={{ borderRadius: '70px' }}
            >
              <h1>Contacto enviado exitosamente.</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
