import { Container } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { PageBase } from '../../components/PageBase';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { CardInfor } from './components/CardInfor';
import { BsPeopleFill } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { UserTable } from './UserTable';
import { TabView, TabPanel } from 'primereact/tabview';
import { PublishAdmin } from './components/PublishAdmin';
import { useEffect, useState } from 'react';
import { parseJwt } from '../../utils';
import { DialogLogin } from '../../components/navbar/components/DialogLogin';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeStateLogin } from '../../store/loginSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ObtenerInfoUsuario } from '../../services';

export const AdminPage = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const [countUsers, setCountUsers] = useState(0);
  const [publishAccept, setPublishAccept] = useState(0);
  const [publishReject, setPublishReject] = useState(0);
  const [publishPending, setPublishPending] = useState(0);
  const isLogin = useSelector((state: RootState) => state.login.logged);
  const dispatch = useDispatch();
  const userRol = useSelector((state: RootState) => state.userRol.rol);
  const { fetchData } = ObtenerInfoUsuario();
  const [isAdmin, setIsAdmin] = useState(false);

  const { IdUser } = parseJwt();

  const fetchCantidadUsuario = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL_BACKEND}/Reporteria/CantidadUsuario`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
        }
      })
      .then((response: any) => setCountUsers(response.data));
  };

  const fetchPubAceptadas = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/Reporteria/PublicacionesAceptadas`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => setPublishAccept(response.data));
  };

  const fetchPubRechazada = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/Reporteria/PublicacionesRechazadas`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => setPublishReject(response.data));
  };

  const fetchPubPendiente = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/Reporteria/PublicacionesPendientes`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => setPublishPending(response.data));
  };

  useEffect(() => {
    console.log('UserROL =>', userRol, isLogin);

    fetchData().then((response: any) => {
      if (IdUser && response.result.rol === 'Administrador') {
        setIsAdmin(true);
        fetchCantidadUsuario();
        fetchPubAceptadas();
        fetchPubRechazada();
        fetchPubPendiente();
      } else {
        setIsAdmin(false);
        if (!IdUser) {
          setOpenLogin(true);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerUserPanel = (options: any) => {
    return (
      <button
        type="button"
        onClick={options.onClick}
        className={options.className}
      >
        <BsPeopleFill size={24} className="mr-2" />
        {options.titleElement}
      </button>
    );
  };

  const handleCloseDialogLogin = () => {
    setTimeout(() => {
      setOpenLogin(false);
    }, 500);
  };

  const handleOpenSession = (token: string) => {
    localStorage.setItem('tokenWomar', token);
    dispatch(changeStateLogin(true));
  };

  const headerPublishPanel = (options: any) => {
    return (
      <button
        type="button"
        onClick={options.onClick}
        className={options.className}
      >
        <HiOutlineClipboardDocumentList size={24} className="mr-2" />
        {options.titleElement}
      </button>
    );
  };

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '90vh',
          height: 'auto',
          position: 'relative',
          mt: 10
        }}
      >
        {!isAdmin && isLogin && (
          <Box
            sx={{
              width: '100%',
              padding: '20px 0',
              border: '2px solid red',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px'
            }}
          >
            <Typography variant="h6" color="red">
              El usuario no contiene Permisos de administrador. Ingrese con otra
              cuenta o recargue la página para intentar nuevamente
            </Typography>
          </Box>
        )}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 12 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CardInfor
            bgCard="#000aff"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Usuarios Registrados'}
            numberData={countUsers}
          />
          <CardInfor
            bgCard="#000aff"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Publicaciones Aceptadas'}
            numberData={publishAccept}
          />
          <CardInfor
            bgCard="#000aff"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Publicaciones Rechazadas'}
            numberData={publishReject}
          />
          <CardInfor
            bgCard="#000aff"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Publicaciones Pendientes'}
            numberData={publishPending}
          />
        </Stack>
        <Divider sx={{ my: 4 }} />
        {isAdmin ? (
          <TabView>
            <TabPanel
              header="Panel de Usuarios"
              headerTemplate={headerUserPanel}
            >
              <UserTable />
            </TabPanel>
            <TabPanel
              header="Panel de Publicaciones"
              headerTemplate={headerPublishPanel}
            >
              <PublishAdmin />
            </TabPanel>
          </TabView>
        ) : (
          <span>Sin datos</span>
        )}
      </Container>
      {openLogin && (
        <DialogLogin
          open={openLogin}
          handleClose={handleCloseDialogLogin}
          handleOpenSession={handleOpenSession}
        />
      )}
    </PageBase>
  );
};
