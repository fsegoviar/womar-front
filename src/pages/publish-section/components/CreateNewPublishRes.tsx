import React, { useEffect, useRef, useState } from 'react';
import {
  CrearPublicacion,
  ObtenerCategorias,
  ObtenerComunas
} from '../../../services';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
  TextField
} from '@mui/material';
import ImageUploading, {
  ImageListType,
  ImageType
} from 'react-images-uploading';
import { SubmitHandler, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { InputForm } from '../../../styles/InputForm';
import styled from '@emotion/styled';
import { LoadingComponent } from '../../../components';

type CreateNewPublishType = {
  open: boolean;
  close: () => void;
  userId: string;
};

type CreatePublishType = {
  title: string;
  address: string;
  price: number;
  description: string;
  categoriaId: number;
  comunaId: number;
  listImg: Blob;
};

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
export const CreateNewPublishRes = (props: CreateNewPublishType) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  //-----
  const [images, setImages] = useState([]);
  const [countImg, setCountImg] = useState(0);
  const { comunas } = ObtenerComunas();
  const { categories } = ObtenerCategorias();
  const [files, setFiles] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
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
    let formData = new FormData();
    formData.append('ImagenPrincipal', files[0]);
    for (const file of files) {
      formData.append('Imagenes', file);
    }
    // selectedOffer
    //   ? formData.append('TipoId', '1')
    //   : formData.append('TipoId', '2');
    if (selectedOffer) {
      console.log('Se guarda con Id 1');
      formData.append('TipoId', '1');
    } else {
      console.log('Se guarda con Id 4');
      formData.append('TipoId', '4');
    }
    formData.append('Titulo', data.title);
    formData.append('ComunaId', String(data.comunaId));
    // formData.append('CategoriaId', String(data.categoriaId));
    formData.append('CategoriaId', String(1));
    formData.append('Precio', String(data.price));
    formData.append('Descripcion', String(data.description));
    formData.append('UsuarioId', String(props.userId));

    // let listBlobs = file.map((f) => new Blob([f!], { type: 'image/png' }));
    setLoading(true);
    const { cargarPublicacion } = CrearPublicacion(formData);
    await cargarPublicacion()
      .then((response: any) => {
        console.log('Respuesta Publicacion =>', response);
        closeModal();
      })
      .catch((response: any) => {
        console.log('Respuesta ERROR =>', response);
      })
      .finally(() => setLoading(false));
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
                    <Grid xs={12} className="flex pl-0">
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
                      <FormControl
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
                                  'comunaId',
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
                        </FormControl>
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
