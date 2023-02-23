import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack
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
    getValues,
    formState: { errors }
  } = useForm<RegisterUser>();
  // const [open, setOpen] = useState(props.open);
  const { comunas } = ObtenerComunas();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

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
    let formData = new FormData();
    formData.append('Nombre', data.Nombre);
    formData.append('ApellidoPaterno', data.ApellidoPaterno);
    data.ApellidoMaterno
      ? formData.append('ApellidoMaterno', String(data.ApellidoMaterno))
      : formData.append('ApellidoMaterno', '');
    formData.append('ComunaId', String(data.ComunaId));
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
                    style={{ margin: '10px 0', width: '100%' }}
                    label="Nombres *"
                    {...register('Nombre', { required: true })}
                  />
                  <Stack
                    direction="row"
                    sx={{ mb: 1, justifyContent: 'space-around' }}
                    spacing={2}
                  >
                    <InputForm
                      size="small"
                      error={!!errors.ApellidoPaterno}
                      style={{ margin: '10px 0', width: '49%' }}
                      id="surname1"
                      label="Apellido Paterno *"
                      {...register('ApellidoPaterno', { required: true })}
                    />
                    <InputForm
                      size="small"
                      error={!!errors.ApellidoMaterno}
                      style={{ margin: '10px 0', width: '49%' }}
                      label="Apellido Materno"
                      {...register('ApellidoMaterno', { required: false })}
                    />
                  </Stack>
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
                    <InputLabel>Dirección</InputLabel>
                    <SelectForm
                      style={{ width: '100%' }}
                      label="Dirección"
                      value={getValues('ComunaId')}
                      onChange={(evnt) => {
                        if (evnt.target.value) {
                          setValue('ComunaId', Number(evnt.target.value));
                        }
                      }}
                    >
                      {comunas.map((comuna) => (
                        <MenuItem key={comuna.id} value={comuna.id}>
                          {comuna.nombre}
                        </MenuItem>
                      ))}
                    </SelectForm>
                  </FormControl>
                  <Stack
                    direction="row"
                    sx={{ my: 1, justifyContent: 'space-around' }}
                    spacing={2}
                  >
                    <InputForm
                      id="dni"
                      size="small"
                      label="Rut"
                      style={{ margin: '10px 0', width: '49%' }}
                      onChange={(e: any) => {
                        setValue('Rut', e.target.value);
                      }}
                    />
                    <InputForm
                      id="phone"
                      size="small"
                      type={'number'}
                      style={{ margin: '10px 0', width: '49%' }}
                      label="Telefono"
                      {...register('Telefono')}
                    />
                  </Stack>
                  <InputForm
                    error={!!errors.Email}
                    type={'email'}
                    size="small"
                    style={{ marginBottom: '10px', width: '100%' }}
                    label="Correo electrónico *"
                    {...register('Email', { required: true })}
                  />
                  <InputForm
                    error={!!errors.Password}
                    type={'password'}
                    size="small"
                    style={{ margin: '10px 0', width: '100%' }}
                    label="Contraseña *"
                    {...register('Password', { required: true })}
                  />
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
