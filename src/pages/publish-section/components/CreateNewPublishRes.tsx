import React, { useEffect, useRef, useState } from 'react';
import {
  CrearPublicacion,
  ObtenerCategorias,
  ObtenerRegiones
} from '../../../services';
import { Grid, Stack, Box, TextField, SelectChangeEvent } from '@mui/material';
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
  listImg: Blob;
};

const SelectInputForm = styled.select`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 5px 5px;
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
export const CreateNewPublishRes = (props: CreateNewPublishType) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  //-----
  const [images, setImages] = useState([]);
  const [countImg, setCountImg] = useState(0);
  const { regiones } = ObtenerRegiones();
  const { categories } = ObtenerCategorias();
  const [files, setFiles] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState(true);
  const [errorImg, setErrorImg] = useState(false);
  const [disabledSection, setDisabledSection] = useState(true);
  const [subCategorias, setSubCategorias] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<CreatePublishType>();
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

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    if (imageList.length <= 5) setCountImg(imageList.length);

    setImages(imageList as never[]);

    let blobImg: Blob = new Blob();

    imageList.forEach((image: any) => {
      if (image) {
        // lfistBlobImg.push(new Blob([image.file!], { type: "image/png" }));
        console.log(`File => `, image.file!);
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
        className="window-container-responsive mt-20"
        id="window-container-responsive"
        style={{ height: '80vh' }}
        ref={containerRef}
      >
        {loading ? (
          <div style={{ height: '50vh' }}>
            <LoadingComponent />
          </div>
        ) : (
          <>
            <div className="flex">
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
                  <div className="upload__image-wrapper w-full flex flex-col">
                    <Grid item xs={12} className="flex">
                      <Box className=" flex flex-col items-center justify-center mr-1">
                        <p className="text-md md:text-4xl md:py-5 text-[#000aff]">
                          Nueva publicación
                        </p>
                        <Box>
                          <p className="text-md font-thin text-[#949494]">
                            Tipo de publicación
                          </p>
                          <Box
                            className="rounded-full "
                            style={{ border: '1px solid #000aff' }}
                          >
                            <button
                              className="text-[#000aff] px-5 py-1 text-sm rounded-full"
                              style={{
                                backgroundColor: selectedOffer
                                  ? '#00e9ba'
                                  : 'transparent'
                              }}
                              onClick={() => setSelectedOffer(true)}
                            >
                              Buscan
                            </button>
                            <button
                              className="text-[#000aff] px-5 py-1 text-sm rounded-full"
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
                      <button
                        style={{
                          backgroundColor: isDragging ? '#0BAEDC' : 'white',
                          border: '2px solid #c2c2c2',
                          borderRadius: '20px',
                          width: '100px',
                          height: '100px',
                          textAlign: 'center',
                          fontSize: '12px',
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
                    <Grid item xs={12} className="flex pl-0">
                      {imageList.map((image: ImageType, index: number) => (
                        <div
                          key={index}
                          className="image-item"
                          style={{
                            position: 'relative',
                            width: '50px',
                            height: '50px',
                            border: '1px solid #c2c2c2',
                            borderRadius: '10px',
                            marginLeft: '15px'
                          }}
                        >
                          <img
                            src={image.dataURL}
                            alt=""
                            width="100%"
                            height={'100%'}
                            className="-mt-4"
                            style={{
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat'
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
            </div>
            <Grid container>
              <Grid item xs={12} className="">
                <p className=" text-md font-thin text-[#949494]">
                  Datos de la publicacion
                </p>
                <form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid container>
                    <Grid item xs={12} className="pr-4">
                      <InputForm
                        size="small"
                        error={!!errors.title}
                        id="title"
                        style={{
                          margin: '10px 0',
                          width: '100%'
                        }}
                        label="Titulo *"
                        {...register('title', { required: true })}
                      />
                      {/* <FormControl
                        fullWidth
                        size="small"
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
                        <SelectForm
                          style={{ width: '100%' }}
                          label="Categoria"
                          required
                          onChange={(evnt) => {
                            if (evnt.target.value) {
                              setValue(
                                'categoriaId',
                                evnt.target.value as number
                              );
                            }
                          }}
                        >
                          {categories.map((categorie, index) => (
                            <MenuItem key={index} value={categorie.id!}>
                              {categorie.nombre}
                            </MenuItem>
                          ))}
                        </SelectForm>
                      </FormControl> */}
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
                      <Stack
                        direction="row"
                        sx={{ mb: 1, justifyContent: 'space-around' }}
                        spacing={2}
                      >
                        {/* <FormControl
                          size="small"
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
                            label="Comuna"
                            required
                            onChange={(evnt) => {
                              if (evnt.target.value) {
                                setValue(
                                  'regionId',
                                  evnt.target.value as number
                                );
                              }
                            }}
                          >
                            {comunas.map((comuna, index) => (
                              <MenuItem key={index} value={comuna.id}>
                                {comuna.nombre}
                              </MenuItem>
                            ))}
                          </SelectForm>
                        </FormControl> */}
                        <div className="flex flex-col">
                          <SelectInputForm
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
                        <InputForm
                          error={!!errors.price}
                          id="price"
                          size="small"
                          style={{
                            width: '49%'
                          }}
                          label="Precio *"
                          {...register('price', { required: true })}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={11}>
                      <TextAreaForm
                        error={!!errors.description}
                        id="description"
                        fullWidth
                        sx={{ mt: 1 }}
                        label="Descripción *"
                        multiline
                        rows={3}
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
                      className="text-white text-sm rounded-full px-5 cursor-pointer bg-[#D5278F]"
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
                      className="text-white rounded-full px-10 py-1 text-sm cursor-pointer"
                      type="submit"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                      }}
                    >
                      Crear
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
