import React from 'react';
import styled from 'styled-components';
import {
    Link
} from 'react-router-dom';

const RelatedArtists = ({ artist }) => {


    return (
        <Link to={`/artists/${artist.id}`}>
            <Wrapper>
                <Image src={artist.images[0].url}></Image>
                <Name>{artist.name}</Name>
            </Wrapper>
        </Link>

    )


}

export default RelatedArtists;

const Image = styled.img`
width: 150px;
height: 150px;
border-radius: 50%;

&:hover {
    cursor: pointer;
}

`

const Wrapper = styled.div`
display: inline-block;
color: white;
padding: 20px;
`
const Name = styled.h2`
position: relative;
bottom: 70px;
`
