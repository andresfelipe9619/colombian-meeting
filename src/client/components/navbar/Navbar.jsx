import React, {useState, useCallback} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {ShoppingCart, Favorite} from '@material-ui/icons';
import MoreIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';
import {withRouter} from 'react-router-dom';

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = !!anchorEl;
  const isMobileMenuOpen = !!mobileMoreAnchorEl;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const goTo = useCallback((route) => (event) => props.history.push(route), [
    props.history,
  ]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={goTo('/')}
          >
            NeuroMarker
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'Search'}}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={goTo('/cart')}>
              <ShoppingCart />
            </IconButton>
            <IconButton
              aria-label="Show 4 new notifications"
              color="inherit"
              onClick={goTo('/favorites')}
            >
              <Favorite />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar component="nav" variant="dense" color="secondary">
          <Typography variant="h6" noWrap onClick={goTo('/products')}>
            Categories
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <MemoMobileMenu
        {...{
          goTo,
          mobileMenuId,
          isMobileMenuOpen,
          mobileMoreAnchorEl,
          handleProfileMenuOpen,
          handleMobileMenuClose,
        }}
      />
      <MemoMenu {...{menuId, anchorEl, isMenuOpen, handleMenuClose}} />
    </div>
  );
}
const MemoMobileMenu = React.memo(MobileMenu);

function MobileMenu({
  goTo,
  mobileMenuId,
  isMobileMenuOpen,
  mobileMoreAnchorEl,
  handleProfileMenuOpen,
  handleMobileMenuClose,
}) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit" onClick={goTo('/cart')}>
          <ShoppingCart />
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="Show 4 new notifications"
          color="inherit"
          onClick={goTo('/favorites')}
        >
          <Favorite />
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
}
const MemoMenu = React.memo(MyMenu);
function MyMenu({menuId, anchorEl, isMenuOpen, handleMenuClose}) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
}

export default withRouter(React.memo(Navbar));
