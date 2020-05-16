import React from 'react';
import './Rank.scss';

const Rank = ({ name, entries }) => {
    return(
        <div className="rank">
            <h3>
                {`${name}, Image detection...`}
            </h3>
            <p className="rank-value">
                {entries}
            </p>
        </div>
    )
}

export default Rank