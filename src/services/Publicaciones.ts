import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { DetailService } from '../interfaces';

type TypeSearchPublish = {
  categorias: number[];
  orderBy: boolean;
  search?: string;
  tipoPublicacion: number;
};

export const ObtenerPublicacionPorCategoria = (props: TypeSearchPublish) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publish, setPublish] = useState<DetailService[]>([]);

  const fetchData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ObtenerFiltrados`,
        props,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => {
        console.log('Response Publicaciones =>', response.data);
        setPublish(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { publish, loading, error };
};

export const ObtenerPublicacionDeUsuario = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publishUser, setPublishUser] = useState<DetailService[]>([]);

  const fetchData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ObtenerMisPublicaciones`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => {
        setPublishUser(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { publishUser, loading, error };
};

export const ObtenerPublicacionesPorEstado = (id: number) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publish, setPublish] = useState<DetailService[]>([]);

  const fetchData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ObtenerPublicacionesPorEstado?idEstado=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => {
        console.log('DATA => ', response.data);
        setPublish(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { publish, loading, error };
};

export const EditarPublicacion = (data: any, token: string) => {
  const fetchData = async () => {
    await axios.put(
      `${process.env.REACT_APP_URL_API}/Publicaciones/EditarPublicacion`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  return { fetchData };
};

export const ObtenerPublicacion = (id: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailService, setDetailService] = useState<any>();

  const fetchData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ObtenerPublicacion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      )
      .then((response: any) => {
        setDetailService(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { detailService, loading, error };
};

export const CrearPublicacion = (publish: FormData) => {
  let result: any = null;
  let error = false;

  const cargarPublicacion = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/Crear`,
        publish,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { cargarPublicacion };
};

export const CargarImagen = (formData: FormData) => {
  let result: any = null;
  let error = false;

  const cargarImagen = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Publicaciones/CargarImagen`,
        formData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { cargarImagen };
};

// * ---------------- PARTE DEL ALVAREZ ------------

export const SubirImagen = (formData: FormData) => {
  let result: any = null;
  let error = false;

  const subirImagen = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/SubirImagen`,
        formData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { subirImagen };
};

export const ActualizarEstado = (idPublicacion: string) => {
  let result: any = null;
  let error = false;

  const actualizarEstado = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ActualizarEstado/${idPublicacion}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { actualizarEstado };
};
