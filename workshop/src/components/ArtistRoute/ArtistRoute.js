import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchArtistProfile } from '../../helpers/api-helpers';
import { useParams } from 'react-router';
import { fetchArtistProfile } from '../../helpers/api-helpers';
import { FollowerConverter } from '../../utils/utils';
import { updateCurrentArtist, updateCurrentArtistError, requestCurrentArtist } from '../../action';

const ArtistRoute = () => {
  const accessToken = useSelector(state => state.auth.token);
  const currentArtist = useSelector(artistState => artistState.artists.currentArtist.profile);
  const [followNum, setFollowNum] = useState(null);

  let { id } = useParams();
  let dispatch = useDispatch();

  console.log(currentArtist)

  useEffect(() => {
    if (currentArtist !== null) {
      console.log('fuck')
      let value = FollowerConverter(currentArtist.followers.total)
      setFollowNum(value)
    }
  }, [currentArtist])

  useEffect(() => {
    if (accessToken !== null) {
      dispatch(requestCurrentArtist())
      const handleToken = async () => {
        try {
          let response = await fetchArtistProfile(accessToken, id)
          dispatch(updateCurrentArtist(response))
        }
        catch (error) {
          dispatch(updateCurrentArtistError())
          throw Error(error)
        }
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
    {currentArtist !== null ?
      <div>
        <img style={{ width: '300px' }} src={`${currentArtist.images[0].url}`}></img>
        <div>{currentArtist.name}</div>
        <div><strong>{followNum !== null && followNum}</strong> followers</div>
        <div>
          {currentArtist.genres.map((genre, index) => {
            if (index < 2) {
              return <div>{genre}</div>
            }
          })}
        </div>
      </div>


      : <div>LOADING</div>}
  </React.Fragment>
};

export default ArtistRoute;
