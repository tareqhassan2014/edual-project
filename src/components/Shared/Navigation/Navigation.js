import React from "react";
import "./Navigation.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from '../../../images/logo.png';

const Navigation = () => {

  // user info here 
  const { user, logoutUser } = useAuth();

  // react router hook here 
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return <AppBar position="static" sx={{ bgcolor: '#EDEEF3', py: 2 }}>
    <Container>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: '#000' }}
        >
          <Typography onClick={() => history.push('/')} sx={{ ms: '-10px', display: 'flex' }}>
            <img style={{ width: '10%', padding: 5 }} src={logo} alt="" />
            <h2 className="title">Educal</h2>
          </Typography>
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >

            <Button onClick={() => history.push('/')}>Home</Button>
            <Button onClick={() => history.push('/courses')}>Courses</Button>
            {/* <Button onClick={() => history.push('/blogs')}>Blog</Button> */}
            <Button onClick={() => history.push('/reviews')}>Reviews</Button>
            <Button onClick={() => history.push('/about')}>About</Button>
            <Button onClick={() => history.push('/contact')}>Contact</Button>
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
          <Typography onClick={() => history.push('/')} sx={{ ms: '-10px', display: 'flex' }}>
            <img style={{ width: '10%', padding: 5 }} src={logo} alt="" />
            <h2 className="title">Educal</h2>
          </Typography>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
          <Button onClick={() => history.push('/')}>Home</Button>
          <Button onClick={() => history.push('/courses')}>Courses</Button>
          {/* <Button onClick={() => history.push('/blogs')}>Blog</Button> */}
          <Button onClick={() => history.push('/reviews')}>Reviews</Button>
          <Button onClick={() => history.push('/about')}>About</Button>
          <Button onClick={() => history.push('/contact')}>Contact</Button>
        </Box>

        {user.email ? <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Button>Profile</Button>
            <Button onClick={() => history.push('/dashboard')}>Dashboard</Button>
            <Button onClick={logoutUser}>Logout</Button>
          </Menu>
        </Box> : <Button variant="contained" onClick={() => history.push('/login')}>Login</Button>}
      </Toolbar>
    </Container>
  </AppBar>;
};

export default Navigation;
