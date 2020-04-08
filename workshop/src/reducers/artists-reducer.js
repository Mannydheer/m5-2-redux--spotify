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
                status: 'success',
            }
        }
        case 'UPDATE_CURRENT_ARTIST_ERROR': {
            return {
                ...state,
                status: 'error'
            }
        }
        default: {
            return state;
        }
    }
}