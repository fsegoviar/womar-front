import styled from '@emotion/styled';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { DetailService } from '../../../interfaces';
import { ObtenerCategorias, ObtenerComunas } from '../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import ImageUploading, {
  ImageListType,
  ImageType
} from 'react-images-uploading';
import axios from 'axios';
import { LoadingComponent } from '../../../components';
import CloseIcon from '@mui/icons-material/Close';
import { InputForm } from '../../../styles/InputForm';

const SelectForm = styled(Select)`
  border-color: #c2c2c2;
  border-radius: 10px;
  & .MuiOutlinedInput-input {
    border-color: white;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #c2c2c2;
  }

  &.Mui-focused fieldset {
    border-color: #c2c2c2;
  }
`;

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

type TypeForm = {
  idPublicacion: number;
  titulo: string;
  descripcion: string;
  precio: number;
  enable: boolean;
};

type PropsDialog = {
  publish: DetailService;
  open: boolean;
  close: (value: boolean) => void;
};

export const EditPublish = (props: PropsDialog) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  const { comunas } = ObtenerComunas();
  const { categories } = ObtenerCategorias();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeForm>({
    defaultValues: {
      // idPublicacion: props.publish.id,
      titulo: props.publish.titulo,
      // comunaId: props.publish.comuna.id,
      descripcion: props.publish.descripcion,
      precio: props.publish.precio
    }
  });

  const [loading, setLoading] = useState(false);

  const [caruselImg, setCarruselImg] = useState([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [countImg, setCountImg] = useState(0);
  const [imgBorradas, setImgBorradas] = useState<string[]>([]);
  const [imgAgregadas, setImgAgregadas] = useState<any[]>([]);
  const maxNumber = 5;

  useEffect(() => {
    console.log('Publish Edit => ', props.publish);
    generateImgCarusel();
    generateImgUploaded();
    if (props.open) modalRef.current.style.display = 'flex';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.close(false);
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  const generateImgCarusel = () => {
    props.publish.imagenes.forEach((imgCarrusel: any) => {
      let newCarrusel: any[] = caruselImg;
      newCarrusel.push({
        original: imgCarrusel,
        thumbnail: imgCarrusel,
        originalWidth: '100px'
      });
      setCarruselImg(newCarrusel as never[]);
    });
  };

  const generateImgUploaded = () => {
    setCountImg(props.publish.imagenes.length);
    props.publish.imagenes.forEach((url: any) => {
      let newListImg: ImageListType = images;
      newListImg.push({
        dataURL: url
      });
      setImages(newListImg as never[]);
    });
  };

  const onSubmit: SubmitHandler<TypeForm> = (data) => {
    console.log('Imagenes borradas', imgBorradas);
    console.log('Imagenes agregadas', imgAgregadas);
    console.log('Data', data);

    let formData = new FormData();
    formData.append('PublicacionId', props.publish.id);
    formData.append('NuevaImagenPrincipal', imgAgregadas[0]);
    for (const img of imgAgregadas) {
      formData.append('NuevasFotos', img);
    }
    if (imgBorradas.length !== 0) {
      for (const img of imgBorradas) {
        formData.append('FotosRemovidas', img);
      }
    } else {
      formData.append('FotosRemovidas', '');
    }
    formData.append('Titulo', data.titulo);
    formData.append('Descripcion', data.descripcion);
    formData.append('Precio', String(data.precio));
    formData.append('Activo', String('true'));

    setLoading(true);

    axios
      .put(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/Editar`,
        formData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then((response: any) => props.close)
      .catch((error: any) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

  const onRemoveImageURL = (index: number) => {
    let newListImgBorradas = imgBorradas;
    newListImgBorradas.push(String(images[index].dataURL));
    setImgBorradas(newListImgBorradas);
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    if (imageList.length <= 5) setCountImg(imageList.length);

    setImages(imageList as never[]);

    const imgUrls: any[] = [];
    const newFiles: any[] = imgAgregadas;

    imageList.forEach((image: any) => {
      if (image.file) {
        console.log('Hola', image.file);
        newFiles.push(image.file);
      }
    });

    imageList.forEach((image: any) => {
      imgUrls.push({
        original: URL.createObjectURL(image.dataURL),
        thumbnail: URL.createObjectURL(image.dataURL),
        originalWidth: '100px'
      });
    });

    setCarruselImg(imgUrls as never[]);
    setImgAgregadas(newFiles as never[]);
  };

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container"
        id="window-container"
        style={{ minHeight: '70vh' }}
        ref={containerRef}
      >
        {loading ? (
          <div style={{ height: '50vh' }}>
            <LoadingComponent />
          </div>
        ) : (
          <>
            <Box className="flex items-center justify-between">
              <h1 className="text-4xl py-5 text-[#000aff]">
                Editar publicación
              </h1>
              <Box>
                <p className="text-md font-thin text-[#949494]">
                  Tipo de publicación
                </p>
                <Box
                  className="rounded-full "
                  style={{ border: '1px solid #000aff' }}
                >
                  <button className="text-[#000aff] px-10 py-1 text-xl bg-[#00e9ba] rounded-full">
                    Buscan
                  </button>
                  <button className="text-[#000aff] px-10 py-1 text-xl rounded-full">
                    Ofrecen
                  </button>
                </Box>
              </Box>
            </Box>
            <Grid container>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps
                }: any) => (
                  // write your building UI
                  <div className="upload__image-wrapper w-full flex">
                    <Grid item xs={4}>
                      <button
                        style={{
                          backgroundColor: isDragging ? '#0BAEDC' : 'white',
                          border: '2px solid #c2c2c2',
                          borderRadius: '20px',
                          width: '100%',
                          height: '200px',
                          textAlign: 'center',
                          fontSize: '16px',
                          color: isDragging ? 'white' : 'black',
                          opacity: '0.7',
                          marginTop: '15px',
                          padding: '10px'
                        }}
                        className="font-thin"
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Arrastra o sube tu imagen {countImg}/5
                      </button>
                    </Grid>
                    &nbsp;
                    <Grid xs={8} className="flex p-5 pl-0">
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
                          <button
                            onClick={() => {
                              onImageRemove(index);
                              onRemoveImageURL(index);
                            }}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              position: 'absolute',
                              top: '-10px',
                              right: '-15px',
                              cursor: 'pointer'
                            }}
                          >
                            <CloseIcon
                              style={{
                                color: '#FFFFFF',
                                backgroundColor: '#c2c2c2',
                                borderRadius: 50
                              }}
                            />
                          </button>
                        </div>
                      ))}
                    </Grid>
                  </div>
                )}
              </ImageUploading>
              <Grid item xs={12} className="pt-10">
                <p className=" text-md font-thin text-[#949494]">
                  Datos de la publicacion
                </p>
                <form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid container>
                    <Grid item xs={7} className="pr-4">
                      <InputForm
                        error={!!errors.titulo}
                        id="title"
                        style={{
                          margin: '10px 0',
                          width: '100%'
                        }}
                        label="Titulo *"
                        {...register('titulo', { required: true })}
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
                        <InputLabel>Categoria</InputLabel>
                        <SelectForm style={{ width: '100%' }} label="Categoria">
                          {categories.map((categorie, index) => (
                            <MenuItem key={index} value={categorie.id}>
                              {categorie.nombre}
                            </MenuItem>
                          ))}
                        </SelectForm>
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
                          <InputLabel>Comuna</InputLabel>
                          <SelectForm
                            style={{ width: '100%' }}
                            label="Comuna"
                            required
                          >
                            {comunas.map((comuna, index) => (
                              <MenuItem key={index} value={comuna.id}>
                                {comuna.nombre}
                              </MenuItem>
                            ))}
                          </SelectForm>
                        </FormControl>
                        <InputForm
                          error={!!errors.precio}
                          id="price"
                          style={{
                            margin: '10px 0',
                            width: '49%'
                          }}
                          label="Precio *"
                          {...register('precio', { required: true })}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={5}>
                      <TextAreaForm
                        error={!!errors.descripcion}
                        id="description"
                        fullWidth
                        sx={{ my: 1 }}
                        label="Descripción *"
                        multiline
                        rows={7}
                        variant="outlined"
                        {...register('descripcion', { required: true })}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    className="flex justify-center"
                    sx={{ '& > :not(style)': { m: 1 } }}
                  >
                    <button
                      className="text-white rounded-full py-2 px-10 cursor-pointer bg-[#D5278F]"
                      onClick={() => {
                        closeModal();
                        setImages([]);
                        setCountImg(0);
                        props.close(false);
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      className="text-white rounded-full py-2 px-10 cursor-pointer"
                      type="submit"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                      }}
                    >
                      Editar
                    </button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </div>
  );
};
