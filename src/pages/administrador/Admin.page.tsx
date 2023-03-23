import { Container } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { PageBase } from '../../components/PageBase';
import { Divider, Stack } from '@mui/material';
import { CardInfor } from './components/CardInfor';

import {
  CantidadUsuario,
  PublicacionesAceptadas,
  PublicacionesRechazadas,
	PublicacionesPendientes
} from '../../services';
import { BsPeopleFill } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { UserTable } from './UserTable';
import { TabView, TabPanel } from 'primereact/tabview';
import { PublishAdmin } from './components/PublishAdmin';
import { useEffect, useState } from 'react';
import { parseJwt } from '../../utils';
import { DialogLogin } from '../../components/navbar/components/DialogLogin';

export const AdminPage = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const [countUsers, setCountUsers] = useState(0);
  const [publishAccept, setPublishAccept] = useState(0);
  const [publishReject, setPublishReject] = useState(0);
  const [publishPending, setPublishPending] = useState(0);
  const { result: countUsersFetch } = CantidadUsuario();
  const { result: publishAcceptFetch } = PublicacionesAceptadas();
  const { result: publishRejectFetch } = PublicacionesRechazadas();
  const { result: publishPendingFetch } = PublicacionesPendientes();

  const { IdUser } = parseJwt();

  useEffect(() => {
    if (IdUser) {
      setCountUsers(countUsersFetch);
      setPublishAccept(publishAcceptFetch);
      setPublishReject(publishRejectFetch);
      setPublishPending(publishPendingFetch);
    } else {
      setOpenLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countUsersFetch,publishAcceptFetch,publishRejectFetch,publishPendingFetch]);

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
        <TabView>
          <TabPanel header="Panel de Usuarios" headerTemplate={headerUserPanel}>
            <UserTable />
          </TabPanel>
          <TabPanel
            header="Panel de Publicaciones"
            headerTemplate={headerPublishPanel}
          >
            <PublishAdmin />
          </TabPanel>
        </TabView>
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
