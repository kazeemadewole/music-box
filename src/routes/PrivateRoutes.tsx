import React, { ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import MainSection from '../Components/listeningHistory/MainSection';
import UserForm from '../Components/userProfile/userForm';
import ArtistDetails from '../Pages/ArtistDetails/ArtistDetails';
import Artists from '../Pages/Artists/Artists';
import Browse from '../Pages/Browse/Browse';
import GenreDetails from '../Pages/GenreDetails/GenreDetails';
import Playlists from '../Pages/Playlists/Playlists';
import PlaylistDetails from '../Pages/PlaylistDetails/PlaylistDetails';
import Controls from '../Components/Player/controls';
import HomePage from '../Components/Homepage/Homepage';
import ForgotPassword from '../Pages/Auth/forgotPassword/forgotPassword';
import LogIn from '../Pages/Auth/Login/LogIn';
import ResetPassword from '../Pages/Auth/resetPassword/RestPassword';
import SignUp from '../Pages/Auth/SignUp/SignUp';
import LandingPage from '../Pages/LandingPage/LandingPage';

const routes = ['', 'login', 'signup', 'listening-history', 'user-profile', 'password-reset', 'forgotPassword'];

function PrivateRoute(): ReactElement {
  const location = useLocation();

  return (
    <>
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route exact path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route exact path='/password-reset' component={ResetPassword} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/user-profile' component={UserForm} />
        <Route exact path='/listening-history' component={MainSection} />
        <Route exact path='/browse' component={Browse} />
        <Route exact path='/genre-details' component={GenreDetails} />
        <Route exact path='/playlists' component={Playlists} />
        <Route exact path='/playlist-details' component={PlaylistDetails} />
        <Route exact path='/artists' component={Artists} />
        <Route exact path='/artist-details' component={ArtistDetails} />
      </Switch>
      {!routes.includes(location.pathname.split('/')[1]) && <Controls />}
    </>
  );
}

export default PrivateRoute;
