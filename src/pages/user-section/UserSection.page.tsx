import { PageBase } from '../../components/PageBase';
import { Box, Container } from '@mui/system';
import { ObtenerInfoUsuario } from '../../services';
import { FormProfile } from './components/FormProfile';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { SkeletonLoader } from './components/SkeletonLoader';

export const UserSectionPage = () => {
  const [infoUser, setInfoUser] = useState<any>();
  const { fetchData } = ObtenerInfoUsuario();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await fetchData()
        .then((response: any) => {
          console.log('InfoUser =>', response.result);

          setInfoUser(response.result);
        })
        .finally(() => setLoading(false));
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageBase>
      <Container
        maxWidth={'xl'}
        sx={{
          position: 'relative',
          mt: 5,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {loading && (
          <Box
            className="w-full md:w-5/12"
            sx={{
              backgroundColor: 'white',
              borderRadius: 10,
              p: 5,
              border: '2px solid #000aff'
            }}
          >
            <SkeletonLoader />
          </Box>
        )}
        {infoUser && !loading && (
          <Box
            className="w-full md:w-5/12"
            sx={{
              backgroundColor: 'white',
              borderRadius: 10,
              p: 5,
              border: '2px solid #000aff'
            }}
          >
            <FormProfile {...infoUser} />
          </Box>
        )}
        {!infoUser && !loading && (
          <Typography variant="h4" className="text-center">
            Usuario no encontrado
          </Typography>
        )}
      </Container>
    </PageBase>
  );
};
