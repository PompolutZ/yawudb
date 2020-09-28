import React from 'react'
import { ReactComponent as Logo } from '../../svgs/underworlds_logo.svg';

function Divider() {
    return (
        <div className="w-full">
            <hr className="c-red-500" />
            <Logo style={{ fill: 'magenta', fontSize: '24px' }} />
            <hr />
        </div>
    )
}

export default Divider
