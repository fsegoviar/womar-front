import { useNavigate } from 'react-router-dom';

type CardSectionTypes = {
  bgImage: string;
  title: string;
  urlNavigate: string;
};
export const CardSection = (props: CardSectionTypes) => {
  const navigate = useNavigate();
  return (
    <div className={'col-span-4'}>
      <div
        className={
          'relative w-11/12 h-[250px] grid place-items-center ' +
          'before:absolute before:top-0 before:left-0 before:inset-0 ' +
          'before:bg-[rgba(0,0,0,.33)] bg-no-repeat ' +
          'bg-contain bg-cover cursor-pointer before:cursor-pointer' +
          'border-2 rounded-3xl before:rounded-3xl'
        }
        style={{
          backgroundImage: `url(${props.bgImage})`
        }}
        onClick={() => navigate(props.urlNavigate)}
      >
        <p className={'text-white z-10 cursor-pointer text-3xl'}>
          {props.title}
        </p>
      </div>
    </div>
  );
};
