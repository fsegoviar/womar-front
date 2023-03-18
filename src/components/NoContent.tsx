import { AiFillAlert } from 'react-icons/ai';

export const NoContent = () => {
  return (
    <>
      <div className="w-full py-10 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <AiFillAlert size={48} className="text-gray-500" />
          <p className="text-xl text-gray-500">
            En estos momentos no se posee contenido para esta sección
          </p>
        </div>
      </div>
    </>
  );
};
