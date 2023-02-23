import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, MaritimePersonnelPage, ShipSectionPage } from './pages';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
