import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/system';
import { PageBase } from '../../components/PageBase';
import { useEffect, useState } from 'react';
import { DetailService } from '../../interfaces';
import { DisabledPublish } from './components/DisabledPublish';
import { PublishComponent } from './components/PublishComponent';
import { useParams } from 'react-router-dom';
import { SkeletonLoader } from './components/SkeletonLoader';
import { CreateNewPublish } from './components/CreateNewPublish';
import './publish-section.styles.css';
import { EditPublish } from './components/EditPublish';
import { CreateNewPublishRes } from './components/CreateNewPublishRes';
import { ObtenerPublicacionDeUsuario } from '../../services';
import { EditPublishRes } from './components/EditPublishRes';
import axios from 'axios';

export const PublishPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { userId } = useParams();
  const { publishUser, loading } = ObtenerPublicacionDeUsuario();
  const [publishSelected, setPublishSelected] = useState<DetailService>();
  const [listPublish, setListPublish] = useState<DetailService[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idPublishSelected, setIdPublishSelected] = useState('');
  const [isActivePublish, setIsActivePublish] = useState(false);

  useEffect(() => {
    if (publishUser) setListPublish(publishUser);

    console.log('List Publish =>', listPublish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishUser]);

  const closeModal = () => setOpenModal(false);

  const editPublish = (publish: DetailService) => {
    setPublishSelected(publish);
    setOpenModalEdit(true);
  };
  const handleDisabledPublish = (isEnabled: boolean) => {
    let findPublish = listPublish.find(
      (publish) => publish.id === idPublishSelected
    );
    let newListPublish = listPublish.filter(
      (publish) => publish.id !== idPublishSelected
    );

    if (findPublish) {
      findPublish.activa = !isEnabled;
      newListPublish.push(findPublish);
      setListPublish(newListPublish);
    }

    axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ActualizarEstado`,
        { idPubicacion: idPublishSelected }
      )
      .finally(() => setOpenModalDelete(false));
  };

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '90vh',
          height: 'auto',
          position: 'relative',
          mt: 15
        }}
      >
        <Grid
          container
          sx={{
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={11}>
            <Box
              sx={{
                width: '100%',
                height: '170px',
                display: 'flex',
                borderRadius: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': { m: 1 }
              }}
            >
              <p className="text-sm sm:text-2xl pb-3 md:text-[24px] text-[#545454]">
                Nueva publicación
              </p>
              <button
                className="text-white rounded-full text-sm px-10 sm:py-5 sm:px-20 sm:text-xl"
                style={{
                  marginTop: '10px',
                  background:
                    'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                }}
                onClick={() => setOpenModal(true)}
              >
                Crear publicación
              </button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <hr style={{ border: '1px solid #c1c1c1' }} />
          </Grid>
          <Grid item xs={12} sm={11} sx={{ mt: 5 }}>
            <Grid container>
              {loading && <SkeletonLoader />}
              {listPublish.length > 0 &&
                !loading &&
                listPublish.map((publish, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={index}
                    className="sm:px-3 py-2"
                  >
                    <PublishComponent
                      key={publish.id}
                      publish={publish}
                      editPublish={editPublish}
                      isActivePublish={setIsActivePublish}
                      openModal={setOpenModal}
                      openModalDelete={setOpenModalDelete}
                      idPublishSelected={setIdPublishSelected}
                    />
                  </Grid>
                ))}
              {listPublish.length === 0 && !loading && (
                <h1>No existen publicaciones para esta sección</h1>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className="hidden sm:block">
        <CreateNewPublish
          open={openModal}
          userId={userId!}
          close={closeModal}
        />
      </div>
      <div className="block sm:hidden">
        <CreateNewPublishRes
          open={openModal}
          userId={userId!}
          close={closeModal}
        />
      </div>
      {openModalEdit && (
        <>
          <div className="hidden sm:block">
            <EditPublish
              open={openModalEdit}
              close={setOpenModalEdit}
              publish={publishSelected!}
            />
          </div>
          <div className="block sm:hidden">
            <EditPublishRes
              open={openModalEdit}
              close={setOpenModalEdit}
              publish={publishSelected!}
            />
          </div>
        </>
      )}
      {openModalDelete && (
        <DisabledPublish
          open={openModalDelete}
          handleClose={() => setOpenModalDelete(false)}
          isActive={isActivePublish}
          handleDisabled={handleDisabledPublish}
        />
      )}
    </PageBase>
  );
};
