import React from 'react';
import './FaceRecognition.scss';

const FaceRecognition = ({ imageUrl, box: { leftCol, topRow, rightCol, bottomRow } }) => {
    // console.log(leftCol + " " + rightCol)
    return(
        <div className="img-wrap">
            <img id="inputImage" src={imageUrl} alt={imageUrl} className="img" width="500px" height="auto" />
            <div className="bounding-box" style={{ top: topRow, right: rightCol, bottom: bottomRow, left: leftCol }}></div>
        </div>
    )
}

export default FaceRecognition;