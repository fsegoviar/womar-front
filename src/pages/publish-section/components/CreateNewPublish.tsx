import { useEffect, useRef, useState } from 'react';
import {
  CrearPublicacion,
  ObtenerCategorias,
  ObtenerRegiones
} from '../../../services';
import { Grid, TextField, SelectChangeEvent, Box, Stack } from '@mui/material';
import ImageUploading, {
  ImageListType,
  ImageType
} from 'react-images-uploading';
import { SubmitHandler, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { InputForm } from '../../../styles/InputForm';
import styled from '@emotion/styled';
import { LoadingComponent } from '../../../components';
import axios, { AxiosError } from 'axios';

type CreateNewPublishType = {
  open: boolean;
  close: () => void;
  userId: string;
  publishCreated: (publish: any) => void;
};

type CreatePublishType = {
  title: string;
  price: number | null;
  description: string;
  categoriaId: number | null;
  subCategoriaId: number | null;
  regionId: number | null;
  listImg: Blob | null;
};

const SelectInputForm = styled.select`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 12px 5px;
  margin: 5px 0;
  color: gray;
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

export const CreateNewPublish = (props: CreateNewPublishType) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  //-----
  const [images, setImages] = useState([]);
  const [countImg, setCountImg] = useState(0);
  const { regiones } = ObtenerRegiones();
  const { categories } = ObtenerCategorias();
  const [subCategorias, setSubCategorias] = useState([]);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState(true);
  const [limitImg, setLimitImg] = useState(false);
  const [disabledSection, setDisabledSection] = useState(true);
  const [errorImg, setErrorImg] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreatePublishType>({
    defaultValues: {
      categoriaId: null,
      regionId: null,
      description: '',
      listImg: null,
      price: null,
      title: ''
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';
  }, [props.open]);

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.close();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  const maxNumber = 5;

  const onSubmit: SubmitHandler<CreatePublishType> = async (data) => {
    if (files.length > 0) {
      let formData = new FormData();
      formData.append('ImagenPrincipal', files[0]);
      for (const file of files) {
        formData.append('Imagenes', file);
      }
      if (selectedOffer) {
        formData.append('TipoId', '1');
      } else {
        formData.append('TipoId', '4');
      }
      formData.append('RegionId', String(data.regionId));
      formData.append('SubcategoriaId', String(data.subCategoriaId));
      formData.append('UsuarioId', String(props.userId));
      formData.append('Titulo', data.title);
      formData.append('CategoriaId', String(data.categoriaId));
      formData.append('Descripcion', String(data.description));
      formData.append('Precio', String(data.price));

      // let listBlobs = file.map((f) => new Blob([f!], { type: 'image/png' }));
      setLoading(true);
      const { cargarPublicacion } = CrearPublicacion(formData);
      await cargarPublicacion()
        .then((response: any) => {
          console.log('Respuesta Publicacion =>', response);
          props.publishCreated(response.result.data);
          closeModal();
        })
        .catch((response: any) => {
          console.log('Respuesta ERROR =>', response);
        })
        .finally(() => setLoading(false));
    } else {
      setErrorImg(true);
    }
  };

  const handleChangeCategory = () => {
    console.log(
      'GetValue Category in handleChangeCategory =>',
      getValues('categoriaId')
    );
    axios
      .get(
        `${
          process.env.REACT_APP_URL_BACKEND
        }/Publicaciones/ObtenerSubCategorias/${getValues('categoriaId')}`
      )
      .then((response: any) => {
        console.log('Obtener Subcategorias =>', response);
        setSubCategorias(response.data);
      })
      .catch((error: AxiosError) =>
        console.log('Error en ObtenerSubcategorias =>', error)
      );
    setDisabledSection(false);
  };

  const onChange = (imageList: ImageListType) => {
    // data for submit
    if (imageList.length < 5) {
      setCountImg(imageList.length);
    } else {
      setLimitImg(true);
    }
    setImages(imageList as never[]);

    let blobImg: Blob = new Blob();

    imageList.forEach((image: any) => {
      if (image) {
        let arrFiles = files!;
        arrFiles.push(image.file!);
        setFiles(arrFiles);
      }
    });
    setValue('listImg', blobImg);
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
                Nueva publicación
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
                    className="text-[#000aff] px-10 py-1 text-xl rounded-full"
                    style={{
                      backgroundColor: selectedOffer ? '#00e9ba' : 'transparent'
                    }}
                    onClick={() => setSelectedOffer(true)}
                  >
                    Buscan
                  </button>
                  <button
                    className="text-[#000aff] px-10 py-1 text-xl rounded-full"
                    onClick={() => setSelectedOffer(false)}
                    style={{
                      backgroundColor: !selectedOffer
                        ? '#00e9ba'
                        : 'transparent'
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
                      {limitImg && (
                        <span className="text-red-500 font-thin">
                          Limite de imagenes 5
                        </span>
                      )}
                    </Grid>
                    &nbsp;
                    <Grid item xs={8} className="flex p-5 pl-0">
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
                            onClick={() => onImageRemove(index)}
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
              {errorImg && (
                <span className="text-red-500 text-sm font-thin">
                  Debes subir por lo menos una imagen
                </span>
              )}
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
                        error={!!errors.title}
                        id="title"
                        style={{
                          margin: '10px 0',
                          width: '100%'
                        }}
                        label="Titulo *"
                        {...register('title', { required: true })}
                      />

                      <div className="flex flex-col">
                        <SelectInputForm
                          {...register('categoriaId', {
                            required: true,
                            onChange() {
                              handleChangeCategory();
                            }
                          })}
                        >
                          <option value="" disabled>
                            Seleccione categoría
                          </option>
                          {categories.map((categorie, index) => (
                            <option key={index} value={categorie.id!}>
                              {categorie.nombre}
                            </option>
                          ))}
                        </SelectInputForm>
                        {errors.categoriaId && (
                          <span className="text-red-500 text-sm font-thin">
                            Campo requerido
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <SelectInputForm
                          disabled={disabledSection}
                          {...register('subCategoriaId', {
                            required: true,
                            onChange(event: SelectChangeEvent) {
                              console.log(event.target.value);
                            }
                          })}
                        >
                          <option value="" disabled>
                            Seleccione sección
                          </option>
                          {subCategorias.map(
                            (subCategoria: any, index: any) => (
                              <option key={index} value={subCategoria.id!}>
                                {subCategoria.nombre}
                              </option>
                            )
                          )}
                        </SelectInputForm>
                        {errors.subCategoriaId && (
                          <span className="text-red-500 text-sm font-thin">
                            Campo requerido
                          </span>
                        )}
                      </div>
                      {/* 
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
                        <InputLabel id="label-categoria">Categoría</InputLabel>
                        <SelectForm
                          labelId="label-categoria"
                          style={{ width: '100%' }}
                          label="Categoria"
                          {...register('categoriaId', { required: true })}
                        >
                          {categories.map((categorie, index) => (
                            <MenuItem key={index} value={categorie.id!}>
                              {categorie.nombre}
                            </MenuItem>
                          ))}
                        </SelectForm>
                      </FormControl> */}

                      {/* <FormControl
                        fullWidth
                        sx={{
                          p: 0,
                          m: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mb: 1
                        }}
                        disabled={disabledSection}
                      >
                        <InputLabel>Sección</InputLabel>
                        <SelectForm
                          style={{ width: '100%' }}
                          label="Categoria"
                          {...register('categoriaId', {
                            required: true,
                            onChange: (evnt) => {
                              if (evnt.target.value) {
                                setValue(
                                  'categoriaId',
                                  evnt.target.value as number
                                );
                              }
                            }
                          })}
                        >
                          {categories.map((categorie, index) => (
                            <MenuItem key={index} value={categorie.id}>
                              {categorie.nombre}
                            </MenuItem>
                          ))}
                        </SelectForm>
                      </FormControl> */}
                      <Stack
                        direction="row"
                        sx={{ mb: 1, justifyContent: 'space-around' }}
                        spacing={2}
                      >
                        <div className="flex flex-col">
                          <SelectInputForm
                            style={{ marginTop: '10px', padding: '16px 5px' }}
                            {...register('regionId', {
                              required: true,
                              onChange(event: SelectChangeEvent) {
                                console.log(event.target.value);
                              }
                            })}
                          >
                            <option value="" disabled>
                              Seleccione región
                            </option>
                            {regiones.map((region, index) => (
                              <option key={index} value={region.id!}>
                                {region.nombre}
                              </option>
                            ))}
                          </SelectInputForm>
                        </div>
                        {/* <FormControl
                          sx={{
                            p: 0,
                            m: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '49%'
                          }}
                        >
                          <InputLabel>Región</InputLabel>
                          <SelectForm
                            style={{ width: '100%' }}
                            {...register('comunaId', {
                              required: true,
                              onChange: (evnt) => {
                                if (evnt.target.value) {
                                  setValue(
                                    'comunaId',
                                    evnt.target.value as number
                                  );
                                }
                              }
                            })}
                          >
                            {comunas.map((comuna, index) => (
                              <MenuItem key={index} value={comuna.id}>
                                {comuna.nombre}
                              </MenuItem>
                            ))}
                          </SelectForm>
                        </FormControl> */}
                        <InputForm
                          error={!!errors.price}
                          id="price"
                          style={{
                            margin: '10px 0',
                            width: '49%'
                          }}
                          label="Precio *"
                          {...register('price', { required: true, min: 1 })}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={5}>
                      <TextAreaForm
                        error={!!errors.description}
                        id="description"
                        fullWidth
                        sx={{ my: 1 }}
                        label="Descripción *"
                        multiline
                        rows={7}
                        variant="outlined"
                        {...register('description', { required: true })}
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
                        props.close();
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
                      Crear Publicación
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
