import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { Categoria } from '../interfaces';

export const ObtenerCategorias = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL_API}/Categorias/ObtenerCategorias`)
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { categories, loading, error };
};
