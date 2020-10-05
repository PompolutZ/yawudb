import React from 'react';
import { useParams } from 'react-router-dom';

function WarbandsInfo(props) {

    let { name } = useParams();

    return (
        <div>
            Warbands to follow
        </div>
    )
}

export default WarbandsInfo;