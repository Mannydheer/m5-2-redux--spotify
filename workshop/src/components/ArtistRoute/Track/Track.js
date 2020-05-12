import React from 'react';
import PlayButton from 'react-play-button';


const Track = ({ track, setPlay, play }) => {

  return <PlayButton
    active={play === track.name}
    play={() => setPlay(track.name)}
    stop={() => setPlay(null)}
    url={track.preview_url}
  >
  </PlayButton>
};

export default Track;
