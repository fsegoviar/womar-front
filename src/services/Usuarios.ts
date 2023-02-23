import axios from 'axios';
import { useEffect } from 'react';

export const LoginLocal = (data: { email: string; password: string }) => {
  const fetchData = async () => {
    let error = false;
    let result: any = null;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Usuarios/LoginLocal`,
        data,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { fetchData };
};
/**
 * Result:
 *  {
 *    data:{
 *      id
 *      role
 *      tok
 *      urlImg
 *      userName
 *    },
 *    error: true | false
 *  }
 */
export const LoginGoogle = (accessToken: string) => {
  const fetchData = async () => {
    let error = false;
    let result: any = null;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Usuarios/LoginGoogle`,
        {
          accessToken
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { fetchData };
};

/**
 * * Result:
 *  {
 *    data:{
 *      id
 *      role
 *      token
 *      urlImg
 *      userName
 *    },
 *    error: true | false
 *  }
 */
export const LoginFacebook = (accessToken: string) => {
  const fetchData = async () => {
    let error = false;
    let result: any = null;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/Usuarios/LoginFacebook`,
        {
          accessToken
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      );
      result = response;
    } catch (e) {
      error = true;
    }

    return { result, error };
  };

  return { fetchData };
};

export const Registrar = (data: FormData) => {
  const registrar = async () => {
    await axios.post(
      `${process.env.REACT_APP_URL_BACKEND}/Security/Registrar`,
      data,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  };
  return { registrar };
};

export const ActualizarInfoUsuario = (data: FormData) => {
  let result: any = null;
  let error = false;
  const actualizarInfoUsuario = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_BACKEND}/Security/ActualizarUsuario`,
        data,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      result = response.data;
    } catch (_error) {
      error = true;
    }
    return { result, error };
  };
  return { actualizarInfoUsuario };
};

export const ObtenerInfoUsuario = () => {
  let result: any = null;
  let error = false;

  const fetchData = async () => {
    // const { IdUser } = parseJwt();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_BACKEND}/Security/ObtenerInfo`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
          }
        }
      );
      result = response.data;
    } catch (_error) {
      error = true;
    }

    return { result, error };
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetchData };
};
