import { Grid } from '@mui/material';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { DialogDisabledUser } from './components/DialogDisabledUser';
import { UsuariosAdmin } from '../../interfaces';
import { ObtenerUsuario } from '../../services';
import { Button } from 'primereact/button';

export const UserTable = () => {
  const { usuarios } = ObtenerUsuario();
  const [openModalDisabled, setOpenModalDisabled] = useState(false);
  const [userSelected, setUserSelected] = useState({
    usuarioId: '',
    activo: false
  });
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
    <>
      <Grid container>
        <Grid item xs={12}>
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

      <DialogDisabledUser
        open={openModalDisabled}
        closeModal={setOpenModalDisabled}
        info={userSelected}
      />
    </>
  );
};
