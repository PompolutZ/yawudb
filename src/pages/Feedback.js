import React from 'react';
import { Link } from 'react-router-dom';

const Feedback = () => (
    <div style={{ display: 'flex', marginBottom: '5rem', marginTop: '5rem' }}>
        <div style={{ display: 'flex', flexFlow: 'column wrap', margin: 'auto', alignItems: 'center' }}>
            <div style={{ marginBottom: '1rem'}}>
                <a href="mailto:pompolutz@gmail.com?subject=YAWUDB%20BUG">Report a bug</a>
            </div>
            <div style={{ marginBottom: '1rem'}}>
                <a href="mailto:pompolutz@gmail.com?subject=YAWUDB%20Feature%20Request">Ask for a feature</a>
            </div>
            <div style={{ marginBottom: '1rem'}}>
                <a href="mailto:pompolutz@gmail.com?subject=YAWUDB%20Deck%20Authorship%20Request">Claim authorship of an anonymous deck</a>
            </div>
        </div>
    </div>
);

export default Feedback;