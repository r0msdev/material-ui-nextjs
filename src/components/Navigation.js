'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/contexts/TranslationsContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import Link from 'next/link';
import Button from '@mui/material/Button';

const drawerWidth = 240;

export default function Navigation({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useTranslations();
  
  // Extract locale from pathname (e.g., /es/about -> es)
  const currentLocale = pathname.split('/')[1] || 'en';
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: t('home'), icon: <HomeIcon />, href: `/${currentLocale}` },
    { text: t('about'), icon: <InfoIcon />, href: `/${currentLocale}/about` },
  ];
  
  const switchLocale = (newLocale) => {
    // Get current path without locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    return `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  };

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {t('app_title')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              href={switchLocale('en')}
              color="inherit"
              size="small"
              startIcon={<LanguageIcon />}
              variant={currentLocale === 'en' || currentLocale === 'en-US' ? 'outlined' : 'text'}
            >
              EN
            </Button>
            <Button
              component={Link}
              href={switchLocale('es')}
              color="inherit"
              size="small"
              startIcon={<LanguageIcon />}
              variant={currentLocale === 'es' || currentLocale === 'es-ES' ? 'outlined' : 'text'}
            >
              ES
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
