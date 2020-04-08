import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from '../../action';
import ArtistRoute from '../ArtistRoute/ArtistRoute';
import GlobalStyles from '../GlobalStyles';

const DEFAULT_ARTISTS_ID = '3TVXtAsR1Inumwj472S9r4';

//fetch for token



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(requestAccessToken())

    const handleToken = async () => {
      try {
        let response = await fetch('/spotify_access_token');
        if (response.status === 200) {
          let token = await response.json();
          dispatch(receiveAccessToken(token.access_token))
        }
        else {
          throw Error('Error getting token inside handleToken')
        }
      }
      catch (error) {
        dispatch(receiveAccessTokenError());
        throw Error(error)

      }
    }
    handleToken();
  }, [])


  return <Router>
    <GlobalStyles></GlobalStyles>
    <Switch>
      <Route exact path="/artists/:id">
        <ArtistRoute DEFAULT_ARTISTS_ID={DEFAULT_ARTISTS_ID}></ArtistRoute>
      </Route>
      <Route exact path="/">
        <Redirect to={`/artists/${DEFAULT_ARTISTS_ID}`} />
      </Route>
    </Switch>






  </Router>
};

export default App;
