import { Grid } from '@mui/material';
import {
  CategoriesResponsive,
  ContainCategories,
  DetailPublish,
  SkeletonLoaderSections,
  SmartPreviewService
} from '../../components';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { PageBase } from '../../components/PageBase';
import axios, { AxiosError } from 'axios';
import { DetailService } from '../../interfaces';
import { DialogSuccess } from '../../components/navbar/components/DialogSuccess';

export const MaritimePersonnelPage = () => {
  const [openMessage, setOpenMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<DetailService>();
  const [listPublish, setListPublish] = useState<DetailService[]>([]);
  const [load, setLoad] = useState(false);
  const [listSubcategorias, setListSubcategorias] = useState<number[]>([]);
  const [filter, setFilter] = useState({
    subCategorias: [8, 9, 10, 11, 12, 13, 14, 15],
    categorias: 2,
    orderBy: true,
    search: '',
    tipoPublicacion: 1
  });

  const handleCloseDialogSuccess = () => {
    setTimeout(() => {
      setOpenMessage(false);
    }, 500);
  };

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
          setListPublish(response.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => setLoad(false));
    };

    fetchData();
  }, [filter]);

  const [selectedOffer, setSelectedOffer] = useState(true);

  const openModalContact = (service: DetailService) => {
    setOpenModal(true);
    console.log('service', service);
    setServiceSelected(service);
  };

  const handleChangeSubCategoria = (
    idSubcategoria: number,
    checked: boolean
  ) => {
    checked
      ? addSubcategoria(idSubcategoria)
      : removeSubCategoria(idSubcategoria);
  };

  const addSubcategoria = (idSubCategoria: number) => {
    let newListSubcategoria = listSubcategorias;
    newListSubcategoria.push(idSubCategoria);

    setListSubcategorias(newListSubcategoria);

    setFilter({ ...filter, subCategorias: newListSubcategoria });
  };

  const removeSubCategoria = (idSubCategoria: number) => {
    let filterSubcategoria = listSubcategorias.filter(
      (id: number) => id !== idSubCategoria
    );

    setListSubcategorias(filterSubcategoria);

    setFilter({ ...filter, subCategorias: filterSubcategoria });
  };

  return (
    <PageBase>
      <Box className="">
        <Grid container>
          {/* Filtros */}
          <Grid
            item
            xs={12}
            className="w-full h-auto relative"
            sx={{
              height: 'auto',
              background:
                'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)'
            }}
          >
            <Grid container className="h-full">
              <Grid item xs={12} className="grid sm:hidden">
                <div className="flex justify-center items-center w-full h-full pt-5">
                  <p className="text-white font-bold text-xl">Embarcaciones</p>
                  <div
                    className="bg-contain bg-no-repeat bg-center w-12 h-12 ml-2"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/ico-embarcaciones-blanco.png')})`
                    }}
                  ></div>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} className="pt-5">
                <div className="flex  justify-center items-center w-full h-full">
                  <p className="text-xl font-thin pr-5 text-white">Filtros</p>
                  <Box
                    className="rounded-full bg-white"
                    style={{ border: '1px solid #000aff' }}
                  >
                    <button
                      className="text-[#000aff] px-5 sm:px-10 py-1 text-xl rounded-full"
                      style={{
                        backgroundColor: selectedOffer ? '#00e9ba' : 'white'
                      }}
                      onClick={() => {
                        setSelectedOffer(true);
                        setFilter({ ...filter, tipoPublicacion: 1 });
                      }}
                    >
                      Buscan
                    </button>
                    <button
                      className="text-[#000aff] px-5 sm:px-10 py-1 text-xl rounded-full"
                      style={{
                        backgroundColor: !selectedOffer ? '#00e9ba' : 'white'
                      }}
                      onClick={() => {
                        setSelectedOffer(false);
                        setFilter({ ...filter, tipoPublicacion: 2 });
                      }}
                    >
                      Ofrecen
                    </button>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} className="flex justify-center py-5">
                <div className="flex flex-col h-full justify-center ">
                  <div className="flex items-center mb-4">
                    <input
                      id="profesionales-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(9, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="profesionales-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Profesionales acuícolas
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="tripulacion-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(13, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="tripulacion-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Tripulación
                    </label>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-center ml-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="rovs-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(10, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="rovs-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Rov`s
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="boceo-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(14, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="buceo-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Buceo
                    </label>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-center ml-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="operaciones-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(11, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="operaciones-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Operaciones
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="administrativos-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(15, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="administrativos-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Administrativos
                    </label>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-center ml-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="operarios-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(12, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="operarios-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Operarios
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="otros-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(8, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="otros-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Otros
                    </label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={3} className="hidden sm:grid">
                <div className="flex justify-center items-center w-full h-full">
                  <p className="text-white font-bold text-3xl">
                    Personal Marítimo
                  </p>
                  <div
                    className="bg-contain bg-no-repeat bg-center w-16 h-16 ml-2"
                    style={{
                      backgroundImage: `url(${require('../../assets/images/ico-p-maritimo-blanco.png')})`
                    }}
                  ></div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} className="px-5 sm:px-10">
            <Grid container sx={{ my: 5 }} spacing={2}>
              {load && (
                <Grid item xs={12}>
                  <SkeletonLoaderSections />
                </Grid>
              )}
              {listPublish!.length > 0 &&
                !load &&
                listPublish!.map((publish, index) => (
                  <Grid item xs={12} key={index} lg={4}>
                    <SmartPreviewService
                      key={index}
                      title={publish.titulo}
                      price={publish.precio}
                      direccion={publish.direccion}
                      urlImgCover={publish.urlImagenPrincipal}
                      openContact={() => openModalContact(publish)}
                    />
                  </Grid>
                ))}
              {listPublish!.length === 0 && !load && (
                <h1>No existen publicaciones para esta sección</h1>
              )}
              <section className="hidden sm:flex my-10 flex-col justify-center items-center w-full md:flex-row ">
                <ContainCategories />
              </section>
              <section className="my-5 flex sm:hidden justify-center ">
                <CategoriesResponsive />
              </section>
            </Grid>
          </Grid>
        </Grid>
        {openModal && (
          <DetailPublish
            open={openModal}
            service={serviceSelected!}
            closeModal={() => setOpenModal(false)}
            openMessage={() => setOpenMessage(true)}
          />
        )}
        {openMessage && (
          <DialogSuccess
            open={openMessage}
            handleClose={handleCloseDialogSuccess}
          />
        )}
      </Box>
    </PageBase>
  );
};
