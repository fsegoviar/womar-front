import { Grid } from '@mui/material';
import {
  CategoriesResponsive,
  ContainCategories,
  DetailPublish,
  SmartPreviewService
} from '../../components';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { PageBase } from '../../components/PageBase';
import { DetailService } from '../../interfaces';
import axios, { AxiosError } from 'axios';
import { SkeletonLoaderSections } from '../../components/SkeletonLoaderSections';
import { DialogSuccess } from '../../components/navbar/components/DialogSuccess';

export const ShipSectionPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<DetailService>();
  const [listShips, setListShips] = useState<DetailService[]>([]);
  const [load, setLoad] = useState(false);
  const [listSubcategorias, setListSubcategorias] = useState<number[]>([]);
  const initialSubCategorias = [1, 2, 3, 4, 5, 6, 7, 8];
  const [counterFilter, setCounterFilter] = useState(0);
  const [filter, setFilter] = useState({
    subCategorias: initialSubCategorias,
    categorias: 1,
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
    if (counterFilter === 0) {
      setFilter({ ...filter, subCategorias: initialSubCategorias });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterFilter, setCounterFilter]);

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
          setListShips(response.data);
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
    setCounterFilter(counterFilter + 1);

    setFilter({ ...filter, subCategorias: newListSubcategoria });
  };

  const removeSubCategoria = (idSubCategoria: number) => {
    let filterSubcategoria = listSubcategorias.filter(
      (id: number) => id !== idSubCategoria
    );

    setListSubcategorias(filterSubcategoria);
    setCounterFilter(counterFilter - 1);

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
                'linear-gradient(90deg, rgba(0,10,255,1) 0%, rgba(0,191,232,1) 50%, rgba(0,233,186,1) 100%)',
								padding: '0 2.5rem 0 2.5rem'
            }}
          >
            <Grid container className="h-full">
              <Grid item xs={12} className="grid sm:hidden">
                <div className="flex justify-center items-center w-full h-full pt-5">
                  <p className="text-white font-bold text-xl">Embarcaciones</p>
									<div style={{clipPath: 'circle(50% at 50% 50%)', backgroundColor: '#f7f7f7', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px'}}>
										<div
											className="bg-contain bg-no-repeat bg-center w-12 h-12"
											style={{
												backgroundImage: `url(${require('../../assets/images/ico-embaraciones.png')})`
											}}
										></div>
									</div>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} className="pt-5">
                <div className="flex items-center w-full h-full">
                  <p className="text-xl font-thin pr-5 text-white">Filtros</p>
                  <Box
                    className="rounded-full bg-white"
                    style={{ border: '1px solid #000aff' }}
                  >
                    <button
                      className="text-[#000aff] px-5 w-[50%] py-1 text-xl rounded-full"
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
                      className="text-[#000aff] px-5 w-[50%] py-1 text-xl rounded-full"
                      style={{
                        backgroundColor: !selectedOffer ? '#00e9ba' : 'white'
                      }}
                      onClick={() => {
                        setSelectedOffer(false);
                        setFilter({ ...filter, tipoPublicacion: 4 });
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
                      id="barco-checkbox"
                      type="checkbox"
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(1, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="barco-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Barco
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="barcaza-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(2, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="barcaza-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Barcaza
                    </label>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-center ml-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="catamaran-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(3, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="catamaran-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Catamarán
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="remolcador-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(6, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="remolcador-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Remolcador
                    </label>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-center ml-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="lancharapida-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(4, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="lancharapida-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Lancha Rápida
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="plataforma-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(7, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="plataforma-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Plataforma
                    </label>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-center ml-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="menor-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(evt: any) =>
                        handleChangeSubCategoria(5, evt.target.checked)
                      }
                    />
                    <label
                      htmlFor="menor-checkbox"
                      className="ml-2 text-sm font-thin text-white"
                    >
                      Menor de 25TRG
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
                <div className="flex justify-end items-center w-full h-full">
                  <p className="text-white font-bold text-3xl">Embarcaciones</p>
									<div style={{clipPath: 'circle(50% at 50% 50%)', backgroundColor: '#f7f7f7', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px'}}>
										<div
											className="bg-contain bg-no-repeat bg-center w-16 h-16"
											style={{
												backgroundImage: `url(${require('../../assets/images/ico-embaraciones.png')})`
											}}
										></div>
									</div>
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
              {listShips!.length > 0 &&
                !load &&
                listShips!.map((ship, index) => (
                  <Grid item xs={12} key={index} lg={4}>
                    <SmartPreviewService
                      key={index}
                      title={ship.titulo}
                      price={ship.precio}
                      direccion={ship.direccion}
                      urlImgCover={ship.urlImagenPrincipal}
                      openContact={() => openModalContact(ship)}
                    />
                  </Grid>
                ))}
              {listShips!.length === 0 && !load && (
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
