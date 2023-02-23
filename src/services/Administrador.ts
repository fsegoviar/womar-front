import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { UsuariosAdmin } from '../interfaces';

export const ObtenerUsuario = () => {
  const [usuarios, setUsuarios] = useState<UsuariosAdmin[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_URL_BACKEND}/Security/ObtenerUsuarios`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      );
      console.log('Usuarios => ', response.data);
      setUsuarios(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { usuarios, loading, error };
};
