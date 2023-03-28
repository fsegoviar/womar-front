import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  AdminPage,
  BuceoPage,
  HomePage,
  MaritimePersonnelPage,
  OtherSectionsPage,
  PublishPage,
  ResultSearch,
  ShipSectionPage,
  UserSectionPage
} from './pages';
import { useDispatch } from 'react-redux';
import { changeStateLogin } from './store/loginSlice';
import { updateInfoUser } from './store/userSlice';
import { ObtenerInfoUsuario } from './services';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { fetchData } = ObtenerInfoUsuario();

  useEffect(() => {
    fetchData().then((response: any) => {
      if (response.error) {
        dispatch(changeStateLogin(false));
      } else {
        dispatch(updateInfoUser(response.result.rol));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/embarcaciones'} element={<ShipSectionPage />} />
        <Route
          path={'/personal_maritimo'}
          element={<MaritimePersonnelPage />}
        />
        <Route path={'/otros_servicios'} element={<OtherSectionsPage />} />
        <Route path={'/otros_servicios/:categoria'} element={<BuceoPage />} />
        <Route path={'/perfil/:userId'} element={<UserSectionPage />} />
        <Route path={'/publicar/:userId'} element={<PublishPage />} />
        <Route path={'resultados_busqueda'} element={<ResultSearch />} />
        <Route path={'/administrador'} element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
