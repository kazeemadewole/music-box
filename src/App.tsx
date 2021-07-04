/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext';
import { signIn } from './utils/axiosInstance';
import Routes from './routes';
import PlayerState from './Contexts/playerState';
import 'bootstrap/dist/css/bootstrap.min.css';
import Playlist from './Components/playlist/Playlist';
import Artist from './Components/Artist/Artist';
import Album from './Components/Album/Album';
import Albulms from './Components/Library/Albulms';
import Playlists from './Components/Library/Playlists';
// import MyNavBar from './Components/BrowseAndGenreNavbar/BrowseAndGenreNavBar';

function App() {
  useEffect(() => {
    signIn();
  }, []);
  return (
    <div className='App'>
      <AuthProvider>
        <PlayerState>
          <div>
            <Router>
              <Routes />
              {/* <MyNavBar /> */}
            </Router>
          </div>

          <Router>
            <Switch>
              <Route exact path='/albulms' component={Albulms} />
              <Route exact path='/playlist' component={Playlists} />
              <Route path='/playlist/:id' component={Playlist} />
              <Route exact path='/artist' component={Artist} />
              <Route exact path='/album/:id' component={Album} />
            </Switch>
          </Router>
        </PlayerState>
      </AuthProvider>
    </div>
  );
}

export default App;
