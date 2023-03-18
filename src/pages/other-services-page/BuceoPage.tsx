import { TemplatePage } from './components';
import { NoContent } from '../../components';

export const BuceoPage = () => {
  return (
    <TemplatePage>
      {/*Aqui va el contenido de la sección que debe ser iterable
       llamando al componente CardItemPage
      */}
      <NoContent />
      {/* Aqui va el ComponentDialog de DetailItem */}
      {/*TODO: Falta desarrollar el dialog de DatailItem */}
    </TemplatePage>
  );
};
