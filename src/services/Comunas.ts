import { useState, useEffect } from 'react';
import { Comuna } from '../interfaces/Comuna';
import axios from 'axios';

export const ObtenerComunas = () => {
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_API}/Comunas/ObtenerComunas`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      );
      setComunas(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { comunas, error, isLoading };
};
