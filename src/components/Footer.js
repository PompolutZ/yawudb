import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexFlow: 'column wrap', backgroundColor: '#A2D3C2', color: 'white', paddingLeft: '1rem', fontFamily: 'roboto', marginTop: '1rem'}}>
                <div style={{margin: '.5rem'}}> The information presented on this site about Warhammer Underworlds, both literal and graphical, is copyrighted by Games Workshop.</div> 
                <div style={{margin: '.5rem'}}> This website is not produced, endorsed, supported, or affiliated with Games Workshop.</div> 
                <div style={{margin: '.5rem'}}> This website is licensed under MIT license and its source code is on the <a href="https://github.com/PompolutZ/yawudb">Github</a>.</div> 
            </div>
        );
    }
}

export default Footer;