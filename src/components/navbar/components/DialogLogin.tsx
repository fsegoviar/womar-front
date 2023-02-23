import { useEffect, useRef, useState } from 'react';
// import { LoginWithGoogle } from './navbar/login/components/LoginWithGoogle';
import axios from 'axios';
import { FailResponse } from '@greatsumini/react-facebook-login';
import { Box, Fade, Typography } from '@mui/material';
import '../styles-navbar.css';
import { LoginWithFacebook } from './LoginWithFacebook';
import { LoadingComponent } from '../../LoadingComponent';
import { TypeUser } from '../../../interfaces';
import { StandardLogin } from './StandardLogin';

interface PropsLogin {
  open: boolean;
  handleClose: () => void;
  handleOpenSession: (value: string) => void;
  isOpenRegisterExternal: (value: boolean) => void;
  setProveedor: (value: string) => void;
}

export const DialogLogin = (props: PropsLogin) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  // const [open, setOpen] = useState(props.open);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState('');

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

  const accessLogin = ({
    accessToken = '',
    email = '',
    password = '',
    tipo
  }: {
    accessToken?: string;
    email?: string;
    password?: string;
    tipo: TypeUser;
  }): void => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL_BACKEND}/Security/Login`, {
        accessToken,
        email,
        password,
        tipo
      })
      .then((response: any) => {
        props.handleOpenSession(response.data.token);
        // setOpen(false);
        props.handleClose();
      })
      .catch((error: any) => {
        if (error.response.data) {
          setMsgError('Usuario no registrado');
        } else {
          setMsgError('Usuario/Contraseña incorrecta');
        }
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const loginFacebookFailure = (data: FailResponse) => {
    console.log('Failure login =>', data);
    setError(true);
  };

  // const handleClose = () => {
  //   // setOpen(false);
  //   props.handleClose();
  // };

  return (
    <>
      {/* Contendor Dialog */}
      <div
        className="window-background-login"
        id="window-background-login"
        ref={modalRef}
      >
        <div
          className="window-container-login"
          id="window-container-login"
          ref={containerRef}
        >
          <div>
            <div
              className="hidden h-[450px] bg-no-repeat bg-center bg-cover  justify-end xs:hidden sm:flex sm:w-9/12"
              style={{
                backgroundImage: `url(${require('../../../assets/images/img-login.png')})`,
                borderRadius: '70px 0 0 70px'
              }}
            ></div>
            <div
              className="absolute top-0 right-0  h-full border-2 border-[#000aff] bg-white p-10 sm:w-12/12 mr-4"
              style={{ borderRadius: '70px' }}
            >
              {!loading ? (
                <>
                  <p>Ingresa</p>
                  <StandardLogin onSubmit={accessLogin} />
                  {error && (
                    <Fade in={error}>
                      <Box className="flex justify-center items-center pt-2">
                        <Typography variant="body1" color="red">
                          {msgError}
                        </Typography>
                      </Box>
                    </Fade>
                  )}

                  <hr className="mt-3" />
                  <div className="grid gap-4">
                    <LoginWithFacebook
                      success={accessLogin}
                      failure={loginFacebookFailure}
                    />
                    {/* <LoginWithGoogle response={accessLogin} /> */}
                  </div>
                </>
              ) : (
                <div className="w-[400px]">
                  <LoadingComponent />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
