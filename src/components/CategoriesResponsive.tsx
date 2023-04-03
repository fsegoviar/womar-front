import { Link } from 'react-router-dom';
import AnchorIcon from '@mui/icons-material/Anchor';
import GroupsIcon from '@mui/icons-material/Groups';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import styled from '@emotion/styled';

const CircleIcon = styled.div`
  clip-path: circle(50% at 50% 50%);
  width: 70px;
  height: 70px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    site: '/otros_srvicios',
    title: 'Servicios',
    icon: <MiscellaneousServicesIcon sx={{ width: '30px', height: '30px' }} />
  }
];

export const CategoriesResponsive = () => {
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
        <div key={index} className="items-center w-full mx-5 relative">
          {/* Version Desktop */}
          <Link
            to={item.site}
            style={{ textDecoration: 'none' }}
            className="relative"
          >
            <div className="flex relative flex-col items-center my-5">
              <CircleIcon>
                <div
                  style={{
                    backgroundImage: `url(${icons[index].url})`
                  }}
                  className="bg-contain bg-center bg-no-repeat w-10 h-10 "
                ></div>
              </CircleIcon>
              <button className="pt-5 text-sm">{item.title}</button>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
