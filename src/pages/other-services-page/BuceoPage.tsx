import { TemplatePage } from './components';
import { NoContent } from '../../components';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { DetailService } from '../../interfaces';
import { CardItemPage } from './components/CardItemPage';
import { Grid } from '@mui/material';
import { SkeletonLoaderSections } from '../../components/SkeletonLoaderSections';

export const BuceoPage = () => {
	const [filter, setFilter] = useState({
    categorias: [1],
    orderBy: true,
    search: '',
    tipoPublicacion: 1
  });

  const [listOthers, setListOthers] = useState<DetailService[]>([]);
  const [selectedOffer, setSelectedOffer] = useState(true);
  const [load, setLoad] = useState(false);

	useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      await axios
        .post(
          `${process.env.REACT_APP_URL_BACKEND}/Publicaciones/ObtenerFiltrados`,
          filter,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('tokenWomar')}`
            }
          }
        )
        .then((response: any) => {
          console.log('Response =>', response.data);
          setListOthers(response.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => setLoad(false));
    };

    fetchData();
  }, [filter]);

  return (
    <TemplatePage>
      {/*Aqui va el contenido de la sección que debe ser iterable
       llamando al componente CardItemPage
      */}
			{load && (
					<Grid item xs={12}>
						<SkeletonLoaderSections />
					</Grid>
				)}
			{listOthers!.length > 0 &&
				!load &&
				listOthers!.map((other, index) => (
					<Grid item xs={12} key={index} lg={4}>
						<CardItemPage
								title={other.titulo}
								price={other.precio}
								address={other.direccion}
								urlImgCover={other.urlImagenPrincipal}
						/>
					</Grid>
			))}
			{listOthers!.length === 0 && !load && (
      	<NoContent />
			)}
      {/* Aqui va el ComponentDialog de DetailItem */}
      {/*TODO: Falta desarrollar el dialog de DatailItem */}
    </TemplatePage>
  );
};
