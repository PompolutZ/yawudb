import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Decks from './pages/Decks';
import DeckCreator from './pages/DeckCreator';
import ButtonAppBar from './components/ButtonAppBar';
import registerServiceWorker from './registerServiceWorker';
import Footer from './components/Footer';

const App = () => (
    <Router>
        <div>
            <ButtonAppBar />

            <Route exact path="/" component={Home} />
            <Route path="/decks" component={Decks} />
            <Route path="/newdeck" component={DeckCreator} />

            <Footer />
        </div>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
