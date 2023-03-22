import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '../../../styles/InputForm';

type FormContactType = {
  names: string;
  surname: string;
  email: string;
  phone: number;
  message: string;
};

export const FormContact = ({
  idService,
  closeModal,
  openMessage,
  loading
}: {
  idService: string;
  closeModal: () => void;
  openMessage: () => void;
  loading: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormContactType>();

  const onSubmit: SubmitHandler<FormContactType> = (data) => {
    loading(true);
    axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/CrearNotificacion`,
        {
          publicacionId: idService,
          observaciones: data.message
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then(() => openMessageSuccess())
      .finally(() => loading(false));
  };

	const openMessageSuccess = () => {
		closeModal()
		openMessage()
	}
  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" sx={{ mb: 1 }} spacing={2}>
        <InputForm
          error={!!errors.names}
          size="small"
          id="name"
          label="Nombres *"
          variant="outlined"
          {...register('names', { required: true })}
        />
        <InputForm
          error={!!errors.surname}
          size="small"
          id="surname1"
          label="Apellidos *"
          variant="outlined"
          {...register('surname', { required: true })}
        />
      </Stack>
      <InputForm
        id="phone"
        size="small"
        fullWidth
        type={'number'}
        sx={{ mb: 1, width: '100% !important' }}
        label="Telefono (opcional)"
        variant="outlined"
        {...register('phone')}
      />
      <InputForm
        error={!!errors.email}
        id="email"
        size="small"
        type={'email'}
        fullWidth
        sx={{ mb: 1, width: '100% !important' }}
        label="Correo electrónico *"
        variant="outlined"
        {...register('email', { required: true })}
      />
      <InputForm
        error={!!errors.message}
        id="message"
        type={'message'}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 1, width: '100% !important' }}
        label="Mensaje"
        variant="outlined"
        {...register('message', { required: true })}
      />
      <Box
        className="flex justify-center"
        sx={{ '& > :not(style)': { m: 1 }, py: 1 }}
      >
        <button
          className="text-white rounded-full py-2 px-10 cursor-pointer bg-[#D5278F]"
          onClick={closeModal}
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
          Contactar
        </button>
      </Box>
    </Box>
  );
};
