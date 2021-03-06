import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import Profile from './Profile/Profile';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import useAuth from '../../hooks/useAuth';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EmailIcon from '@mui/icons-material/Email';
import Payment from './Payment/Payment';
import GiveReview from './GiveReview/GiveReview';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import AdminRoute from '../AdminRoute/AdminRoute';
import AddCourses from './AddCourses/AddCourses';
import Messages from './Messages/Messages';
import ManageCourses from './ManageCourses/ManageCourses';
import Cart from './Cart/Cart';
import ManageOrders from './ManageOrders/ManageOrders';

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

// main component start from here
const Dashboard = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // getting user data from context api here 
    const { user, logoutUser, admin } = useAuth();

    // nesting router hook here 
    let { path, url } = useRouteMatch();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgcolor: 'text.primary' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {user.displayName ? user.displayName : 'Anonymous'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Link style={{ textDecoration: "none", color: '#000' }} to={'/'}>
                    <ListItem button>
                        <ListItemIcon>
                            {<HomeIcon />}
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <List>
                    <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/profile`}>
                        <ListItem button>
                            <ListItemIcon>
                                {<AccountBoxIcon />}
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/cart`}>
                        <ListItem button>
                            <ListItemIcon>
                                {<ShoppingCartIcon />}
                            </ListItemIcon>
                            <ListItemText primary="Cart" />
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/give-review`}>
                        <ListItem button>
                            <ListItemIcon>
                                {<ReviewsIcon />}
                            </ListItemIcon>
                            <ListItemText primary="Give Review" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                {admin && <Box>
                    <List>
                        <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/add-courses`}>
                            <ListItem button>
                                <ListItemIcon>
                                    {<AddIcon />}
                                </ListItemIcon>
                                <ListItemText primary="Add Course" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/make-admin`}>
                            <ListItem button>
                                <ListItemIcon>
                                    {<SupervisorAccountIcon />}
                                </ListItemIcon>
                                <ListItemText primary="Make Admin" />
                            </ListItem>
                        </Link>
                    </List>
                    <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/manage-courses`}>
                        <ListItem button>
                            <ListItemIcon>
                                {<FileCopyIcon />}
                            </ListItemIcon>
                            <ListItemText primary="Manage Courses" />
                        </ListItem>
                    </Link>
                    <List>
                        <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/manage-orders`}>
                            <ListItem button>
                                <ListItemIcon>
                                    {<AutoAwesomeMotionIcon />}
                                </ListItemIcon>
                                <ListItemText primary="Manage orders" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: "none", color: '#000' }} to={`${url}/messages`}>
                            <ListItem button>
                                <ListItemIcon>
                                    {<EmailIcon />}
                                </ListItemIcon>
                                <ListItemText primary="Messages" />
                            </ListItem>
                        </Link>
                    </List>
                </Box>}
                <Divider />
                <List>
                    <ListItem onClick={logoutUser} button>
                        <ListItemIcon>
                            {<ExitToAppIcon />}
                        </ListItemIcon>
                        <ListItemText primary="logout" />
                    </ListItem>
                </List>
            </Drawer>

            {/* main app drawer start from here  */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Switch>
                    <Route exact path={path}>
                        <Profile />
                    </Route>
                    <Route path={`${path}/profile`}>
                        <Profile />
                    </Route>
                    <Route path={`${path}/cart`}>
                        <Cart />
                    </Route> {/* 
                    <Route path={`${path}/payment/:Id`}>
                        <Payment />
                    </Route>  */}
                    <Route path={`${path}/give-review`}>
                        <GiveReview />
                    </Route>
                    <AdminRoute path={`${path}/add-courses`}>
                        <AddCourses />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manage-courses`}>
                        <ManageCourses />
                    </AdminRoute>
                    <AdminRoute path={`${path}/messages`}>
                        <Messages />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manage-orders`}>
                        <ManageOrders />
                    </AdminRoute>
                    <AdminRoute path={`${path}/make-admin`}>
                        <MakeAdmin />
                    </AdminRoute>
                </Switch>
            </Box>
        </Box>
    );
};

export default Dashboard;