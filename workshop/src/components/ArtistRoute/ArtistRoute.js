import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchArtistProfile } from '../../helpers/api-helpers';
import { useParams } from 'react-router';
import { fetchArtistProfile, fetchArtistTrack } from '../../helpers/api-helpers';
import { FollowerConverter } from '../../utils/utils';
import {
  updateCurrentArtist,
  updateCurrentArtistError,
  requestCurrentArtist,
  receiveTopTracks,
  finishReceivingAllArtistInfo
} from '../../action';
import styled from 'styled-components';
import Track from './Track';

const ArtistRoute = () => {
  const accessToken = useSelector(state => state.auth.token);
  const currentArtist = useSelector(artistState => artistState.artists.currentArtist.profile);
  const currentArtistTracks = useSelector(artistTracks => artistTracks.artists.currentArtist.tracks);
  const loading = useSelector(artistLoading => artistLoading.artists)

  const [play, setPlay] = useState(null);


  console.log(currentArtistTracks)

  const [followNum, setFollowNum] = useState(null);


  let { id } = useParams();

  console.log(id)
  let dispatch = useDispatch();


  useEffect(() => {
    if (currentArtist !== null) {
      let value = FollowerConverter(currentArtist.followers.total)
      setFollowNum(value)
    }
  }, [currentArtist])

  useEffect(() => {
    if (accessToken !== null) {
      //action will dispatch and switch status to loading for artist. 
      dispatch(requestCurrentArtist())
      const handleToken = async () => {
        //ARTIST.
        // try {
        //   //action will update current artist profile with artist data. -//receiveArtistProfile
        //   let response = await fetchArtistProfile(accessToken, id)
        //   dispatch(updateCurrentArtist(response))
        // }
        // catch (error) {
        //   dispatch(updateCurrentArtistError())
        //   throw Error(error)
        // }
        // //TOP TRACKS.
        // try {
        //   let trackResponse = await fetchArtistTrack(accessToken, id)
        // }
        // catch (error) {
        //   throw Error(error)
        // }
        let response = await fetchArtistProfile(accessToken, id)
        if (response) {
          dispatch(updateCurrentArtist(response))
        }
        let trackResponse = await fetchArtistTrack(accessToken, id)
        if (trackResponse) {
          dispatch(receiveTopTracks(trackResponse))
        }
        //just to say that all the data is ready. 
        Promise.all([response, trackResponse])
          .then(() => {
            dispatch(finishReceivingAllArtistInfo())
          })
          .catch(error => {
            //dispatch errors
            console.log('ERROR INSIDE PROMISEALL')
          })
      }

      handleToken();
    }
    //return nothign if all fails
    else {
      return;
    }
    //re-rendering on change of accessToken - every refetch
  }, [accessToken])

  return <React.Fragment>
    {currentArtist !== null && currentArtistTracks !== undefined ?
      <Wrapper>
        <div>
          <StyledArtistImage src={`${currentArtist.images[0].url}`}></StyledArtistImage>
          <StyledArtistName>{currentArtist.name}</StyledArtistName>
          <div><strong>{followNum !== null && followNum}</strong> followers</div>
          <div>
            {/* playButton */}
            {
              currentArtistTracks.tracks.map((track, index) => {
                //fix
                if (track.preview_url !== null) {
                  return (
                    <Track track={track} play={play} setPlay={setPlay}></Track>
                  )
                }
              })}
            {/* genres */}
            {currentArtist.genres.map((genre, index) => {
              if (index < 2) {
                return <div key={index}>{genre}</div>
              }
            })}
          </div>
        </div>
      </Wrapper>


      : <div>{loading.status}</div>}
  </React.Fragment >
};

export default ArtistRoute;

const Wrapper = styled.div`
background-color: black;
color: white;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
line-height: 1.5;
text-align: center;

`

const StyledArtistImage = styled.img`
border-radius: 50%;
height: 200px;
width: 200px;
`
const StyledArtistName = styled.h1`

font-size: 30px;


`
