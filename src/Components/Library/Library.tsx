import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Albulms from './Albulms';

import Playlists from './Playlists';
// eslint-disable-next-line import/no-self-import

function Library() {
  return (
    <>
      <Router>
        <Link to='playlists'> Playlists </Link>
        <Link to='albulms'> Albums </Link>

        <Switch>
          <Route path='/albulms'>
            <Albulms />
          </Route>
        </Switch>
        <Route path='/playlists'>
          <Playlists />
        </Route>
      </Router>
    </>
  );
}

export default Library;
