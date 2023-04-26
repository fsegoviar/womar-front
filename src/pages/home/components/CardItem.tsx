import React from 'react';
import { RiMapPin2Fill } from 'react-icons/ri';
type PropsCard = {
  title: string;
  direction: string;
  price: string;
  img: string;
};

export const CardItem = (props: PropsCard) => {
  return (
    <div className="h-[450px] xs:w-full sm:w-11/12 bg-white rounded-3xl">
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
						style={{ height: '20px', width: '20px', marginRight: '5px'}}
						alt="1"
					/>
          {props.direction}
        </label>
        <label className="block font-thin text-md">$ {props.price}</label>
      </div>
    </div>
  );
};
