import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { InputBase, alpha, styled } from '@mui/material';
import { BiSearchAlt } from 'react-icons/bi';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha('#E2E3E4', 1),
  '&:hover': {
    backgroundColor: alpha('#E2E3E4', 0.8)
  },
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'gray',
  fontFamily: 'sailec-medium',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

export const SearchBar = () => {
  const [textSearch, setTextSearch] = useState('');
  const navigate = useNavigate();

  const searchPublish = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ObtenerFiltrados`,
        {
          search: textSearch,
          orderBy: true,
          tipoPublicacion: 1
        }
      )
      .then((response: any) => {
        navigate('/resultados_busqueda', { state: response.data });
      })
      .catch((error: AxiosError) => console.log('error =>', error));
  };

  return (
    <Search
      style={{ width: '60%' }}
      onKeyUp={(e: any) => {
        if (e.keyCode === 13 && textSearch !== '') {
          searchPublish();
        }
      }}
      onChange={(e: any) => setTextSearch(e.target.value)}
    >
      <SearchIconWrapper>
        <BiSearchAlt size={16} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Buscar"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};
