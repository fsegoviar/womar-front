import { PageBase } from '../../components/PageBase';
import { Box, Container } from '@mui/system';
import { FormProfile } from './components/FormProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const UserSectionPage = () => {
  const user = useSelector((state: RootState) => state.userRol);

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
        {/* {loading && (
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
        )} */}
        {user && (
          <Box
            className="w-full md:w-5/12"
            sx={{
              backgroundColor: 'white',
              borderRadius: 10,
              p: 5,
              border: '2px solid #000aff'
            }}
          >
            <FormProfile />
          </Box>
        )}
      </Container>
    </PageBase>
  );
};
