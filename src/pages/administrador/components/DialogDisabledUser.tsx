import React from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import axios, { AxiosError } from 'axios';

interface PropsDialog {
  open: boolean;
  info: {
    usuarioId: string;
    activo: boolean;
  };
  closeModal: (value: boolean) => void;
}

export const DialogDisabledUser = (props: PropsDialog) => {
  const changeStateUser = () => {
    axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Security/CambiarEstado`,
        {
          usuarioId: props.info.usuarioId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err: AxiosError) => console.log('Error =>', err));
  };

  const renderFooter = () => {
    return (
      <>
        <div
          style={{ display: 'flex', justifyContent: 'end', padding: '20px 0' }}
        >
          <div style={{ margin: '0 5px' }}>
            <Button
              className="p-button-sm  p-button-outlined p-button-primary"
              onClick={() => props.closeModal(false)}
            >
              Cancelar
            </Button>
          </div>
          <div style={{ margin: '0 5px' }}>
            <Button
              className="p-button-sm  p-button-success"
              onClick={changeStateUser}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <ConfirmDialog
      visible={props.open}
      draggable={false}
      onHide={() => props.closeModal(false)}
      message={
        props.info.activo
          ? '¿Está seguro que desea deshabilitar este usuario?'
          : '¿Desea volver a habilitar este usuario?'
      }
      header={props.info.activo ? 'Deshabilitar Usuario' : 'Habilitar Usuario'}
      icon="pi pi-exclamation-triangle"
      acceptLabel="Eliminar"
      footer={renderFooter}
    />
  );
};
