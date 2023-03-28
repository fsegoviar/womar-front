import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { InputForm } from '../../../styles/InputForm';
import { RegisterUser, TypeUser } from '../../../interfaces';
import { ObtenerComunas, Registrar } from '../../../services';
import ChileanRutify from 'chilean-rutify';

const SelectForm = styled(Select)`
  border-color: #000aff;
  border-radius: 10px;
  & .MuiOutlinedInput-input {
    border-color: #000aff;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: gray;
  }

  &.Mui-focused fieldset {
    border-color: #000aff;
  }
`;

interface PropsRegister {
  open: boolean;
  handleClose: () => void;
  setOpenRegisterLocal: (value: boolean) => void;
  tipo: TypeUser;
}

export const DialogRegister = (props: PropsRegister) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RegisterUser>({
    defaultValues: {
      Nombre: '',
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      Rut: '',
      ComunaId: null,
      Telefono: null,
      Email: '',
      Password: '',
      Role: '',
      Origen: 0,
      ImagenPerfil: new FormData()
    }
  });
  const { comunas } = ObtenerComunas();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [inputRut, setInputRut] = useState('');

  useEffect(() => {
    setValue('Role', 'Cliente');
    setValue('Origen', props.tipo);
    if (props.open) modalRef.current.style.display = 'flex';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = (): void => {
    containerRef.current.classList.add('close-register');
    setTimeout(() => {
      containerRef.current.classList.remove('close-register');
      modalRef.current.style.display = 'none';
      props.handleClose();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  const handleClose = () => {
    // setOpen(false);
    props.handleClose();
  };

  const onSubmitRegisterLocal = (data: RegisterUser) => {
    // console.log('DATA SEND => ', data);
    let formData = new FormData();
    formData.append('Nombre', data.Nombre);
    formData.append('ApellidoPaterno', data.ApellidoPaterno);
    data.ApellidoMaterno
      ? formData.append('ApellidoMaterno', String(data.ApellidoMaterno))
      : formData.append('ApellidoMaterno', '-');
    formData.append('RegionId', String(data.ComunaId));
    formData.append('Rut', data.Rut);
    data.Telefono
      ? formData.append('Telefono', String(data.Telefono))
      : formData.append('Telefono', '');
    formData.append('Email', data.Email);
    formData.append('Password', data.Password);
    formData.append('Role', data.Role);
    formData.append('Origen', String(data.Origen));

    const { registrar } = Registrar(formData);
    registrar()
      .then(() => props.setOpenRegisterLocal(false))
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Contendor Dialog */}
      <div
        className="window-background-register justify-center sm:justify-end"
        id="window-background-register"
        ref={modalRef}
      >
        <div
          className="window-container-register mt-52 sm:mr-20"
          id="window-container-register"
          ref={containerRef}
        >
          <div
            className="w-12/12 sm:w-3/12 md:w-3/12  lg:w-3/12 sm:float-right h-6/6 bg-white flex pt-5 "
            style={{ borderRadius: '70px', border: '3px solid #000aff' }}
          >
            <div className="w-full">
              <h1
                style={{ textAlign: 'center' }}
                className="font text-xl mt-5 font-bold text-gray-500"
              >
                Registrar usuario{' '}
              </h1>
              <Box
                component={'form'}
                onSubmit={handleSubmit(onSubmitRegisterLocal)}
              >
                <Container>
                  <InputForm
                    size="small"
                    className="font"
                    error={!!errors.Nombre}
                    id="name"
                    style={{ marginTop: '10px', width: '100%' }}
                    label="Nombres *"
                    {...register('Nombre', {
                      required: true,
                      minLength: 2
                    })}
                  />
                  {errors.Nombre?.type === 'required' && (
                    <span className="text-red-500 text-sm font-light">
                      Nombre requerido
                    </span>
                  )}
                  <div className="columns-2">
                    <div className="flex flex-col">
                      <InputForm
                        size="small"
                        error={!!errors.ApellidoPaterno}
                        className="w-full"
                        style={{
                          margin: errors.ApellidoPaterno
                            ? '10px 0 0 0'
                            : '10px 0'
                        }}
                        id="surname1"
                        label="Apellido Paterno *"
                        {...register('ApellidoPaterno', {
                          required: true,
                          minLength: 2
                        })}
                      />
                      {errors.ApellidoPaterno?.type === 'required' && (
                        <span className="text-red-500 text-sm font-light">
                          Apellido Paterno requerido
                        </span>
                      )}

                      {errors.ApellidoPaterno?.type === 'minLength' && (
                        <span className="text-red-500 text-sm font-light">
                          Debe contener más de 2 caracteres
                        </span>
                      )}
                    </div>

                    <InputForm
                      size="small"
                      error={!!errors.ApellidoMaterno}
                      style={{ margin: '10px 0', width: '100%' }}
                      label="Apellido Materno"
                      {...register('ApellidoMaterno', {
                        required: false,
                        minLength: 3
                      })}
                    />
                    {errors.ApellidoMaterno?.type === 'minLength' && (
                      <span className="text-red-500 text-sm font-light">
                        Debe contener más de 2 caracteres
                      </span>
                    )}
                  </div>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <InputLabel>Región</InputLabel>
                    <SelectForm
                      style={{ width: '100%' }}
                      {...register('ComunaId', {
                        required: true,
                        onChange: (evnt) => {
                          setValue('ComunaId', Number(evnt.target.value));
                        }
                      })}
                    >
                      {comunas.map((comuna, index) => (
                        <MenuItem key={index} value={comuna.id}>
                          {comuna.nombre}
                        </MenuItem>
                      ))}
                    </SelectForm>
                    {errors.ComunaId && (
                      <span className="text-red-500 text-sm font-light">
                        Selecciona una Región
                      </span>
                    )}
                  </FormControl>
                  <div className="columns-2">
                    <div className="flex flex-col">
                      <InputForm
                        id="rut"
                        size="small"
                        error={!!errors.Email}
                        value={inputRut}
                        style={{ margin: errors.Rut ? '10px 0 0 0' : '10px 0' }}
                        label="Rut"
                        {...register('Rut', {
                          required: true,
                          onChange: (e) => {
                            console.log('e', e.target.value);
                            if (e.target.value !== '-') {
                              setInputRut(
                                String(ChileanRutify.formatRut(e.target.value))
                              );
                              setValue(
                                'Rut',
                                String(ChileanRutify.formatRut(e.target.value))
                              );
                            } else {
                              setInputRut('');
                            }
                          },
                          validate: (v) => {
                            console.log(ChileanRutify.validRut(v));
                            return ChileanRutify.validRut(v);
                          }
                        })}
                      />
                      {errors.Rut?.type === 'required' && (
                        <span className="text-red-500 text-sm font-light">
                          Rut requerido
                        </span>
                      )}
                      {errors.Rut?.type === 'validate' && (
                        <span className="text-red-500 text-sm font-light">
                          Rut invalido
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <InputForm
                        size="small"
                        error={!!errors.Telefono}
                        type={'number'}
                        style={{
                          margin: errors.Telefono ? '10px 0 0 0' : '10px 0'
                        }}
                        label="Teléfono"
                        {...register('Telefono', {
                          required: true,
                          minLength: 5
                        })}
                      />
                      {errors.Telefono?.type === 'required' && (
                        <span className="text-red-500 text-sm font-light">
                          Telefono requerido
                        </span>
                      )}
                      {errors.Telefono?.type === 'minLength' && (
                        <span className="text-red-500 text-sm font-light">
                          Debe tener más de 5 dígitos
                        </span>
                      )}
                    </div>
                  </div>
                  <InputForm
                    error={!!errors.Email}
                    type={'email'}
                    size="small"
                    style={{
                      marginBottom: errors.Email ? '' : '10px',
                      width: '100%'
                    }}
                    label="Correo electrónico *"
                    {...register('Email', {
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                    })}
                  />
                  {errors.Email?.type === 'required' && (
                    <span className="text-red-500 text-sm font-light">
                      Correo electrónico requerido
                    </span>
                  )}
                  {errors.Email?.type === 'pattern' && (
                    <span className="text-red-500 text-sm font-light">
                      Formato de correo no valido
                    </span>
                  )}
                  <InputForm
                    error={!!errors.Password}
                    type={'password'}
                    size="small"
                    style={{
                      margin: errors.Password ? '10px 0 0 0' : '10px 0',
                      width: '100%'
                    }}
                    label="Contraseña *"
                    {...register('Password', {
                      required: true,
                      minLength: 6,
                      maxLength: 16
                    })}
                  />
                  {errors.Password?.type === 'required' && (
                    <span className="text-red-500 text-sm font-light">
                      Constraseña requerido
                    </span>
                  )}
                  {errors.Password?.type === 'minLength' && (
                    <span className="text-red-500 text-sm font-light">
                      Debe tener como minimo 6 caracteres
                    </span>
                  )}
                  {errors.Password?.type === 'maxLength' && (
                    <span className="text-red-500 text-sm font-light">
                      Debe tener como máximo 16 caracteres
                    </span>
                  )}
                  <Box
                    className="flex justify-center"
                    sx={{ '& > :not(style)': { m: 1 }, py: 1 }}
                  >
                    <button
                      className="text-white rounded-full py-2 px-10 cursor-pointer bg-[#D5278F]"
                      onClick={handleClose}
                    >
                      Cancelar
                    </button>
                    <button
                      className="text-white rounded-full py-2 px-10 cursor-pointer"
                      type={'submit'}
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                      }}
                    >
                      Registrar
                    </button>
                  </Box>
                </Container>
              </Box>
            </div>
            {loading && (
              <Box className="bg-white w-full h-full flex flex-col justify-center items-center absolute top-0 left-0">
                <CircularProgress color="primary" value={25} />
                <Typography>Cargando...</Typography>
              </Box>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
