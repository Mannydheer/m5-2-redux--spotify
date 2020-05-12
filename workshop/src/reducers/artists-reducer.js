const initialState = {
    status: 'idle',
    currentArtist: {
        profile: null,
    }
}
export default function artistsReducer(state = initialState,
    action) {
    switch (action.type) {
        case 'REQUEST_CURRENT_ARTIST': {
            return {
                ...state,
                status: 'loading'
            }
        }
        case 'UPDATE_CURRENT_ARTIST': {
            //make a copy to target profile specifically
            let stateCopy = { ...state }
            stateCopy.currentArtist.profile = action.artist
            return {
                ...stateCopy,
                // status: 'success',
            }
        }
        case 'RECEIVE_ARTIST_INFO_ERROR': {
            return {
                ...state,
                status: 'error'
            }
        }
        case 'RECEIVE_TOP_TRACKS': {
            let stateCopy = { ...state }
            stateCopy.currentArtist.tracks = action.tracks
            return {
                ...stateCopy,
            }
        }
        case 'RECEIVE_RELATED_ARTISTS': {
            let stateCopy = { ...state }
            stateCopy.currentArtist.relatedArtists = action.relatedArtists
            return {
                ...stateCopy
            }
        }
        case 'UPDATE_ALL_ARTIST_INFO': {
            return {
                ...state,
                status: 'success'
            }
        }
        default: {
            return state;
        }
    }
}