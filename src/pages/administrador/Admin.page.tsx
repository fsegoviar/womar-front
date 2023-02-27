import { Container } from '@mui/system';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { PageBase } from '../../components/PageBase';
import { Divider, Stack } from '@mui/material';
import { CardInfor } from './components/CardInfor';

import {
  CantidadUsuario,
  PublicacionesAceptadas,
  PublicacionesRechazadas
} from '../../services';
import { BsPeopleFill } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { UserTable } from './UserTable';
import { TabView, TabPanel } from 'primereact/tabview';
import { PublishAdmin } from './components/PublishAdmin';

export const AdminPage = () => {
  const { result: countUsers } = CantidadUsuario();
  const { result: publishAccept } = PublicacionesAceptadas();
  const { result: publishReject } = PublicacionesRechazadas();

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
            title={'Publicaciones Pendientes'}
            numberData={publishAccept}
          />
          <CardInfor
            bgCard="#000aff"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Publicaciones Totales'}
            numberData={publishReject}
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
    </PageBase>
  );
};
