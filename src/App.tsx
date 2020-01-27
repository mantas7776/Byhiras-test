import React from 'react';
import './normalize.css';
import Game from './components/game/Game';

const App: React.FC = () => {
    return (
        <div className="App">
            <Game />
        </div>
    );
};

export default App;
