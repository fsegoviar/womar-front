type PropsItem = {
  img: string;
  text: string;
};

export const ItemFooter = (props: PropsItem) => {
  return (
    <div className="flex flex-col justify-center items-center mx-7 z-0">
      {/* Icono */}
      <div
        className="bg-center bg-contain bg-no-repeat w-16 h-16"
        style={{
          backgroundImage: `url(${props.img})`
        }}
      ></div>
      {/* Texto */}
      <p style={{ width: '100px' }} className="text-center text-white pt-5">
        {props.text}
      </p>
    </div>
  );
};
