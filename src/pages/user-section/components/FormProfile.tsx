import { Box, Container } from '@mui/system';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '../../../styles/InputForm';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ActualizarInfoUsuario, ObtenerRegiones } from '../../../services';
import { AxiosError } from 'axios';
import { InfoUser } from '../../../interfaces';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

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

type TypeForm = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  regionId: string;
  telefono: string;
};

export const FormProfile = ({
  id,
  apellidoMaterno,
  apellidoPaterno,
  rut,
  regionId,
  telefono,
  imgPerfil,
  nombre
}: InfoUser) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TypeForm>({
    defaultValues: {
      apellidoMaterno,
      apellidoPaterno,
      regionId: String(regionId),
      nombre,
      rut: rut ?? '',
      telefono: telefono ?? ''
    }
  });
  const [urlImage, setUrlImage] = useState('');
  const [fileChange, setFileChange] = useState<any>();
  const { regiones } = ObtenerRegiones();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrlImage(imgPerfil);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<TypeForm> = async (data) => {
    console.log('Data', data);

    let formData = new FormData();
    formData.append('Nombre', data.nombre);
    formData.append('ApellidoPaterno', data.apellidoPaterno);
    formData.append('ApellidoMaterno', data.apellidoMaterno);
    formData.append('RegionId', data.regionId);
    formData.append('Telefono', data.telefono);
    formData.append('ImagenPerfil', fileChange);

    const { actualizarInfoUsuario } = ActualizarInfoUsuario(formData);
    setLoading(true);
    await actualizarInfoUsuario()
      .then(() => navigate('/'))
      .catch((error: AxiosError) => console.log('Error =>', error))
      .finally(() => setLoading(false));
  };

  const handleChangeImage = (e: any) => {
    setUrlImage(URL.createObjectURL(e.target.files[0]));
    setFileChange(e.target.files[0]);
  };

  const RequiredField = () => {
    return (
      <span className="font-thin text-sm text-red-500">Campo requerido</span>
    );
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      {/* Box loading */}
      <Container>
        {loading && (
          <div className="absolute top-0 mx-[50%] -translate-x-[50%] left-0 z-50 rounded-3xl w-full md:w-5/12 h-full bg-white opacity-80 flex justify-center items-center">
            <p className="text-xl">Cargando...</p>
          </div>
        )}

        <Box
          className="relative bg-center bg-cover bg-no-repeat my-5 rounded-full m-auto"
          sx={{
            backgroundImage: `url(${urlImage})`,
            width: '150px',
            height: '150px'
          }}
        >
          {!urlImage && (
            <div
              className="absolute top-0 left-0 cursor-pointer px-5 py-10"
              style={{ border: '2px solid #000aff', borderRadius: '20px' }}
            >
              <p className="w-full text-center">
                Ingresa tu imagen de perfil aqui
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            className="w-full cursor-pointer opacity-0"
            style={{ height: '100%' }}
          />
        </Box>
        <InputForm
          error={!!errors.nombre}
          id="name"
          style={{ margin: '10px 0', width: '100%' }}
          placeholder="Nombres *"
          {...register('nombre', { required: true })}
        />
        {errors.nombre && <RequiredField />}
        <Grid
          container
          sx={{ mb: 1, justifyContent: 'space-around' }}
          spacing={2}
        >
          <Grid item xs={6}>
            <InputForm
              error={!!errors.apellidoPaterno}
              style={{ margin: '10px 0' }}
              id="surname1"
              placeholder="Apellido Paterno *"
              {...register('apellidoPaterno', { required: true })}
            />
            {errors.apellidoPaterno && <RequiredField />}
          </Grid>
          <Grid item xs={6}>
            <InputForm
              error={!!errors.apellidoMaterno}
              style={{ margin: '10px 0' }}
              placeholder="Apellido Materno *"
              {...register('apellidoMaterno', { required: true })}
            />
            {errors.apellidoMaterno && <RequiredField />}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ mb: 1, justifyContent: 'space-around' }}
          spacing={2}
        >
          <Grid item xs={6}>
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
              <InputLabel>Región (opcional)</InputLabel>
              <SelectForm
                style={{ width: '100%' }}
                label="Categoria"
                onChange={(evnt: any) => {
                  if (evnt.target.value) {
                    setValue('regionId', evnt.target.value);
                  }
                }}
              >
                {regiones.map((region, index) => (
                  <MenuItem key={index} value={region.id}>
                    {region.nombre}
                  </MenuItem>
                ))}
              </SelectForm>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <InputForm
              id="phone"
              type={'number'}
              style={{ width: '100%' }}
              placeholder="Telefono"
              {...register('telefono', { required: true })}
            />
            {errors.telefono && <RequiredField />}
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
        <button
          className="text-white rounded-full py-2 px-10 cursor-pointer"
          type="submit"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
          }}
        >
          Guardar
        </button>
      </Box>
    </Box>
  );
};
