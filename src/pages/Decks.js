import React, { Component } from 'react';
import { db } from '../firebase';
import { List } from 'immutable';
import DeckOverview from '../components/DeckOverview';
import CircularProgress from '@material-ui/core/CircularProgress';

const uuid4 = require('uuid/v4');

// const DeckOverview = ({ id, name, sets }) => {
//     console.log(id.substring(0, id.length - 13));
//     return (
//         <div style={{display: 'flex', alignItems: 'center', flexFlow: 'row wrap', margin: 'auto .5rem .5rem .5rem'}}>
//             <img src={`/assets/icons/${id.substring(0, id.length - 13)}-icon.png`} alt="icon"
//                 style={{width: '2rem', height: '2rem'}} />
//             <div style={{marginLeft: '.5rem'}}>{name}</div>    

//         </div>
//     );
// }


class Decks extends Component {
    state = {
        decks: new List(),
        loading: true
    }

    componentDidMount() {
        db.collection('decks')
            .get()
            .then(qs => {
                qs.forEach(doc => {
                    this.setState(state => ({decks: state.decks.push({id: doc.id, ...doc.data()})}));        
                });
                this.setState({loading: false});
            })
            .catch(error => console.log(error));
    }

    render() {
        if(this.state.loading) {
            return (
                <div style={{display: 'flex', height: '100vh'}}>
                    <div style={{margin: 'auto', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
                        <CircularProgress style={{color: '#3B9979'}} />
                        <div>Fetching decks...</div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {
                    this.state.decks.map(d => <DeckOverview key={uuid4()} id={d.id} name={d.name} sets={d.sets} cards={d.cards} />)
                }
            </div>
        );
    }
}

export default Decks;