import React from 'react';
import GameLogic from './GameLogic';
import './Game.css';

const Game: React.FC = () => {
    return (
        <div>
            <div className="center_align">Battle simulator!</div>
            <GameLogic />
        </div>
    );
};

export default Game;
