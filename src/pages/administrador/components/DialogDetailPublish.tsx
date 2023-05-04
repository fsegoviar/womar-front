import React, { useEffect, useRef, useState } from 'react';
import { DetailService } from '../../../interfaces';
import '../styles-admin.css';
import ImageUploading, {
  ImageListType,
  ImageType
} from 'react-images-uploading';
import { Box, FormControl, Grid, Stack, TextField } from '@mui/material';
import { InputForm } from '../../../styles/InputForm';
import styled from '@emotion/styled';
import axios, { AxiosError } from 'axios';
import { LoadingComponent } from '../../../components';

const TextAreaForm = styled(TextField)`
  background: white;

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #c2c2c2;
      border-radius: 10px;
    }

    &:hover fieldset {
      border-color: #c2c2c2;
    }

    &.Mui-focused fieldset {
      border-color: #c2c2c2;
    }
  }
`;

type PropsDetailPublish = {
  publish: DetailService;
  open: boolean;
  closeModal: () => void;
  removePublish: () => void;
};
export const DialogDetailPublish = (props: PropsDetailPublish) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [images] = useState<ImageListType>(() => {
    let newListImg: ImageListType = [];
    props.publish.imagenes.forEach((url: any) => {
      newListImg.push({
        dataURL: url
      });
    });

    return newListImg;
  });

  useEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.closeModal();
    }, 1000);
  };

  const removePublish = () => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.closeModal();
      props.removePublish();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  const handleAccept = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/Aprobar`,
        {
          id: props.publish.id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then(() => removePublish())
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

  const handleReject = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/Rechazar`,
        {
          id: props.publish.id,
          motivos: mensaje
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then(() => removePublish())
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

	const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-ES', {}).format(value);
  };

  return (
    <div
      className="window-background-modal-admin"
      id="window-background-modal-admin"
      ref={modalRef}
    >
      <div
        className="window-container-modal-admin "
        id="window-container-modal-admin "
        ref={containerRef}
      >
        {loading ? (
          <div style={{ height: '75vh' }}>
            <LoadingComponent />
          </div>
        ) : (
          <>
            <Box className="flex items-center justify-between">
              <h1 className="text-4xl py-5 text-[#000aff]">
                Detalle publicación
              </h1>
              <Box>
                <p className="text-md font-thin text-[#949494]">
                  Tipo de publicación
                </p>
                <Box
                  className="rounded-full "
                  style={{ border: '1px solid #000aff' }}
                >
                  <button
                    className="text-[#000aff] px-10 py-1 text-xl  rounded-full"
                    style={{
                      backgroundColor:
                        props.publish.tipo === 'Buscar' ? '#00e9ba' : ''
                    }}
                  >
                    Buscan
                  </button>
                  <button
                    className="text-[#000aff] px-10 py-1 text-xl rounded-full"
                    style={{
                      backgroundColor:
                        props.publish.tipo === 'Ofrezco' ? '#00e9ba' : ''
                    }}
                  >
                    Ofrecen
                  </button>
                </Box>
              </Box>
            </Box>
            <Grid container>
              <ImageUploading
                multiple
                value={images}
                onChange={() => {}}
                maxNumber={5}
              >
                {({ imageList }: any) => (
                  // write your building UI
                  <div className="upload__image-wrapper w-full flex">
                    {imageList.map((image: ImageType, index: number) => (
                      <div
                        key={index}
                        className="image-item"
                        style={{
                          position: 'relative',
                          width: '100px',
                          height: '90px',
                          border: '1px solid #c2c2c2',
                          borderRadius: '10px',
                          marginLeft: '15px'
                        }}
                      >
                        <img
                          src={image.dataURL}
                          alt=""
                          width="100px"
                          height={'100%'}
                          style={{
                            paddingTop: '10px',
                            backgroundSize: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
              <Grid item xs={12} className="pt-10">
                <p className=" text-md font-thin text-[#949494]">
                  Datos de la publicacion
                </p>
                <div>
                  <Grid container>
                    <Grid item xs={7} className="pr-4">
                      <InputForm
                        size="small"
                        id="title"
                        style={{
                          margin: '10px 0',
                          width: '100%'
                        }}
                        value={props.publish.titulo}
                        disabled
                      />
                      <FormControl
                        fullWidth
                        sx={{
                          p: 0,
                          m: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mb: 1
                        }}
                      >
                        <InputForm
                          id="category"
                          style={{
                            margin: '10px 0',
                            width: '100%'
                          }}
                          size="small"
                          value={props.publish.categoria}
                          disabled
                        />
                      </FormControl>
                      <Stack
                        direction="row"
                        sx={{ mb: 1, justifyContent: 'space-around' }}
                        spacing={2}
                      >
                        <FormControl
                          sx={{
                            p: 0,
                            m: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '49%'
                          }}
                        >
                          <InputForm
                            id="Comuna"
                            style={{
                              margin: '5px 0',
                              width: '100%'
                            }}
                            size="small"
                            disabled
                            value={props.publish.direccion}
                          />
                        </FormControl>
                        <InputForm
                          id="price"
                          style={{
                            margin: '5px 0',
                            width: '49%'
                          }}
                          size="small"
                          disabled
                          value={formatPrice(props.publish.precio)}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={5}>
                      <TextAreaForm
                        id="description"
                        fullWidth
                        sx={{ my: 1 }}
                        multiline
                        disabled
                        rows={4}
                        value={props.publish.descripcion}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <hr className="py-2" />
                  <Grid item xs={12}>
                    <div className="flex justify-between">
                      <InputForm
                        id="price"
                        style={{
                          margin: '5px 0',
                          width: '49%'
                        }}
                        size="small"
                        disabled
                        value={props.publish.usuarioPublicante}
                      />
                      <InputForm
                        id="price"
                        style={{
                          margin: '5px 0',
                          width: '49%'
                        }}
                        size="small"
                        disabled
                        value={props.publish.fechaCreacion}
                      />
                    </div>
                    <TextAreaForm
                      id="description"
                      fullWidth
                      sx={{ my: 1 }}
                      label="Observaciones"
                      onChange={(e) => setMensaje(e.target.value)}
                      multiline
                      rows={2}
                      variant="outlined"
                    />
                  </Grid>

                  <Box
                    className="flex justify-center"
                    sx={{ '& > :not(style)': { m: 1 } }}
                  >
                    <button
                      className="text-white rounded-full py-2 px-10 cursor-pointer bg-[#D5278F]"
                      onClick={handleReject}
                    >
                      Rechazar
                    </button>
                    <button
                      className="text-white rounded-full py-2 px-10 cursor-pointer"
                      onClick={handleAccept}
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                      }}
                    >
                      Aprobar
                    </button>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </div>
  );
};
