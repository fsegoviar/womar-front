import styled from '@emotion/styled';
import { Box, Grid, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { DetailService } from '../../../interfaces';
import { ObtenerCategorias, ObtenerRegiones } from '../../../services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import ImageUploading, {
  ImageListType,
  ImageType
} from 'react-images-uploading';
import axios, { AxiosError } from 'axios';
import { LoadingComponent } from '../../../components';
import CloseIcon from '@mui/icons-material/Close';
import { InputForm } from '../../../styles/InputForm';
import '../publish-section.styles.css';

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

type TypeForm = {
  idPublicacion: number;
  titulo: string;
  descripcion: string;
  precio: string;
  enable: boolean;
  categoriaId: number | null;
  subCategoriaId: number | null;
  regionId: number | null;
};

type PropsDialog = {
  publish: DetailService;
  open: boolean;
  close: (value: boolean) => void;
};

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('es-ES', {}).format(value);
};

export const EditPublishRes = (props: PropsDialog) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  const { regiones } = ObtenerRegiones();
  const { categories } = ObtenerCategorias();
  const [subCategorias, setSubCategorias] = useState([]);
  const [disabledSection, setDisabledSection] = useState(true);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<TypeForm>({
    defaultValues: {
      // idPublicacion: props.publish.id,
      titulo: props.publish.titulo,
      // comunaId: props.publish.comuna.id,
      descripcion: props.publish.descripcion,
      precio: formatPrice(props.publish.precio)
    }
  });

  const [loading, setLoading] = useState(false);

  const [caruselImg, setCarruselImg] = useState([]);
  const [images, setImages] = useState<ImageListType>([]);
  const [countImg, setCountImg] = useState(0);
  const [imgBorradas, setImgBorradas] = useState<string[]>([]);
  const [imgAgregadas, setImgAgregadas] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState(true);
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
    if (imgAgregadas.length === 0 && imgBorradas.length === 0) {
      formData.append('NuevaImagenPrincipal', props.publish.imagenes[0]);
      for (const img of props.publish.imagenes) {
        formData.append('NuevasFotos', img);
      }
      formData.append('FotosRemovidas', '');
    } else {
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
    }
    formData.append('Titulo', data.titulo);
    formData.append('Descripcion', data.descripcion);
    formData.append('Precio', String(data.precio).replaceAll('.', ''));
    formData.append('Activo', String('true'));
    formData.append('CategoriaId', String(data.categoriaId));
    formData.append('SubCategoriaId', String(data.subCategoriaId));
    formData.append('RegionId', String(data.regionId));

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
      .then((response: any) => props.close(false))
      .catch((error: any) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

  const onRemoveImageURL = (index: number) => {
    let newListImgBorradas = imgBorradas;
    newListImgBorradas.push(String(images[index].dataURL));
    setImgBorradas(newListImgBorradas);
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
            <div>
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
                  <div className="upload__image-wrapper w-full flex flex-col">
                    <Grid item xs={12} className="flex">
                      <Box className=" flex flex-col items-center justify-center mr-1">
                        <p className="text-md md:text-4xl md:py-5 text-[#000aff]">
                          Editar publicación
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
              <Grid item xs={12}>
                <form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid container>
                    <Grid item xs={12} className="pr-4">
                      <InputForm
                        size="small"
                        error={!!errors.titulo}
                        id="title"
                        style={{
                          margin: '10px 0',
                          width: '100%'
                        }}
                        label="Titulo *"
                        {...register('titulo', { required: true })}
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
                      <Stack
                        direction="row"
                        sx={{ mb: 1, justifyContent: 'space-around' }}
                        spacing={2}
                      >
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
                          error={!!errors.precio}
                          id="price"
                          size="small"
                          style={{
                            width: '49%'
                          }}
                          label="Precio *"
                          {...register('precio', { required: true })}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={11}>
                      <TextAreaForm
                        error={!!errors.descripcion}
                        id="description"
                        fullWidth
                        sx={{ my: 1 }}
                        label="Descripción *"
                        multiline
                        rows={1}
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
                      className="text-white text-sm rounded-full px-5 cursor-pointer bg-[#D5278F]"
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
                      className="text-white rounded-full px-10 py-1 text-sm cursor-pointer"
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
