import { Card, Box, CardContent, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DetailService, StatusPublish } from '../../../interfaces';
import {
  AiFillClockCircle,
  AiFillCloseCircle,
  AiFillCheckCircle
} from 'react-icons/ai';

type PropsPublish = {
  publish: DetailService;
  editPublish: (publish: DetailService) => void;
  isActivePublish: (value: boolean) => void;
  openModal: (value: boolean) => void;
  idPublishSelected: (value: string) => void;
  openModalDelete: (value: boolean) => void;
};

export const PublishComponent = (props: PropsPublish) => {
  const renderStatePublish = () => {
    switch (props.publish.estado) {
      case StatusPublish.PENDIENTE:
        return (
          <div className="w-full flex justify-center">
            <p
              className="p-0 text-yellow-500 text-sm text-right  py-1 px-5 rounded-full flex items-center"
              style={{ border: '2px solid #000aff' }}
            >
              <AiFillClockCircle size={20} className="mr-1" />
              <span>Pendiente</span>
            </p>
          </div>
        );
      case StatusPublish.ACEPTADA:
        return (
          <div className="w-full flex justify-center">
            <p
              className="p-0 text-green-500 text-sm text-right  py-1 px-5 rounded-full flex items-center"
              style={{ border: '2px solid #000aff' }}
            >
              <AiFillCheckCircle size={20} className="mr-1" />
              <span>Aceptada</span>
            </p>
          </div>
        );
      case StatusPublish.RECHAZADA:
        return (
          <div className="w-full flex justify-center">
            <p
              className="p-0 text-red-500 text-sm text-right  py-1 px-5 rounded-full flex items-center"
              style={{ border: '2px solid #000aff' }}
            >
              <AiFillCloseCircle size={20} className="mr-1" />
              <span>Rechazada</span>
            </p>
          </div>
        );
      default:
        break;
    }
  };
	
	const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-ES', {}).format(value);
  };


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
      {props.publish.activa ? (
        <>
          {props.publish.estado === StatusPublish.PENDIENTE ||
          props.publish.estado === StatusPublish.DESACTIVADA ? (
            <Box
              sx={{
                width: '45%',
                height: '220px',
                backgroundImage: `url(${props.publish.urlImagenPrincipal})`,
                filter: 'grayscale(100%)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
            ></Box>
          ) : (
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
          )}
        </>
      ) : (
        <Box
          sx={{
            width: '45%',
            height: '220px',
            backgroundImage: `url(${props.publish.urlImagenPrincipal})`,
            filter: 'grayscale(100%)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></Box>
      )}
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
          {!props.publish.activa ? (
            <div className="w-full flex justify-center">
              <p
                className="p-0 text-gray-500 text-sm text-right  py-1 px-5 rounded-full flex items-center"
                style={{ border: '2px solid gray' }}
              >
                Deshabilitada
              </p>
            </div>
          ) : (
            renderStatePublish()
          )}

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
              label={formatPrice(props.publish.precio)}
            />
          </Typography>
        </CardContent>
        <div className="flex justify-center items-center">
          {props.publish.activa ? (
            <div className="flex sm:block">
              {props.publish.estado === StatusPublish.PENDIENTE ? (
                <>
                  <button
                    className="text-white rounded-full text-sm mx-1 py-1 px-3 cursor-default  bg-gray-500"
                  >
                    Dar de baja
                  </button>
                  <button
                    className="text-white rounded-full py-1 px-3 text-sm  cursor-default  bg-gray-500"
                    type="submit"
                  >
                    <span>Editar</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-white rounded-full text-sm mx-1 py-1 px-3 cursor-pointer bg-[#D5278F]"
                    onClick={() => {
                      props.isActivePublish(false);
                      props.openModalDelete(true);
                      props.idPublishSelected(props.publish.id);
                    }}
                  >
                    Dar de baja
                  </button>
                  <button
                    className="text-white rounded-full py-1 px-3 text-sm cursor-pointer"
                    type="submit"
                    onClick={() => props.editPublish(props.publish)}
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                    }}
                  >
                    {props.publish.estado === StatusPublish.RECHAZADA ? (
                      <span>Apelar</span>
                    ) : (
                      <span>Editar</span>
                    )}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex sm:block">
              {/* {props.publish.estado === StatusPublish.PENDIENTE ? (
                <>
                  <button className="text-white rounded-full text-sm mx-1 py-1 px-3 cursor-default  bg-gray-500">
                    Dar de baja
                  </button>
                  <button
                    className="text-white rounded-full py-1 px-3 text-sm  cursor-default  bg-gray-500"
                    type="submit"
                  >
                    <span>Editar</span>
                  </button>
                </>
              ) : (
                <>
                  {props.publish.estado === StatusPublish.RECHAZADA ? (
                    <>
                      <button
                        className="text-white rounded-full text-sm mx-1 py-1 px-3 cursor-pointer bg-[#D5278F]"
                        onClick={() => {
                          props.isActivePublish(false);
                          props.openModalDelete(true);
                          props.idPublishSelected(props.publish.id);
                        }}
                      >
                        Dar de baja
                      </button>
                      <button
                        className="text-white rounded-full py-1 px-3 text-sm cursor-pointer"
                        type="submit"
                        onClick={() => props.editPublish(props.publish)}
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                        }}
                      >
                        {props.publish.estado === StatusPublish.RECHAZADA ? (
                          <span>Apelar</span>
                        ) : (
                          <span>Editar</span>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-white rounded-full py-1 px-3 text-sm cursor-pointer"
                        type="submit"
                        onClick={() => {
                          props.isActivePublish(true);
                          props.openModalDelete(true);
                          props.idPublishSelected(props.publish.id);
                        }}
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                        }}
                      >
                        Habilitar
                      </button>
                    </>
                  )}
                </>
              )} */}
              <button
                className="text-white rounded-full py-1 px-3 text-sm cursor-pointer"
                type="submit"
                onClick={() => {
                  props.isActivePublish(true);
                  props.openModalDelete(true);
                  props.idPublishSelected(props.publish.id);
                }}
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
                }}
              >
                Habilitar
              </button>
            </div>
          )}
        </div>
      </Box>
    </Card>
  );
};
