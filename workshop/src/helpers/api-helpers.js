export function fetchArtistProfile(token, artistId) {


    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    return fetch(url, options).then((response) => response.json())
        .catch((err) => {
            console.log('ERROR FOR ARTIST IN HELPERS')
        });
}

export function fetchArtistTrack(token, artistId) {

    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=CA`

    return fetch(url, options).then((response) => response.json())
        .catch((err) => {
            console.log('ERROR FOR TRACKS IN HELPERS')
        });

}