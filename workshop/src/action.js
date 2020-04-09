export const requestAccessToken = () => ({
    type: 'REQUEST_ACCESS_TOKEN',
});

export const receiveAccessToken = (token) => ({
    type: 'RECEIVE_ACCESS_TOKEN',
    token,
});

export const receiveAccessTokenError = () => ({
    type: 'RECEIVE_ACCESS_TOKEN_ERROR',
});

// --------------ARTIST--------------

export const requestCurrentArtist = () => ({
    type: 'REQUEST_CURRENT_ARTIST'
})

export const updateCurrentArtist = (artist) => ({
    type: 'UPDATE_CURRENT_ARTIST',
    artist

})
export const receiveArtistInfoError = () => ({
    type: 'RECEIVE_ARTIST_INFO_ERROR',
})
// --------------TRACKS--------------

export const receiveTopTracks = (tracks) => ({
    type: 'RECEIVE_TOP_TRACKS',
    tracks
})
// --------------RELATED ARTISTS--------------
export const receiveRelatedArtists = (relatedArtists) => ({
    type: 'RECEIVE_RELATED_ARTISTS',
    relatedArtists
})
// --------------PROMISEALL - ALL DATA RECEIVED.--------------

export const finishReceivingAllArtistInfo = (allInfo) => ({
    type: 'UPDATE_ALL_ARTIST_INFO',
    allInfo
})