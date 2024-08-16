import * as React from 'react';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const navItems = ['Home', 'Calculator', 'About', 'Contact Us'];
const navItems2 = ['Account', 'Settings', 'Logout'];

export default function NavDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [state, setState] = useState(false);
  // const navigateTrigger = useNavigate();

  return (<>

    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => { setIsDrawerOpen(true) }
        } >

        <MenuIcon sx={{ color: 'white' }} />

      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        // PaperProps allows us to resize the meu
        PaperProps={{
          sx: { width: "20%" }
        }}>

        <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
          (Menu)
        </Typography>

        <Divider />

        {/* //THIS SECTION HANDLES MENU BUTTON NAVIGATION  */}
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>

            {/* //------------------------------------------------ */}

            {item === 'Home' ? <ListItemButton sx={{ textAlign: 'center' }}
              component={Link}
              to='/'
              onClick={() => {
                console.info("HOME BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <ListItemText primary={item} />
            </ListItemButton> : ''}

             {/* //------------------------------------------------ */}

             {item === 'Calculator' ? <ListItemButton sx={{ textAlign: 'center' }}
              component={Link}
              to='/calculator'
              onClick={() => {
                console.info("CALCULATOR BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

            {item === 'About' ? <ListItemButton sx={{ textAlign: 'center' }}
              component={Link}
              to='/about'
              onClick={() => {
                console.info("ABOUT BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

            {item === 'Contact Us' ? <ListItemButton sx={{ textAlign: 'center' }}
              component={Link}
              to='/contact'
              onClick={() => {
                console.info("CONTACT US BUTTON TEST");
                setIsDrawerOpen(false);
              }}>
              <ListItemText primary={item} />
            </ListItemButton> : ''}

            {/* //------------------------------------------------ */}

          </ListItem>

        ))};

        {/* //------------------------------------------------ */}

        <Divider />

        {/* //------------------------------------------------ */}

        {navItems2.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'left' }}>

              {item === 'Account' ? <ListItemButton sx={{ textAlign: 'center' }}
                component={Link}
                to='/account'
                onClick={() => {
                  console.info("ACCOUNT BUTTON TEST");
                  setIsDrawerOpen(false);
                }}>
                <ListItemText primary={item} />
              </ListItemButton> : ''}

              {/* //------------------------------------------------ */}

              {item === 'Settings' ? <ListItemButton sx={{ textAlign: 'center' }}
                component={Link}
                to='/settings'
                onClick={() => {
                  console.info("SETTINGS BUTTON TEST");
                  setIsDrawerOpen(false);
                }}>
                <ListItemText primary={item} />
              </ListItemButton> : ''}

              {/* //------------------------------------------------ */}

              {item === 'Logout' ? <ListItemButton sx={{ textAlign: 'center' }}
                component={Link}
                to='/'
                onClick={() => {
                  console.info("LOGOUT BUTTON TEST");
                  setIsDrawerOpen(false);
                }}>
                <ListItemText primary={item} />
              </ListItemButton> : ''}
            </ListItemButton>
          </ListItem>
        ))}

      </Drawer>
    </Toolbar>

  </>
  );


}