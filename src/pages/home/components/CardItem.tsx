import React from 'react';
type PropsCard = {
  title: string;
  direction: string;
  price: number;
  img: string;
};

export const CardItem = (props: PropsCard) => {
	const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-ES', {}).format(value);
  };

  return (
    <div className="h-[450px] xs:w-full bg-white rounded-3xl" style={{margin: '0 20px 0 20px'}}>
      {/* imagen */}
      <div
        className="rounded-3xl bg-center bg-cover bg-no-repeat w-full h-[270px]"
        style={{ backgroundImage: `url(${props.img})` }}
      ></div>
      <div className="p-5">
        <h2 className="font-bold text-2xl">{props.title}</h2>
        <label className="flex first-line:block font-thin text-md">
          {' '}
          {/* <RiMapPin2Fill size={24} className="mr-2" color="blue" /> */}
          <img
            src={`${require('./../../../assets/images/ico-ubicacion.png')}`}
            style={{ height: '20px', width: '20px', marginRight: '5px' }}
            alt="1"
          />
          {props.direction}
        </label>
        <label className="block font-thin text-md">$ {formatPrice(props.price)}</label>
      </div>
    </div>
  );
};
