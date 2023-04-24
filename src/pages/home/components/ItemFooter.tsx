type PropsItem = {
  img: string;
  text: string;
};

export const ItemFooter = (props: PropsItem) => {
	const whatsapp = (): void => {
		window.open('https://wa.link/w7capu', '_blank')
  };
  return (
    <div className="flex flex-col justify-center items-center mx-7 z-0 cursor-pointer" onClick={whatsapp}>
      {/* Icono */}
      <div
        className="bg-center bg-contain bg-no-repeat w-16 h-16"
        style={{
          backgroundImage: `url(${props.img})`
        }}
      ></div>
      {/* Texto */}
			<p>&nbsp;</p>
      <p style={{ width: '100px' }} className="text-center text-white">
        {props.text}
      </p>
    </div>
  );
};
