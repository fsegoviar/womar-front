import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { DetailService } from '../../../interfaces';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

type PropsCardPublish = {
  publish: DetailService;
  openCard: () => void;
};

export const CardPublish = (props: PropsCardPublish) => {
  return (
    <Card
      sx={{
        display: 'flex',
        border: '3px solid #000aff',
        borderRadius: '35px',
        width: '100%',
        height: '220px'
      }}
    >
      <Box
        sx={{
          width: '45%',
          height: '220px',
          backgroundImage: `url(${props.publish.urlImagenPrincipal})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

          width: '55%'
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyConente: 'center',
            marginTop: '0',
            paddingTop: '0',
            alignItems: 'center'
          }}
        >
          <p className="block text-center font-bold sm:text-lg">
            {props.publish.titulo}
          </p>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ display: 'flex', justifyContent: 'center', my: 1 }}
          >
            {/* <LocationOnIcon /> {props.publish.locacion} */}
          </Typography>
          <Typography component="div" sx={{ textAlign: 'center' }}>
            <Chip
              icon={<AttachMoneyIcon />}
              label={String(props.publish.precio)}
            />
          </Typography>
        </CardContent>
        <div className="flex justify-center items-center">
          <div className="flex sm:block">
            <button
              className="text-white rounded-full py-1 px-3 text-sm cursor-pointer"
              type="submit"
              onClick={() => props.openCard()}
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
              }}
            >
              Revisar publicación
            </button>
          </div>
        </div>
      </Box>
    </Card>
  );
};
