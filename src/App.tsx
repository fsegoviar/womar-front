import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, ShipSectionPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/embarcaciones'} element={<ShipSectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
