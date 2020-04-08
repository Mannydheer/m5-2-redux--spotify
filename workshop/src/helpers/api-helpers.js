export function fetchArtistProfile(token, artistId) {


    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    return fetch(url, options).then((response) => response.json());
}