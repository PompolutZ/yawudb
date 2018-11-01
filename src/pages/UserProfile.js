import React, { Component } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { db } from '../firebase';

class UserProfile extends Component {
    state = {
        userName: !this.props.userInfo !== null ? this.props.userInfo.displayName : ''
    }

    render() {
        return (
            <div style={{ display: 'flex', flexFlow: 'column wrap'}}>
                <TextField
                    id="with-placeholder"
                    label="Profile name"
                    value={this.state.userName}
                    margin="none"
                    onChange={this.handleUseNameChange}
                    style={{ margin: '1rem auto', minWidth: '20rem'}}
                    />
                <Typography style={{ margin: '0 1rem 0 1.8rem', minWidth: '20rem'}}>
                    Note: Your profile name will be visible to others as an author name for the decks you've made.
                </Typography>    
                <Button style={{ margin: '1rem auto'}} onClick={this.handleSave}>Save</Button>    
            </div>
        );
    }   

    handleUseNameChange = e => {
        this.setState({ userName: e.target.value });
    }

    handleSave = async () => {
        const userRef = db.collection('users').doc(this.props.userInfo.uid);
        try {
            await userRef.update({ displayName: this.state.userName });
            this.props.setUser({ ...this.props.userInfo, displayName: this.state.userName });
        } catch(err) {
            console.log('ERROR_UPDATE_PROFILE', err);
        }
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch({ type: 'SET_USER', user: user })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);