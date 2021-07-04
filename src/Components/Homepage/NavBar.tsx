/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, FormEvent, SetStateAction, Dispatch, useRef, useEffect } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { property } from './Homepage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      // flexGrow: 1,
      // backgroundColor: 'black',
      // width: '90vw',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      marginLeft: '20px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',

      borderRadius: '30px',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,

      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    user: {
      marginTop: '11px',
      marginLeft: '10px',
      marginRight: '-10px',
    },
    homeBtn: {
      marginLeft: '15px',
      borderRadius: '30px',
      borderWidth: '2px',
      borderColor: '#35EDFB',
      color: '#35EDFB',
      fontWeight: 'bold',
      fontSize: '15px',
      marginRight: '440px',
      // borderRdius: 'linear-gradient(#9B2DEF,#2D9BEF,#35EDFB)',
    },
    typography: {
      padding: theme.spacing(2),
      cursor: 'pointer',
    },
  })
);

interface Props {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fetchSearch: (e: FormEvent<HTMLFormElement>) => void;
  searchResult: property;
  setSearchInfo: Dispatch<SetStateAction<string>>;
  setSearchResult: Dispatch<SetStateAction<property>>;
}

export default function PrimarySearchAppBar({
  name,
  onChange,
  fetchSearch,
  searchResult,
  setSearchInfo,
  setSearchResult,
}: Props) {
  // const [data, setData] = useState([]);
  const container = useRef<HTMLUListElement>(null);
  console.log(searchResult, '*****');
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function handleClickOutside(event: { target: any }) {
    if (container.current?.contains(event.target)) {
      return;
    }
    setSearchResult({});
    setSearchInfo('');
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position='static' style={{ backgroundColor: 'black', width: '88vw' }}>
        <Toolbar>
          <Link to='/home'>
            <img
              src='http://indiemusicbox.com/wp-content/uploads/2014/06/indiemusicbox-1024x1024.jpg'
              alt='i am here'
              style={{ width: '25px' }}
            />
          </Link>
          <Link to='/browse' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant='h6' noWrap>
              Browse
            </Typography>
          </Link>
          <Link to='/library' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant='h6' noWrap>
              Library
            </Typography>
          </Link>
          <Link to='/home'>
            <Button className={classes.homeBtn} variant='outlined' color='primary'>
              Home
            </Button>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={(e) => fetchSearch(e)} style={{ position: 'relative' }}>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
              />
              <ul
                ref={container}
                style={{
                  background: 'white',
                  position: 'absolute',
                  top: '40px',
                  listStyle: 'none',
                  color: 'black',
                  maxHeight: '400px',
                  width: '300px',
                  overflow: 'scroll',
                  zIndex: 1,
                }}
              >
                {searchResult && searchResult.artist
                  ? searchResult.artist.artist.map((artist: Record<string, any>) => (
                      <li key={artist.id} style={{ marginBottom: 5, fontSize: '20px' }}>
                        <a href='/artist' style={{ textDecoration: 'none', color: 'black', width: 'max-content' }}>
                          {artist.name}
                        </a>
                      </li>
                    ))
                  : null}
              </ul>
            </form>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to='profile' style={{ textDecoration: 'none', color: 'white' }}>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Link>
            <Link to='profile' style={{ textDecoration: 'none', color: 'white' }}>
              <Typography className={classes.user}>{name}</Typography>
            </Link>

            <PopupState variant='popper' popupId='demo-popup-popper'>
              {(popupState: any) => (
                <div>
                  <IconButton aria-label='show 17 new notifications' color='inherit' {...bindToggle(popupState)}>
                    <ArrowDropDownIcon />
                  </IconButton>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <Typography className={classes.typography}>logout</Typography>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
