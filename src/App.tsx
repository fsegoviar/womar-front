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

function App() {
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
        <Route path={'/otros_servicios/buceo'} element={<BuceoPage />} />
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
