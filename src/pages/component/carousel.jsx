import React from 'react';

function CarouselWindow({imageURL}) {


    return (
        <>
            <img className={`${imageURL===null ? "hidden" : ""}`} src={imageURL}  />
        </>
    )
}

export default CarouselWindow