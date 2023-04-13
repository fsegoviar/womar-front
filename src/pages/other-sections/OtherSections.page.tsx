import { Grid } from '@mui/material';
import Box from '@mui/material/Box/Box';
import {
  CategoriesResponsive,
  ContainCategories,
  DetailPublish,
  PageBase,
  SkeletonLoaderSections,
  SmartPreviewService
} from '../../components';
import { useEffect, useState } from 'react';
import { DetailService } from '../../interfaces';
import { DialogSuccess } from '../../components/navbar/components/DialogSuccess';
import axios, { AxiosError } from 'axios';

export const OtherSectionsPage = () => {
  const [openMessage, setOpenMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<DetailService>();
  const [load, setLoad] = useState(false);
  const [listShips, setListShips] = useState<DetailService[]>([]);
  const [listSubcategorias, setListSubcategorias] = useState<number[]>([]);
	const initialSubCategorias = [8, 10, 16, 17, 18, 19, 20, 21];
  const [counterFilter, setCounterFilter] = useState(0);
  const [filter, setFilter] = useState({
    subCategorias: initialSubCategorias,
    categorias: 3,
    orderBy: true,
    search: '',
    tipoPublicacion: 1
  });

  const [selectedOffer, setSelectedOffer] = useState(true);

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
									<p className="text-white font-bold text-xl">Servicios</p>
									<div style={{clipPath: 'circle(50% at 50% 50%)', backgroundColor: '#f7f7f7', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px'}}>
										<div
											className="bg-contain bg-no-repeat bg-center w-12 h-12"
											style={{
												backgroundImage: `url(${require('../../assets/images/ico-config.png')})`
											}}
										></div>
									</div>
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
											className="text-[#000aff] w-[50%] px-5  py-1 text-xl rounded-full"
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
											className="text-[#000aff] w-[50%] px-5  py-1 text-xl rounded-full"
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
											id="redes-checkbox"
											type="checkbox"
											value=""
											className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
											onChange={(evt: any) =>
												handleChangeSubCategoria(16, evt.target.checked)
											}
										/>
										<label
											htmlFor="redes-checkbox"
											className="ml-2 text-sm font-thin text-white"
										>
											Redes
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="fondeo-checkbox"
											type="checkbox"
											value=""
											className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
											onChange={(evt: any) =>
												handleChangeSubCategoria(20, evt.target.checked)
											}
										/>
										<label
											htmlFor="fondeo-checkbox"
											className="ml-2 text-sm font-thin text-white"
										>
											Fondeo
										</label>
									</div>
								</div>
								<div className="flex flex-col h-full justify-center ml-4">
									<div className="flex items-center mb-4">
										<input
											id="mantenimiento-checkbox"
											type="checkbox"
											value=""
											className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
											onChange={(evt: any) =>
												handleChangeSubCategoria(17, evt.target.checked)
											}
										/>
										<label
											htmlFor="mantenimiento-checkbox"
											className="ml-2 text-sm font-thin text-white"
										>
											Mantenimiento
										</label>
									</div>
									<div className="flex items-center">
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
											Rov's
										</label>
									</div>
								</div>
								<div className="flex flex-col h-full justify-center ml-4">
									<div className="flex items-center mb-4">
										<input
											id="habitabilidad-checkbox"
											type="checkbox"
											value=""
											className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
											onChange={(evt: any) =>
												handleChangeSubCategoria(18, evt.target.checked)
											}
										/>
										<label
											htmlFor="habitabilidad-checkbox"
											className="ml-2 text-sm font-thin text-white"
										>
											Habitabilidad
										</label>
									</div>
									<div className="flex items-center">
										<input
											id="cabotaje-checkbox"
											type="checkbox"
											value=""
											className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
											onChange={(evt: any) =>
												handleChangeSubCategoria(20, evt.target.checked)
											}
										/>
										<label
											htmlFor="cabotaje-checkbox"
											className="ml-2 text-sm font-thin text-white"
										>
											Cabotaje
										</label>
									</div>
								</div>
								<div className="flex flex-col h-full justify-center ml-4">
									<div className="flex items-center mb-4">
										<input
											id="transporte-checkbox"
											type="checkbox"
											value=""
											className="w-4 h-4 accent-[#00e9ba] text-[#00e9ba] bg-gray-100 border-gray-300 rounded focus:ring-[#00e9ba] dark:focus:ring-[#00e9ba] dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
											onChange={(evt: any) =>
												handleChangeSubCategoria(19, evt.target.checked)
											}
										/>
										<label
											htmlFor="transporte-checkbox"
											className="ml-2 text-sm font-thin text-white"
										>
											Transporte de personal
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
									<p className="text-white font-bold text-3xl">Servicios</p>
									<div style={{clipPath: 'circle(50% at 50% 50%)', backgroundColor: '#f7f7f7', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px'}}>
										<div
											className="bg-contain bg-no-repeat bg-center w-16 h-16"
											style={{
												backgroundImage: `url(${require('../../assets/images/ico-config.png')})`
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
							<section className="my-5 flex sm:hidden justify-center">
								<CategoriesResponsive />
							</section>
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
					{/* <footer
						className="relative bg-center bg-cover bg-no-repeat w-full h-72 mt-10"
						style={{
							backgroundImage: `url(${require('../../assets/images/footer.jpg')})`
						}}
					>
						<div
							className="relative grid-cols-3 hidden sm:grid"
							style={{ zIndex: '9999' }}
						>
							<div className="grid-span-1 flex flex-col items-center pt-10">
								<h2
									className="text-white font-bold text-[2.8rem]"
									style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
								>
									¿AÚN
								</h2>
								<h2
									className="text-white font-medium text-[2.8rem] pl-40"
									style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
								>
									TIENES
								</h2>
								<h2
									className="text-white font-medium text-[2.8rem] pl-60"
									style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.2)' }}
								>
									DUDAS?
								</h2>
							</div>
							<div className="grid-span-2 flex items-center">
								<div className="flex flex-col justify-center items-center mx-7">
									<div
										className="bg-center bg-contain bg-no-repeat w-16 h-16 cursor-pointer z-40"
										style={{
											backgroundImage: `url(${require('../../assets/images/ico-avion.png')})`
										}}
										onClick={handleOpenContact}
									></div>
									<p
										style={{ width: '100px' }}
										className="text-center text-white pt-5"
									>
										Contáctanos
									</p>
								</div>
								<ItemFooter
									img={require('../../assets/images/ico_wsp.png')}
									text="Envianos un WhatsApp"
								/>
							</div>
						</div>
						<div className="flex sm:hidden flex-col">
							<h2 className="p-5 text-2xl text-white">¿Aún tienes dudas?</h2>
							<div className="flex justify-center">
								<div
									className="flex flex-col justify-center items-center mx-7"
									onClick={handleOpenContact}
								>
									<div
										className="bg-center bg-contain bg-no-repeat w-16 h-16"
										style={{
											backgroundImage: `url(${require('../../assets/images/ico-avion.png')})`
										}}
									></div>
									<p
										style={{ width: '100px' }}
										className="text-center text-white pt-5"
									>
										Contáctanos
									</p>
								</div>
								<ItemFooter
									img={require('../../assets/images/ico_wsp.png')}
									text="Envianos un WhatsApp"
								/>
							</div>
						</div>
					</footer>
					{openContact && (
						<Contactanos open={openContact} handleClose={handleCloseContact} />
					)} */}
				</Grid>
			</Box>
      {/* header */}
    </PageBase>
  );
};
