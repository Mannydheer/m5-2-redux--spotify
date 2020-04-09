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
import styled from 'styled-components';

const DEFAULT_ARTISTS_ID = '4HzKw8XcD0piJmDrrPRCYk';

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
        <WrapperArtist>
          <ArtistRoute></ArtistRoute>
        </WrapperArtist>
      </Route>
      <Route exact path="/">
        <Redirect to={`/artists/${DEFAULT_ARTISTS_ID}`} />
      </Route>
    </Switch>






  </Router>
};

export default App;

const WrapperArtist = styled.div`
height: 100vh;
width: 100vw;


`
