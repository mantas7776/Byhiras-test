import React from 'react';
import NpcInfo from './NpcInfo';
import { NpcStatusProps } from './SharedTypes';

export const Player: React.FC<NpcStatusProps> = props => {
    return (
        <div className="vertical_center_row">
            <div className="vertical_center">
                <img
                    src={process.env.PUBLIC_URL + '/img/stickman.png'}
                    alt=""
                    className="npc_img"
                />
                <div>Player</div>
            </div>
            <NpcInfo health={props.health} dices={props.dices} />
        </div>
    );
};

export const Monster: React.FC<NpcStatusProps> = props => {
    return (
        <div className="vertical_center_row">
            <NpcInfo health={props.health} dices={props.dices} />
            <div className="vertical_center">
                <img
                    src={process.env.PUBLIC_URL + '/img/monster.png'}
                    alt=""
                    className="npc_img"
                />
                <div>Monster</div>
            </div>
        </div>
    );
};
