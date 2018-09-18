import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Decks from './pages/Decks';
import DeckCreator from './pages/DeckCreator';
import MyDecks from './pages/MyDecks';

import registerServiceWorker from './registerServiceWorker';
import Footer from './components/Footer';
import Login from './pages/Login';
import MenuAppBar from './components/MenuAppBar';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

const App = () => (
    <Router>
        <div>
            <MenuAppBar />

            <Route exact path="/" component={Home} />
            <Route path="/decks" component={Decks} />
            <Route path="/newdeck" component={DeckCreator} />
            <Route path="/login" component={Login} />
            <Route path="/mydecks" component={MyDecks} />

            <Footer />
        </div>
    </Router>
);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
