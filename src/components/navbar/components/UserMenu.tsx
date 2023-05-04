import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface PropsMenu {
  handleCloseSession: () => void;
}
export const UserMenu = (props: PropsMenu) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [urlImgUser, setUrlImgUser] = useState('');

  const navigate = useNavigate();
  const { IdUser } = parseJwt();
  const user = useSelector((state: RootState) => state.userRol);

  useEffect(() => {
    if (user) setUrlImgUser(user.imgPerfil);
  }, [user]);

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Configuraciones">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {urlImgUser !== '' && user && (
            <Avatar
              src={urlImgUser}
              sx={{
                width: '50px',
                height: '50px'
              }}
            ></Avatar>
          )}
          {user && urlImgUser === '' && (
            <Avatar
              {...stringAvatar(
                `${user?.nombre} ${user?.apellidoPaterno} ${user?.apellidoMaterno}`
              )}
              sx={{ bgcolor: '#0bafdd' }}
              src="/static/images/avatar/2.jpg"
            ></Avatar>
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            onClick={() => navigate(`/perfil/${IdUser}`)}
          >
            Mi Perfil
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            onClick={() => props.handleCloseSession()}
          >
            Cerrar Sesión
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
