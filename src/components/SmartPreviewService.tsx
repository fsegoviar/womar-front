import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { parseJwt } from '../utils';
import { DialogLogin } from './navbar/components/DialogLogin';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeStateLogin } from '../store/loginSlice';

interface PropsPreview {
  title: string;
  price: number;
  direccion: string;
  urlImgCover: string;
  openContact: () => void;
}

export const SmartPreviewService = (props: PropsPreview) => {
  const { IdUser } = parseJwt();
  const [openLogin, setOpenLogin] = useState(false);
  const dispatch = useDispatch();

  const handleCloseDialogLogin = () => {
    setTimeout(() => {
      setOpenLogin(false);
    }, 500);
  };

  const handleOpenSession = (token: string) => {
    localStorage.setItem('tokenWomar', token);
    dispatch(changeStateLogin(true));
  };

  const verifyIsLogged = () => {
    if (IdUser) {
      props.openContact();
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <>
      <Card
        className="flex w-full cursor-pointer h-40"
        sx={{
          border: '1px solid #000aff',
          transition: 'all 0.4s',
          borderRadius: '35px',
          '&:hover': {
            boxShadow: '1px 1px 24px grey',
            transform: 'scale(1.01)'
          }
        }}
        onClick={verifyIsLogged}
      >
        <Box
          className="bg-center bg-no-repeat bg-cover w-5/12 sm:w-7/12"
          sx={{
            backgroundImage: `url(${props.urlImgCover})`,
            borderRadius: '30px'
          }}
        ></Box>
        <Box className="flex flex-col justify-center w-7/12 sm:w-5/12">
          <CardContent className="flex flex-col justify-center items-start">
            <h6 className="text-center font-bold text-sm sm:text-[20px]">
              {props.title}
            </h6>
            <p className="flex justify-center py-2 text-gray-500 text-sm font-thin sm:font-normal">
              <LocationOnIcon /> {props.direccion}
            </p>
            <Typography component="div" className="text-center">
              <Chip icon={<AttachMoneyIcon />} label={String(props.price)} />
            </Typography>
          </CardContent>
        </Box>
      </Card>
      {openLogin && (
        <DialogLogin
          open={openLogin}
          handleClose={handleCloseDialogLogin}
          handleOpenSession={handleOpenSession}
        />
      )}
    </>
  );
};
