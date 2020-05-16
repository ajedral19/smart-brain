import React from 'react';
import './ImageLinkForm.scss';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div className="link-form">
            <p className="">
                {'This will detect faces in your pictures.'}
            </p>
            <div className="form-wrapper">
                <input type="text" className="input" placeholder="paste url here" onChange={onInputChange} />
                <button onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;