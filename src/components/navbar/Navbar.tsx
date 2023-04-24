import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../utils';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from '@emotion/styled';
import { SearchBar } from './components/SearchBar';
import { TypeUser } from '../../interfaces';
import { UserMenu } from './components/UserMenu';
import { DialogLogin } from './components/DialogLogin';
import { DialogRegister } from './components/DialogRegister';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeStateLogin } from '../../store/loginSlice';
import { useDispatch } from 'react-redux';

export const BtnNavbar = styled.button`
  color: #000afe;
  font-size: 1rem;
  font-weight: normal;
  font-family: 'sailec-medium' !important;
  width: 8rem;
  padding: 3px 10px;
  border: 1px solid gray;
  border-radius: 20px;
  margin: 0 10px;
  text-align: center;
  transition-property: text-align;
  transition-duration: 4s;
  transition-delay: 2s;

  :hover {
    color: #ffffff;
    background: rgb(0, 229, 182);
    border: none;
    background: linear-gradient(
      90deg,
      rgba(0, 229, 182, 1) 0%,
      rgba(0, 124, 240, 1) 100%
    );
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegisterLocal, setOpenRegisterLocal] = useState(false);
  const { IdUser } = parseJwt();
  // const [isLogged, setIsLogged] = useState(
  //   !!localStorage.getItem('tokenWomar')
  // );
  const [hiddenMenuResponsive, setHiddenMenuResponsive] = useState(true);
  const isLogin = useSelector((state: RootState) => state.login.logged);
  const dispatch = useDispatch();

  const handleCloseSession = () => {
    dispatch(changeStateLogin(false));
    localStorage.removeItem('tokenWomar');
    navigate('/');
  };

  const handleCloseDialogLogin = () => {
    setTimeout(() => {
      setOpenLogin(false);
    }, 500);
  };

  const handleOpenSession = (token: string) => {
    localStorage.setItem('tokenWomar', token);
    dispatch(changeStateLogin(true));
    // setIsLogged(true);
  };

  const verifyLoggedOnPublish = (): void => {
    if (IdUser) {
      navigate(`/publicar/${IdUser}`);
    } else {
      setOpenLogin(true);
    }
  };

  //* Methods register

  const closeRegisterLocal = () => {
    setTimeout(() => {
      setOpenRegisterLocal(false);
    }, 500);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#FFFFFF', position: 'fixed', zIndex: 45 }}
        className="h-24"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="h-24">
            {/* Logo Womar */}
            <Box
              className="bg-center bg-no-repeat bg-contain my-2 cursor-pointer w-28 mr-3 h-24 md:m-0 md:w-56 md:h-14 "
              sx={{
                flexGrow: 1,
                backgroundImage: `url(${require('../../assets/images/logo-womar-2.png')})`
              }}
              onClick={() => navigate('/')}
            ></Box>
            {/* Barra de busqueda */}
            <Box
              sx={{
                flexGrow: 3,
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <SearchBar />
            </Box>
            {/* Botones */}
            <div className="hidden sm:block">
              {!isLogin ? (
                <>
                  <BtnNavbar onClick={() => verifyLoggedOnPublish()}>
                    Publicar
                  </BtnNavbar>
                  <BtnNavbar onClick={() => setOpenLogin(true)}>
                    Ingresar
                  </BtnNavbar>
                  <BtnNavbar onClick={() => setOpenRegisterLocal(true)}>
                    Registrarse
                  </BtnNavbar>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <div>
                      <BtnNavbar
                        className="py-1 font-thin"
                        onClick={() => verifyLoggedOnPublish()}
                      >
                        Publicaciones
                      </BtnNavbar>
                    </div>
                    <UserMenu handleCloseSession={handleCloseSession} />
                  </div>
                </>
              )}
            </div>
            {/* Botones responsive */}
            <div className="grow sm:hidden">
              <GiHamburgerMenu
                size={32}
                color="#000aff"
                className="mx-5"
                onClick={() => setHiddenMenuResponsive(!hiddenMenuResponsive)}
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {!hiddenMenuResponsive && (
        <div className="fixed top-0 left-0 w-full h-24 mt-24 flex justify-center items-center z-50 px-5 bg-white">
          <BtnNavbar onClick={() => navigate(`/publicar/${IdUser}`)}>
            Publicar
          </BtnNavbar>
          <BtnNavbar
            onClick={() => {
              setOpenLogin(true);
              setHiddenMenuResponsive(true);
            }}
          >
            Ingresar
          </BtnNavbar>
          <BtnNavbar
            onClick={() => {
              setOpenRegisterLocal(true);
              setHiddenMenuResponsive(true);
            }}
          >
            Registrarse
          </BtnNavbar>
        </div>
      )}
      {openLogin && (
        <DialogLogin
          open={openLogin}
          handleClose={handleCloseDialogLogin}
          handleOpenSession={handleOpenSession}
        />
      )}
      {openRegisterLocal && (
        <DialogRegister
          open={openRegisterLocal}
          handleClose={closeRegisterLocal}
          setOpenRegisterLocal={setOpenRegisterLocal}
          tipo={TypeUser.LOCAL}
        />
      )}
    </>
  );
};
