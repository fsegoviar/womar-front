import { Container } from '@mui/system';
import { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { PageBase } from '../../components/PageBase';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { CardInfor } from './components/CardInfor';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DialogDisabledUser } from './components/DialogDisabledUser';

import { UsuariosAdmin } from '../../interfaces';
import {
  CantidadUsuario,
  PublicacionesAceptadas,
  PublicacionesRechazadas,
  ObtenerUsuario
} from '../../services';
export const AdminPage = () => {
  // const [pieData, setPieData] = useState();
  const [openModalDisabled, setOpenModalDisabled] = useState(false);
  const [userSelected, setUserSelected] = useState({
    usuarioId: '',
    activo: false
  });
  const { result: countUsers } = CantidadUsuario();
  const { result: publishAccept } = PublicacionesAceptadas();
  const { result: publishReject } = PublicacionesRechazadas();
  const { usuarios } = ObtenerUsuario();
  // const { result: publishPerCategory } = PublicacionesPorCategoria();

  const handleDisabledUser = (user: UsuariosAdmin) => {
    setOpenModalDisabled(true);
    setUserSelected({
      usuarioId: user.id,
      activo: user.activo
    });
  };

  const actionDisabled = (rowData: UsuariosAdmin) => {
    if (rowData.activo) {
      return (
        <div style={{ display: 'flex' }}>
          <div style={{ margin: '0 5px' }}>
            <Button
              icon="pi pi-user-minus"
              className="p-button-rounded p-button-sm p-button-danger"
              onClick={() => handleDisabledUser(rowData)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex' }}>
          <div style={{ margin: '0 5px' }}>
            <Button
              icon="pi pi-user-plus"
              className="p-button-rounded p-button-outlined p-button-sm p-button-success"
              onClick={() => handleDisabledUser(rowData)}
            />
          </div>
        </div>
      );
    }
  };

  const statusUser = (rowData: UsuariosAdmin) => {
    if (rowData.activo) {
      return <p>ACTIVO</p>;
    } else {
      return <p>DESHABILITADO</p>;
    }
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
            bgCard="#07BC77"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Usuarios Registrados'}
            numberData={countUsers}
          />
          <CardInfor
            bgCard="#07BC77"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Publicaciones Aceptadas'}
            numberData={publishAccept}
          />
          <CardInfor
            bgCard="#07BC77"
            icon={<PeopleAltIcon sx={{ mx: 1 }} />}
            title={'Publicaciones Rechazadas'}
            numberData={publishReject}
          />

          {/* <Box>
            {publishPerCategory && (
              <>
                <Typography
                  variant="h6"
                  component={'div'}
                  style={{ fontWeight: 'bold' }}
                >
                  Nº Publicaciones por categoría
                </Typography>
                <PieChart pieData={publishPerCategory} />
              </>
            )}
          </Box> */}
        </Stack>
        <Divider sx={{ my: 4 }} />
        <Grid container>
          <Grid item xs={12}>
            <Typography variant={'h4'} sx={{ mb: 2 }}>
              Administrador de Usuarios
            </Typography>
            <DataTable
              value={usuarios}
              responsiveLayout="stack"
              breakpoint="960px"
              dataKey="id"
              rows={15}
              style={{ padding: '30px 0' }}
            >
              <Column field="nombre" header={'Nombre'} sortable></Column>
              <Column field="email" header={'Email'} sortable></Column>
              <Column
                field="publicaciones"
                header={'Nº de publicaciones'}
                sortable
              ></Column>
              <Column
                field="activo"
                header={'Estado'}
                body={statusUser}
                sortable
              ></Column>
              <Column
                body={actionDisabled}
                exportable={false}
                style={{ minWidth: '8rem' }}
              ></Column>
            </DataTable>
          </Grid>
        </Grid>
      </Container>
      <DialogDisabledUser
        open={openModalDisabled}
        closeModal={setOpenModalDisabled}
        info={userSelected}
      />
    </PageBase>
  );
};
