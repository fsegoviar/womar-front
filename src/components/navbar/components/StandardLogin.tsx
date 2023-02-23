import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { TypeUser } from '../../../interfaces';
import { InputForm } from '../../../styles/InputForm';

type Inputs = {
  email: string;
  password: string;
  tipo: TypeUser;
};

type PropsLoginStandard = {
  onSubmit: (data: Inputs) => void;
};

export const StandardLogin = (props: PropsLoginStandard) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  useEffect(() => {
    setValue('tipo', TypeUser.LOCAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component={'form'}
      className="flex flex-col items-center"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Box className="w-full my-5">
        <InputForm
          error={!!errors.email}
          label="Correo electrónico"
          id="email"
          type={'email'}
          className="font-medium"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <span
            style={{
              fontSize: '14px',
              color: 'red',
              display: 'block',
              paddingTop: '5px'
            }}
          >
            (*) Campo requerido
          </span>
        )}
      </Box>
      <Box className="w-full">
        <InputForm
          error={!!errors.password}
          label="Contraseña"
          id="password"
          type={'password'}
          className="font-medium"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <span
            style={{
              fontSize: '14px',
              color: 'red',
              display: 'block',
              padding: '5px 0'
            }}
          >
            (*) Campo requerido
          </span>
        )}
      </Box>
      <button
        className="text-white py-2 px-10 rounded-full mt-5"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
        }}
      >
        Acceder
      </button>
    </Box>
  );
};
