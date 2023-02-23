import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  AdminPage,
  HomePage,
  MaritimePersonnelPage,
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
        <Route path={'/perfil/:userId'} element={<UserSectionPage />} />
        <Route path={'/publicar/:userId'} element={<PublishPage />} />
        <Route path={'resultados_busqueda'} element={<ResultSearch />} />
        <Route path={'/administrador'} element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
