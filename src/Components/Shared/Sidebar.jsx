import * as React from 'react';
import logo from '../../assets/304305481_470478301760187_6739104333513463181_n.jpg'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/home' },
  { text: 'Products', icon: <InventoryIcon />, path: '/products' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
  { text: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' },
  
  { text: 'Verify', icon: <VerifiedUserIcon />, path: '/verify' },

];

export default function Sidebar({ onSidebarChange }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    // Close drawer by default on mobile
    if (isMobile) {
      setOpen(false);
      onSidebarChange(true);
    }
  }, [isMobile, onSidebarChange]);

  const handleDrawerOpen = () => {
    setOpen(true);
    onSidebarChange(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    onSidebarChange(false);
  };

  const handleItemClick = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerClose();
    }
  };

  const drawerContent = (
    <>
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', px: 2 }}>
          <Avatar
            alt="Admin"
            src={logo}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant="subtitle1" sx={{ color: 'white', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Administrator
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(item.path)}
              selected={location.pathname === item.path}
              sx={{
                color: 'white',
                py: { xs: 1.5, sm: 2 }, // Taller touch targets on mobile
                '&.Mui-selected': {
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'white',
                    color: 'black',
                  },
                },
                '&:hover': {
                  bgcolor: 'black',
                  color: 'white',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: { xs: 40, sm: 56 } }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        open={open} 
        sx={{ 
          bgcolor: 'white', 
          color: '#046584',
          boxShadow: 1
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ 
              mr: 2, 
              ...(open && { display: { sm: 'none' } }),
              padding: { xs: 1, sm: 1.5 }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#046584',
            },
          }}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#046584',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {drawerContent}
        </Drawer>
      )}
      
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
