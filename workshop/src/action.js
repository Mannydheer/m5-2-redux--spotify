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
// ARTIST

export const requestCurrentArtist = () => ({
    type: 'REQUEST_CURRENT_ARTIST'
})

export const updateCurrentArtist = (artist) => ({
    type: 'UPDATE_CURRENT_ARTIST',
    artist

})

export const updateCurrentArtistError = () => ({
    type: 'UPDATE_CURRENT_ARTIST_ERROR',
})