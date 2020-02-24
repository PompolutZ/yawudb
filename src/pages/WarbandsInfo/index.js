import React from 'react';
import { useParams } from 'react-router-dom';

function WarbandsInfo(props) {

    let { name } = useParams();
    console.log(name);

    return (
        <div>
            Warbands to follow
        </div>
    )
}

export default WarbandsInfo;