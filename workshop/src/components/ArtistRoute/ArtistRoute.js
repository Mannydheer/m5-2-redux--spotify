import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchArtistProfile } from '../../helpers/api-helpers';
import { useParams } from 'react-router';
import { fetchArtistProfile, fetchArtistTrack, fetchRelatedArtists } from '../../helpers/api-helpers';
import { FollowerConverter } from '../../utils/utils';
import {
  updateCurrentArtist,
  receiveArtistInfoError,
  requestCurrentArtist,
  receiveTopTracks,
  finishReceivingAllArtistInfo,
  receiveRelatedArtists
} from '../../action';
import styled from 'styled-components';
import Track from './Track';
import Loader from 'react-loader-spinner'
import RelatedArtists from './RelatedArtists';


const ArtistRoute = () => {
  //Selectors
  const accessToken = useSelector(state => state.auth.token);
  const currentArtist = useSelector(artistState => artistState.artists.currentArtist.profile);
  const currentArtistTracks = useSelector(artistTracks => artistTracks.artists.currentArtist.tracks);
  const relatedArtists = useSelector(relatedArtists => relatedArtists.artists.currentArtist.relatedArtists);
  const loading = useSelector(loading => loading.artists.status)

  console.log(loading)
  //useStates.
  const [play, setPlay] = useState(null);
  const [followNum, setFollowNum] = useState(null);

  console.log(currentArtist)


  let { id } = useParams();
  let dispatch = useDispatch();


  useEffect(() => {

    console.log(currentArtist)
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
        let response = await fetchArtistProfile(accessToken, id)
        if (response) {
          dispatch(updateCurrentArtist(response))
        }
        let trackResponse = await fetchArtistTrack(accessToken, id)
        if (trackResponse) {
          dispatch(receiveTopTracks(trackResponse))
        }
        let relatedArtistResponse = await fetchRelatedArtists(accessToken, id)
        if (relatedArtistResponse) {
          dispatch(receiveRelatedArtists(relatedArtistResponse))
        }
        //if all the data is ready and everything is a reponse...
        Promise.all([response, trackResponse, relatedArtistResponse])
          .then(() => {
            dispatch(finishReceivingAllArtistInfo())
          })
          .catch(() => {
            dispatch(receiveArtistInfoError())
          })
      }
      handleToken();
    }
    //return nothign if all fails
    else {
      return;
    }
    //re-rendering on change of accessToken and id as we click though related artists.
  }, [accessToken, id])

  return <React.Fragment>
    <Wrapper>
      {/* try torefactor with loading */}
      {loading === 'success' ?
        <div>
          <Header>
            <StyledArtistImage src={`${currentArtist.images[0].url}`}></StyledArtistImage>
            <StyledArtistName>{currentArtist.name}</StyledArtistName>
            <StyledFollowers><strong style={{ color: '#ff4fd8' }}>{followNum !== null && followNum}</strong> followers</StyledFollowers>
          </Header>
          <div>
            {/* playButton */}
            <TrackWrapper>
              <TrackTitle>Top Tracks</TrackTitle>
              {
                currentArtistTracks.tracks.map((track, index) => {
                  //fix
                  if (index < 3) {
                    return (
                      <Track track={track} play={play} setPlay={setPlay}></Track>
                    )
                  }
                })}
            </TrackWrapper>
            {/* genres */}
            <GenreWrapper >
              {currentArtist.genres.map((genre, index) => {
                if (index < 2) {
                  return <StyledGenre key={index}>{genre}</StyledGenre>
                }
              })}
            </GenreWrapper>
          </div>
          <div>
            <div>Related Artists</div>

            <ImageWrapper>
              {relatedArtists.artists.map((artist) => {
                return (
                  <RelatedArtists artist={artist}></RelatedArtists>
                )
              })}
            </ImageWrapper>
          </div>
        </div>
        : <div>
          <Loader type="Audio" color="#ff4fd8" height={100} width={80} />
        </div>}
    </Wrapper>
  </React.Fragment >
};

export default ArtistRoute;

const Wrapper = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
line-height: 1.5;
text-align: center;

@media only screen and (max-width: 1200px) {
width: 100vw;
height: 100vh;

}

`
const ImageWrapper = styled.div`
overflow: auto;
white-space: nowrap;
width: 30vw;


@media only screen and (max-width: 1200px) {
width: 100vw;

  

}

`

const StyledArtistImage = styled.img`
border-radius: 50%;
height: 200px;
width: 200px;

`
const StyledArtistName = styled.h1`
font-size: 40px;
position: relative;
bottom: 80px;
`

const StyledFollowers = styled.div`
position: relative;
bottom: 80px;
`

const GenreWrapper = styled.div`
display: flex;
justify-content: space-evenly;
padding: 20px;

`
const StyledGenre = styled.div`
width: 150px;
background: rgba(75, 75, 75, 0.4);
border-radius: 4px;
padding: 10px;
`
const Header = styled.header`
position: relative;
top: 60px;
`

const TrackWrapper = styled.div`
padding: 10px;
`

const TrackTitle = styled.div`
padding: 20px;
`