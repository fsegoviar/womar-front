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
    text-align: left;
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
  const [proveedor, setProveedor] = useState('');
  const [openRegisterExternal, setOpenRegisterExternal] = useState(false);
  const [isLogged, setIsLogged] = useState(
    !!localStorage.getItem('tokenWomar')
  );
  const [hiddenMenuResponsive, setHiddenMenuResponsive] = useState(true);

  console.log('Datos navbar =>', proveedor, openRegisterExternal);

  const handleCloseSession = () => {
    setIsLogged(false);
    localStorage.removeItem('tokenWomar');
  };

  const handleCloseDialogLogin = () => {
    setTimeout(() => {
      setOpenLogin(false);
    }, 500);
  };

  const handleOpenSession = (token: string) => {
    localStorage.setItem('tokenWomar', token);

    setIsLogged(true);
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
              className="bg-center bg-no-repeat bg-contain my-2 cursor-pointer w-56 h-14 xs:w-24"
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
              {!isLogged ? (
                <>
                  <BtnNavbar onClick={() => navigate(`/publicar/${IdUser}`)}>
                    Publicar
                  </BtnNavbar>
                  <BtnNavbar onClick={() => setOpenLogin(true)}>
                    Ingresa
                  </BtnNavbar>
                  <BtnNavbar onClick={() => setOpenRegisterLocal(true)}>
                    Registrate
                  </BtnNavbar>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' }
                    }}
                  >
                    <BtnNavbar onClick={() => navigate(`/publicar/${IdUser}`)}>
                      Publicaciones
                    </BtnNavbar>
                    <UserMenu handleCloseSession={handleCloseSession} />
                  </Box>
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
        <div className="fixed top-0 left-0 w-full h-24 mt-24 flex justify-center items-center z-50 bg-white">
          <BtnNavbar onClick={() => navigate(`/publicar/${IdUser}`)}>
            Publicar
          </BtnNavbar>
          <BtnNavbar onClick={() => setOpenLogin(true)}>Ingresa</BtnNavbar>
          <BtnNavbar onClick={() => setOpenRegisterLocal(true)}>
            Registrate
          </BtnNavbar>
        </div>
      )}
      {openLogin && (
        <DialogLogin
          open={openLogin}
          handleClose={handleCloseDialogLogin}
          handleOpenSession={handleOpenSession}
          setProveedor={setProveedor}
          isOpenRegisterExternal={setOpenRegisterExternal}
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
