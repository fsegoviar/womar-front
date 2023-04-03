import { Link } from 'react-router-dom';
import AnchorIcon from '@mui/icons-material/Anchor';
import GroupsIcon from '@mui/icons-material/Groups';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import styled from '@emotion/styled';

const dataNavigation = [
  {
    site: '/personal_maritimo',
    title: 'Personal Marítimo',
    icon: <GroupsIcon sx={{ width: '30px', height: '30px' }} />
  },
  {
    site: '/embarcaciones',
    title: 'Embarcaciones',
    icon: <AnchorIcon sx={{ width: '30px', height: '30px' }} />
  },
  {
    site: '/otros_servicios',
    title: 'Servicios',
    icon: <MiscellaneousServicesIcon sx={{ width: '30px', height: '30px' }} />
  }
];

export const CategoryButton = styled.button`
  color: #ffffff;
  min-width: 200px;
  border-radius: 0% 30px 30px 0%;
  transition: background 2s ease-out;

  :hover {
    background: linear-gradient(
      90deg,
      rgba(0, 229, 182, 1) 0%,
      rgba(0, 124, 240, 1) 100%
    );
  }
`;

export const CircleIcon = styled.div`
  clip-path: circle(50% at 50% 50%);
  width: 100px;
  height: 100px;
  position: absolute;
  left: -90px;
  top: -20px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainCategories = () => {
  const icons = [
    {
      url: require('../assets/images/ico-p-maritimo.png')
    },
    {
      url: require('../assets/images/ico-embaraciones.png')
    },
    {
      url: require('../assets/images/ico-config.png')
    }
  ];

  return (
    <>
      {dataNavigation.map((item, index) => (
        <div key={index} className="flex justify-center items-center mx-5">
          {/* Version Desktop */}
          <Link to={item.site} style={{ textDecoration: 'none' }}>
            <div className="flex relative items-center mx-10 my-5">
              <CircleIcon>
                <div
                  style={{
                    backgroundImage: `url(${icons[index].url})`
                  }}
                  className="bg-contain bg-center bg-no-repeat w-20 h-20 "
                ></div>
              </CircleIcon>
              <CategoryButton className="px-5 py-3 my-3 text-[20px]  md:m-0 bg-primary">
                {item.title}
              </CategoryButton>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
